import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { Card, Table, Button, Modal } from 'antd';
import { IProfessorItem } from '@/pages/config/tags/db';
import { getTableConfig } from './lib';
import UserEditor from '@/pages/config/user/UserEditor';
import UserPermission from '@/pages/config/user/UserPermission';
import * as R from 'ramda';
import { Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import { useSetState } from 'react-use';

import { emptyBaseInfo } from '@/pages/excel/db';
import DownloadDocx from './docx';

export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [srcState, setSrcState] = useState<IProfessorItem[]>(null);
  const [dataSource, setDataSource] = useState<IProfessorItem[]>(null);
  const [columns, setColumns] = useState([]);

  const isAdmin = true;

  const [curUser, setCurUser] = useState<IProfessorItem>(null);

  const [filters, setFilters] = useState({});

  const [filterData, setFilterData] = useState([]);

  const updateFilterData = (filters, dataSource) => {
    const keys = Object.keys(filters).filter((item) => item != 'tags');
    const filter = [];
    keys.forEach((key) => {
      if (!filters[key]) {
        return;
      }
      filter.push({ key, val: filters[key] });
    });
    let nextState = R.clone(dataSource);
    if (keys.length > 0) {
      // 多次过滤数据
      filter.forEach(({ key, val }) => {
        nextState = nextState.filter((item) => val.includes(item[key]));
      });
    }
    nextState = nextState.map((item) => {
      if (!item.duty||item.duty == '无') {
        item.duty = '';
      }
      if(!item.career){
        item.career = ''
      }
      if (item.duty.length > 0) {
        item.duty = '、' + item.duty;
      }

      return item;
    });
    setFilterData(nextState);
  };

  const handleChange = (pagination, filters) => {
    setFilters(filters);
    updateFilterData(filters, dataSource);
  };

  const [show, setShow] = useState(false);

  const [state, setState] = useSetState({
    searchText: '',
    searchedColumn: '',
  });

  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`搜索专家姓名`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().includes(value) : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: '' });
  };

  const refresh = async () => {
    setLoading(true);
    let { col, users } = await getTableConfig();

    setSrcState(users);
    setDataSource(users);
    col[1] = {
      ...col[1],
      ...getColumnSearchProps('username'),
    };
    if (isAdmin) {
      col.push({
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (item: IProfessorItem) => (
          <Button
            onClick={() => {
              console.log(item);
              setCurUser(item);
              setShow(true);
            }}
            type="link"
          >
            编辑
          </Button>
        ),
      });
    }
    setColumns(col);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    let fTags = filters?.tags;
    if (!fTags) {
      return;
    }
    let data = R.filter((item) => {
      let flag = true;
      fTags.forEach((tag) => {
        if (!item.tags.includes(tag)) {
          flag = false;
        }
      });
      return flag;
    })(srcState);
    setDataSource(data);
    updateFilterData(filters, data);
  }, [filters?.tags]);

  const [newuser, setNewuser] = useState(false);
  console.log(filterData);
  return (
    <Card className={styles.home}>
      <Modal
        title={null}
        visible={show}
        width={1200}
        onCancel={() => {
          setShow(false);
          refresh();
        }}
        footer={null}
        className={styles.editPanel}
      >
        {curUser && (
          <>
            <UserPermission user={curUser} panelHeight={260} />
            <UserEditor
              operator_uid={curUser.operator_uid}
              user={curUser}
              onEditComplete={() => {
                refresh();
                setShow(false);
              }}
              showNew={false}
            />
          </>
        )}
      </Modal>

      <Modal
        title={null}
        visible={newuser}
        width={1200}
        onCancel={() => {
          setNewuser(false);
          refresh();
        }}
        footer={null}
        className={styles.editPanel}
      >
        <UserEditor
          operator_uid={2}
          user={{ ...emptyBaseInfo(), card_type: '身份证' }}
          onEditComplete={() => {
            refresh();
            setNewuser(false);
          }}
          showUpdate={false}
        />
      </Modal>

      <div style={{ marginBottom: 15 }}>
        <Button
          type="primary"
          onClick={() => {
            setNewuser(true);
          }}
          style={{ marginRight: 12 }}
        >
          新增专家
        </Button>
        <DownloadDocx filename="专家签字表" data={{ data: filterData }} />
      </div>

      <Table
        size="small"
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        onChange={handleChange}
        scroll={{ x: 2200 }}
        style={{ width: 1500 }}
        pagination={{ pageSize: 15 }}
      />
    </Card>
  );
}
