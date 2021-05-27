import React, { useState } from 'react';
import { Avatar } from 'antd';
import styles from './index.less';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, message } from 'antd';
import { connect } from 'dva';
import { ICommon, IUserSetting } from '@/models/common';

const LoginAvatar = ({ userSetting }: { userSetting: IUserSetting }) => {
  const [user, setUser] = useState(userSetting);

  if (!user.uid) {
    return (
      <div
        className={styles.avatar}
        onClick={() => {
          message.success('增加登录逻辑');
        }}
      >
        <Avatar size="large" icon={<UserOutlined />} />
        <span className={styles.user}>登录</span>
      </div>
    );
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              个人信息设置
            </a>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setUser({ uid: null, fullname: null });
            }}
          >
            注销
          </Menu.Item>
        </Menu>
      }
      placement="bottomLeft"
      arrow
    >
      <div className={styles.avatar}>
        <Avatar size="large" icon={<UserOutlined />} />
        <span className={styles.user}>{user.fullname}</span>
      </div>
    </Dropdown>
  );
};

export default connect(({ common }: { common: ICommon }) => ({
  userSetting: common.userSetting,
}))(LoginAvatar);
