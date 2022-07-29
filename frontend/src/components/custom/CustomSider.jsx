import { useState } from "react";
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
} from "@pankod/refine";

export const CustomSider= () => {
    const Title = useTitle();
    const { Link } = useRouterContext();
    const { menuItems, selectedKey } = useMenu();

    const [collapsed, setCollapsed] = useState(false);

    const breakpoint = Grid.useBreakpoint();

    const RenderToTitle = Title;

    const renderTreeView = (tree, selectedKey) => {
        return tree.map((item) => {
            const { label, route, name } = item;
            const isSelected = route === selectedKey;
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={<Icons.UnorderedListOutlined />}
                    >
                        <Link to={route}>{label.split("/")[0]}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

    const { mutate: logout } = useLogout();

    return (
        <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed)=> setCollapsed(collapsed)}
            breakpoint="lg"
        >
            <RenderToTitle collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {renderTreeView(menuItems, selectedKey)}
                <Menu.Item
                    key="logout"
                    onClick={() => logout()}
                    icon={<Icons.LogoutOutlined />}
                >
                    Sign Out
                </Menu.Item>
            </Menu>
        </AntdLayout.Sider>
    );
};