import {
  BrowserRouter,
  Routes,
  Route,
  useHistory,
  useLocation,
  Link,
  Switch,
} from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UserSwitchOutlined,
  DashboardFilled,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import React, { useState } from "react";
import "../../assets/style/admin/style.css";
const { Header, Sider, Content } = Layout;

const SlidebarUser = ({ children }) => {
  useState();
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={isSidebarOpen}
        className="border-1"
        width="300"
      >
        <div className="logo" />
        <Menu
          onClick={({ key }) => {
            history.push(key);
          }}
          theme="white"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={[
            {
              key: "/homeuser/profile",
              icon: <UserOutlined />,
              label: "Hồ Sơ Người Dùng",
            },
            {
              key: "/home",
              icon: <UploadOutlined />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            isSidebarOpen ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setIsSidebarOpen(!isSidebarOpen),
            }
          )}
        </Header>

        <div
          className="site-layout-background"
          style={{
            margin: "10px 16px",
            paddingBottom: "20px",
            minHeight: "auto",
          }}
        >
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default SlidebarUser;
