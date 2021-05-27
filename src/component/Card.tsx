import React from 'react';
import { Spin } from 'antd';
import Err from '@/component/Err';
import { AxiosError } from '@/utils/axios';
import styles from './Card.less';

import classnames from 'classnames';
export interface ICardProp {
  /** 标题 */
  title?: string | React.ReactNode;
  /** 样式 */
  style?: React.CSSProperties;
  /** 内容 */
  children?: React.ReactNode;
  /** 加载状态 */
  loading?: boolean;
  /** 加载状态 */
  error?: AxiosError;
  className?: string;
}
export default function Card({
  title,
  children,
  loading = false,
  error = null,
  style = {},
  className,
}: ICardProp) {
  if (error) {
    return <Err err={JSON.parse(error)} />;
  }
  return (
    <div className={classnames('card-content', className)} style={style}>
      {typeof title === 'string' ? <h3>{title}</h3> : title}
      <div className={styles.card}>{loading ? <Spin size="small" spinning /> : children}</div>
    </div>
  );
}
