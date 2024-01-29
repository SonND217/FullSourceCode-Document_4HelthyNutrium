import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlertMessage from "../alert/AlertMessage";
import { DatePicker, Radio, Input } from "antd";
import UserAPI from "../../service/Actions/UserAPI";
import Moment from "moment";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      address: "",
      phoneNumber: "",
      ValidEmail: "",
      ReEnterPassword: "",
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
        .required("Bạn không được để trống mật khẩu")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
          "Mật khẩu tối thiểu 8 - 10 ký tự, ít nhất chứa một chữ cái và một số:"
        ),
      username: Yup.string().required("Bạn không được để trống tên tài khoản"),
      address: Yup.string().required("Bạn không được để trống địa chỉ"),
      date: Yup.string()
        .required("Bạn không được để trống ngày sinh")
        .matches(
          /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
          "Ngày sinh phải đúng định dạng Năm-tháng-Ngày VD: 2000-07-01"
        ),
      ReEnterPassword: Yup.string()
        .required("Bạn không được để trống nhập lại mật khẩu")
        .oneOf(
          [Yup.ref("password"), null],
          "mật khẩu nhập lại phải trùng với mật khẩu bạn đã nhập"
        ),
      phoneNumber: Yup.string()
        .required("Bạn không được để trống số điện thoại")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại gồm 10 số, và bắt đầu bằng số 0"
        ),
      ValidEmail: Yup.string().required(
        "Bạn không được để trống Mã xác thực email"
      ),
    }),
  });
  //Date
  const [dateValue, setDate] = useState(false);
  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    dob: "",
    phone: "",
    gender: "false",
    code: "",
  });
  // const { username, password, name, address, dob, phone, gender } =
  //   registerForm;

  const [alert, setAlert] = useState(null);

  // function onSelectDate(dateValue, dateString) {
  //   let dateParts = dateString.split("/");
  //   let date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  //   let dateStr = Moment(date).format("yyyy-MM-DD");

  //   setDate(dateStr);
  //   setRegisterForm({
  //     ...registerForm,
  //     dob: dateStr,
  //   });
  // }
  // //password
  // const [confirmPassword, setConfirmPassword] = useState(false);
  // const onChangePassInput = (e) => {
  //   setConfirmPassword(e.target.value);
  // };

  // Gender
  const onChangeGender = (e) => {
    console.log(`radio checked:${e.target.value}`);
    setRegisterForm({
      ...registerForm,
      gender: e.target.value,
    });
  };

  // const onChangeRegisterForm = (event) =>
  //   setRegisterForm({
  //     ...registerForm,
  //     [event.target.name]: event.target.value,
  //   });

  // const checkIput = () => {
  //   let check = true;
  //   if (formik.values.password !== formik.) {
  //     setAlert({
  //       type: "danger",
  //       message: "Vui lòng nhập 2 mật khẩu giống nhau",
  //     });
  //     setTimeout(() => setAlert(null), 5000);
  //     check = false;
  //   }
  //   return check;
  // };

  async function sendEmail() {
    let email = formik.values.email;
    if (email !== "") {
      let user = await UserAPI.getByEmail([email])
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          return null;
        });

      if (user) {
        setAlert({
          type: "danger",
          message: "Vui lòng nhập email chưa đăng ký",
        });
        setTimeout(() => setAlert(null), 5000);
      } else {
        UserAPI.sendRegisterCode([email])
          .then((res) => {
            console.log("res ", res.data);
            setAlert({ type: "success", message: res.data });
            setTimeout(() => setAlert(null), 5000);
          })
          .catch((e) => {
            setAlert({
              type: "danger",
              message: e.response ? e.response.data.message : "Lỗi gửi email",
            });
            setTimeout(() => setAlert(null), 5000);
          });
      }
    }
  }

  const register = async (event) => {
    event.preventDefault();
    console.log(
      "inputted Data = " +
        JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
          name: formik.values.username,
          address: formik.values.address,
          dob: formik.values.date,
          phone: formik.values.phoneNumber,
          gender: registerForm.gender,
          code: formik.values.ValidEmail,
        })
    );

    // if (!checkIput()) {
    //   return;
    // }

    // call api lấy email từ code
    let email = await UserAPI.getRegisterUser(formik.values.ValidEmail)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        setAlert({ type: "danger", message: e.response.data.message });
        setTimeout(() => setAlert(null), 5000);
        return null;
      });

    // lấy đc email từ code
    if (email) {
      let inputtedEmail = formik.values.email;
      // check email từ code có trùng vs email nhập
      if (email !== inputtedEmail) {
        console.log("Mã xác thực không dành cho email " + inputtedEmail);
        setAlert({
          type: "danger",
          message: "Mã xác thực không dành cho email " + inputtedEmail,
        });
        setTimeout(() => setAlert(null), 5000);
        return;
      }
      // add user
      UserAPI.addUser({
        email: formik.values.email,
        password: formik.values.password,
        name: formik.values.username,
        address: formik.values.address,
        dob: formik.values.date,
        phone: formik.values.phoneNumber,
        gender: registerForm.gender,
        code: formik.values.ValidEmail,
      })
        .then((res) => {
          setAlert({
            type: "success",
            message: "Đăng kí tài khoản thành công",
          });
          setTimeout(() => setAlert(null), 5000);
        })
        .catch((e) => {
          setAlert({
            type: "danger",
            message: e.response
              ? e.response.data.message
              : "Lỗi đăng kí tài khoản",
          });
          setTimeout(() => setAlert(null), 5000);
        });
    }
    // không lấy đc email từ code
    else {
      return;
    }
  };

  return (
    <>
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-all">
            <div className="landing-inner-second_register">
              <Form className="my-4_register" onSubmit={register}>
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
                    <Button className="btn_sendEmail" onClick={sendEmail}>
                      Gửi mã xác thực
                    </Button>
                  </InputGroup>
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Mã xác thực Email{" "}
                      <p style={{ color: "red", display: "inline" }}> * </p>:
                    </label>
                    <Input
                      type="text"
                      placeholder="Mã xác thực email"
                      name="ValidEmail"
                      required
                      onChange={formik.handleChange}
                      className="form_login_register"
                    />
                    {formik.errors.ValidEmail && (
                      <p className="errorMSG">{formik.errors.ValidEmail}</p>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Mật khẩu{" "}
                      <p style={{ color: "red", display: "inline" }}> * </p>:
                    </label>
                    <Input.Password
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                      value={formik.values.password}
                      required
                      onChange={formik.handleChange}
                      className="form_login_register"
                    />
                    {formik.errors.password && (
                      <p className="errorMSG">{formik.errors.password}</p>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Nhập lại mật khẩu{" "}
                      <p style={{ color: "red", display: "inline" }}> * </p>:
                    </label>
                    <Input.Password
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      name="ReEnterPassword"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.passwordNew}
                      className="form_login_register"
                    />
                    {formik.errors.ReEnterPassword && (
                      <p className="errorMSG">
                        {formik.errors.ReEnterPassword}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Họ và Tên{" "}
                      <p style={{ color: "red", display: "inline" }}> * </p>:
                    </label>
                    <Input
                      type="text"
                      placeholder="Tên của bạn"
                      name="username"
                      required
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      className="form_login_register"
                    />
                    {formik.errors.username && (
                      <p className="errorMSG">{formik.errors.username}</p>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Địa chỉ{" "}
                      <p style={{ color: "red", display: "inline" }}> * </p>:
                    </label>
                    <Input
                      type="text"
                      placeholder="Địa chỉ"
                      value={formik.values.address}
                      name="address"
                      required
                      onChange={formik.handleChange}
                      className="form_login_register"
                    />
                    {formik.errors.address && (
                      <p className="errorMSG">{formik.errors.address}</p>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Số điện thoại{" "}
                      <p style={{ color: "red", display: "inline" }}> * </p>:
                    </label>
                    <Input
                      type="text"
                      placeholder="Số điện thoại"
                      value={formik.values.phoneNumber}
                      name="phoneNumber"
                      required
                      onChange={formik.handleChange}
                      className="form_login_register"
                    />
                    {formik.errors.phoneNumber && (
                      <p className="errorMSG">{formik.errors.phoneNumber}</p>
                    )}
                  </Form.Group>
                  <label className="formLabel_loginForm_RegisterForm">
                    Ngày sinh{" "}
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </label>
                  <Input
                    // defaultValue={moment("01/01/2000", "DD/MM/YYYY")}
                    type="text"
                    name="date"
                    placeholder="Ngày sinh của bạn"
                    value={formik.values.date}
                    // style={{ width: "100%" }}
                    // format={"DD/MM/YYYY"}
                    required
                    onChange={formik.handleChange}
                    className="form_login_register"
                  />
                  {formik.errors.date && (
                    <p className="errorMSG">{formik.errors.date}</p>
                  )}
                </Form.Group>

                <Form.Group>
                  <label className="formLabel_loginForm_RegisterForm">
                    Giới tính{" "}
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </label>
                  <Radio.Group
                    onChange={onChangeGender}
                    defaultValue="false"
                    preventDefault="Female"
                    size="large"
                  >
                    <Radio.Button
                      className="radio_registerGender"
                      value="false"
                    >
                      Nữ
                    </Radio.Button>
                    <Radio.Button className="radio_registerGender" value="true">
                      Nam
                    </Radio.Button>
                  </Radio.Group>
                </Form.Group>

                {/* <Button
                  variant="success"
                  className="btn_SendEmail_Register"
                  onClick={sendEmail}
                >
                  Gửi mã xác thực Email
                </Button> */}
                <Button
                  variant="success"
                  className="btn_register"
                  type="submit"
                >
                  Đăng kí
                </Button>
              </Form>
              <p>
                Bạn đã có tài khoản?
                <Link to="/login">
                  <Button variant="info" size="sm" className="ml-2">
                    Login
                  </Button>
                </Link>
              </p>
            </div>
            <div className="landing-inner"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
