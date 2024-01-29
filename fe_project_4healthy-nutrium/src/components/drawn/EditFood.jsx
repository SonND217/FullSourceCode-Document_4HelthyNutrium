import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Image,
  Drawer,
  Form,
  Input,
  Select,
  Checkbox,
  Divider,
  Space,
  Row,
} from "antd";
import UploadImageFile from "../upload-image-avt/UploadImageFile";
import CategoryAPI from "../../service/Actions/CategoryAPI";
import IngredientAPI from "../../service/Actions/IngredientAPI";
import AlertDiv from "../alert/AlertDiv";
import TableEditIngredientFood from "../../pages/nutrion/TableEditIngredientFood";
import { useFormik } from "formik";
import * as Yup from "yup";
import { propTypes } from "react-bootstrap/esm/Image";
import FoodAPI from "../../service/Actions/FoodAPI";
import AlertMessage from "../alert/AlertMessage";
import axios from "axios";

//List mùa
const CheckboxGroup = Checkbox.Group;
const seasonList = [
  {
    label: "Xuân",
    value: "Xuân",
  },
  {
    label: "Hạ",
    value: "Hạ",
  },
  {
    label: "Thu",
    value: "Thu",
  },
  {
    label: "Đông",
    value: "Đông",
  },
];

//list bữa ăn
const MealTypeList = [
  {
    label: "Bữa sáng",
    value: "Bữa sáng",
  },
  {
    label: "Bữa trưa",
    value: "Bữa trưa",
  },
  {
    label: "Bữa tối",
    value: "Bữa tối",
  },
];

const { Option } = Select;
const { TextArea } = Input;
const EditFood = ({ foodData, openUpdate, setOpenUpdate, loadFoodList }) => {
  const [checkedMealTypeList, setcheckedMealTypeList] = useState(
    foodData?.mealType.map((element) => {
      return element.trim();
    })
  );

  const [alert2, setAlert2] = useState(null);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [alert, setAlert] = useState(null);
  const [indeterminateMealType, setIndeterminateMealType] = useState(true);
  const [checkAllMealType, setCheckAllMealType] = useState(false);
  const [alert1, setAlert1] = useState(null);
  const [food, setFood] = useState(null);
  // const [openUpdate, setOpenUpdate] = useState(false);
  const [topAlert, setTopAlert] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [checkedSeasonList, setcheckedSeasonList] = useState(
    foodData?.seasson_id.map((element) => {
      return element.trim();
    })
  );
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [dataSeasonSubmit, setDataSeasonSubmit] = useState(null);

  // useEffect(() => {
  //   if (foodData) {
  //     formik.setValues(foodData);
  //   }
  // }, []);

  useEffect(async () => {
    if (foodData) {
      formik.setValues(foodData);
      let sList = foodData.seasson_id.map((element) => {
        return element.trim();
      });
      setcheckedSeasonList(sList);
      let mealList = foodData?.mealType.map((element) => {
        return element.trim();
      });
      setcheckedMealTypeList(mealList);

      await CategoryAPI.getAll()
        .then((res) => {
          setListCategory(res.data);
        })
        .catch((err) => {});

      await IngredientAPI.getActive()
        .then((res) => {
          setListIngredient(res.data);
        })
        .catch((err) => {});

      await FoodAPI.getById(foodData.id).then((res) => {
        // console.log("food = ", res.data);
        const food = res.data;
        formik.setValues(food);
        // setFood(food);
        setCategoryFoodValue(food.category);
      });
    }
  }, [foodData]);

  useEffect(() => {
    if (checkedSeasonList) {
      let s = checkedSeasonList?.map((data) => {
        if (data == "Xuân") {
          return {
            value: {
              id: 1,
              seasonName: "Xuân",
            },
          };
        } else if (data == "Hạ") {
          return {
            value: {
              id: 2,
              seasonName: "Hạ",
            },
          };
        } else if (data == "Thu") {
          return {
            value: {
              id: 3,
              seasonName: "Thu",
            },
          };
        } else {
          return {
            value: {
              id: 4,
              seasonName: "Đông",
            },
          };
        }
      });
      setDataSeasonSubmit(s);
    }
  }, [checkedSeasonList]);

  const [dataMealTypeSubmit, setDataMealTypeSubmit] = useState(null);

  useEffect(() => {
    if (checkedMealTypeList) {
      let mList = checkedMealTypeList.map((data) => {
        if (data == "Bữa sáng") {
          return {
            value: {
              id: 1,
              mealName: "Bữa sáng",
            },
          };
        } else if (data == "Bữa trưa") {
          return {
            value: {
              id: 2,
              mealName: "Bữa trưa",
            },
          };
        } else {
          return {
            value: {
              id: 3,
              mealName: "Bữa tối",
            },
          };
        }
      });
      setDataMealTypeSubmit(mList);
    }
  }, [checkedMealTypeList]);

  // let dataSeasonSubmit = checkedSeasonList?.map((data) => {
  //   if (data == "Xuân") {
  //     return {
  //       value: {
  //         id: 1,
  //         seasonName: "Xuân",
  //       },
  //     };
  //   } else if (data == "Hạ") {
  //     return {
  //       value: {
  //         id: 2,
  //         seasonName: "Hạ",
  //       },
  //     };
  //   } else if (data == "Thu") {
  //     return {
  //       value: {
  //         id: 3,
  //         seasonName: "Thu",
  //       },
  //     };
  //   } else {
  //     return {
  //       value: {
  //         id: 4,
  //         seasonName: "Đông",
  //       },
  //     };
  //   }
  // });

  const onChange_SeassonList = (list) => {
    setcheckedSeasonList(list);
    setIndeterminate(!!list.length && list.length < seasonList.length);
    setCheckAll(list.length === seasonList.length);
    if (list.length === 0) {
      // console.log("List rỗng");
      setAlert({
        message: "Không được để trống mùa",
      });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  const onCheckAllChange = (e) => {
    setcheckedSeasonList(e.target.checked ? seasonList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked == []) {
      console.log("List rỗng");
      setAlert({
        message: "Không được để trống mùa",
      });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  //
  //
  //
  // Bữa của món ăn
  //
  //
  //

  // console.log(dataMealTypeSubmit);
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
    setcheckedMealTypeList(e.target.checked ? MealTypeList : []);
    setIndeterminateMealType(false);
    setCheckAllMealType(e.target.checked);
    if (e.target.checked == []) {
      console.log("List rỗng");
      setAlert({
        message: "Không được để trống bữa ăn",
      });
      setTimeout(() => setAlert(null), 2000);
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
      carb: "",
      calo: "",
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
      carb: Yup.string()
        .required("Bạn không được để trống hàm lượng chất carb")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      calo: Yup.string()
        .required("Bạn không được để trống hàm lượng chất calo")
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
  const onSubmit = () => {
    const userData = massFormTable.mass;
    //Kiểm tra loại món ăn
    if (!CategoryFoodValue.categoryName && !CategoryFoodValue.categoryStatus) {
      setAlert2({
        message: "Không được để trống loại món ăn",
      });
      setTimeout(() => setAlert2(null), 2000);
      return;
    }
    // Kiểm tra bảng có rỗng không
    if (!userData || userData.length == 0) {
      return;
    }
    //Kiểm tra mảng trùng hay có sẵn thì không thêm
    let uniqueChars = IngredientFoodValueArr.filter((element, index) => {
      return IngredientFoodValueArr.indexOf(element) === index;
    });

    //Tạo ra một mảng mới chưa object + mass
    let ingredientMasses = uniqueChars.map((data) => {
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
    ingredientMasses = ingredientMasses.filter(function (element) {
      return element !== undefined;
    });

    let seasonList = [];
    let mealList = [];
    dataSeasonSubmit.map((s) => {
      seasonList.push(s.value);
    });
    dataMealTypeSubmit.map((m) => {
      mealList.push(m.value);
    });

    const editFoodForm = {
      id: foodData.id,
      foodName: formik.values.foodName,
      recipe: formik.values.recipe,
      fat: formik.values.fat,
      protein: formik.values.protein,
      carb: formik.values.carb,
      calo: formik.values.calo,
      seasons: seasonList,
      meals: mealList,
      ingredientMasses: ingredientMasses,
      category: CategoryFoodValue,
      status: foodData.status,
      img: foodData.img,
    };
    console.log("season = ", dataSeasonSubmit);
    console.log("update food = ", editFoodForm);
    FoodAPI.update(editFoodForm)
      .then((res) => {
        loadFoodList();
        setTopAlert({ type: "success", message: "Cập nhật món ăn thành công" });
        setTimeout(() => setTopAlert(null), 5000);

        if (image) {
          const formData = new FormData();
          formData.append("file", image);

          let urlStr =
            "http://localhost:8080/food/" + editFoodForm.id + "/image";
          axios({
            method: "post",
            url: urlStr,
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        setUpdated(true);
      })
      .catch((e) => {
        setTopAlert({
          type: "danger",
          message: e.response ? e.response.data.message : "Lỗi cập nhật món ăn",
        });
        setTimeout(() => setTopAlert(null), 5000);
      });
  };

  const showDrawer = () => {
    //Lấy ID từ list sau khi ấn nút Sửa
    // console.log(foodData);
    // console.log(food.category.categoryName);
    // console.log(food.ingredientMasses);
    setOpenUpdate(true);
  };
  const onClose = () => {
    setOpenUpdate(false);
    setImage(null);
    setResult(null);
    if (updated) {
      window.location.reload();
    }
  };
  //
  //
  //
  //Lấy giá trị của nguyên liệu
  //
  //
  //

  const [massFormTable, setMassFormTable] = useState({
    mass: "",
  });
  const [listIngredient, setListIngredient] = useState([]);
  const [IngredientFoodValue, setIngredientFoodValue] = useState("");
  const [IngredientFoodValueArr, setIngredientFoodValueArr] = useState("");
  const callValueMass = (dataSource) => {
    dataSource.forEach((element) => {
      const finded = listIngredient.find(
        (data) => data.ingredientName == element.ingredientName
      );
      if (finded) {
        setIngredientFoodValue(finded);
        setIngredientFoodValueArr((oldArray) => [...oldArray, finded]);
        console.log(finded);
      }
    });

    console.log(dataSource.map((data) => data.ingredientName));

    setMassFormTable({
      mass: dataSource,
    });
  };
  const onChangeSelectIngredientFood = (value) => {
    const finded = listIngredient.find((data) => data.ingredientName == value);
    setIngredientFoodValue(finded);
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

  // useEffect(async () => {
  //   if (foodData) {
  //     await CategoryAPI.getAll()
  //       .then((res) => {
  //         setListCategory(res.data);
  //       })
  //       .catch((err) => { });

  //     await IngredientAPI.getAll()
  //       .then((res) => {
  //         setListIngredient(res.data);
  //       })
  //       .catch((err) => { });

  //     await FoodAPI.getById(foodData.id).then((res) => {
  //       // console.log("food = ", res.data);
  //       const food = res.data;
  //       formik.setValues(food);
  //       setFood(food);
  //       setCategoryFoodValue(food.category);
  //     });
  //   }
  // }, []);

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
      {/* <div>
        <Button type="primary" onClick={showDrawer}>
          Sửa
        </Button>
      </div> */}

      <Drawer
        title="Chính sửa món ăn"
        width={720}
        onClose={onClose}
        open={openUpdate}
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
              Sửa
            </Button>
          </Space>
        }
      >
        <AlertMessage info={topAlert} />
        <Form layout="vertical" hideRequiredMark id="formEditNewFoodInput">
          <Row gutter={16}>
            <Col span={12}>
              <Image
                width={300}
                height={250}
                src={
                  result
                    ? result
                    : `http://localhost:8080/food/${foodData?.id}/image`
                }
              />
            </Col>
            <Col span={12}>
              <Form.Item
                name="imageFood"
                label={
                  <span>
                    Hình ảnh món ăn
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
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
                  value={formik.values.foodName}
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
                  value={formik.values.recipe}
                  onChange={formik.handleChange}
                />
                {formik.errors.recipe && (
                  <p className="errorMSG">{formik.errors.recipe}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
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
                value={formik.values.fat}
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
                value={formik.values.protein}
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
                name="carb"
                placeholder="Hàm lượng chất carb món ăn chứa"
                onChange={formik.handleChange}
                value={formik.values.carb}
              />
              {formik.errors.carb && (
                <p className="errorMSG">{formik.errors.carb}</p>
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
                  message: "calo chưa nhập",
                },
              ]}
            >
              <Input
                name="calo"
                placeholder="Hàm lượng calo món ăn chứa"
                onChange={formik.handleChange}
                value={formik.values.calo}
              />
              {formik.errors.calo && (
                <p className="errorMSG">{formik.errors.calo}</p>
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
                  // defaultChecked={true}
                  checked={checkAll}
                  required
                >
                  Chọn cả bốn mùa
                </Checkbox>
                <Divider />
                <CheckboxGroup
                  options={seasonList}
                  value={checkedSeasonList}
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
                  listIngredient.map((ingredient) => (
                    <Option value={ingredient.ingredientName}></Option>
                  ))
                ) : (
                  <h2>Vui lòng tạo thêm nguyên liệu</h2>
                )}
              </Select>

              <TableEditIngredientFood
                ValueIngredient={IngredientFoodValue.ingredientName}
                getDataFromTable={callValueMass}
                valueFoodIdFormTable={foodData?.id}
              ></TableEditIngredientFood>
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
              <Select
                onChange={onChangeSelectCategoryFood}
                value={{
                  // label: foodData?.category_id,
                  label: CategoryFoodValue.categoryName,
                }}
              >
                {listCategory ? (
                  listCategory.map((listCategory, i) => (
                    <Option value={listCategory.categoryName}></Option>
                  ))
                ) : (
                  <h2>Vui lòng thêm loại món ăn</h2>
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

export default EditFood;
