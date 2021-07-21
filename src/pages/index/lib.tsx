import { getProfessorFullUser } from '@/pages/config/tags/db';

import { Tag } from 'antd';

import * as R from 'ramda';
import * as db from './db';
export const getUniq = (key: string, data: {}[]) => {
  let list = R.pluck(key)(data);
  list = R.filter((item) => item)(list);
  list = list.map((item) => String(item).trim());
  return R.uniq(list);
};

export const getUserList = async () => {
  let e = await getProfessorFullUser();
  let tags = await db.getProfessorTagLogs();
  e = e.map((item, idx) => {
    let tag = tags.filter((t) => t.uid == item.uid);
    let res = getUniq('tag_name', tag);
    return { ...item, tags: res, idx: idx + 1 };
  });
  let uniqTag = getUniq('tag_name', tags);
  return { users: e, uniqTag };
};

export const getTableConfig = async () => {
  let { users, uniqTag } = await getUserList();

  const tags = uniqTag;

  const getFilter = (key: string) => {
    const filterData = getUniq(key, users);
    return {
      dataIndex: key,
      key,
      filters: filterData.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record[key].indexOf(value) === 0,
    };
  };

  let columns = [
    {
      title: '#',
      dataIndex: 'idx',
      key: 'idx',
      fixed: 'left',
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      width: 80,
      fixed: 'left',
    },
    {
      title: '工作单位',
      width: 160,
      ...getFilter('company'),
      fixed: 'left',
    },
    {
      title: '专业分类',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tags.length > 3 ? 'red' : tags.length > 2 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
      filters: tags.map((text) => ({ text, value: text })),
      onFilter: (value, record) => {
        return true;
      },
      width: 240,
    },

    {
      title: '性别',
      width: 80,
      ...getFilter('sex'),
      sorter: (a, b) => a.sex - b.sex,
      sortDirections: ['descend'],
    },
    {
      title: '民族',
      width: 100,
      ...getFilter('people'),
    },
    {
      title: '出身年月',
      dataIndex: 'birth_date',
      key: 'birth_date',
      width: 100,
    },
    {
      title: '籍贯',
      ...getFilter('hometown'),
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      sorter: (a, b) => a.age - b.age,
      sortDirections: ['descend'],
    },
    {
      title: '学位',
      width: 80,
      defaultSortOrder: 'descend',
      ...getFilter('degree'),
      sorter: (a, b) => a.degree - b.degree,
    },

    {
      title: '学历',
      defaultSortOrder: 'descend',
      width: 120,
      ...getFilter('educate_background'),
      sorter: (a, b) => a.educate_background - b.educate_background,
    },
    {
      title: '毕业院校',
      width: 160,
      ...getFilter('graduate_college'),
    },
    {
      title: '毕业专业',
      ...getFilter('graduate_career'),
      width: 160,
    },
    {
      title: '毕业时间',
      dataIndex: 'graduate_date',
      key: 'graduate_date',
      width: 100,
    },
    {
      title: '从事专业',
      width: 160,
      ...getFilter('career'),
    },
    {
      title: '政治面貌',
      ...getFilter('political_status'),
      width: 160,
    },
    {
      title: '参加工作时间',
      dataIndex: 'work_time_start',
      key: 'work_time_start',
      width: 100,
    },
    {
      title: '职务',
      width: 200,
      ...getFilter('duty'),
    },
    {
      title: '职称',
      width: 120,
      ...getFilter('tech_level'),
    },
    {
      title: '在岗状态',
      ...getFilter('work_status'),
      width: 120,
    },
    {
      title: '单位工作电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 160,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 160,
    },
  ];
  return { col: columns, users };
};
