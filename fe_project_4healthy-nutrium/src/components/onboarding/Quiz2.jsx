import HeaderUser from "../header/HeaderUser";
import Footers from "../footer/footers";
import "../../assets/style/user/quizpage.css";
import { Card, Input, Space } from "antd";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Progress from "../progress/Progress";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AlertMessage from "../alert/AlertMessage";

const Quiz3 = ({checkValidRole, user}) => {
  checkValidRole();
  const history = useHistory();
  const [alert, setAlert] = useState(null);
  const [alert1, setAlert1] = useState(null);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const minHeight = 50;
  const maxHeight = 250;
  const minWeight = 10;
  const maxWeight = 200;

  const onFormChange = (event) => {
    if (event.target.name == "height") {
      setHeight(event.target.value);
    } else {
      setWeight(event.target.value);
    }
  };

  const checkInput = () => {
    let check = true;
    if (height < minHeight || height > maxHeight) {
      setAlert({
        type: "danger",
        message: "Vui lòng nhập chiều cao trong khoảng 50-250 cm",
      });
      check = false;
    } else {
      setAlert(null);
    }

    if (weight < minWeight || weight > maxWeight) {
      setAlert1({
        type: "danger",
        message: "Vui lòng nhập chiều cao trong khoảng 10-200 kg",
      });
      check = false;
    } else {
      setAlert1(null);
    }
    if (weight == "") {
      setAlert1({
        type: "danger",
        message: "Vui lòng nhập cân nặng",
      });
      check = false;
    }
    if (height == "") {
      setAlert({
        type: "danger",
        message: "Vui lòng nhập chiều cao",
      });
      check = false;
    }

    return check;
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!checkInput()) {
      return;
    }

    let data;
    const u = await user.then(res => {return res.data});
    
    try {
      data = JSON.parse(localStorage.getItem("quiz-data"));
      data.height = height;
      data.weight = weight;
    } catch (error) {
      data = {
        user: u,
        height: height,
        weight: weight,
        job: null,
        categories: null,
        counts: null,
      };
    }

    localStorage.setItem("quiz-data", JSON.stringify(data));
    history.push("/onboarding/quiz3");
  };

  return (
    <>
      <HeaderUser></HeaderUser>
      <div className="wrapper-quiz_page">
        <div className="wrapper-ProgressBar">
          <Progress per="25"></Progress>
        </div>
        <div className="wrapper-title-quiz">
          <p>Bạn hãy nhập chiều cao và cân nặng của mình nhé</p>
        </div>
        <div className="wrapper-table-option">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Form required>
              <Card title="Chiều cao của bạn là: " size="small">
                <AlertMessage info={alert} />
                <Input
                  placeholder="Chiều cao"
                  className="InputText_Quiz"
                  type="number"
                  name="height"
                  min={50}
                  max={250}
                  required
                  onChange={onFormChange}
                />
              </Card>
              <Card title="Cân nặng của bạn là" size="small">
                <AlertMessage info={alert1} />
                <Input
                  placeholder="Cân nặng"
                  className="InputText_Quiz"
                  type="number"
                  name="weight"
                  min={10}
                  max={200}
                  required
                  onChange={onFormChange}
                />
              </Card>
              <Button
                variant="success"
                className="button_Link"
                onClick={submit}
              >
                Tiếp tục
              </Button>
            </Form>
          </Space>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
};

export default Quiz3;
