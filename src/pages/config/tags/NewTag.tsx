import React, { useState, useEffect } from 'react';
import * as db from './db';
import { Modal } from 'antd';

import { message, Button, Input } from 'antd';

import FormItem from '@/component/hooks/FormItem';

export const TagEditor = ({
  onClose,
  onSubmit,
  name = '',
}: {
  name?: string;
  onClose?: () => void;
  onSubmit: (tagName: string) => void;
}) => {
  const [tag_name, setTagName] = useState(name);
  useEffect(() => {
    setTagName(name);
  }, [name]);
  return (
    <>
      <FormItem label="标签名" name="tagname">
        <Input
          value={tag_name}
          onChange={(e) => {
            setTagName(e.target.value.trim());
          }}
          style={{ width: 260 }}
          maxLength={20}
        />
      </FormItem>
      {onClose && (
        <Button size="large" style={{ width: 120 }} onClick={onClose}>
          取消
        </Button>
      )}
      <Button
        size="large"
        style={{ width: 120, marginLeft: 20 }}
        onClick={() => {
          onSubmit(tag_name);
        }}
        type="primary"
      >
        确定
      </Button>
    </>
  );
};
const NewTag = ({
  visible = true,
  onClose,
  onRefresh,
}: {
  onRefresh?: () => void;
  visible?: boolean;
  onClose: () => void;
}) => {
  const onSubmit = async (tag_name) => {
    let uid = await db.addProfessorTags(tag_name);
    if (uid == 0) {
      message.error(`编辑标签失败`);
      return;
    }
    message.success(`编辑标签成功`);
    onRefresh?.();
    onClose();
  };

  return (
    <Modal title={`编辑标签`} visible={visible} width={500} footer={null} onCancel={onClose}>
      <TagEditor onClose={onClose} onSubmit={onSubmit} />
    </Modal>
  );
};

export default NewTag;
