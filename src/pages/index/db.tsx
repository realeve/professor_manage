import { axios, DEV, _commonData, IAxiosState } from '@/utils/axios';

/**
 *   @database: { 接口管理 }
 *   @desc:     { 用户标签列表 }
 */
export const getProfessorTagLogs = () =>
  axios<{ uid: number; tag_name: string }>({
    url: DEV ? '/mock/1360_939fcde113.json' : '/1360/939fcde113.json',
  }).then((res) => res.data);
