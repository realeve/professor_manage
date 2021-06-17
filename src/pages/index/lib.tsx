import { Tag } from 'antd';

import { degreeList, educateList } from '@/pages/excel/db';
import { getProfessorFullUser } from '@/pages/config/tags/db';

import * as R from 'ramda';
import * as db from './db';
export const getUniq = (key: string, data: {}[]) => {
  let list = R.pluck(key)(data);
  list = R.filter((item) => item)(list);
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

  const companyList = getUniq('company', users);
  const careers = getUniq('career', users);
  const techLevels = getUniq('tech_level', users);
  const dutys = getUniq('duty', users);
  const tags = uniqTag;
  const graduateCareer = getUniq('graduate_career', users);

  let columns = [
    {
      title: '#',
      dataIndex: 'idx',
      key: 'idx',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      filters: [
        {
          text: '男',
          value: '男',
        },
        {
          text: '女',
          value: '女',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.sex.indexOf(value) === 0,
      sorter: (a, b) => a.sex - b.sex,
      sortDirections: ['descend'],
    },
    {
      title: '学位',
      dataIndex: 'degree',
      key: 'degree',
      defaultSortOrder: 'descend',
      filters: degreeList.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record.degree.indexOf(value) === 0,
      sorter: (a, b) => a.degree - b.degree,
    },

    {
      title: '学历',
      dataIndex: 'educate_background',
      key: 'educate_background',
      defaultSortOrder: 'descend',
      filters: educateList.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record.educate_background.indexOf(value) === 0,
      sorter: (a, b) => a.educate_background - b.educate_background,
    },
    {
      title: '毕业专业',
      dataIndex: 'graduate_career',
      key: 'graduate_career',
      filters: graduateCareer.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record.graduate_career.indexOf(value) === 0,
    },
    {
      title: '从事专业',
      dataIndex: 'career',
      key: 'career',
      filters: careers.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record.career.indexOf(value) === 0,
    },
    {
      title: '工作单位',
      dataIndex: 'company',
      key: 'company',
      filters: companyList.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record.company.indexOf(value) === 0,
    },
    {
      title: '职务',
      dataIndex: 'duty',
      key: 'duty',
      filters: dutys.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record.duty.indexOf(value) === 0,
    },
    {
      title: '职称',
      dataIndex: 'tech_level',
      key: 'tech_level',
      filters: techLevels.map((text) => ({ text, value: text })),
      onFilter: (value, record) => record.tech_level.indexOf(value) === 0,
    },
    {
      title: '在岗状态',
      dataIndex: 'work_status',
      key: 'work_status',
      filters: [
        {
          text: '在岗',
          value: '在岗',
        },
        {
          text: '不在岗',
          value: '不在岗',
        },
      ],
      onFilter: (value, record) => record.work_status.indexOf(value) === 0,
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
      onFilter: (value, record) => record.tags.includes(value),
    },

    {
      title: '单位工作电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
  ];
  return { col: columns, users };
};
