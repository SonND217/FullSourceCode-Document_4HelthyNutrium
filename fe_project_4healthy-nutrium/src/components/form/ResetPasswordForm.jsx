import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Input } from "antd";
import UserAPI from "../../service/Actions/UserAPI";
import AlertMessage from "../alert/AlertMessage";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";

const ResetPasswordForm = () => {
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   password2: "",
  //   code: "",
  // });
  const [alert, setAlert] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password2: "",
      code: "",
    },

    //regex

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bạn không được để trống email")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Bạn vui lòng nhập đúng định dạng email, ví dụ: email123@gmail.com"
        ),
      password: Yup.string()
        .required("Bạn không được để trống password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
          "Mật khẩu tối thiểu 8 - 10 ký tự, ít nhất chứa một chữ cái và một số:"
        ),
      password2: Yup.string()
        .required("Bạn không được để trống password")
        .required("Bạn không được để trống nhập lại mật khẩu")
        .oneOf(
          [Yup.ref("password"), null],
          "mật khẩu nhập lại phải trùng với mật khẩu bạn đã nhập"
        ),
      code: Yup.string().required(
        "Chúng tôi đã gửi mã xác nhận vào mail bạn, bạn hãy kiểm tra mail và sao chép mã xác thực và điền vào chỗ trống này!!"
      ),
    }),
  });
  // const updateForm = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  async function getUserByEmail(email) {
    return await UserAPI.getByEmail(email)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return null;
      });
  }

  async function sendMail() {
    let email = formik.values.email;
    if (email !== "") {
      // get user by email
      let user = getUserByEmail([email]);

      // email đã đki
      if (user) {
        // gửi mail
        UserAPI.sendForgotCode([email])
          .then((res) => {
            setAlert({ type: "success", message: res.data });
            setTimeout(() => setAlert(null), 5000);
          })
          .catch((e) => {
            setAlert({
              type: "danger",
              message: e.response
                ? e.response.data.message
                : "Lỗi gửi mã xác nhận email",
            });
            setTimeout(() => setAlert(null), 5000);
          });
      }
      // email chưa đki
      else {
        setAlert({ type: "danger", message: "Vui lòng nhập email đã đăng ký" });
        setTimeout(() => setAlert(null), 5000);
      }
    }
  }

  const checkInput = () => {
    let check = true;

    if (formik.values.password !== formik.values.password2) {
      setAlert({
        type: "danger",
        message: "Vui lòng nhập 2 mật khẩu giống nhau",
      });
      setTimeout(() => setAlert(null), 5000);
      check = false;
    }
    return check;
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!checkInput()) {
      return;
    }

    // call api get user từ code
    let user = await UserAPI.getForgotUser(formik.values.code)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        setAlert({ type: "danger", message: "Mã không hợp lệ" });
        setTimeout(() => setAlert(null), 5000);
        return null;
      });

    // lấy đc user từ code
    if (user) {
      let inputtedEmail = formik.values.email;
      // check email từ code có trùng vs email nhập
      if (user.email !== inputtedEmail) {
        setAlert({
          type: "danger",
          message: "Mã xác thực không dành cho email " + inputtedEmail,
        });
        setTimeout(() => setAlert(null), 5000);
        return;
      }
      user.password = formik.values.password;
      console.log(JSON.stringify(user));
      // đổi mật khẩu
      UserAPI.updateUser(user)
        .then((res) => {
          setAlert({ type: "success", message: "Đổi mật khẩu thành công" });
          setTimeout(() => setAlert(null), 5000);
        })
        .catch((e) => {
          setAlert({
            type: "danger",
            message: e.response ? e.response.data.message : "Lỗi đổi mật khẩu",
          });
          setTimeout(() => setAlert(null), 5000);
        });
    }
    // không lấy đc user từ code
    else {
      return;
    }
  };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-all">
          <div className="landing-inner-second">
            <Form className="my-4" onSubmit={changePassword}>
              <AlertMessage info={alert} />
              <Form.Group>
                <InputGroup className="mb-3">
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Email{" "}
                      <p style={{ color: "red", display: "inline" }}> * </p>:
                    </label>
                    <Input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formik.values.email}
                      required
                      onChange={formik.handleChange}
                      className="form_login_register"
                    />
                    {formik.errors.email && (
                      <p className="errorMSG">{formik.errors.email}</p>
                    )}
                  </Form.Group>
                  <Button
                    className="btn_sendEmail_resetPassword"
                    onClick={sendMail}
                  >
                    Gửi mã xác thực
                  </Button>
                </InputGroup>
                <Form.Group>
                  <label className="formLabel_loginForm_RegisterForm">
                    Mã xác thực Email của bạn{" "}
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </label>
                  <Input
                    placeholder="Nhập mã xác thực email"
                    className="form_send_mail"
                    type="text"
                    name="code"
                    required
                    value={formik.values.code}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.code && (
                    <p className="errorMSG">{formik.errors.code}</p>
                  )}
                </Form.Group>
                <Form.Group>
                  <label className="formLabel_loginForm_RegisterForm">
                    Mật khẩu mới{" "}
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </label>
                  <Input.Password
                    placeholder="Nhập mật khẩu mới của bạn"
                    className="form_send_mail"
                    type="password"
                    name="password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && (
                    <p className="errorMSG">{formik.errors.password}</p>
                  )}
                </Form.Group>
                <Form.Group>
                  <label className="formLabel_loginForm_RegisterForm">
                    Nhập lại mật khẩu mới{" "}
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </label>
                  <Input.Password
                    placeholder="Nhập mật khẩu mới của bạn lần nữa"
                    className="form_send_mail"
                    type="password"
                    name="password2"
                    required
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password2 && (
                    <p className="errorMSG">{formik.errors.password2}</p>
                  )}
                </Form.Group>

                {/* <Button
                  variant="success"
                  className="btn_Return_ResetPasswordForm"
                  onClick={sendMail}
                >
                  Gửi mã xác thực Email
                </Button> */}
                <Button
                  variant="success"
                  className="btn_Next_SendMailForm_2"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Group>
            </Form>
            <p>
              Bạn đã có tài khoản?
              <a href="/login">
                <button type="button" class="ml-2 btn btn-info btn-sm">
                  Login
                </button>
              </a>
            </p>
          </div>
          <div className="landing-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
