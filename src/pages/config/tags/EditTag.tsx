import React, { useState, useEffect } from 'react';
import styles from './editTag.less';
import { TagEditor } from './NewTag';
import * as db from './db';
import UserList from './UserList';
import { Row, Col, message } from 'antd';

export default ({ tag }: { tag: { id: number; tag_name: string } | null }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<db.IUserItem[]>([]);
  const [validUser, setValidUser] = useState<db.IUserItem[]>([]);
  const [invalidUser, setInvalidUser] = useState<db.IUserItem[]>([]);

  const [sourceTagLog, setSourceTagLog] = useState<db.ITagLog[]>([]);

  const refresh = () => {
    if (!tag?.id) {
      return;
    }
    setLoading(true);
    db.getProfessorUser()
      .then((res) => {
        setUsers(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(refresh, [tag?.id]);

  useEffect(() => {
    if (!tag?.id) {
      return;
    }

    db.getProfessorTagLogs(tag.id).then((res) => {
      setSourceTagLog(res);
      let valid = res.filter((item) => item.status == 1).map((item) => item.uid);
      let nextValidUser = users.filter((item) => valid.includes(item.uid));
      let nextInvalidUser = users.filter((item) => !valid.includes(item.uid));
      setValidUser(nextValidUser);
      setInvalidUser(nextInvalidUser);
    });
  }, [tag?.id, users]);

  const handleTagParam = async (param: { uid: number; tag_id: number }) => {
    // 数据存在
    let exist = sourceTagLog.find((item) => item.tag_id == param.tag_id && item.uid == param.uid);
    let success = false;
    if (!exist) {
      success = await db.addProfessorTagLogs(param);
    } else {
      success = await db.setProfessorTagLogs(param);
    }
    if (!success) {
      message.error('用户信息调整错误');
      return;
    }
    refresh();
  };

  return (
    <div className={styles.editTag}>
      <h3>编辑标签</h3>
      <TagEditor
        onSubmit={(nextTag: string) => {
          console.log(nextTag);
        }}
        name={tag?.tag_name}
      />
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <h3>拥有标签</h3>
          <UserList
            loading={loading}
            data={validUser}
            onEdit={(i) => {
              let user = validUser[i];
              let param = { uid: user.uid, tag_id: tag.id };
              handleTagParam(param);
            }}
            icon="right"
          />
        </Col>
        <Col span={12}>
          <h3>没有标签</h3>
          <UserList
            loading={loading}
            data={invalidUser}
            onEdit={(i) => {
              let user = invalidUser[i];
              let param = { uid: user.uid, tag_id: tag.id };
              handleTagParam(param);
            }}
            icon="left"
          />
        </Col>
      </Row>
    </div>
  );
};
