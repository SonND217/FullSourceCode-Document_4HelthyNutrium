import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Checkbox,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Image,
} from "antd";
import AlertDiv from "../alert/AlertDiv";
import UploadImageFileIngredient from "../upload-image-avt/UploadImageFileIngredient";
import AlertMessage from "../alert/AlertMessage";
import { useFormik } from "formik";
import * as Yup from "yup";
import IngredientAPI from "../../../src/service/Actions/IngredientAPI";
import axios from "axios";

//List mùa
const CheckboxGroup = Checkbox.Group;
const seassonList = [
  {
    label: "Xuân",
    value: {
      id: 1,
      seasonName: "Spring",
    },
  },
  {
    label: "Hạ",
    value: {
      id: 2,
      seasonName: "Summer",
    },
  },
  {
    label: "Thu",
    value: {
      id: 3,
      seasonName: "Autumn",
    },
  },
  {
    label: "Đông",
    value: {
      id: 4,
      seasonName: "Winter",
    },
  },
];
const SeassonValueDefault = [
  {
    label: "Xuân",
    value: {
      id: 1,
      seasonName: "Spring",
    },
  },
];
const { Option } = Select;

const AddNewIngrendient = ({ loadAllIngredientList }) => {
  //
  //
  //
  // Mùa của thành phần
  //
  //
  //
  const [open, setOpen] = useState(false);
  const [checkedSeasonList, setcheckedSessonList] =
    useState(SeassonValueDefault);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [alert, setAlert] = useState(null);
  const [added, setAdded] = useState(false);
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
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    document.getElementById("formAddNewIngredientInput").reset();
    formik.handleReset();
    setImage(null);
    setResult(null);
    if (added) {
      window.location.reload();
    }
  };

  const formik = useFormik({
    initialValues: {
      ingredientName: "",
      fat: "",
      protein: "",
      carb: "",
      calo: "",
      vitamin: "",
      water: "",
      fiber: "",
      ash: "",
      canxi: "",
      iron: "",
      zinc: "",
      vitaminC: "",
      vitaminB1: "",
      vitaminB2: "",
      vitaminB3: "",
      vitaminB6A: "",
      vitaminD: "",
      vitaminB12: "",
      vitaminA: "",
      vitaminARae: "",
      minLimit: "",
      maxLimit: "",
    },
    //regex
    validationSchema: Yup.object({
      ingredientName: Yup.string().required(
        "Bạn không được để trống tên nguyên liệu"
      ),
      fat: Yup.string()
        .required("Bạn không được để trống hàm lượng chât Fat")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      protein: Yup.string()
        .required("Bạn không được để trống hàm lượng chât protein")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      carb: Yup.string()
        .required("Bạn không được để trống hàm lượng chât carbs")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      calo: Yup.string()
        .required("Bạn không được để trống hàm lượng chât calo")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitamin: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitamin")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      water: Yup.string()
        .required("Bạn không được để trống hàm lượng chât water")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      fiber: Yup.string()
        .required("Bạn không được để trống hàm lượng chât fiber")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      ash: Yup.string().required("Bạn không được để trống hàm lượng chât ash"),
      canxi: Yup.string()
        .required("Bạn không được để trống hàm lượng chât canxi")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      iron: Yup.string()
        .required("Bạn không được để trống hàm lượng chât iron")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      zinc: Yup.string()
        .required("Bạn không được để trống hàm lượng chât zinc")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminC: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminC")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminB1: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminB1")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminB2: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminB2")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminB3: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminB3")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminB6A: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminB6A")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminD: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminD")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminB12: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminB12")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminA: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminA")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      vitaminARae: Yup.string()
        .required("Bạn không được để trống hàm lượng chât vitaminARae")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      minLimit: Yup.string()
        .required("Bạn không được để trống giới hạn tối thiểu")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
      maxLimit: Yup.string()
        .required("Bạn không được để trống giới hạn tối đa")
        .matches(
          /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
          "Bạn chỉ được nhập chữ số nguyên hoặc chữ số thập phân  "
        ),
    }),
  });

  const onSubmit = async () => {
    if (image === null) {
      setAlert({ type: "danger", message: "Vui lòng chọn ảnh" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    if (checkedSeasonList) {
      const AddNewIngrendient = {
        ingredientName: formik.values.ingredientName,
        fat: formik.values.fat,
        protein: formik.values.protein,
        carb: formik.values.carb,
        calo: formik.values.calo,
        // vitamin: formik.values.vitamin,
        water: formik.values.water,
        fiber: formik.values.fiber,
        ash: formik.values.ash,
        canxi: formik.values.canxi,
        iron: formik.values.iron,
        zinc: formik.values.zinc,
        vitaminC: formik.values.vitaminC,
        vitaminB1: formik.values.vitaminB1,
        vitaminB2: formik.values.vitaminB2,
        vitaminB3: formik.values.vitaminB3,
        vitaminB6A: formik.values.vitaminB6A,
        vitaminD: formik.values.vitaminD,
        vitaminB12: formik.values.vitaminB12,
        vitaminA: formik.values.vitaminB12,
        vitaminARae: formik.values.vitaminARae,
        minLimit: formik.values.minLimit,
        maxLimit: formik.values.maxLimit,
        seasons: checkedSeasonList,
        img: "",
        status: true,
      };
      console.log("add data = ", AddNewIngrendient);

      await IngredientAPI.add(AddNewIngrendient)
        .then((res) => {
          loadAllIngredientList();
          const addedIngredient = res.data;
          setAlert({
            type: "success",
            message: "Thêm nguyên liệu mới thành công",
          });
          setTimeout(() => setAlert(null), 5000);

          const formData = new FormData();
          formData.append("file", image);

          let urlStr =
            "http://localhost:8080/ingredient/" + addedIngredient.id + "/image";
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
          setAlert({
            type: "danger",
            message: e.response.data
              ? e.response.data.message
              : "Lỗi thêm nguyên liệu mới",
          });
          setTimeout(() => setAlert(null), 5000);
        });
    } else {
      setAlert({ type: "danger", message: "Vui lòng chọn mùa" });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined className="plus_add_button" />}
      >
        Thêm nguyên liệu mới vào danh sách
      </Button>
      <Drawer
        title="Thêm nguyên liệu mới vào danh sách"
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
            >
              Thêm
            </Button>
          </Space>
        }
      >
        <AlertMessage info={alert} />
        <Form layout="vertical" hideRequiredMark id="formAddNewIngredientInput">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    Tên nguyên liệu
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
                name="ingredientName"
              >
                <Input
                  placeholder="Tên nguyên liệu"
                  name="ingredientName"
                  onChange={formik.handleChange}
                />
                {formik.errors.ingredientName && (
                  <p className="errorMSG">{formik.errors.ingredientName}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Chọn hình ảnh nguyên liệu"
                label={
                  <span>
                    Chọn hình ảnh nguyên liệu
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Image width={300} height={250} src={result} />
                <UploadImageFileIngredient
                  setImage={setImage}
                  setResult={setResult}
                ></UploadImageFileIngredient>
              </Form.Item>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="minLimit"
                label={
                  <span>
                    Giới hạn tối thiểu
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất giới hạn tối thiểu món ăn chứa"
                  name="minLimit"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.minLimit && (
                  <p className="errorMSG">{formik.errors.minLimit}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxLimit"
                label={
                  <span>
                    Giới hạn tối đa
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất giới hạn tối đa món ăn chứa"
                  name="maxLimit"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.maxLimit && (
                  <p className="errorMSG">{formik.errors.maxLimit}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Divider></Divider>
          <Col span={24}>
            <Form.Item
              name="seasons"
              label={
                <span>
                  Mùa của nguyên liệu này
                  <p style={{ color: "red", display: "inline" }}> * </p>:
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please pick an item!",
                },
              ]}
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
                value={checkedSeasonList}
                onChange={onChange_SeassonList}
                required
              />
            </Form.Item>
          </Col>
          <Divider></Divider>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="fat"
                label={
                  <span>
                    Hàm lượng chất béo (/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất béo món ăn chứa"
                  name="fat"
                  onChange={formik.handleChange}
                />
                {formik.errors.fat && (
                  <p className="errorMSG">{formik.errors.fat}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="protein"
                label={
                  <span>
                    Hàm lượng đạm(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất đạm món ăn chứa"
                  name="protein"
                  onChange={formik.handleChange}
                />
                {formik.errors.protein && (
                  <p className="errorMSG">{formik.errors.protein}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="carb"
                label={
                  <span>
                    Hàm lượng bột đường(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất bột đường món ăn chứa"
                  name="carb"
                  onChange={formik.handleChange}
                />
                {formik.errors.carb && (
                  <p className="errorMSG">{formik.errors.carb}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="calo"
                label={
                  <span>
                    Hàm lượng Calo(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng Calo món ăn chứa"
                  name="calo"
                  onChange={formik.handleChange}
                />
                {formik.errors.calo && (
                  <p className="errorMSG">{formik.errors.calo}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitamin"
                label={
                  <span>
                    Hàm lượng vitamin(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất Vitamin món ăn chứa"
                  name="vitamin"
                  onChange={formik.handleChange}
                />
                {formik.errors.vitamin && (
                  <p className="errorMSG">{formik.errors.vitamin}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="water"
                label={
                  <span>
                    Hàm lượng nước(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng nước món ăn chứa"
                  name="water"
                  onChange={formik.handleChange}
                />
                {formik.errors.water && (
                  <p className="errorMSG">{formik.errors.water}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fiber"
                label={
                  <span>
                    Hàm lượng chất xơ(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất chất xơ món ăn chứa"
                  name="fiber"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.fiber && (
                  <p className="errorMSG">{formik.errors.fiber}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ash"
                label={
                  <span>
                    Hàm lượng Tro(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng Tro món ăn chứa"
                  name="ash"
                  onChange={formik.handleChange}
                />
                {formik.errors.ash && (
                  <p className="errorMSG">{formik.errors.ash}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="canxi"
                label={
                  <span>
                    Hàm lượng Canxi(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất Canxi món ăn chứa"
                  name="canxi"
                  onChange={formik.handleChange}
                />
                {formik.errors.canxi && (
                  <p className="errorMSG">{formik.errors.canxi}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="iron"
                label={
                  <span>
                    Hàm lượng Sắt(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất sắt món ăn chứa"
                  name="iron"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.iron && (
                  <p className="errorMSG">{formik.errors.iron}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="zinc"
                label={
                  <span>
                    Hàm lượng kẽm(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất kẽm món ăn chứa"
                  name="zinc"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.zinc && (
                  <p className="errorMSG">{formik.errors.zinc}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminC"
                label={
                  <span>
                    Hàm lượng VitaminC(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminC món ăn chứa"
                  name="vitaminC"
                  onChange={formik.handleChange}
                />
                {formik.errors.vitaminC && (
                  <p className="errorMSG">{formik.errors.vitaminC}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminB1"
                label={
                  <span>
                    Hàm lượng VitaminB1(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminB1 món ăn chứa"
                  name="vitaminB1"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminB1 && (
                  <p className="errorMSG">{formik.errors.vitaminB1}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminB2"
                label={
                  <span>
                    Hàm lượng VitaminB2(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminB2 món ăn chứa"
                  name="vitaminB2"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminB2 && (
                  <p className="errorMSG">{formik.errors.vitaminB2}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminB3"
                label={
                  <span>
                    Hàm lượng VitaminB3(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminB3 món ăn chứa"
                  name="vitaminB3"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminB3 && (
                  <p className="errorMSG">{formik.errors.vitaminB3}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminB6A"
                label={
                  <span>
                    Hàm lượng VitaminB6A(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminB6A món ăn chứa"
                  name="vitaminB6A"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminB6A && (
                  <p className="errorMSG">{formik.errors.vitaminB6A}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminD"
                label={
                  <span>
                    Hàm lượng VitaminD(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminD món ăn chứa"
                  name="vitaminD"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminD && (
                  <p className="errorMSG">{formik.errors.vitaminD}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminB12"
                label={
                  <span>
                    Hàm lượng VitaminB12(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminB12 món ăn chứa"
                  name="vitaminB12"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminB12 && (
                  <p className="errorMSG">{formik.errors.vitaminB12}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminA"
                label={
                  <span>
                    Hàm lượng VitaminA(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminA món ăn chứa"
                  name="vitaminA"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminA && (
                  <p className="errorMSG">{formik.errors.vitaminA}</p>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vitaminARae"
                label={
                  <span>
                    Hàm lượng VitaminA_rae(/100g)
                    <p style={{ color: "red", display: "inline" }}> * </p>:
                  </span>
                }
              >
                <Input
                  placeholder="Hàm lượng chất VitaminA_rae món ăn chứa"
                  name="vitaminARae"
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.vitaminARae && (
                  <p className="errorMSG">{formik.errors.vitaminARae}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddNewIngrendient;
