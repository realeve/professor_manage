import FileDecode from './FileDecode';

import { connect } from 'dva';
import { ICommon } from '@/models/common';

const dateColumn = [4, 11, 16];

const ExcelPage = ({ user }) => {
  return <FileDecode user={user} dateColumn={dateColumn} />;
};

export default connect(({ common: { userSetting } }: { common: ICommon }) => ({
  user: userSetting,
}))(ExcelPage);
