import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Tag,
  Image,
  Popconfirm,
  Space,
  Breadcrumb,
  Modal,
  Input,
} from "antd";
import "../../assets/style/admin/style.css";
import SelectionFoods from "../../components/selection/SelectionFoods";
import SelectionCategories from "../../components/selection/SelectionCategories";
import SelectionMealtypeFoodFilter from "../../components/selection/SelectionMealtypeFoodFilter";
import SelectionSeasonFood from "../../components/selection/SelectionSeasonFood";
import AddNewFood from "../../components/drawn/AddNewFood";
import Ingredient_SelectionRenderInListFood from "../../components/selectionRender/Ingredient_SelectionRenderInListFood";
import EditFood from "../../components/drawn/EditFood";
import FoodAPI from "../../service/Actions/FoodAPI";
import CategoryAPI from "../../service/Actions/CategoryAPI";
import AlertMessage from "../../../src/components/alert/AlertMessage";

const text = "Bạn có chắc chắn muốn món ăn này?";
const NutrionExpertFood = ({ user }) => {
  const [foods, setFoods] = useState([]);
  const [alert, setAlert] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedFood, setUpdatedFood] = useState(null);
  const [categories, setCategories] = useState(null);

  const loadFoodList = async () => {
    await FoodAPI.getAll()
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {});
  };

  const loadCategoryList = async () => {
    await CategoryAPI.getAll()
      .then((res) => {
        let cList = [];
        cList.push({
          value: null,
          label: "Tất cả",
        });
        res.data.map((category) => {
          cList.push({
            value: category.id,
            label: category.categoryName,
          });
        });
        setCategories(cList);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    loadFoodList();
    loadCategoryList();
  }, []);

  // useEffect(() => {
  //   setFoods(foods);
  // }, [foods]);

  // const deleteFood = (id) => {
  //   FoodAPI.delete(id)
  //     .then((res) => {
  //       setAlert({ type: "success", message: "Xóa món ăn thành công" });
  //       setTimeout(() => setAlert(null), 5000);
  //       loadFoodList();
  //     })
  //     .catch((e) => {
  //       setAlert({ type: "danger", message: e.response.data.message });
  //       setTimeout(() => setAlert(null), 5000);
  //     });
  // };

  const changeStatus = async (id) => {
    await FoodAPI.changeStatus(id)
      .then((res) => {
        setAlert({
          type: "success",
          message: "Cập nhật trạng thái món ăn thành công",
        });
        setTimeout(() => setAlert(null), 5000);
        loadFoodList();
      })
      .catch((e) => {
        setAlert({
          type: "danger",
          message: e.response
            ? e.response.data.message
            : "Lỗi cập nhật trạng thái món ăn",
        });
        setTimeout(() => setAlert(null), 5000);
      });
  };
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   justify: "center",
    // },
    {
      title: "Tên món ăn",
      dataIndex: "food_name",
      justify: "center",
    },
    {
      title: "Ảnh món ăn",
      dataIndex: "imageFood",
      render: (imageFood) => {
        return <Image width={80} height={60} src={imageFood} />;
      },
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      justify: "center",
      render: (status) => (
        <>
          {status ? (
            <Tag color="green">Đã kích hoạt </Tag>
          ) : (
            <Tag color="red">Vô hiệu hoá</Tag>
          )}
        </>
      ),
      width: 120,
    },
    {
      title: "Loại món ăn",
      dataIndex: "category_id",
      justify: "center",
      width: 150,
    },
    {
      title: "Bữa Ăn",
      dataIndex: "mealType",
      width: 100,
    },
    {
      title: "Mùa",
      dataIndex: "seasson_id",
      width: 75,
    },
    // {
    //   title: "Công thức",
    //   dataIndex: "recipe",
    //   justify: "center",
    //   ellipsis: true,
    // },
    {
      title: "Chất béo",
      dataIndex: "fat",
      justify: "center",
      width: 80,
    },
    {
      title: "Chất đạm",
      dataIndex: "protein",
      justify: "center",
      width: 80,
    },
    {
      title: "Chất bột đường",
      dataIndex: "carbon",
      justify: "center",
      width: 80,
    },
    {
      title: "Calo",
      dataIndex: "calories",
      justify: "center",
      width: 80,
    },
    {
      title: "Chỉnh sửa",
      render: (_, record) => (
        // <EditFood foodData={record} loadFoodList={loadFoodList}></EditFood>
        <Button
          type="primary"
          onClick={() => {
            setOpenUpdate(true);
            setUpdatedFood(record);
          }}
        >
          Sửa
        </Button>
      ),
      fixed: "right",
      width: 80,
    },
    {
      title: "Đổi trạng thái",
      dataIndex: "",
      render: (_, record) => (
        <>
          <Button
            // type="primary"
            onClick={() => {
              changeStatus(record.id);
            }}
            style={{ backgroundColor: "green", border: "none", color: "white" }}
          >
            Kích hoạt/Vô hiệu hóa
          </Button>
        </>
      ),
      justify: "center",
      fixed: "right",
      width: 200,
    },
  ];

  // Dữ liệu giả cho danh sách
  const data = [];
  const body = <br></br>;
  foods
    ? foods.map((foodValue) => {
        data.push({
          id: foodValue.id,
          food_name: foodValue.foodName,
          category_id: foodValue.category.categoryName,
          mealType: foodValue.meals.map((m) => m.mealName + " "),
          seasson_id: foodValue.seasons.map((s) => s.seasonName + " "),
          recipe: foodValue.recipe,
          fat: foodValue.fat,
          protein: foodValue.protein,
          carbon: foodValue.carb,
          calories: foodValue.calo,
          imageFood: `http://localhost:8080/food/${foodValue.id}/image`,
          status: foodValue.status,
          img: foodValue.img,
        });
      })
    : console.log("error");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Tìm kiếm Food
  const { Search } = Input;
  const [searchData, setSearchData] = useState({
    text: "",
    categoryId: null,
    mealId: null,
    seasonId: null,
  });
  // const onChange = (e) => {
  //   setSearchData({ ...searchData, text: e.target.value.trim() });
  // };
  const onSearch = async (text) => {
    let trimText = "";
    if (text) {
      trimText = text.trim();
    }
    searchData.text = trimText;
    await FoodAPI.search(searchData).then((res) => {
      setFoods(res.data);
    });
  };

  return (
    <div>
      {/* đường dẫn */}
      <Breadcrumb
        style={{
          paddingLeft: "10px",
          paddingTop: "5px",
          paddingBottom: "10px",
        }}
      >
        <Breadcrumb.Item>
          <a href="">Trang chuyên gia dinh dưỡng</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách món ăn</Breadcrumb.Item>
      </Breadcrumb>
      <div className="wrapper__listUser">
        {/* Thêm món ăn */}
        {/* Filter */}
        <div
          style={{
            padding: "10px 10px 10px 10px",
            margin: 10,
            display: "flex",
          }}
        >
          {/* Nhập tìm kiếm món ăn qua nguyên liệu nhập vào */}
          {/* <div className="display_block">
            <Ingredient_SelectionRenderInListFood></Ingredient_SelectionRenderInListFood>
          </div> */}
          {/* Lọc theo loại */}
          <div className="display_block">
            <SelectionCategories
              categories={categories}
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </div>
          {/* Lọc theo kiểu bữa */}
          <div className="display_block">
            <SelectionMealtypeFoodFilter
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </div>
          {/* Lọc theo mùa món ăn */}
          <div className="display_block">
            <SelectionSeasonFood
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </div>
          {/* Thêm món ăn mới vào danh sách */}
          <div className="display_block">
            <AddNewFood loadFoodList={loadFoodList} />
          </div>
        </div>
        <div className="search_user___listUser">
          <Search
            placeholder="Nhập tên món ăn cần tìm"
            allowClear
            enterButton="Tìm Kiếm"
            size="large"
            onSearch={onSearch}
            // onChange={onChange}
          />
          <AlertMessage info={alert} />
        </div>
      </div>

      {/* thông tin tài khoản người dùng */}
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1200,
          y: 480,
        }}
      />
      <EditFood
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        foodData={updatedFood}
        loadFoodList={loadFoodList}
      />
    </div>
  );
};
export default NutrionExpertFood;
