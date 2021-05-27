import { axios, TDbWrite } from '@/utils/axios';

interface IUserItem {
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
}

/**
*   @database: { 接口管理 }
*   @desc:     { 批量导入人员信息 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@desc:批量插入数据时，约定使用二维数组values参数，格式为[{mark_label,username,sex,people,birth_date,degree,graduate_date,educate_background,hometown,card_type,card_no,career,politial_status,company,work_time_start,company_type,duty,tech_level,work_status,industry_type,vocate_qualify,email,phone,mobile }]，数组的每一项表示一条数据*/
export const addProfessorUser = (values: IUserItem[]) =>
  axios<TDbWrite>({
    method: 'post',
    url: '/1343/2bb7d6ec84.json',
    data: {
      values,
    },
  }).then(({ data: [{ id }] }) => id > 0);
