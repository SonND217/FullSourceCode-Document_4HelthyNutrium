import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ModalChangeInfoUser_Summary(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thay đổi thông tin
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Công việc</Form.Label>
            <Form.Control
              type="text"
              placeholder="Công việc:"
              value={props.age}
            />
            <Form.Label>Chiều cao</Form.Label>
            <Form.Control
              type="text"
              placeholder="Chiều cao"
              value={props.cm}
            />
            <Form.Label>Cân nặng</Form.Label>
            <Form.Control type="text" placeholder="Cân nặng" value={props.kg} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={refreshPage}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalChangeInfoUser_Summary;
