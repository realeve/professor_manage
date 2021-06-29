import { Input, Radio } from 'antd';
import React, { useEffect } from 'react';
import FormItem from '@/component/hooks/FormItem';
import { useSetState } from 'react-use';
import { IProfessorItem } from '../tags/db';
import { userBaseInfo, chooseList, chooseKeys } from '@/pages/excel/db';
import 'antd/lib/form/style/index.less';
import './userEdit.less';
import { Button, message } from 'antd';
import * as db from './db';
import * as R from 'ramda';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default ({
  operator_uid,
  user,
  onEditComplete,
  showNew = true,
  showUpdate = true,
}: {
  operator_uid: number;
  user: IProfessorItem;
  onEditComplete: () => void;
  showNew?: boolean;
  showUpdate?: boolean;
}) => {
  const [state, setState] = useSetState(user);
  useEffect(() => {
    setState(user);
  }, [user]);

  return (
    <>
      <h3>基础信息</h3>
      <div className="ant-form ant-form-horizontal">
        {userBaseInfo
          .filter((item) => !item.key.includes('tag'))
          .map(({ key, value }) => (
            <FormItem label={value} name={key} key={key} style={{ marginBottom: 10 }}>
              {chooseKeys.includes(key) ? (
                <RadioGroup
                  value={state[key]}
                  onChange={(e) => {
                    setState({ [key]: e.target.value });
                  }}
                >
                  {chooseList[key].map((item) => (
                    <RadioButton value={item} key={item}>
                      {item}
                    </RadioButton>
                  ))}
                </RadioGroup>
              ) : (
                <Input
                  value={state[key]}
                  onChange={(e) => {
                    setState({ [key]: e.target.value });
                  }}
                  style={{ width: 200 }}
                />
              )}
            </FormItem>
          ))}
      </div>
      <div style={{ marginLeft: 150 }}>
        {showUpdate && (
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={() => {
              db.setProfessorUser({ ...state, operator_uid }).then((success) => {
                message[success ? 'success' : 'error'](`个人信息更新${success ? '成功' : '失败'}`);
                success && onEditComplete?.();
              });
            }}
          >
            确认更改
          </Button>
        )}

        {showNew && (
          <Button
            type="default"
            onClick={() => {
              db.addProfessorUser({ ...state, operator_uid }).then((success) => {
                message[success ? 'success' : 'error'](`个人信息增加${success ? '成功' : '失败'}`);
                if (success) {
                  onEditComplete?.();

                  // 重置数据
                  let nextState = R.clone(state);
                  Object.keys(nextState).forEach((key) => {
                    nextState[key] = '';
                  });
                  setState(nextState);
                }
              });
            }}
          >
            新增专家
          </Button>
        )}
      </div>
    </>
  );
};
