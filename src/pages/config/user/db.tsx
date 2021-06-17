import { axios, TDbWrite, _commonData, DEV } from '@/utils/axios';
import { ITagLog } from '../tags/db';
import { IUserItem } from '@/pages/excel/db';

/**
 *   @database: { 接口管理 }
 *   @desc:     { 更新专家基础信息 }
 */
export const setProfessorUser: (params: IUserItem) => Promise<boolean> = (params) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/1351/4cd4b091cf.json',
    params,
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);

/**
 *   @database: { 接口管理 }
 *   @desc:     { 新增专家 }
 */
export const addProfessorUser: (params: Omit<IUserItem, 'uid'>) => Promise<number> = (params) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/1352/2c66a09c55.json',
    params,
  }).then(({ data: [{ id }] }) => id);

/**
 *   @database: { 接口管理 }
 *   @desc:     { 查询指定专家的标签列表 }
 */
export const getProfessorTagLogs = (uid: number) =>
  axios<ITagLog>({
    url: DEV ? '/mock/1353_60ad1cae4a.json' : '/1353/60ad1cae4a.json',
    params: {
      uid,
    },
  }).then((res) => res.data);
