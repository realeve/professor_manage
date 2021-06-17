import { axios, DEV, _commonData, TDbWrite } from '@/utils/axios';

/** 专业 */
export type TCareer =
  | '承印基材'
  | '安全线（条）'
  | '油墨涂层'
  | '设计制版'
  | '防伪材料'
  | '印钞工艺'
  | '专用设备（钞券）'
  | '银行机具（钞券）'
  | '机检技术（钞券）'
  | '造币材料'
  | '造币工艺'
  | '设计制模'
  | '专用设备（造币）'
  | '银行机具（造币）'
  | '机检技术（造币）'
  | '其他';

/** 学位 */
export type TDegree = '博士' | '硕士' | '学士';
export const degreeList = ['博士', '硕士', '学士'];
/** 学历 **/
export type TEducate = '研究生' | '本科' | '专科' | '高中' | '初中' | '小学';
export const educateList = ['研究生', '本科', '专科', '高中', '初中', '小学'];
export const workStatusList = ['在岗', '不在岗'];
export const sexList = ['男', '女'];

export const chooseList = {
  sex: sexList,
  work_status: workStatusList,
  degree: degreeList,
  educate_background: educateList,
};
export const chooseKeys = Object.keys(chooseList);

export interface IUserItem {
  /** uid */
  uid?: number;
  /** 姓名 **/
  username: string;
  /** 性别 **/
  sex: '男' | '女';
  /** 民族 **/
  people: string;
  /** 出生日期 **/
  birth_date: string;
  /** 籍贯 **/
  hometown: string;
  /** 证件类型 **/
  card_type: string;
  /** 证件号码 **/
  card_no: string;
  /** 学位 **/
  degree: TDegree;
  /** 学历 **/
  educate_background: TEducate;
  /** 毕业院校 **/
  graduate_college: string;
  /** 毕业时间 **/
  graduate_date: string;
  /** 所学专业 **/
  graduate_career: string;
  /** 从事专业 **/
  career: string;
  /** 政治面貌 **/
  political_status: string;
  /** 工作单位 **/
  company: string;
  /** 参加工作时间 **/
  work_time_start: string;
  /** 职务 **/
  duty: string;
  /** 职称 **/
  tech_level: string;
  /** 在岗状态 **/
  work_status: '在岗' | '不在岗';
  /** 电子信箱 **/
  email: string;
  /** 单位电话 **/
  phone: string;
  /** 手机号码 **/
  mobile: string;
  /** 操作员uid **/
  operator_uid?: number;
}

/**
*   @database: { 接口管理 }
*   @desc:     { 批量导入人员信息 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@desc:批量插入数据时，约定使用二维数组values参数，格式为[{username,sex,people,birth_date,graduate_career,career,hometown,card_type,card_no,degree,educate_background,graduate_college,graduate_date,political_status,company,work_time_start,duty,tech_level,work_status,email,phone,mobile,operator_uid }]，数组的每一项表示一条数据*/
export const addProfessorUser: (values: IUserItem[]) => Promise<number> = (values) =>
  axios<TDbWrite>({
    method: 'post',
    url: DEV ? _commonData : '/1343/2bb7d6ec84.json',
    data: {
      values,
    },
  }).then(({ data: [{ id }] }) => id);

const tagName = `姓名
性别
民族
出生日期
籍贯
证件类型
证件号码
学位
学历
毕业院校
毕业时间
所学专业
从事专业
政治面貌
工作单位
参加工作时间
职务
职称
在岗状态
电子信箱
单位电话
手机号码
  `
  .replace(/ |  /g, '')
  .split('\n');
const keyList = `username
sex
people
birth_date
hometown
card_type
card_no
degree
educate_background
graduate_college
graduate_date
graduate_career
career
political_status
company
work_time_start
duty
tech_level
work_status
email
phone
mobile`
  .replace(/ |  /g, '')
  .split('\n');

export const userBaseInfo = keyList.map((key, i) => ({ key, value: tagName[i] }));
