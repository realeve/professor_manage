import { Modal, Input } from 'antd';
import React, { useState } from 'react';
import FormItem from '@/component/hooks/FormItem';
import { useMedia } from 'react-use';

const LoginPage = () => {
  const isPC = useMedia('(min-width: 1280px)');
  const isWide = useMedia('(min-width: 1600px)');

  const InputWidth = isPC && !isWide ? 250 : isWide ? 330 : 170;
  const [username, setUsername] = useState(null);
  return (
    <Modal title="登录" visible>
      <div className="ant-form ant-form-horizontal">
        <FormItem label="用户名" name="username" required message="用户名不能为空">
          <Input
            value={username}
            placeholder="在此输入用户名"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            style={{ width: InputWidth }}
          />
        </FormItem>
      </div>
    </Modal>
  );
};

export default LoginPage;
