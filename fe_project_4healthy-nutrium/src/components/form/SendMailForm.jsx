import { React, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import TestAPI from "../../service/Actions/TestAPI";
import AlertMessage from "../alert/AlertMessage";

const SendMailForm = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const updateInputtedEmail = (event) => setEmail(event.target.value);

  const sendEmail = (event) => {
    event.preventDefault();
    TestAPI.sendEmail(email)
      .then((res) => {
        setAlert({
          type: "success",
          message: "Vui lòng kiểm tra email của bạn",
        });
      })
      .catch((err) => {
        setAlert({ type: "danger", message: err.message });
      });
  };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-all">
          <div className="landing-inner-second">
            <Form onSubmit={sendEmail}>
              <AlertMessage info={alert} />
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    placeholder="Nhập email của bạn"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="form_send_mail"
                    type="text"
                    name="email"
                    required
                    onChange={updateInputtedEmail}
                  />
                  <Button
                    variant="outline-secondary"
                    className="btn_send_mail_register_account"
                  >
                    Gửi link xác thực đến Email
                  </Button>
                </InputGroup>
                <Form.Control
                  placeholder="Nhập link xác thực chúng tôi đã gửi vào mail của bạn"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  className="form_send_mail"
                />
                <Link to="/login">
                  <Button
                    variant="success"
                    className="btn_Next_SendMailForm_1"
                    type="submit"
                  >
                    Đăng nhập
                  </Button>
                </Link>

                {/* <Link to="/register"> */}
                <Button
                  variant="success"
                  className="btn_Next_SendMailForm_2"
                  type="submit"
                >
                  Gửi mã xác nhận đến Email
                </Button>
                {/* </Link> */}
              </Form.Group>
            </Form>
          </div>
          <div className="landing-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default SendMailForm;
