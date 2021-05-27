import * as db from './db';
import FileDecode from './FileDecode';

// 专家标识	姓名	性别	民族	出生日期	学位	毕业时间	学历	籍贯	证件类型	证件号码	从事专业	政治面貌	工作单位	参加工作时间	单位性质	职务	技术等级	在岗状态	行业分类	职业资格	电子信箱	单位电话	手机号码

const keyList =
  `mark_label,username,sex,people,birth_date,degree,graduate_date,educate_background,hometown,card_type,card_no,career,politial_status,company,work_time_start,company_type,duty,tech_level,work_status,industry_type,vocate_qualify,email,phone,mobile`.split(
    ',',
  );

const dateColumn = [4, 6, 14];

// 从第2行开始
const startFrom = 2;

export default () => {
  const uploadData = async (src) => {
    let arr = src.slice(startFrom - 1, src.length);
    let data = arr.filter((item) => item[0] != null);
    let values = data.map((item) => {
      let res = {};
      item.map((value, idx) => {
        let key = keyList[idx];
        res[key] = value;
      });
      return res;
    });
    console.log(values);
    return db.addProfessorUser(values);
  };
  return <FileDecode onUpload={uploadData} dateColumn={dateColumn} />;
};
