import * as db from './db';
import FileDecode from './FileDecode';

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
