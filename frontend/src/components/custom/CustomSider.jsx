import { useState } from 'react';
import {
  Grid,
  CanAccess,
  Menu,
  AntdLayout,
  useTitle,
  useRouterContext,
  useMenu,
  useLogout,
  Icons,
  useGetIdentity,
} from '@pankod/refine';
import { logoutAuth } from 'pages/loginpage/LoginService';
import { useDispatch, useSelector } from 'react-redux';

export const CustomSider = () => {
  const Title = useTitle();
  const { menuItems, selectedKey } = useMenu();
  const [collapsed, setCollapsed] = useState(false);
  const { Link } = useRouterContext();
  const breakpoint = Grid.useBreakpoint();
  const { data: identity } = useGetIdentity();

  const renderTreeView = (tree, selectedKey) => {
    return tree.map((item) => {
      const { label, route, name } = item;
      const isSelected = route === selectedKey;
      var auth = true;
      if (identity !== 'Admin' && label !== 'Dashboard') auth = false;
      return (
        <CanAccess key={route} resource={name.toLowerCase()}>
          {auth && (
            <Menu.Item
              key={route}
              style={{
                fontWeight: isSelected ? 'bold' : 'normal',
                background: isSelected ? '#A8DE5D' : 'rgb(229 255 193)'
              }}
              icon={
                label === 'Dashboard' ? (
                  <Icons.HomeOutlined style={{ color: 'black', fontSize: 18, marginBottom: 4 }} />
                ) : (
                  <Icons.UnorderedListOutlined
                    style={{ color: 'black', fontSize: 18, marginBottom: 2 }}
                  />
                )
              }
            >
              <Link
                style={{ color: 'black', fontSize: 18 }}
                to={route}
              >
                {label.split('/')[0]}
              </Link>
              {/* {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )} */}
            </Menu.Item>
          )}
        </CanAccess>
      );
    });
  };

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth.login);
  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    const token = currentUser.access;
    await logoutAuth(token, dispatch);
    logout();
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      breakpoint="lg"
      style={{ background: 'rgb(229 255 193)' }}
    >
      <Title collapsed={collapsed} />
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
        style={{ paddingTop: 40 }}
      >
        {renderTreeView(menuItems, selectedKey)}
        <Menu.Item
          key="logout"
          onClick={handleLogout}
          icon={<Icons.LogoutOutlined style={{ fontSize: 18 }} />}
          style={{ color: 'black', fontSize: 18 }}
        >
          Sign Out
        </Menu.Item>
      </Menu>
    </AntdLayout.Sider>
  );
};
