import { axios, DEV, _commonData, TDbWrite } from '@/utils/axios';
import * as R from 'ramda';
import { message } from 'antd'; 
interface IUserDbItem {
  uid: number; //
  username: string; //
  fullname: string; //
  avatar: string; //
  user_type: number; //
  dept_name: number; //
  actived: number; // 
}

const prefix = 'event_publish';
const key = prefix + '_user';

/** 记录用户基础信息 */
export const saveUserConfig = (user) => {
  window.localStorage.setItem(key, JSON.stringify(user));
};

export const clearUserConfig = () => {
  window.localStorage.removeItem(key);
};

/** 载入用户基础信息 */
// {"uid":1,"username":"develop","fullname":"管理员","avatar":"http://cdn.cdyc.cbpm:100/upload/assets/2019/03/image/1552299370_8407_jp9SIkcHUgBz0rb7TZHF2ktVEpP4MyXL.jpeg","user_type":1,"dept_name":"信息技术部","actived":1}

export const loadUserConfig = () => {
  let user = window.localStorage.getItem(key) || '{}';
  return JSON.parse(user) as IUserDbItem;
}; 

/**
 *   @database: { 接口管理 }
 *   @desc:     { 用户登录 }
 */
export const getSysUser = (params: { username: string; password: string }) =>
  axios<IUserDbItem>({
    url: DEV ? '@/mock/1365_57763d6afc.json' : '/1365/57763d6afc.json',
    params,
  }).then(({ data }) => {
    let res = data[0];
    if (!res) {
      message.error('用户名/密码错误');
      return null;
    }
    if (res.actived == 0) {
      message.error('当前用户未激活，请联系管理员(致电6129)');
      return null;
    }
    saveUserConfig(res);
    return res;
  });

/**
 *   @database: { 企业经营事件管理系统 }
 *   @desc:     { 指定uid权限列表 }
 */
export const getUserPermission = (uid: number) =>
  axios<{ type: number }>({
    url: DEV ? '@/mock/1355_6d167d4ea1.json' : '/1355/6d167d4ea1.json',
    params: {
      uid,
    },
  }).then((res) => R.flatten(res.data.map((item) => item.type)));
  
 

/**
 *   @database: { 接口管理 }
 *   @desc:     { 更新密码 }
 */
export const updateUserPassword: (params: {
  new: string;
  uid: string;
  old: string;
}) => Promise<boolean> = (params) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/4/63bc967cec.json',
    params,
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);
