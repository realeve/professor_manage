import { axios, TDbWrite, DEV, _commonData } from '@/utils/axios';
import { IUserItem as IProfessor } from '@/pages/excel/db';
export interface IProfessorItem extends IProfessor {}

/**
 *   @database: { 接口管理 }
 *   @desc:     { 标签列表 }
 */
export const getProfessorTags = () =>
  axios<{ id: number; tag_name: string }>({
    url: DEV ? '/mock/1344_fad62f35ba.json' : '/1344/fad62f35ba.json',
  }).then((res) => res.data);

/**
 *   @database: { 接口管理 }
 *   @desc:     { 新增专家标签 }
 */
export const addProfessorTags: (tag_name: string) => Promise<number> = (tag_name) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/1345/0f9a000a2a.json',
    params: {
      tag_name,
    },
  }).then(({ data: [{ id }] }) => id);
export interface IUserItem {
  uid: number;
  username: string;
  sex: string;
  degree: string;
  educate_background: string;
  career: string;
  company: string;
  duty: string;
  tech_level: string;
  work_status: string;
  vocate_qualify: string;
  phone: string;
  mobile: string;
}
/**
 *   @database: { 接口管理 }
 *   @desc:     { 专家列表 }
 */
export const getProfessorUser = () =>
  axios<IUserItem>({
    url: DEV ? '/mock/1346_2fe2b79f80.json' : '/1346/2fe2b79f80.json',
  }).then((res) => res.data);

export interface ITagLog {
  tag_id: number;
  uid: number;
  status: number;
}
/**
 *   @database: { 接口管理 }
 *   @desc:     { 指定tag的用户列表 }
 */
export const getProfessorTagLogs = (tag_id: number) =>
  axios<ITagLog>({
    url: DEV ? '/mock/1347_ca4f9c3188.json' : '/1347/ca4f9c3188.json',
    params: {
      tag_id,
    },
  }).then((res) => res.data);

/**
 *   @database: { 接口管理 }
 *   @desc:     { 给用户添加标签 }
 */
export const addProfessorTagLogs: (params: { tag_id: number; uid: number }) => Promise<boolean> = (
  params,
) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/1348/d6780d3683.json',
    params,
  }).then(({ data: [{ id }] }) => id > 0);

/**
 *   @database: { 接口管理 }
 *   @desc:     { 切换用户的标签状态 }
 */
export const setProfessorTagLogs: (params: { tag_id: number; uid: number }) => Promise<boolean> = (
  params,
) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/1349/6aadd20325.json',
    params,
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);

/**
 *   @database: { 接口管理 }
 *   @desc:     { 专家基础信息 }
 */
export const getProfessorFullUser = () =>
  axios<IProfessor>({
    url: DEV ? '/mock/1350_a256a39dac.json' : '/1350/a256a39dac.json',
  }).then((res) => res.data);

/**
*   @database: { 接口管理 }
*   @desc:     { 更新标签名称 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@id:_id. 参数说明：api 索引序号 
*/
export const setProfessorTags: (params: { tag_name: string; _id: number }) => Promise<boolean> = (
  params,
) =>
  axios<TDbWrite>({
    url: DEV ? _commonData : '/1356/49ab35f917.json',
    params,
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);
