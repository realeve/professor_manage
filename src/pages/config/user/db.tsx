import { axios, TDbWrite, _commonData, DEV } from '@/utils/axios';
import { ITagLog } from '../tags/db';

/**
 *   @database: { 接口管理 }
 *   @desc:     { 更新专家基础信息 }
 */
export const setProfessorUser: (params: {
  mark_label: string;
  username: string;
  sex: string;
  people: string;
  birth_date: string;
  degree: string;
  graduate_date: string;
  educate_background: string;
  hometown: string;
  card_type: string;
  card_no: string;
  career: string;
  politial_status: string;
  company: string;
  work_time_start: string;
  company_type: string;
  duty: string;
  tech_level: string;
  work_status: string;
  industry_type: string;
  vocate_qualify: string;
  email: string;
  phone: string;
  mobile: string;
  uid: string;
}) => Promise<boolean> = (params) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/1351/4cd4b091cf.json',
    params,
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);

/**
 *   @database: { 接口管理 }
 *   @desc:     { 新增专家 }
 */
export const addProfessorUser: (params: {
  mark_label: string;
  username: string;
  sex: string;
  people: string;
  birth_date: string;
  degree: string;
  graduate_date: string;
  educate_background: string;
  hometown: string;
  card_type: string;
  card_no: string;
  career: string;
  politial_status: string;
  company: string;
  work_time_start: string;
  company_type: string;
  duty: string;
  tech_level: string;
  work_status: string;
  industry_type: string;
  vocate_qualify: string;
  email: string;
  phone: string;
  mobile: string;
}) => Promise<number> = (params) =>
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
    url: DEV ? '@/mock/1353_60ad1cae4a.json' : '/1353/60ad1cae4a.json',
    params: {
      uid,
    },
  }).then((res) => res.data);
