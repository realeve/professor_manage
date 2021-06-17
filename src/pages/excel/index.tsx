import * as db from './db';
import FileDecode from './FileDecode';

import { connect } from 'dva';
import { ICommon } from '@/models/common';

const dateColumn = [4, 11, 16];

// 从第2行开始
const startFrom = 2;

const ExcelPage = ({ user }) => {
  const uploadData = async (src) => {
    let arr = src.slice(startFrom - 1, src.length);

    let data = arr.filter((item) => item[0] != null);

    let values = data.map((item) => {
      let res = { operator_uid: user.uid };
      item.slice(1).map((value, idx) => {
        let key = db.userBaseInfo[idx].key;
        res[key] = value;
      });
      return res;
    });
    console.log(values);
    return db.addProfessorUser(values);
  };
  return <FileDecode onUpload={uploadData} dateColumn={dateColumn} />;
};

export default connect(({ common: { userSetting } }: { common: ICommon }) => ({
  user: userSetting,
}))(ExcelPage);
