import React, { useState, useEffect } from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { IProfessorItem, getProfessorFullUser } from '../tags/db';
import UserList from '../tags/UserList';
import { Row, Col } from 'antd';
import UserEditor from './UserEditor';

export default () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IProfessorItem[]>([]);

  const refresh = () => {
    setLoading(true);
    getProfessorFullUser()
      .then((res) => {
        setUsers(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(refresh, []);

  const [curUser, setCurUser] = useState<IProfessorItem>(null);

  return (
    <Row gutter={16} className="card-content">
      <Col span={8}>
        <h3>专家库</h3>
        <UserList
          loading={loading}
          data={users}
          onEdit={(i) => {
            let user = users[i];
            setCurUser(user);
          }}
          icon="editor"
        />
      </Col>
      {curUser && (
        <Col span={16}>
          <UserEditor user={curUser} />
        </Col>
      )}
    </Row>
  );
};
