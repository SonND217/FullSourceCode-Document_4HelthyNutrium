import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Checkbox,
  Divider,
  Space,
  Row,
  Image,
} from "antd";
import UploadImageFile from "../upload-image-avt/UploadImageFile";
import CategoryAPI from "../../service/Actions/CategoryAPI";
import IngredientAPI from "../../service/Actions/IngredientAPI";
import AlertDiv from "../alert/AlertDiv";
import TableAddIngredientFood from "../../pages/nutrion/TableAddIngredientFood";
import { useFormik } from "formik";
import * as Yup from "yup";
import { propTypes } from "react-bootstrap/esm/Image";
import FoodAPI from "../../service/Actions/FoodAPI";
import AlertMessage from "../alert/AlertMessage";
import axios from "axios";

//List mùa
const CheckboxGroup = Checkbox.Group;
const seassonList = [
  {
    label: "Xuân",
    value: {
      id: 1,
      seasonName: "Xuân",
    },
  },
  {
    label: "Hạ",
    value: {
      id: 2,
      seasonName: "Hạ",
    },
  },
  {
    label: "Thu",
    value: {
      id: 3,
      seasonName: "Thu",
    },
  },
  {
    label: "Đông",
    value: {
      id: 4,
      seasonName: "Đông",
    },
  },
];
const SeassonValueDefault = [
  {
    label: "Xuân",
    value: {
      id: 1,
      seasonName: "Xuân",
    },
  },
];
//list bữa ăn
const MealTypeList = [
  {
    label: "Bữa sáng",
    value: {
      id: 1,
      mealName: "Bữa sáng",
    },
  },
  {
    label: "Bữa trưa",
    value: {
      id: 2,
      mealName: "Bữa trưa",
    },
  },
  {
    label: "Bữa tối",
    value: {
      id: 3,
      mealName: "Bữa tối",
    },
  },
];
const MealTypeValueDefault = [
  {
    label: "Bữa sáng",
    value: {
      id: 1,
      mealName: "Bữa sáng",
    },
  },
];

const { Option } = Select;
const { TextArea } = Input;
const AddNewFood = ({ loadFoodList }) => {
  const [alert2, setAlert2] = useState(null);
  //
  //
  //
  // Mùa của món ăn
  //
  //
  //
  const [open, setOpen] = useState(false);
  const [checkedSessonList, setcheckedSessonList] =
    useState(SeassonValueDefault);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [alert, setAlert] = useState(null);
  const [alert1, setAlert1] = useState(null);
  const [topAlert, setTopAlert] = useState(null);
  const [alertIngredient, setAlertIngredient] = useState(null);
  const [added, setAdded] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const onChange_SeassonList = (list) => {
    setcheckedSessonList(list);
    setIndeterminate(!!list.length && list.length < seassonList.length);
    setCheckAll(list.length === seassonList.length);
    if (list.length === 0) {
      // console.log("List rỗng");
      setAlert({
        message: "Không được để trống mùa",
      });
      setTimeout(() => setAlert(null), 2000);
      document.getElementById("btn_EditFood").disabled = true;
    } else {
      document.getElementById("btn_EditFood").disabled = false;
    }
  };
  const onCheckAllChange = (e) => {
    const seassonListOnlyName = seassonList.map((data) => data.value);
    setcheckedSessonList(e.target.checked ? seassonListOnlyName : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked == []) {
      console.log("List rỗng");
      setAlert({
        message: "Không được để trống mùa",
      });
      setTimeout(() => setAlert(null), 2000);
      document.getElementById("btn_EditFood").disabled = true;
    } else {
      document.getElementById("btn_EditFood").disabled = false;
    }
  };
  //
  //
  //
  // Bữa của món ăn
  //
  //
  //
  const [checkedMealTypeList, setcheckedMealTypeList] =
    useState(MealTypeValueDefault);
  const [indeterminateMealType, setIndeterminateMealType] = useState(true);
  const [checkAllMealType, setCheckAllMealType] = useState(false);

  const onChange_MealTypeList = (list) => {
    setcheckedMealTypeList(list);
    setIndeterminateMealType(
      !!list.length && list.length < MealTypeList.length
    );
    setCheckAllMealType(list.length === MealTypeList.length);
    if (list.length === 0) {
      console.log("List rỗng");
      setAlert1({
        message: "Không được để trống bữa ăn",
      });
      setTimeout(() => setAlert1(null), 2000);
      document.getElementById("btn_EditFood").disabled = true;
    } else {
      document.getElementById("btn_EditFood").disabled = false;
    }
  };
  const onCheckAllChangeMealType = (e) => {
    const MealTypeListOnlyName = MealTypeList.map((data) => data.value);
    setcheckedMealTypeList(e.target.checked ? MealTypeListOnlyName : []);
    setIndeterminateMealType(false);
    setCheckAllMealType(e.target.checked);
    if (e.target.checked == []) {
      // console.log("List rỗng");
      setAlert1({
        message: "Không được để trống bữa ăn",
      });
      setTimeout(() => setAlert1(null), 2000);
      document.getElementById("btn_EditFood").disabled = true;
    } else {
      document.getElementById("btn_EditFood").disabled = false;
    }
  };
  //
  //
  //
  // Regex + formik các ô Input còn lại
  //
  //
  //
  const formik = useFormik({
    //
    // Giá trị vào formik để kiểm tra
    //
    initialValues: {
      foodName: "",
      recipe: "",
      fat: "",
      protein: "",
      carbon: "",
      Calories: "",
      // Fiber: "",
    },
    //
    //Regex
    //
    validationSchema: Yup.object({
      foodName: Yup.string()
        .required("Bạn không được để trống tên món ăn")
        .matches(/^([^0-9]*)$/, "Tên món ăn chỉ chứa chữ cái"),
      recipe: Yup.string().required(
        "Bạn không được để trống công thức nấu món này"
      ),
      fat: Yup.string()
        .required("Bạn không được để hàm lượng trống chất béo")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      protein: Yup.string()
        .required("Bạn không được để trống hàm lượng chất protein")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      carbon: Yup.string()
        .required("Bạn không được để trống hàm lượng chất carbon")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      Calories: Yup.string()
        .required("Bạn không được để trống hàm lượng chất Calories")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      // Fiber: Yup.string()
      //   .required("Bạn không được để trống hàm lượng chất Fiber")
      //   .matches(
      //     /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
      //     "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
      //   ),
    }),
  });

  const onSubmit = async () => {
    let check = true;
    if (image === null) {
      setTopAlert({ type: "danger", message: "Vui lòng chọn ảnh" });
      setTimeout(() => setTopAlert(null), 5000);
      check = false;
      return;
    }

    const userData = massFormTable.mass;
    //Kiểm tra loại món ăn
    if (
      !CategoryFoodValue ||
      (!CategoryFoodValue.categoryName && !CategoryFoodValue.categoryStatus)
    ) {
      setAlert2({
        message: "Không được để trống loại món ăn",
      });
      setTimeout(() => setAlert2(null), 2000);
      check = false;
      return;
    }
    // Kiểm tra bảng có rỗng không
    if (!userData || userData.length == 0) {
      setAlertIngredient({
        type: "danger",
        message: "Vui lòng lưu nguyên liệu",
      });
      setTimeout(() => setAlertIngredient(null), 5000);
      check = false;
      return;
    }
    //Tạo ra một mảng mới chưa object + mass
    let ingredientMassses = IngredientFoodValueArr.map((data) => {
      const findData = userData.find(
        (userData) => userData.ingredientName == data.ingredientName
      );
      if (findData) {
        return {
          ingredient: data,
          mass: findData.mass,
        };
      }
      return;
    });
    //Xoá các Nguyên liệu underfined
    ingredientMassses = ingredientMassses.filter(function (element) {
      return element !== undefined;
    });
    const addNewFoodForm = {
      foodName: formik.values.foodName.trim(),
      img: "",
      recipe: formik.values.recipe.trim(),
      fat: formik.values.fat.trim(),
      protein: formik.values.protein.trim(),
      carb: formik.values.carbon.trim(),
      calo: formik.values.Calories.trim(),
      seasons: checkedSessonList,
      meals: checkedMealTypeList,
      ingredientMasses: ingredientMassses,
      category: CategoryFoodValue,
      status: true,
    };

    console.log("added food = ", addNewFoodForm);

      await FoodAPI.add(addNewFoodForm)
        .then((res) => {
          const addedFood = res.data;
          setTopAlert({ type: "success", message: "Thêm thành công" });
          setTimeout(() => setTopAlert(null), 5000);

          const formData = new FormData();
          formData.append("file", image);

          let urlStr = "http://localhost:8080/food/" + addedFood.id + "/image";
          axios({
            method: "post",
            url: urlStr,
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          setAdded(true);
        })
        .catch((e) => {
          setTopAlert({
            type: "danger",
            message: e.response ? e.response.data.message : "Lỗi thêm món ăn",
          });
          setTimeout(() => setTopAlert(null), 5000);
        });
    
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    document.getElementById("formAddNewFoodInput").reset();
    setImage(null);
    setResult(null);
    if (added) {
      window.location.reload();
    }
  };

  //Lấy giá trị của nguyên liệu
  const [massFormTable, setMassFormTable] = useState({
    mass: "",
  });
  const callValueMass = (dataSource) => {
    console.log(dataSource);
    // Thêm mass vào object IngredientFoodValueArr
    // dataSource.forEach((element1) => {
    //   IngredientFoodValueArr.forEach(function (element) {
    //     element.mass = element1.mass;
    //   });
    // });

    setMassFormTable({
      mass: dataSource,
    });
    console.log(IngredientFoodValueArr);
  };
  const [listIngredient, setListIngredient] = useState([]);
  useEffect(() => {
    IngredientAPI.getActive()
      .then((res) => {
        setListIngredient(res.data);
      })
      .catch((err) => {});
  }, []);

  const [IngredientFoodValue, setIngredientFoodValue] = useState("");
  const [IngredientFoodValueArr, setIngredientFoodValueArr] = useState("");
  const onChangeSelectIngredientFood = (value) => {
    const finded = listIngredient.find((data) => data.ingredientName == value);
    setIngredientFoodValue(finded);
    setIngredientFoodValueArr([...IngredientFoodValueArr, finded]);
    // console.log(finded);
    if (value == "") {
      document.getElementById("btn_EditFood").disabled = true;
    } else {
      document.getElementById("btn_EditFood").disabled = false;
    }
  };

  // console.log(IngredientFoodValue);
  // console.log(IngredientFoodValueArr);
  //
  //
  //
  //Lấy giá trị của loại món ăn
  //
  //
  //
  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    CategoryAPI.getAll()
      .then((res) => {
        setListCategory(res.data);
      })
      .catch((err) => {});
  }, []);
  const [CategoryFoodValue, setCategoryFoodValue] = useState("");
  const onChangeSelectCategoryFood = (value) => {
    const finded = listCategory.find((data) => data.categoryName == value);
    setCategoryFoodValue(finded);
    console.log(finded);
    if (value == "") {
      document.getElementById("btn_EditFood").disabled = true;
    } else {
      document.getElementById("btn_EditFood").disabled = false;
    }
  };

  return (
    <>
      <div
        style={{
          paddingTop: "22px",
          paddingLeft: "10px",
        }}
      >
        <Button type="primary" onClick={showDrawer}>
          Thêm món ăn
        </Button>
      </div>

      <Drawer
        title="Thêm thức ăn mới vào danh sách này"
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
              onClick={onSubmit}
              type="primary"
              disabled={!formik.isValid}
              id="btn_EditFood"
            >
              Thêm
            </Button>
          </Space>
        }
      >
        <AlertMessage info={topAlert} />
        <Form layout="vertical" hideRequiredMark id="formAddNewFoodInput">
          <Col span={24}>
            <Form.Item
              name="imageFood"
              label={
                <span>
                  Hình ảnh món ăn
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
            >
              <Image width={300} height={250} src={result} />
              <UploadImageFile
                setImage={setImage}
                setResult={setResult}
              ></UploadImageFile>
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Tên món ăn
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
            >
              <Input
                name="foodName"
                placeholder="Tên món ăn"
                onChange={formik.handleChange}
              />
              {formik.errors.foodName && (
                <p className="errorMSG">{formik.errors.foodName}</p>
              )}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Công thức nấu món này là
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập công thức!!",
                },
              ]}
            >
              <TextArea
                name="recipe"
                placeholder="Bạn hãy nhập công thức để có thể nấu ra món ăn này"
                onChange={formik.handleChange}
              />
              {formik.errors.recipe && (
                <p className="errorMSG">{formik.errors.recipe}</p>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span>
                  Hàm lượng chất béo
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Chất béo của món ăn chưa nhập",
                },
              ]}
            >
              <Input
                name="fat"
                placeholder="Hàm lượng chất béo món ăn chứa"
                onChange={formik.handleChange}
              />
              {formik.errors.fat && (
                <p className="errorMSG">{formik.errors.fat}</p>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span>
                  Hàm lượng chất đạm
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Protein chưa nhập!!!",
                },
              ]}
            >
              <Input
                name="protein"
                placeholder="Hàm lượng chất Protein món ăn chứa"
                onChange={formik.handleChange}
              />
              {formik.errors.protein && (
                <p className="errorMSG">{formik.errors.protein}</p>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span>
                  Hàm lượng chất bột đường
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Carb chưa nhập",
                },
              ]}
            >
              <Input
                name="carbon"
                placeholder="Hàm lượng chất bột đường món ăn chứa"
                onChange={formik.handleChange}
              />
              {formik.errors.carbon && (
                <p className="errorMSG">{formik.errors.carbon}</p>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span>
                  Hàm lượng calo
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Calo chưa nhập",
                },
              ]}
            >
              <Input
                name="Calories"
                placeholder="Hàm lượng chất Calo món ăn chứa"
                onChange={formik.handleChange}
              />
              {formik.errors.Calories && (
                <p className="errorMSG">{formik.errors.Calories}</p>
              )}
            </Form.Item>
          </Col>
          {/* <Col span={24}>
            <Form.Item
              label="Hàm lượng Fiber:"
              rules={[
                {
                  required: true,
                  message: "Fiber chưa nhập",
                },
              ]}
            >
              <Input
                name="Fiber"
                placeholder="Hàm lượng chất Fiber món ăn chứa"
                onChange={formik.handleChange}
              />
              {formik.errors.Fiber && (
                <p className="errorMSG">{formik.errors.Fiber}</p>
              )}
            </Form.Item>
          </Col> */}
          <Row span={24}>
            <Col span={12}>
              <Form.Item
                name="seassonFood"
                label={
                  <span>
                    Mùa của món ăn này
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  defaultChecked={true}
                  checked={checkAll}
                  required
                >
                  Chọn cả bốn mùa
                </Checkbox>
                <Divider />
                <CheckboxGroup
                  options={seassonList}
                  value={checkedSessonList}
                  onChange={onChange_SeassonList}
                  required
                />
              </Form.Item>
              <AlertDiv info={alert} />
            </Col>
            <Col span={12}>
              <Form.Item
                name="mealTypeFood"
                label={
                  <span>
                    Món ăn này ăn vào bữa
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Checkbox
                  indeterminate={indeterminateMealType}
                  onChange={onCheckAllChangeMealType}
                  defaultChecked={true}
                  checked={checkAllMealType}
                  required
                >
                  Chọn cả ba bữa
                </Checkbox>
                <Divider />
                <CheckboxGroup
                  options={MealTypeList}
                  value={checkedMealTypeList}
                  onChange={onChange_MealTypeList}
                  required
                />
              </Form.Item>
              <AlertDiv info={alert1} />
            </Col>
          </Row>

          <Col span={24}>
            <Form.Item
              name="ingredientFood"
              label={
                <span>
                  Nguyên liệu trong món ăn này
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Nguyên liệu trong món ăn chưa nhập",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn nguyên liệu"
                optionFilterProp="children"
                onChange={onChangeSelectIngredientFood}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {listIngredient ? (
                  listIngredient.map((listIngredient) => (
                    <Option value={listIngredient.ingredientName}></Option>
                  ))
                ) : (
                  <h2>Please add new food ingredient</h2>
                )}
              </Select>
              <AlertDiv info={alertIngredient} />
              <TableAddIngredientFood
                ValueIngredient={IngredientFoodValue.ingredientName}
                getDataFromTable={callValueMass}
              ></TableAddIngredientFood>
            </Form.Item>
            <Form.Item
              name="category"
              label={
                <span>
                  Món ăn này thuộc loại
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Loại món ăn chưa nhập",
                },
              ]}
            >
              <Select onChange={onChangeSelectCategoryFood}>
                {listCategory ? (
                  listCategory.map((listCategory, i) => (
                    <Option value={listCategory.categoryName}></Option>
                  ))
                ) : (
                  <h2>Please add new food category</h2>
                )}
              </Select>
              <AlertDiv info={alert2} />
            </Form.Item>
          </Col>
        </Form>
      </Drawer>
    </>
  );
};

export default AddNewFood;
