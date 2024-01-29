import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
const ModalDeleteListUser = () => {
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
        Vô hiệu hoá
      </Button>
      <Modal
        title="Lý do tài khoản này bị vô hiệu hoá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="Lý do xoá tài khoản này?" />
      </Modal>
    </>
  );
};
export default ModalDeleteListUser;
