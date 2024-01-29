import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "antd";
import AlertMessage from "../alert/AlertMessage";
import UserAPI from "../../service/Actions/UserAPI";
import DietAPI from "../../service/Actions/DietAPI";
import AuthUtil from "../../service/utils/AuthUtil";
import jwt from "jwt-decode";
import "../../assets/style/common/App.css";
import * as Yup from "yup";

const LoginForm = () => {
  const history = useHistory();
  const [alert, setAlert] = useState(null);
  // Local state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    //regex

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bạn không được để trống email")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Bạn vui lòng nhập đúng định dạng email, ví dụ: email123@gmail.com"
        ),
      password: Yup.string().required("Bạn không được để trống password"),
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
      //   "Mật khẩu tối thiểu 8 - 10 ký tự, ít nhất chứa một chữ cái và một số:"
      // ),
    }),
  });
  const login = async (event) => {
    event.preventDefault();

    await UserAPI.login({
      email: formik.values.email,
      password: formik.values.password,
    })
      .then((res) => {
        localStorage.clear();
        const token = res.data.access_token;
        const user = jwt(token);
        localStorage.setItem("jwt", token);
        if (user.role === "ADMIN") {
          history.push("/user");
          console.log("Account ADMIN");
        }
        // check user to direct
        else if (user.role === "USER") {
          // getting user from db
          AuthUtil.getUserFromToken()
            .then(res => {
              const u = res.data;
              // check user diet existed
              DietAPI.getByUserID(u.id)
                .then(res => {
                  history.push("/recommendation");
                })
                .catch(e => {
                  history.push("/home");
                });
            })
          console.log("Account USER");
        } else {
          history.push("/nutrionexpert/food");
          console.log("Account NUTRIENT");
        }
      })
      .catch((e) => {
        setAlert({ type: "danger", message: "Sai tên đăng nhập/mật khẩu" });
        setTimeout(() => setAlert(null), 5000);
      });
  };

  return (
    <>
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-all">
            <div className="landing-inner-second">
              <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Email:
                    </label>
                    <Input
                      type="text"
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
                  <Form.Group>
                    <label className="formLabel_loginForm_RegisterForm">
                      Mật khẩu:
                    </label>
                    <Input.Password
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
                  <Button
                    variant="success"
                    className="btn_loginForm_1"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Đăng nhập
                  </Button>
                </Form.Group>
              </Form>
              <p>
                <Link to="/register">
                  <Button variant="info" size="sm" className="ml-2">
                    Đăng kí tài khoản mới
                  </Button>
                </Link>
                <Link to="/resetpassword">
                  <Button variant="info" size="sm" className="ml-2">
                    Bạn quên mật khẩu?
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

export default LoginForm;
