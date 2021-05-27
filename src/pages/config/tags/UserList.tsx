import styles from './index.less';
import { IUserItem } from './db';
import { Scrollbars } from 'react-custom-scrollbars';

import { Tooltip, Skeleton } from 'antd';

import { EditOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';

const tooltipText = {
  editor: '编辑',
  left: '添加标签',
  right: '移除标签',
};

const UserList = ({
  data,
  onEdit,
  loading,
  height = 700,
  icon = 'editor',
}: {
  loading: boolean;
  data: IUserItem[];
  onEdit: (idx: number) => void;
  height?: number;
  icon?: 'editor' | 'left' | 'right';
}) => (
  <div className={styles.user}>
    <Skeleton loading={loading} active>
      <Scrollbars
        autoHide
        style={{
          height,
        }}
      >
        {data.map((user, i) => (
          <Tooltip title={`点击${tooltipText[icon]}`} key={user.uid}>
            <div
              className={classnames(styles.item, {
                [styles.itemLeft]: icon == 'left',
              })}
              onClick={() => {
                onEdit?.(i);
              }}
            >
              <label>
                {i + 1}.{user.username}
              </label>
              <label>{user.company}</label>
              <div className={styles.action}>
                {icon == 'editor' && <EditOutlined />}
                {icon == 'right' && <RightOutlined />}
                {icon == 'left' && <LeftOutlined />}
              </div>
            </div>
          </Tooltip>
        ))}
      </Scrollbars>
    </Skeleton>
  </div>
);

export default UserList;
