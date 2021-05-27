import { Layout, Menu } from 'antd'; // BackTop
import './index.less';
import { HomeOutlined, PlusOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'umi';
import LoginPanel from '@/component/login';
import Footer from './Footer';
import { useMedia } from 'react-use';

import { connect } from 'dva';
import { ICommon, IUserSetting } from '@/models/common';
import classnames from 'classnames';
const { Header, Content, Sider } = Layout;

const { SubMenu, ItemGroup } = Menu;

const ConfigMenuList = [
  {
    title: '标签管理',
    url: '/config/tags',
  },
];

const MenuList = ConfigMenuList.map((item) => (
  <Menu.Item key={item.url}>
    <Link to={item.url}>{item.title}</Link>
  </Menu.Item>
));

const MenuHeader = ({ pathname }: { pathname: string }) => (
  <Header>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} style={{ flex: 1 }}>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="/excel">
        <Link to="/excel">上传数据</Link>
      </Menu.Item>
      <SubMenu key="/config" icon={<SettingOutlined />} title="系统配置">
        {MenuList}
      </SubMenu>
    </Menu>
    <LoginPanel />
  </Header>
);

const LayoutWrapper = ({ children, user }: { children?: React.ReactNode; user: IUserSetting }) => {
  const { pathname } = useLocation();
  const showMenu = !['/invalid'].includes(pathname);
  const isPrint = useMedia('print');
  const isConfigPage = pathname.includes('/config/');

  return (
    <Layout className="layout">
      {!isPrint && showMenu && <MenuHeader pathname={pathname} />}
      {!isConfigPage ? (
        <Content style={{ padding: 24, paddingBottom: 0 }}>{children}</Content>
      ) : (
        <Content className={classnames('configPage')}>
          <Sider className="site-layout-background" width={200}>
            <Menu mode="inline" selectedKeys={[pathname]}>
              <ItemGroup
                title={
                  <div>
                    <SettingOutlined /> 系统配置
                  </div>
                }
              >
                {MenuList}
              </ItemGroup>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', paddingBottom: 0, width: 1280 }}>{children}</Content>
        </Content>
      )}

      {!isPrint && <Footer />}
    </Layout>
  );
};

export default connect(({ common }: { common: ICommon }) => ({
  user: common.userSetting,
}))(LayoutWrapper);
