import React, { useState } from "react";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserAPI from "../../service/Actions/UserAPI";
import AlertMessage from "../alert/AlertMessage";
const { Option } = Select;

const AddNewUser = ({ loadUsers }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  //form Add lấy dữ liệu api từ state này
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dob: "",
    gender: "false", //mặc định là nữ
  });

  // Lấy dữ liệu từ formAdd bằng formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      dob: "",
      ComfirmPassword: "",
    },

    //Regex
    validationSchema: Yup.object({
      name: Yup.string().required("Bạn không được để trống tên tài khoản"),
      // .matches(
      //   /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
      //   "Tên tài khoản chứa 8 - 20 ký tự, không chứa '.' và '_'"
      // ),
      email: Yup.string()
        .required("Bạn không được để trống Email")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Vui lòng nhập đúng định dạng email VD: Name@gmail.com"
        ),
      password: Yup.string()
        .required("Bạn không được để trống password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
          "Mật khẩu tối thiểu 8 - 10 ký tự, ít nhất chứa một chữ cái và một số:"
        ),
      ComfirmPassword: Yup.string()
        .required("Bạn không được để trống nhập lại mật khẩu")
        .oneOf(
          [Yup.ref("password"), null],
          "mật khẩu nhập lại phải trùng với mật khẩu bạn đã nhập"
        ),
      phone: Yup.string()
        .required("Bạn không được để trống số điện thoại")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại gồm 10 số, và bắt đầu bằng số 0"
        ),
      dob: Yup.string()
        .required("Bạn không được để trống ngày sinh")
        .matches(
          /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
          "Ngày sinh phải đúng định dạng DD/MM/YYYY"
        ),
      address: Yup.string().required("Bạn không được để trống địa chỉ"),
    }),
    //Gửi dữ liệu vào form Add
    onSubmit: async (values) => {
      let arr = values.dob.trim().split("/");
      let formattedDob = arr[2] + "-" + arr[1] + "-" + arr[0];

      //formik tự biết khi nhập sai sẽ không submit còn khi đúng hết mới cho submit
      let addData = {
        ...formData,
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        dob: formattedDob,
      };
      setFormData(addData);

      await UserAPI.addNutrient(addData)
        .then((res) => {
          setAlert({ type: "success", message: "Thêm tài khoản thành công" });
          setTimeout(() => setAlert(null), 5000);
          loadUsers();
        })
        .catch((e) => {
          setAlert({
            type: "danger",
            message: e.response
              ? e.response.data.message
              : "Lỗi thêm tài khoản",
          });
          setTimeout(() => setAlert(null), 5000);
        });
    },
  });

  // Lấy giá trị giới tính
  const onChangeGender = (value) => {
    console.log(`selected ${value} - True: Nam/ False: Nữ`);
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    document.getElementById("formAddUser").reset();
    formik.handleReset();
  };
  //Lấy dữ liệu
  // console.log(formData);
  // console.log(formData.gender);
  // console.log(formik.errors.phone);

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined className="plus_add_button" />}
      >
        Thêm tài khoản chuyên gia dinh dưỡng
      </Button>
      <Drawer
        title="Tạo tài khoản chuyên gia dinh dưỡng"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Về Danh Sách</Button>
            <Button
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
              type="primary"
            >
              Tạo tài khoản
            </Button>
          </Space>
        }
      >
        <AlertMessage info={alert} />
        <Form layout="vertical" hideRequiredMark id="formAddUser">
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="name"
                label={
                  <span>
                    Họ và tên
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  name="name"
                  placeholder="Nhập tên của chuyên gia dinh dưỡng ở đây"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <p className="errorMSG">{formik.errors.name}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="email"
                label={
                  <span>
                    Email
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Nhập Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <p className="errorMSG">{formik.errors.email}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                label={
                  <span>
                    Mật khẩu
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input.Password
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <p className="errorMSG">{formik.errors.password}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="ComfirmPassword"
                label={
                  <span>
                    Nhập lại mật khẩu
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input.Password
                  name="ComfirmPassword"
                  placeholder="Nhập lại mật khẩu của bạn"
                  value={formik.values.ComfirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.ComfirmPassword && (
                  <p className="errorMSG">{formik.errors.ComfirmPassword}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="gender"
                label={
                  <span>
                    Giới tính
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Select
                  defaultValue={"false"}
                  onChange={onChangeGender}
                  options={[
                    {
                      value: "false",
                      label: "Nữ",
                    },
                    {
                      value: "true",
                      label: "Nam",
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="phone_number"
                label={
                  <span>
                    Số điện thoại
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  name="phone"
                  placeholder="Nhập Số điện thoại"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && (
                  <p className="errorMSG">{formik.errors.phone}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="address"
                label={
                  <span>
                    Địa chỉ
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Nhập thông tin địa chỉ ở đây"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.errors.address && (
                  <p className="errorMSG">{formik.errors.address}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="dob"
                label={
                  <span>
                    Ngày sinh
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Nhập thông tin ngày sinh ở đây"
                  name="dob"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                />
                {formik.errors.dob && (
                  <p className="errorMSG">{formik.errors.dob}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddNewUser;
