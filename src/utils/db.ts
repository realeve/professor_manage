import { axios, DEV } from '@/utils/axios';

/**
 *   @database: { 企业经营事件管理系统 }
 *   @desc:     { 列出具有公共权限的事件分类 }
 */
export const getPublicCates = () =>
  axios<{ id: number }>({
    url: DEV ? '/mock/1342_8c10f3c774.json' : '/1342/8c10f3c774.json',
  }).then((res) => res.data.map((item) => item.id));
