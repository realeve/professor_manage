import React, { useState, useEffect } from 'react';
import styles from '../tags/index.less';
import { getProfessorTags, addProfessorTagLogs, setProfessorTagLogs } from '../tags/db';
import TagList from '../tags/TagList';

import { IProfessorItem, ITagLog } from '../tags/db';
import { Button, message, Row, Col } from 'antd';
import * as db from './db';

interface ITagItem {
  id: number;
  tag_name: string;
}
export default ({ user }: { user: IProfessorItem }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<ITagItem[]>(null);

  const refresh = () => {
    setLoading(true);
    getProfessorTags().then((res) => {
      setTags(res);
      setLoading(false);
    });
  };
  useEffect(refresh, []);

  const [source, setSource] = useState<ITagLog[]>([]);
  const [valid, setValid] = useState<ITagItem[]>([]);
  const [invalid, setInvalid] = useState<ITagItem[]>([]);

  const getUserTags = () => {
    db.getProfessorTagLogs(user.uid).then((res) => {
      setSource(res);
      let userTags = res.filter((item) => item.status == 1).map((item) => item.tag_id);
      setValid(tags.filter((item) => userTags.includes(item.id)));
      setInvalid(tags.filter((item) => !userTags.includes(item.id)));
    });
  };
  useEffect(() => {
    if (!tags) {
      return;
    }
    getUserTags();
  }, [user.uid, tags]);

  const toggleTag = async (tag: ITagItem) => {
    let isExist = source.find((item) => item.tag_id == tag.id);
    let success = false,
      params = { tag_id: tag.id, uid: user.uid };
    if (isExist) {
      success = await setProfessorTagLogs(params);
    } else {
      success = await addProfessorTagLogs(params);
    }
    if (!success) {
      message.error('标签调整失败');
      return;
    }
    getUserTags();
  };

  return (
    <div className={styles.main} style={{ marginBottom: 20 }}>
      <Row gutter={16}>
        <Col span={12}>
          <h3 className={styles.title}>专家 {user.username} 的标签</h3>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TagList
              data={valid}
              loading={loading}
              height={400}
              onEdit={(i) => {
                toggleTag(valid[i]);
              }}
              icon="right"
            />
          </div>
        </Col>
        <Col span={12}>
          <h3 className={styles.title}>可用标签</h3>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TagList
              data={invalid}
              loading={loading}
              height={400}
              onEdit={(i) => {
                toggleTag(invalid[i]);
              }}
              icon="left"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
