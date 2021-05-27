import { Modal, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import FormItem from '@/component/hooks/FormItem';
import { useSetState } from 'react-use';
import { IUserItem } from '../tags/db';
import { userBaseInfo } from '@/pages/excel/db';
import 'antd/lib/form/style/index.less';
import './userEdit.less';

export default ({ user }: { user: IUserItem }) => {
  const [state, setState] = useSetState(user);
  useEffect(() => {
    setState(user);
  }, [user]);

  return (
    <div>
      <h3>基础信息</h3>
      <div className="ant-form ant-form-horizontal">
        {userBaseInfo.map(({ key, value }) => (
          <FormItem label={value} name={key} key={key}>
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
    </div>
  );
};
