/** 当前是否是开发模式 */
export const DEV: boolean =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development';

export const systemName = '企业经营事件管理系统';
// 前台资源部署域名，默认头像图片资源调用域名
export const config = {
  company: '成都印钞有限公司',
  api: DEV ? 'http://localhost:90/api/' : 'http://10.8.1.25:100',
  footer: '成都印钞有限公司',
  uploadHost: DEV ? 'http://localhost:90/public/upload/' : 'http://10.8.1.25:100/upload/',
  org: 'CDYC',
  uap: {
    active: true && !DEV, // 使用代理身份认证登录
    rtx: 'http://10.8.1.25:100/rtx/rtx_CDYC.xml',
    login: '//10.8.1.25:100/675/25d3d1010c',
    dept: 'http://10.8.1.25:100/673/46efae99d7',
    user: 'http://10.8.1.25:100/674/d2b665340b',
  },
};

export const {
  uap,
  company,
  org: ORG,
  footer: AUTHOR,
  api: domain,
  api: host,
  uploadHost,
} = config;

export const SEARCH_PREFIX = `http://10.8.2.133:8000/search#`;

export const systemHost = DEV ? 'http://localhost:8000/' : 'http://10.8.2.133:90/';

export const validIP = ['127.0.', '0.0.', '10.8.', '10.9.'];

/** 以下模块不允许编辑 */
export const CATE_QUALITY_FEEDBACK = '印钞质量问题反馈单';
