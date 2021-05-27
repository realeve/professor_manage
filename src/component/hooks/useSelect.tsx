import React, { useState, useEffect, useMemo } from 'react';
import { Select, Radio, Checkbox, Cascader, Spin } from 'antd';
import { SelectProps } from 'antd/lib/select';
import FormItem, { IFormItemProps } from './FormItem';
import styles from './FormItem.less';
import type { TFilterOption } from '@/pages/new/baseConfig/lib';
import type {} from 'antd/lib/select';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
const { Option, OptGroup } = Select;
declare type RawValue = string | number | { [key: string]: any };

type TSelectGroup = { group: string; data: { value: string; name: string }[] }[];
type TSelect = { name: string; value: RawValue; dept_name?: string }[];

export interface ISelectProp<T extends RawValue[] | RawValue>
  extends Omit<SelectProps<number>, 'defaultValue'>,
    Omit<IFormItemProps, 'children' | 'label'> {
  /** 下拉选项列表 */
  data?: TSelect | TSelectGroup;
  /** 值 */
  defaultValue?: T;
  title?: string;
  /** 类型 */
  type?: 'select' | 'radio' | 'radioButton' | 'checkbox' | 'cascader' | 'selectGroup';
  [key: string]: any;
}

type TSelectComponent = (params: {
  name: string;
  width?: number | string;
  placeholder?: string;
  title?: string;
  filterOption?: TFilterOption;
  loading?: boolean;
  [x: string]: any;
}) => JSX.Element;

type TFormItem = ({
  name,
  message,
  extra,
  required,
  width,
  ...restProps
}: IFormItemProps) => JSX.Element;

type TUseSelect = <T extends RawValue | RawValue[]>(
  params: ISelectProp<T>,
) => [TFormItem | TSelectComponent, T, (e: T) => void];

const useSelect: TUseSelect = ({
  data = null,
  defaultValue = null,
  title = null,
  disabled = false,
  hasError = false,
  type = 'select',
}) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [JSON.stringify(data)]);

  const SelectComponent: TSelectComponent = ({
    name,
    width = 170,
    placeholder = '点击选择',
    title,
    filterOption,
    ...restProps
  }) =>
    useMemo(() => {
      const props = {
        disabled,
        value,
        style: { width },
        placeholder: typeof title === 'string' ? placeholder + (title || '') : placeholder,
        id: name,
        ...restProps,
      };

      switch (type) {
        case 'radio':
          return (
            <Radio.Group
              {...props}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              {(data as TSelect).map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          );
        case 'radioButton':
          return (
            <Radio.Group
              {...props}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              {(data as TSelect).map((item) => (
                <Radio.Button key={item.value} value={item.value}>
                  {item.name}
                </Radio.Button>
              ))}
            </Radio.Group>
          );
        case 'checkbox':
          return (
            <Checkbox.Group {...props} onChange={setValue}>
              {(data as TSelect).map((item) => (
                <Checkbox key={item.value} value={item.value}>
                  {item.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          );
        case 'cascader':
          return (
            <Cascader
              {...props}
              options={data}
              value={value}
              onChange={setValue}
              placeholder={placeholder}
            />
          );
        case 'selectGroup':
          return (
            <Select {...props} filterOption={filterOption} onChange={setValue}>
              {(data as TSelectGroup).map((groupItem) => (
                <OptGroup label={groupItem.group} key={groupItem.group}>
                  {groupItem.data.map((item) => (
                    <Option key={item.value} value={item.value} optionItem={item}>
                      {item.name}
                    </Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          );
        case 'select':
        default:
          return (
            <Select {...props} filterOption={filterOption} onChange={setValue}>
              {data.map((item) => (
                <Option key={item.value} value={item.value} option_item={item}>
                  <div className={styles.row}>
                    <span>{item.name}</span>
                    <span style={{ color: '#999' }}>{item.dept_name && `(${item.dept_name})`}</span>
                  </div>
                </Option>
              ))}
            </Select>
          );
      }
    }, [type, disabled, value]);

  if (!title) {
    return [SelectComponent, value, setValue];
  }

  return [
    ({
      name,
      message = null,
      extra = null,
      required = false,
      width = 170,
      style = {},
      ...restProps
    }: IFormItemProps) => (
      <FormItem
        label={title}
        name={name}
        required={required}
        hasError={hasError}
        message={message}
        extra={extra}
        style={style}
      >
        <SelectComponent
          width={width}
          name={name}
          title={title}
          {...restProps}
          notFoundContent={restProps.loading ? <Spin spinning /> : renderEmpty('Select')}
        />
      </FormItem>
    ),
    value,
    setValue,
  ];
};

export default useSelect;
