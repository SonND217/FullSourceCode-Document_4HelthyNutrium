import {
  Table,
  Tag,
  Image,
  Popconfirm,
  Breadcrumb,
  Modal,
  Input,
  Card,
  Row,
  Col,
  Statistic,
  Button,
} from "antd";
import React, { useState, useEffect } from "react";
import HeaderLayout from "../../components/header/HeaderAdmin";
import AddNewUser from "../../components/drawn/AddNewUser";
import "../../assets/style/admin/style.css";
import Slidebar from "./SlidebarAdmin";
import ModalDeleteListUser from "../../components/modal/ModalDeleteListUser";
import ModalViewInfomationUser from "../../components/modal/ModalViewInfomationUser";
import imageUserOfListUser from "../../assets/image/Img_User.png";
import UserAPI from "../../service/Actions/UserAPI";
import AlertMessage from "../../../src/components/alert/AlertMessage";
import Moment from "moment";

const ListUser = ({ user, checkValidRole }) => {
  checkValidRole();
  const [userList, setUserList] = useState([]);
  const [deactiveID, setDeactiveID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const deactive = async (deactiveID) => {
    await UserAPI.deactive(deactiveID)
      .then((res) => {
        setAlert({
          type: "success",
          message: "Cập nhật trạng thái tài khoản thành công",
        });
        setTimeout(() => setAlert(null), 5000);
        loadUsers();
      })
      .catch((e) => {
        setAlert({
          type: "danger",
          message: e.response
            ? e.response.data.message
            : "Lỗi cập nhật trạng thái tài khoản",
        });
        setTimeout(() => setAlert(null), 5000);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const loadUsers = async () => {
    await UserAPI.getAll().then((res) => {
      setUserList(res.data);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const valueNutriExpert = userList.map(
    (listUserNutritionExpert) => listUserNutritionExpert.role.name
  );
  var sizeRoleNutritionExpertUser = 0;
  var sizeRoleAdmin = 0;
  var sizeRoleUser = 0;
  const RoleList = Object.values(valueNutriExpert);
  RoleList.forEach((RoleList) => {
    if (RoleList === "NUTRIENT_EXPERT") {
      sizeRoleNutritionExpertUser++;
    }
    if (RoleList === "ADMIN") {
      sizeRoleAdmin++;
    }
    if (RoleList === "USER") {
      sizeRoleUser++;
    }
  });

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      justify: "center",
    },
    // {
    //   title: "Ảnh Người Dùng",
    //   dataIndex: "image_user",
    //   render: () => (
    //     <>
    //       <Image width={50} src={imageUserOfListUser} />
    //     </>
    //   ),
    // },
    {
      title: "Email",
      dataIndex: "email",
      justify: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address_user",
      justify: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "Birth_Of_Date",
      justify: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber_user",
      justify: "center",
    },
    {
      title: "Vai trò",
      dataIndex: "roleUser",
      justify: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      justify: "center",
      render: (status) => (
        <>
          {!status ? (
            <Tag color="red">Vô hiệu hoá</Tag>
          ) : (
            <Tag color="green">Đã kích hoạt </Tag>
          )}
          {/* {status && <Tag color="green">Đã kích hoạt </Tag>} */}
        </>
      ),
    },
    // {
    //   title: "Thông tin khác",
    //   dataIndex: "role",
    //   justify: "center",
    // },
    {
      title: "Hành động",
      fixed: "right",
      dataIndex: "",
      render: (_, record) => (
        <Button
          // type="primary"
          onClick={() => {
            deactive(record.key);
          }}
          style={{ backgroundColor: "green", border: "none", color: "white" }}
        >
          Vô hiệu hóa/Kích hoạt
        </Button>
      ),
      justify: "center",
    },
  ];

  useEffect(() => {
    const arr = [];
    userList.map((userList) =>
      arr.push({
        key: userList.id,
        email: userList.email,
        name: userList.name,
        address_user: userList.address,
        Birth_Of_Date: Moment(userList.dob).format("DD/MM/yyyy"),
        phoneNumber_user: userList.phone,
        roleUser:
          userList.role.name === "NUTRIENT_EXPERT"
            ? "Chuyên gia dinh dưỡng"
            : userList.role.name === "ADMIN"
            ? "Quản Trị Viên"
            : userList.role.name === "USER"
            ? "Người Dùng"
            : null,
        status: userList.status,
      })
    );
    console.log("arr=", arr);
    setData(arr);
  }, [userList]);

  const [data, setData] = useState([]);
  // userList
  //   ? userList.map((userList) =>
  //     data.push({
  //       key: userList.id,
  //       email: userList.email,
  //       name: userList.name,
  //       address_user: userList.address,
  //       Birth_Of_Date: Moment(userList.dob).format("DD/MM/yyyy"),
  //       phoneNumber_user: userList.phone,
  //       roleUser:
  //         userList.role.name === "NUTRIENT_EXPERT"
  //           ? "Chuyên gia dinh dưỡng"
  //           : userList.role.name === "ADMIN"
  //             ? "Quản Trị Viên"
  //             : userList.role.name === "USER"
  //               ? "Người Dùng"
  //               : null,
  //       status: userList.status,
  //     })
  //   )
  //   : console.log("error");

  // In xem đang xoá ở hàng có ID nào
  console.log(deactiveID);
  // Tìm kiếm người dùng
  const { Search } = Input;
  const onSearch = async (key) => {
    if (key) {
      await UserAPI.getSearched(key.trim()).then((res) => {
        setUserList(res.data);
      });
    } else {
      loadUsers();
    }
  };
  return (
    <div>
      <HeaderLayout title={"Trang quản trị viên"} user={user}></HeaderLayout>

      <Slidebar>
        {/* đường dẫn */}
        <Breadcrumb
          style={{
            paddingLeft: "10px",
            paddingTop: "5px",
            paddingBottom: "10px",
            marginTop: "10px",
          }}
        >
          <Breadcrumb.Item>
            <a href="">Trang quản trị viên</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách người dùng</Breadcrumb.Item>
        </Breadcrumb>
        <AlertMessage info={alert}></AlertMessage>
        <Card bordered={false} className="border-1">
          <Row gutter={24}>
            <Col span={6}>
              <Statistic
                title="Số lượng tài khoản"
                value={userList.length}
                precision={0}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Số lượng chuyên gia phân tích"
                value={sizeRoleNutritionExpertUser}
                precision={0}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Số lượng quản trị viên"
                value={sizeRoleAdmin}
                precision={0}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Số lượng người dùng"
                value={sizeRoleUser}
                precision={0}
              />
            </Col>
          </Row>
        </Card>
        <div className="wrapper__listUser">
          <div className="add_new_user__listUser">
            <AddNewUser loadUsers={loadUsers}></AddNewUser>
          </div>
          <div className="search_user___listUser">
            <Search
              placeholder="Nhập tên/email người dùng cần tìm"
              allowClear
              enterButton="Tìm Kiếm"
              size="large"
              onSearch={onSearch}
              className="admin_search_button"
            />
          </div>
        </div>
        {/* vô hiệu hoá tài khoản */}
        <>
          {/* <Modal
            title="Lý do tài khoản này bị vô hiệu hoá"
            open={isModalOpen}
            onOk={deactive}
            onCancel={handleCancel}
            okText={"Xác nhận"}
            cancelText={"Huỷ"}
            okButtonProps={{
              style: { backgroundColor: "red", border: "none" },
            }}
          >
            <Input placeholder="Lý do xoá tài khoản này?" />
          </Modal> */}
        </>
        {/* thông tin tài khoản người dùng */}
        <Table
          columns={columns.roleUser === "Quản Trị Viên" ? null : columns}
          dataSource={data}
          scroll={{
            x: 1200,
            y: 450,
          }}
        />
      </Slidebar>
    </div>
  );
};
export default ListUser;
