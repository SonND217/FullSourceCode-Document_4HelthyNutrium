import React from "react";
import { Card, Space, Button, Form, Input, Row, Col, Image } from "antd";
import HeaderUserHasLog from "../../components/header/HeaderHasLog";
import Footers from "../../components/footer/footers";
import { Breadcrumb, Divider } from "antd";
const UserChangePass = () => {
  return (
    <div>
      <HeaderUserHasLog></HeaderUserHasLog>
      <div className="site-card-wrapper">
        <Breadcrumb
          style={{
            paddingLeft: "10px",
            paddingTop: "5px",
            paddingBottom: "10px",
          }}
        >
          <Breadcrumb.Item>
            <a href="">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Bảo mật</Breadcrumb.Item>
        </Breadcrumb>
        <Divider plain>Bảo mật</Divider>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={4}></Col>
            <Col span={16}>
              <Form.Item label="Mật khẩu cũ:">
                <Input type="password" placeholder="nhập mật khẩu hiện tại" />
              </Form.Item>
              <Form.Item label="Mật khẩu mới:">
                <Input
                  type="password"
                  placeholder="nhập mật khẩu mới của bạn"
                />
              </Form.Item>
              <Form.Item label="Nhập lại mật khẩu mới:">
                <Input
                  type="password"
                  placeholder="nhập lại mật khẩu mới bạn vừa điền"
                />
              </Form.Item>
              <Button type="primary">Đổi mật khẩu</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Footers></Footers>
    </div>
  );
};

export default UserChangePass;
