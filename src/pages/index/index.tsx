import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Card, Table, Button, Modal } from 'antd';
import { IProfessorItem } from '@/pages/config/tags/db';
import { getTableConfig } from './lib';
import UserEditor from '@/pages/config/user/UserEditor';
import UserPermission from '@/pages/config/user/UserPermission';

export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<IProfessorItem[]>(null);
  const [columns, setColumns] = useState([]);

  const isAdmin = true;

  const [curUser, setCurUser] = useState<IProfessorItem>(null);

  const [show, setShow] = useState(false);

  const refresh = async () => {
    setLoading(true);
    let { col, users } = await getTableConfig();
    setState(users);
    if (isAdmin) {
      col.push({
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (item: IProfessorItem) => (
          <Button
            onClick={() => {
              setCurUser(item);
              setShow(true);
            }}
            type="link"
          >
            编辑
          </Button>
        ),
      });
    }
    setColumns(col);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }
  return (
    <Card className={styles.home}>
      <Modal
        title={null}
        visible={show}
        width={1200}
        onCancel={() => {
          setShow(false);
          refresh();
        }}
        footer={null}
        className={styles.editPanel}
      >
        {curUser && (
          <>
            <UserPermission user={curUser} panelHeight={260} />
            <UserEditor
              operator_uid={curUser.uid}
              user={curUser}
              onEditComplete={refresh}
              showNew={false}
            />
          </>
        )}
      </Modal>

      <Table columns={columns} loading={loading} dataSource={state} />
    </Card>
  );
}
