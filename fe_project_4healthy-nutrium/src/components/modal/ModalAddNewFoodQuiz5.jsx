import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "antd";
const ModalAddNewFoodQuiz5 = () => {
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
      <Button
        className="btn-addmore_typeFood"
        type="primary"
        onClick={showModal}
      >
        Thêm loại món ăn khác
      </Button>
      <Modal
        title="Thêm loại món ăn khác"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={"Huỷ"}
        okText={"Thêm mới"}
      >
        <Form.Label>Thêm loại món của bạn</Form.Label>
        <Form.Control />
      </Modal>
    </>
  );
};
export default ModalAddNewFoodQuiz5;
