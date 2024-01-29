import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const ModalViewInfomationUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Xem thông tin
      </Button>
      <Modal
        title="Thông tin tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        okText={"Xác nhận"}
        cancelText={"Huỷ"}
      >
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue="email@example.com"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Tên người dùng
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Tên người dùng" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Loại tài khoản
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Loại tài khoản" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Địa chỉ
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Địa chỉ" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Số điện thoại
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Số điện thoại" />
            </Col>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};
export default ModalViewInfomationUser;
