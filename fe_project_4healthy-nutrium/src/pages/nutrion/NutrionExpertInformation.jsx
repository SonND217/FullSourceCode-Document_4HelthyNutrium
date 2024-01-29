import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import moment from "moment";

const NutrionExpertInformation = ({user}) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="" value={user.email} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tên của bạn</Form.Label>
        <Form.Control type="text" placeholder="" value={user.name} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Số điện thoại</Form.Label>
        <Form.Control type="text" placeholder="" value={user.phone} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ngày sinh</Form.Label>
        <Form.Control type="text" placeholder="" value={moment(user.dob).format("DD/MM/yyyy")} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Địa chỉ</Form.Label>
        <Form.Control type="text" placeholder="" value={user.address} />
      </Form.Group>
    </Form>
  );
};
export default NutrionExpertInformation;
