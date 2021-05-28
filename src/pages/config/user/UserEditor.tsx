import { Modal, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import FormItem from '@/component/hooks/FormItem';
import { useSetState } from 'react-use';
import { IUserItem } from '../tags/db';
import { userBaseInfo } from '@/pages/excel/db';
import 'antd/lib/form/style/index.less';
import './userEdit.less';
import { Button, message } from 'antd';
import * as db from './db';

export default ({ user }: { user: IUserItem }) => {
  const [state, setState] = useSetState(user);
  useEffect(() => {
    setState(user);
  }, [user]);

  return (
    <>
      <h3>基础信息</h3>
      <div className="ant-form ant-form-horizontal">
        {userBaseInfo.map(({ key, value }) => (
          <FormItem label={value} name={key} key={key} style={{ marginBottom: 10 }}>
            <Input
              value={state[key]}
              onChange={(e) => {
                setState({ [key]: e.target.value });
              }}
              style={{ width: 200 }}
            />
          </FormItem>
        ))}
      </div>
      <div style={{ marginLeft: 150 }}>
        <Button
          type="primary"
          onClick={() => {
            db.setProfessorUser(state).then((success) => {
              message[success ? 'success' : 'error'](`个人信息更新${success ? '成功' : '失败'}`);
            });
          }}
        >
          更新基础信息
        </Button>
        <Button
          type="default" style={{marginLeft:20}}
          onClick={() => {
            db.addProfessorUser(state).then((success) => {
              message[success ? 'success' : 'error'](`个人信息增加${success ? '成功' : '失败'}`);
            });
          }}
        >
          新增专家
        </Button>
      </div>
    </>
  );
};
