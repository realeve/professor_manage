import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import styles from './index.less';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { connect } from 'dva';
import { ICommon, IUserSetting } from '@/models/common';
import LoginModal from '@/component/login/loginPanel';
import { Dispatch } from 'redux';
import * as db from './loginPanel/db';
import UserConfig from '@/component/login/loginPanel/config';

const LoginAvatar = ({
  userSetting,
  dispatch, 
}: {
  userSetting: IUserSetting;
  dispatch: Dispatch; 
}) => {
  const [show, setShow] = useState(false);
  const updateUser = (userSetting) => {
    dispatch({
      type: 'common/setStore',
      payload: {
        userSetting,
      },
    });
  };
 

  useEffect(() => { 

    let user = db.loadUserConfig();
    if (!user.uid) {
      return;
    }
    updateUser(user);
  }, []); 

  const [userConfigShow, setUserConfigShow] = useState(false);

  if (!userSetting.uid) {
    return (
      <div
        className={styles.avatar}
        onClick={() => {
          setShow(true);
        }}
      >
        <LoginModal
          show={show}
          onCancel={() => {
            setShow(false);
          }}
        />
        <Avatar size="large" icon={<UserOutlined />} />
        <span className={styles.user}>登录</span>
      </div>
    );
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            onClick={() => {
              setUserConfigShow(true);
            }}
          >
            个人信息设置
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              dispatch({ type: 'common/logoff' });
              window.location.reload()
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
        <UserConfig
          show={userConfigShow}
          onCancel={() => {
            setUserConfigShow(false);
          }} 
          userSetting={userSetting}
        />
        <span className={styles.user}>{userSetting.fullname}</span>
      </div>
    </Dropdown>
  );
};

export default connect(({ common }: { common: ICommon }) => ({
  userSetting: common.userSetting, 
}))(LoginAvatar);
