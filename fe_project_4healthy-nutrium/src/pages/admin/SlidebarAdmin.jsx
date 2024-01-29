import { useHistory, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import "../../assets/style/admin/style.css";
const { Header, Sider } = Layout;

const Slidebar = ({ children }) => {
  useState();
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function refreshPage() {
    window.parent.location = window.parent.location.href;
  }

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  }

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
              key: "/user",
              icon: <UserSwitchOutlined />,
              label: "Danh sách người dùng",
            },
            {
              key: "/home",
              icon: <UploadOutlined />,
              label: (
                <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                  Đăng xuất
                </a>
              ),
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

export default Slidebar;
