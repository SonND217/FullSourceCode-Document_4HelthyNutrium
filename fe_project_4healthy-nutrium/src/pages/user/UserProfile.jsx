import React, { useEffect } from "react";
import {
  Modal,
  Button,
  Select,
  Card,
  Form,
  Space,
  Input,
  Row,
  Col,
  Image,
} from "antd";
import { Breadcrumb, Divider } from "antd";
import HeaderUserHasLog from "../../components/header/HeaderHasLog";
import HeaderAdmin from "../../components/header/HeaderAdmin";
import HeaderNutritionExpertManager from "../../components/header/HeaderNutritionExpertManager";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footers from "../../components/footer/footers";
import SlidebarUser from "./SlidbarUser";
import AuthUtil from "../../service/utils/AuthUtil";
import UserAPI from "../../service/Actions/UserAPI";
import DietAPI from "../../service/Actions/DietAPI";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import AlertMessage from "../../../src/components/alert/AlertMessage";

const UserProfile = ({ checkValidRole }) => {
  checkValidRole();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const { Option } = Select;
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisable, setisDisable] = useState(true);
  const [isDisable2, setisDisable2] = useState(true);
  const [alert, setAlert] = useState(null);
  const [resetFormAlert, setResetFormAlert] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const resetPassword = async () => {
    // const resetPasswordForm = {
    const oldPassword = formikResetPassword.values.oldPassword;
    const newPassword = formikResetPassword.values.passwordNew;
    //   cofirmPasswordNew: formikResetPassword.values.cofirmPasswordNew,
    // };
    await UserAPI.checkOldPassword(user.id, [oldPassword])
      .then((res) => {
        const u = user;
        u.password = newPassword;
        UserAPI.updateUser(u)
          .then((res) => {
            setResetFormAlert({
              type: "success",
              message: "Đổi mật khẩu thành công",
            });
            setTimeout(() => setAlert(null), 5000);
          })
          .catch((e) => {
            setResetFormAlert({
              type: "danger",
              message: "Đổi mật khẩu không thành công",
            });
            setTimeout(() => setAlert(null), 5000);
          });
      })
      .catch((e) => {
        setResetFormAlert({
          type: "danger",
          message: "Mật khẩu cũ không đúng",
        });
        setTimeout(() => setAlert(null), 5000);
        return;
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const displayButton = () => {
    var x = document.querySelector("#LuuButton");
    var y = document.querySelector("#HuyButton");
    var a = document.querySelector("#EditButton");
    x.style.display = "block";
    y.style.display = "block";
    a.style.display = "none";
    setisDisable(false);
  };
  const showEditButton = () => {
    var x = document.querySelector("#LuuButton");
    var y = document.querySelector("#HuyButton");
    var a = document.querySelector("#EditButton");
    x.style.display = "none";
    y.style.display = "none";
    a.style.display = "block";
    setisDisable(true);
  };
  const [genderForm, setGenderForm] = useState({
    gender: "true",
  });
  //
  //
  // Nếu mà form đó cần chỉnh sửa thì mới dùng
  //
  //

  // const displayButton2 = () => {
  //   var x = document.querySelector("#LuuButton2");
  //   var y = document.querySelector("#HuyButton2");
  //   var a = document.querySelector("#EditButton2");
  //   x.style.display = "block";
  //   y.style.display = "block";
  //   a.style.display = "none";
  //   setisDisable2(false);
  // };
  // const showEditButton2 = () => {
  //   var x = document.querySelector("#LuuButton2");
  //   var y = document.querySelector("#HuyButton2");
  //   var a = document.querySelector("#EditButton2");
  //   x.style.display = "none";
  //   y.style.display = "none";
  //   a.style.display = "block";
  //   setisDisable2(true);
  // };

  //
  //
  // Giới Tính
  //
  //
  const onChangeGender = (value) => {
    setGenderForm({
      gender: value,
    });
  };

  const formik = useFormik({
    initialValues: {},
    //
    //
    //regex
    //
    //
    validationSchema: Yup.object({
      name: Yup.string().required("Bạn không được để trống tên tài khoản"),
      //   .matches(
      //     /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      //     "Tên chứa 8 - 20 ký tự, không chứa '.' và '_'"
      //   ),
      phone: Yup.string()
        .required("Bạn không được để trống số điện thoại")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại gồm 10 số, và bắt đầu bằng số 0"
        ),
      address: Yup.string().required("Bạn không được để trống địa chỉ"),
    }),
  });
  const formikResetPassword = useFormik({
    initialValues: {
      oldPassword: "",
      passwordNew: "",
      cofirmPasswordNew: "",
    },

    //regex resetpassword
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required("Bạn không được để trống email")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
          "Mật khẩu tối thiểu 8 - 10 ký tự, ít nhất chứa một chữ cái và một số:"
        ),
      passwordNew: Yup.string()
        .required("Bạn không được để trống mật khẩu mới")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
          "Mật khẩu tối thiểu 8 - 10 ký tự, ít nhất chứa một chữ cái và một số:"
        ),
      cofirmPasswordNew: Yup.string()
        .required("Bạn không được để trống nhập lại mật khẩu mới")
        .oneOf(
          [Yup.ref("passwordNew"), null],
          "mật khẩu nhập lại phải trùng với mật khẩu bạn đã nhập"
        ),
    }),
  });

  useEffect(async () => {
    const u = AuthUtil.getUserFromToken();
    if (u === null) {
      history.push("/login");
    } else {
      await u.then((res) => {
        formik.setValues(res.data);
        setUser(res.data);
      });
    }
  }, []);

  const editProfile = () => {
    const userData = formik.values;
    userData.name = userData.name.trim();
    userData.phone = userData.phone.trim();
    userData.address = userData.address.trim();

    UserAPI.updateUser(userData)
      .then((res) => {
        setAlert({ type: "success", message: "Cập nhật thành công" });
        setTimeout(() => setAlert(null), 5000);
      })
      .catch((e) => {
        setAlert({
          type: "danger",
          message: e.response
            ? e.response.data.message
            : "Lỗi cập nhật tài khoản",
        });
        setTimeout(() => setAlert(null), 5000);
      });
  };

  return (
    <div>
      <HeaderUserHasLog user={user}></HeaderUserHasLog>
      <div className="wrapper-userProfile">
        <Breadcrumb
          style={{
            paddingLeft: "10px",
            paddingTop: "5px",
            paddingBottom: "10px",
          }}
        >
          <Breadcrumb.Item>
            <a href="">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Hồ sơ và bảo mật</Breadcrumb.Item>
        </Breadcrumb>
        <Divider plain>Thông tin cá nhân</Divider>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={4}></Col>
            <Col span={16}>
              <Form>
                <AlertMessage style="height:100px" info={alert} />
                <Form.Item label="Tên của bạn">
                  <Input
                    placeholder="input placeholder"
                    disabled={isDisable}
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && (
                    <p className="errorMSG">{formik.errors.name}</p>
                  )}
                </Form.Item>
                {/* Ngày sinh và Email không được sửa */}
                <Form.Item label="Ngày sinh của bạn">
                  <Input
                    placeholder="input placeholder"
                    value={moment(formik.values.dob).format("DD/MM/YYYY")}
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item label="Email của bạn">
                  <Input
                    placeholder="input placeholder"
                    value={formik.values.email}
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item name="Giới tính" label="Giới tính">
                  <Select
                    defaultValue={true}
                    onChange={onChangeGender}
                    options={[
                      {
                        value: true,
                        label: "Nam",
                      },
                      {
                        value: false,
                        label: "Nữ",
                      },
                    ]}
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item label="Số điện thoại của bạn:">
                  <Input
                    name="phone"
                    placeholder="input placeholder"
                    disabled={isDisable}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && (
                    <p className="errorMSG">{formik.errors.phone}</p>
                  )}
                </Form.Item>
                <Form.Item label="Địa chỉ của bạn:">
                  <Input
                    placeholder="Nhập thông tin địa chỉ ở đây"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    disabled={isDisable}
                  />
                  {formik.errors.address && (
                    <p className="errorMSG">{formik.errors.address}</p>
                  )}
                </Form.Item>
                <Space size={3}>
                  <Button
                    type="primary"
                    id="EditButton"
                    onClick={displayButton}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    type="primary"
                    onClick={editProfile}
                    id="LuuButton"
                    style={{ display: "none" }}
                    disabled={!formik.isValid}
                  >
                    Lưu
                  </Button>
                  <Button
                    type="primary"
                    id="HuyButton"
                    style={{ display: "none" }}
                    onClick={showEditButton}
                  >
                    Huỷ
                  </Button>
                </Space>
              </Form>
              <Button
                type="primary"
                onClick={showModal}
                style={{ float: "right" }}
              >
                Thay đổi mật khẩu
              </Button>
            </Col>
          </Row>
        </Form>
        {/* <Divider plain></Divider>
         <Form layout="vertical">
          <Row gutter={24}>
            <Col span={4}><br></br> </Col>
            <Col span={16}><br></br> </Col>
          </Row>
        </Form> */}

        <Modal
          title="Thay đổi mật khẩu"
          open={isModalOpen}
          onOk={resetPassword}
          onCancel={handleCancel}
          okText={"Xác Nhận"}
          cancelText={"Huỷ"}
        >
          <Form {...layout}>
            <AlertMessage style="height:100px" info={resetFormAlert} />
            <Form.Item label="Nhập mật khẩu cũ" name="OldPassword">
              <Input.Password
                name="oldPassword"
                value={formikResetPassword.values.oldPassword}
                onChange={formikResetPassword.handleChange}
              />
              {formikResetPassword.errors.oldPassword && (
                <p className="errorMSG">
                  {formikResetPassword.errors.oldPassword}
                </p>
              )}
            </Form.Item>

            <Form.Item label="Nhập mật khẩu mới" name="passwordNew">
              <Input.Password
                name="passwordNew"
                placeholder="Nhập mật khẩu của bạn"
                value={formikResetPassword.values.passwordNew}
                onChange={formikResetPassword.handleChange}
              />
              {formikResetPassword.errors.passwordNew && (
                <p className="errorMSG">
                  {formikResetPassword.errors.passwordNew}
                </p>
              )}
            </Form.Item>

            <Form.Item label="Nhập mật khẩu mới" name="cofirmPasswordNew">
              <Input.Password
                name="cofirmPasswordNew"
                placeholder="Nhập mật khẩu của bạn"
                value={formikResetPassword.values.cofirmPasswordNew}
                onChange={formikResetPassword.handleChange}
              />

              {formikResetPassword.errors.cofirmPasswordNew && (
                <p className="errorMSG">
                  {formikResetPassword.errors.cofirmPasswordNew}
                </p>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Footers></Footers>
    </div>
  );
};

export default UserProfile;
