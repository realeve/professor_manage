import React, { useState, useEffect } from 'react';
import { Row, Button, notification, Upload, Spin, Card, Progress, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as lib from '@/utils/lib';
import { connect } from 'dva';
import * as R from 'ramda';
import TableSheet from './tablesheet';
import styles from './index.less';
import XLSX from 'xlsx';
import moment from 'moment';
import * as db from '../db';
import { IUserItem } from '../db';
import { getProfessorTags, addProfessorTags, addProfessorTagLogs } from '@/pages/config/tags/db';

import { IUserSetting } from '@/models/common';

// 从第2行开始
const startFrom = 2;

interface ITagUserItem extends IUserItem {
  tag1: string;
  tag2: string;
  tag3: string;
}

// http://localhost:8000/form/excel?hidemenu=1&id=./data/finance/print_cost.json
const Index = ({ user, dateColumn }: { user: IUserSetting; dateColumn: number[] }) => {
  // 系统标签
  const [tags, setTags] = useState<{ id: number; tag_name: string }[]>([]);
  const refreshTag = () => {
    getProfessorTags().then(setTags);
  };
  useEffect(() => {
    refreshTag();
  }, []);

  const [result, setResult] = useState<{ title: string; data: any[][] }[]>([]);

  const handleUserItem = async ({ tag1, tag2, tag3, ...values }: ITagUserItem, curTags) => {
    let tagId1 = curTags.find((item) => item.tag_name == tag1)?.id;
    let tagId2 = curTags.find((item) => item.tag_name == tag2)?.id;
    let tagId3 = curTags.find((item) => item.tag_name == tag3)?.id;
    let uid = await db.addProfessorUser([values]).catch((e) => {
      console.error(e);
      setStatus('exception');
    });
    if (tagId1) {
      await addProfessorTagLogs({ tag_id: tagId1, uid });
    }
    if (tagId2) {
      await addProfessorTagLogs({ tag_id: tagId2, uid });
    }
    if (tagId3) {
      await addProfessorTagLogs({ tag_id: tagId3, uid });
    }
  };

  const [showProcess, setShowProcess] = useState(false);
  const [status, setStatus] = useState<'success' | 'normal' | 'exception' | 'active'>('normal');
  const [processId, setProcessId] = useState(0);

  const handleData = (src) => {
    let arr = src.slice(startFrom - 1, src.length);

    let data = arr.filter((item) => item[0] != null);

    let tagList: string[] = [];
    let val = R.clone(data);
    // try {
    const values = val.map((item) => {
      let initRes = db.emptyBaseInfo();
      let res: Partial<IUserItem> = {
        operator_uid: user.uid,
        ...initRes,
      };

      item.slice(1).map((value, idx) => {
        let key = db.userBaseInfo[idx].key;
        res[key] = typeof value == 'undefined' ? '' : value;
      });

      let phone = String(res?.phone)?.replace(' ', '') || '';

      let tag1 = res?.tag1?.replace(' ', '')?.replace('专业', '') || '';
      let tag2 = res?.tag2?.replace(' ', '')?.replace('专业', '') || '';
      let tag3 = res?.tag3?.replace(' ', '')?.replace('专业', '') || '';

      let card_no = res?.card_no?.trim();

      tagList.push(tag1, tag2, tag3);
      return { ...res, phone, card_no, tag1, tag2, tag3 };
    });
    // } catch (e) {
    //   console.error(e);
    // }

    // 当前这次上传的tag列表
    tagList = R.uniq(tagList);
    tagList = R.filter<string>((item) => item.length > 0)(tagList);
    return { values, tagList };
  };
  const uploadData = async (src) => {
    let { values, tagList } = handleData(src);

    // 数据库中已有tag
    let dbTags = tags.map((item) => item.tag_name);

    // 需要新增的tag
    let addTags = R.difference(tagList, dbTags);

    console.log(tagList, dbTags, addTags);

    for (let i = 0; i < addTags.length; i++) {
      await addProfessorTags(addTags[i]);
    }

    // 更新当前tag
    let currentTag = R.clone(tags);
    if (addTags.length > 0) {
      getProfessorTags().then((newTags) => {
        setTags(newTags);
        currentTag = newTags;
      });
    }

    setShowProcess(true);
    setStatus('active');
    for (let i = 0; i < values.length; i++) {
      let idx = +(((i + 1) * 100) / values.length).toFixed(0);
      console.log(idx);
      setProcessId(idx);
      await handleUserItem(values[i], currentTag);
    }
    setStatus('success');
    setShowProcess(false);
    return true;
    // return db.addProfessorUser(values);
  };

  const decode = async (src: string[][]) => {
    let data = R.clone(src);
    setUploadStatus('active');

    if (tags.length == 0) {
      message.error('标签基础数据读取失败');
      return;
    }

    let success = await uploadData(data);
    notification.success({
      message: '系统提示',
      description: `数据上传${success ? '成功' : '失败'}`,
    });
    if (uploadStatus == 'active') setUploadStatus('success');
  };

  const [loading, setLoading] = useState(false);

  const [uploadStatus, setUploadStatus] =
    useState<'success' | 'active' | 'normal' | 'exception'>('active');

  // const handleResult = async (res) => {
  //   res = res.map((item) => {
  //     item.data = item.data.map((row) =>
  //       row.map((td) => {
  //         // 只处理浮点数
  //         if (lib.hasDecimal(td)) {
  //           return td.toFixed(2);
  //         }
  //         // 移除换行符
  //         return String(td).replace(/\r|\n/g, '');
  //       }),
  //     );
  //     return item;
  //   });
  //   setResult(res);
  //   console.log('数据解析结果：', res);
  // };

  const manualUpload = async () => {
    let res = R.head(result);
    await decode(res.data).catch((e) => {
      setUploadStatus('exception');
    });
  };

  return (
    <Card>
      <div className={styles.uploadWrapper}>
        <a href="/doc/行业研发人员信息表-汇总表.xls">点击此处下载样表</a>
        <Upload.Dragger
          showUploadList={false}
          accept=".xlsx,.xls"
          style={{ padding: 10, marginTop: 10 }}
          beforeUpload={(file) => {
            setLoading(true);
            lib
              .loadDataFile(file)
              .then((buffer) => {
                if (!buffer) {
                  setLoading(false);
                  return;
                }

                let workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
                let res = [];

                // 只显示其中不隐藏的表格
                workbook.Workbook.Sheets.filter((item) => item.Hidden === 0).forEach(
                  ({ name: sheetName }) => {
                    let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                      header: 1,
                      // raw: true,
                    });

                    let data = R.clone(roa);

                    data = data.map((row, i) => {
                      if (i == 0) {
                        return row;
                      }
                      dateColumn.forEach((idx) => {
                        if (!row[idx]) {
                          return;
                        }
                        row[idx] = moment(row[idx]).format('YYYY-MM-DD');
                      });
                      return row;
                    });

                    if (data.length) {
                      res.push({
                        title: sheetName,
                        data: data,
                      });
                    }
                  },
                );

                setResult(res);
                setLoading(false);
              })
              .catch((e) => {
                notification.error({
                  message: '文件解析错误',
                  description: '错误信息:' + e.message,
                });
              });
            return false;
          }}
        >
          <Spin tip="文件解析中..." spinning={loading}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到这里上传数据</p>
            <p className="ant-upload-hint">只支持上传xlsx及xls格式文件</p>
          </Spin>
        </Upload.Dragger>
      </div>
      {showProcess && <Progress percent={processId} status={status} type="line" />}

      <Row style={{ marginTop: 15 }}>
        <Button
          style={{ marginLeft: 15 }}
          disabled={result.length === 0}
          type="primary"
          onClick={manualUpload}
        >
          数据上传
        </Button>
      </Row>

      <Row style={{ marginTop: 15 }}>
        {result[0] && (
          <TableSheet
            data={{
              data: result[0].data,
              rows: result[0].data.length,
            }}
            sheetHeight={700}
          />
        )}
      </Row>
    </Card>
  );
};

export default connect()(Index);
