import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { getProfessorTags } from './db';
import TagList from './TagList';
import NewTag from './NewTag';
import { Button } from 'antd';

import { TagOutlined } from '@ant-design/icons';
import EditTag from './EditTag';

export default () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<{ id: number; tag_name: string }[]>([]);

  const refresh = () => {
    setLoading(true);
    getProfessorTags().then((res) => {
      setTags(res);
      setLoading(false);
    });
  };
  useEffect(refresh, []);

  const [visible, setVisible] = useState(false);
  const [curTag, setCurTag] = useState(null);

  return (
    <div className={styles.main}>
      <NewTag
        visible={visible}
        onRefresh={refresh}
        onClose={() => {
          setVisible(false);
        }}
      />
      <div className="card-content">
        <div className={styles.toolbar}>
          <h3 className={styles.title}>标签管理</h3>
          <Button
            type="default"
            onClick={() => {
              setVisible(true);
            }}
          >
            <TagOutlined />
            新增标签
          </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TagList
            data={tags}
            loading={loading}
            onEdit={(i) => {
              setCurTag(tags[i]);
            }}
          />

          <EditTag tag={curTag} />
        </div>
      </div>
    </div>
  );
};
