import React, { useState } from "react";
import { Input, Button, Form, Modal } from "antd";
const ChangePassword = () => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setModal2Open(true)}>
        Thay đổi mật khẩu
      </Button>
      <Modal
        title="Thay đổi mật khẩu của bạn"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <Form.Item
          label="Nhập mật khẩu cũ"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu hiện tại của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nhập mật khẩu mới"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Modal>
    </>
  );
};
export default ChangePassword;
