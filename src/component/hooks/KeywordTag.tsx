import React, { useEffect, useRef } from 'react';
import { Tag, Input, Tooltip, Skeleton } from 'antd';
import { TagProps } from 'antd/lib/tag';
import FormItem, { IFormItemProps } from './FormItem';
import * as R from 'ramda';
import { useSetState } from 'react-use';
import { PlusOutlined } from '@ant-design/icons';
import './KeywordTag.less';

export interface ITagProp
  extends Omit<TagProps, 'onChange'>,
    Omit<IFormItemProps, 'children' | 'label'> {
  /** 值 */
  defaultValue?: number;
  /** form 标题 */
  title?: string;
  onChange: (e: string[]) => void;
  /** 新标签文字 */
  newLabel?: string;
  loading?: boolean;
  [key: string]: any;
}
export default function KeywordTag({
  value = [],
  onChange: setValue,
  title = null,
  hasError = false,
  required = false,
  extra = null,
  message = null,
  newLabel = '新标签',
  loading = false,
}: ITagProp) {
  const [state, setState] = useSetState({
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  });

  const handleClose = (removedTag) => {
    const tags = value.filter((tag) => tag !== removedTag);
    console.log(tags);
    setValue(tags);
  };

  const showInput = () => {
    setState({ inputVisible: true });
  };

  const inputRef = useRef(null);
  const editInput = useRef(null);

  useEffect(() => {
    if (state.inputVisible) {
      inputRef.current?.focus?.();
    }
  }, [state.inputVisible]);

  const handleInputChange = (e) => {
    setState({ inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let tags = R.clone(value);

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    setValue(tags);

    setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  const handleEditInputChange = (e) => {
    setState({ editInputValue: e.target.value });
  };

  const handleEditInputConfirm = () => {
    const newTags = R.clone(value);
    const { editInputIndex, editInputValue } = state;
    newTags[editInputIndex] = editInputValue;
    setValue(newTags);

    setState({
      editInputIndex: -1,
      editInputValue: '',
    });
  };

  const { inputVisible, inputValue, editInputIndex, editInputValue } = state;

  const SelectComponent = (
    <>
      {value.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInput}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag className="edit-tag" key={tag} closable onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={(e) => {
                setState({ editInputIndex: index, editInputValue: tag });
                editInput.current?.focus?.();
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> {newLabel}
        </Tag>
      )}
    </>
  );

  if (!title) {
    return (
      <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
        {SelectComponent}
      </Skeleton>
    );
  }

  return (
    <FormItem label={title} required={required} hasError={hasError} message={message} extra={extra}>
      <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
        {SelectComponent}
      </Skeleton>
    </FormItem>
  );
}
