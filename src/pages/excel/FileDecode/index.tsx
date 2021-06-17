import React, { useState } from 'react';
import { Row, Button, notification, Upload, Spin, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as lib from '@/utils/lib';
import { connect } from 'dva';
import * as R from 'ramda';
import TableSheet from './tablesheet';
import styles from './index.less';
import XLSX from 'xlsx';
import moment from 'moment';
// http://localhost:8000/form/excel?hidemenu=1&id=./data/finance/print_cost.json
const Index = ({
  onUpload,
  dateColumn,
}: {
  dateColumn: number[];
  onUpload: (data: any[][]) => Promise<boolean>;
}) => {
  const [result, setResult] = useState<{ title: string; data: any[][] }[]>([]);

  const decode = async (src: string[][]) => {
    let data = R.clone(src);
    setUploadStatus('active');
    let success = await onUpload(data);
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
        <a href="/doc/专家库样表.xlsx">
          点击此处下载样表
        </a>
        <Upload.Dragger
          showUploadList={false}
          accept=".xlsx,.xls"
          style={{ padding: 10 ,marginTop:10}}
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
