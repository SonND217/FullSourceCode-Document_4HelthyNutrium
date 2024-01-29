import React, { useEffect } from "react";
import HeaderUser from "../header/HeaderUser";
import Footers from "../footer/footers";
import "../../assets/style/user/quizpage.css";
import { Row, Col } from "antd";
import Button from "react-bootstrap/Button";
import Progress from "../progress/Progress";
import CategoryAPI from "../../service/Actions/CategoryAPI";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ModalAddNewFoodQuiz5 from "../modal/ModalAddNewFoodQuiz5";
import AlertMessage from "../alert/AlertMessage";

const Quiz5 = ({ checkValidRole, user }) => {
  checkValidRole();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [checked, setChecked] = useState(new Set());

  const loadCategories = async () => {
    await CategoryAPI.getAll()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => { });
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    let s = new Set();
    categories.map(c=>{
      s.add(c);
    })
    setSelectedCategories(s);
  }, [categories]);

  const onCheckBoxChange = (e) => {
    let category = categories[parseInt(e.target.name)];
    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }
    setSelectedCategories(selectedCategories);
  }

  const selectsAll = async (event) => {
  }

  const submit = async (event) => {
    event.preventDefault();

    let data;
    const u = await user.then(res => { return res.data });

    try {
      data = JSON.parse(localStorage.getItem("quiz-data"));
      data.categories = Array.from(selectedCategories);
    } catch (error) {
      data = {
        user: u,
        height: null,
        weight: null,
        job: null,
        categories: Array.from(selectedCategories),
        counts: null,
      };
    }

    console.log(JSON.stringify(data));
    localStorage.setItem("quiz-data", JSON.stringify(data));
    history.push("/onboarding/quiz5");
  }

  return (
    <>
      <HeaderUser></HeaderUser>
      <div className="wrapper-quiz_page">
        <div className="wrapper-ProgressBar">
          <Progress per="75"></Progress>
        </div>
        <div className="wrapper-title-quiz">
          <p>Hãy chọn loại thức ăn bạn muốn</p>
        </div>
        <div className="wrapper-table-option">
          <AlertMessage info={alert} />
          {/* check-box */}
          <Row gutter={[16, 16]}>
            {categories ? (
              categories.map((category, i) => (
                <Col span={8}>
                  <Form>
                    <Form.Check
                      name={`${i}`}
                      type="checkbox"
                      id="custom-switch"
                      label={category.categoryName}
                      className={"checked"}
                      onChange={onCheckBoxChange}
                      defaultChecked={true}
                    ></Form.Check>
                  </Form>
                </Col>
              ))
            ) : (
              <h2>Please add new food category</h2>
            )}
          </Row>
          {/* <Button
            className="btn-addmore_typeFood"
            type="primary"
            onClick={selectsAll}
          >
            Chọn tất cả
          </Button> */}
          {/* <ModalAddNewFoodQuiz5></ModalAddNewFoodQuiz5> */}
          <Button variant="success" className="button_Link" onClick={submit}>
            Tiếp tục
          </Button>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
};

export default Quiz5;
