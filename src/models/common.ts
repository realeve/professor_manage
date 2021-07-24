import userTool from '@/utils/users';
import { setStore, getVersion } from '@/utils/lib';
import { axios } from '@/utils/axios';
import { validIP } from '@/utils/setting';
import { history } from 'umi';
import {clearUserConfig} from '@/component/login/loginPanel/db'
import '@/utils/dayjs';

// 获取ip
const getIp = () =>
  axios({
    url: '/ip',
  })
    .then((res) => {
      window.localStorage.setItem('ip', res.ip);
      return res.ip;
    })
    .catch((e) => {
      console.error('IP地址获取失败');
      return '0.0.0.0';
    });

// 校验IP白名单
const authIP = (ip: string) => {
  // 获取
  const ipTag = ip.split('.').slice(0, 2).join('.') + '.';

  if (validIP.includes(ipTag)) {
    return;
  }
  history.push('/invalid');
};

const namespace = 'common';
export interface IUserSetting {
  uid: number;
  avatar: string;
  /** 登录名 */
  username: string;
  /** 姓名 */
  fullname: string;
  rtxId: string;
  user_type: number;
  actived: number;
  /** 部门 */
  dept_name: string;
}

// const defaultUserSetting: IUserSetting = {
//   uid: 2,
//   avatar: '',
//   username: '李宾',
//   fullname: '李宾',
//   rtxId: '10654',
//   user_type: 0,
//   actived: 0,
//   dept_name: '信息技术部',
// };

// 未登录用户
const defaultUserSetting: IUserSetting = {
  uid: null,
  avatar: '',
  username: '',
  fullname: '',
  rtxId: '',
  user_type: 0,
  actived: 0,
  dept_name: '',
  
};

export interface ICommon {
  userSetting: IUserSetting;
  isLogin: boolean;
  ip?: string;
  version?: {};
}
const defaultState: ICommon = {
  userSetting: defaultUserSetting,
  isLogin: false,
  ip: '',
  version: {},
};

export default {
  namespace,
  state: defaultState,
  reducers: {
    setStore,
  },
  effects: {
    *logoff(_, { put }) {
      clearUserConfig();
      yield put({
        type: 'setStore',
        payload: {
          userSetting: defaultUserSetting,
        },
      });
    },
    *handleLogin({ payload: { pathname } }, { put, select }) {
      const { isLogin } = yield select((state) => state.common);

      if (!isLogin) {
        let curStatus = userTool.getLoginStatus();
        yield put({
          type: 'setStore',
          payload: {
            isLogin: curStatus === '1',
          },
        });
      }

      if (pathname !== '/login') {
        userTool.saveLastRouter(pathname);
      }

      // 登录逻辑
      let { data, success } = userTool.getUserSetting();
      if (pathname !== '/login') {
        if (!success || !data.autoLogin) {
          history.push('/login');
          return false;
        }
      }

      if (data && data.setting) {
        yield put({
          type: 'setStore',
          payload: {
            userSetting: data.setting,
          },
        });
      }

      return true;
    },
    *refreshIp(_, { call, put }) {
      let version = yield call(getVersion);
      yield put({
        type: 'setStore',
        payload: {
          version,
        },
      });
      let ip = yield call(getIp);
      // authIP(ip);

      yield put({
        type: 'setStore',
        payload: {
          ip,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'refreshIp',
      });
    },
  },
};
