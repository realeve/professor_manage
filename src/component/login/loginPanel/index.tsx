import { Modal, Input, message } from 'antd';
import FormItem from '@/component/hooks/FormItem';
import { useSetState } from 'react-use';
import styles from './index.less';
import * as db from './db';
import { connect } from 'dva';
import { Dispatch } from 'redux'; 

const LoginPage = ({
  show,
  onCancel,
  dispatch,
}: {
  show: boolean;
  onCancel: () => void;
  dispatch: Dispatch;
}) => {
  const InputWidth = 250;
  const [state, setState] = useSetState({
    username: '',
    password: '',
    dept_id: '',
  });

  const submit = async () => {
    if (state.username.trim().length == 0 || state.password.trim().length == 0) {
      message.error('用户名/密码不能为空');
      return;
    }
    let user = await db.getSysUser(state);
    if (!user) {
      return;
    }
    dispatch({
      type: 'common/setStore',
      payload: {
        userSetting: user,
      },
    });
    onCancel();
    window.location.reload()
  };

  return (
    <Modal
      title="登录"
      visible={show}
      className={styles.login}
      okText="登录"
      cancelText="取消"
      onCancel={onCancel}
      onOk={submit}
    >
      <div className="ant-form ant-form-horizontal">
        <FormItem label="用户名" name="username" required message="用户名不能为空">
          <Input
            value={state.username}
            placeholder="在此输入用户名"
            onChange={(e) => {
              setState({ username: e.target.value });
            }}
            style={{ width: InputWidth }}
          />
        </FormItem>
        <FormItem label="密码" name="username" required message="密码不能为空">
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
      </div>
    </Modal>
  );
};

export default connect()(LoginPage);
