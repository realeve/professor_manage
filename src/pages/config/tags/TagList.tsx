import styles from './index.less';
import { Scrollbars } from 'react-custom-scrollbars';

import { Tooltip, Skeleton } from 'antd';

import { EditOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';

const tooltipText = {
  editor: '编辑',
  left: '添加',
  right: '解除',
};

const TagList = ({
  data,
  onEdit,
  loading,
  height = 750,
  icon = 'editor',
}: {
  data: { id: number; tag_name: string }[];
  loading: boolean;
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
        {data.map((tag, i) => (
          <Tooltip title={`点击${tooltipText[icon]}`} key={tag.id}>
            <div
              className={classnames(styles.item, {
                [styles.itemLeft]: icon == 'left',
              })}
              onClick={() => {
                onEdit?.(i);
              }}
            >
              <label>
                {i + 1}.{tag.tag_name}
              </label>
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

export default TagList;
