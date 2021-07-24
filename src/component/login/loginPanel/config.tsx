import { Modal, Input, message } from 'antd';
import FormItem from '@/component/hooks/FormItem';
import { useSetState } from 'react-use';
import styles from './index.less';
import * as db from './db';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { IUserSetting  } from '@/models/common'; 

const LoginPage = ({
  show,
  onCancel, 
  userSetting, 
}: { 
  userSetting: IUserSetting;
  show: boolean;
  onCancel: () => void;
  dispatch: Dispatch;
}) => {
  const InputWidth = 250;
  const [state, setState] = useSetState({
    password: '',
    password2: '',
    old: '',
  });
 

  const submit = async () => {
    if (
      state.old.trim().length == 0 ||
      state.password.trim().length == 0 ||
      state.password2.trim().length == 0
    ) {
      message.error('密码不能为空');
      return;
    }
    if (state.password.trim().length < 5 || state.password2.trim().length < 5) {
      message.error('密码最少长度为5位');
      return;
    }
    if (state.password != state.password2) {
      message.error('两次输入密码不一致');
      return;
    }
    let success = await db.updateUserPassword({
      old: state.old,
      new: state.password,
      uid: userSetting.uid as string,
    });
    message[success ? 'success' : 'error'](`更新密码${success ? '成功' : '失败'}`);
    success && setState({ password: '', password2: '', old: '' });
    success && onCancel();
  };

  return (
    <Modal
      title="个人信息"
      visible={show}
      className={styles.login}
      okText="更新"
      cancelText="取消"
      onCancel={onCancel}
      onOk={submit}
      width={600}
    >
      <h3 style={{ fontWeight: 'bold' }}>基础信息</h3>
      <div className="ant-form ant-form-horizontal">
        <FormItem label="姓名" name="username">
          {userSetting.fullname}
        </FormItem>
        <FormItem label="单位" name="dept_name">
          {userSetting.dept_name}
        </FormItem> 
        <h3 style={{ borderTop: '1px solid #ccc', paddingTop: 10, fontWeight: 'bold' }}>
          更新密码
        </h3>
        <FormItem label="原密码" name="oldpsw" required message="密码不能为空">
          <Input
            value={state.old}
            placeholder="在此输入密码"
            type="password"
            onChange={(e) => {
              setState({ old: e.target.value });
            }}
            style={{ width: InputWidth }}
          />
        </FormItem>
        <FormItem label="新密码" name="newpsw" required message="密码不能为空">
          <Input
            value={state.password}
            placeholder="在此输入密码"
            type="password"
            onChange={(e) => {
              setState({ password: e.target.value });
            }}
            style={{ width: InputWidth }}
          />
        </FormItem>
        <FormItem label="新密码确认" name="pswconfirm" required message="密码不能为空">
          <Input
            value={state.password2}
            placeholder="在此输入密码"
            type="password"
            onChange={(e) => {
              setState({ password2: e.target.value });
            }}
            style={{ width: InputWidth }}
          />
        </FormItem>
      </div>
    </Modal>
  );
};

export default connect()(LoginPage);
