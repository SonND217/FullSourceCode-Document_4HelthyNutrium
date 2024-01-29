import HeaderUser from "../header/HeaderUser";
import Footers from "../footer/footers";
import "../../assets/style/user/quizpage.css";
import { Card, Space, Input } from "antd";
import Button from "react-bootstrap/Button";
import Progress from "../progress/Progress";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserAPI from "../../service/Actions/UserAPI";
import AlertMessage from "../alert/AlertMessage";
import AuthUtil from "../../service/utils/AuthUtil";

const Quiz6 = ({checkValidRole}) => {
  checkValidRole();
  const history = useHistory();
  const [alert, setAlert] = useState(null);
  const [morning, setMorning] = useState(0);
  const [lunch, setLunch] = useState(0);
  const [dinner, setDinner] = useState(0);

  const onFormChange = (event) => {
    if (event.target.name == "morning") {
      setMorning(event.target.value);
    } else if (event.target.name == "lunch") {
      setLunch(event.target.value);
    } else {
      setDinner(event.target.value);
    }
  };

  const checkInput = () => {
    let check = true;

    if (!morning) {
      setAlert({
        type: "danger",
        message: "Vui lòng nhập số món cho bữa sáng",
      });
      setTimeout(() => setAlert(null), 2000);
      check = false;
    }

    if (!lunch) {
      setAlert({
        type: "danger",
        message: "Vui lòng nhập số món cho bữa trưa",
      });
      setTimeout(() => setAlert(null), 2000);
      check = false;
    }

    if (!dinner) {
      setAlert({
        type: "danger",
        message: "Vui lòng nhập số món cho bữa tối",
      });
      setTimeout(() => setAlert(null), 2000);
      check = false;
    }

    if (morning < 1 || morning > 4) {
      setAlert({
        type: "danger",
        message: "Bạn chỉ được nhập tối đa 4 món trong buổi sáng",
      });
      setTimeout(() => setAlert(null), 2000);
      check = false;
    }

    if (lunch < 2 || lunch > 4) {
      setAlert({
        type: "danger",
        message: "Bạn chỉ được nhập tối thiểu 2 món và tối đa 4 món trong buổi trưa",
      });
      setTimeout(() => setAlert(null), 2000);
      check = false;
    }

    if (dinner < 2 || dinner > 4) {
      setAlert({
        type: "danger",
        message: "Bạn chỉ được nhập tối thiểu 2 món và tối đa 4 món trong buổi tối",
      });
      setTimeout(() => setAlert(null), 2000);
      check = false;
    }

    return check;
  }

  async function submit(event) {
    event.preventDefault();

    if (!checkInput()) {
      return;
    }

    let data;
    try {
      data = JSON.parse(localStorage.getItem("quiz-data"));
      data.counts = [morning, lunch, dinner];

      let user = AuthUtil.getUserFromToken();
      if (user) {
        await user.then(res => {
          data.user = res.data;
        });
      }
      else {
        history.push("/login");
      }

    } catch (error) {
      data = {
        user: null,
        height: null,
        weight: null,
        job: null,
        categories: null,
        counts: [morning, lunch, dinner],
      };
    }

    let mess = '';

    if (data.height === null || data.weight === null) {
      mess += " [chiều cao, cân nặng]";
    }
    if (data.job === null) {
      mess += " [công việc]";
    }
    if (data.categories === null) {
      mess += " [loại thức ăn bạn muốn]";
    }

    if (mess !== '') {
      mess = "Vui lòng chọn lại những thông tin sau:" + mess;
      setAlert({
        type: "danger",
        message: mess,
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    console.log("quiz-data = " + JSON.stringify(data));
    localStorage.setItem("quiz-data", JSON.stringify(data));

    history.push("/onboarding/diet");
  };

  return (
    <>
      <HeaderUser></HeaderUser>
      <div className="wrapper-quiz_page">
        <div className="wrapper-ProgressBar">
          <Progress per="95"></Progress>
        </div>

        <div className="wrapper-title-quiz">
          <p>Số lượng món ăn mà bạn ăn trong bữa Sáng | Trưa | Tối?</p>
        </div>
        <div className="wrapper-table-option">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <AlertMessage info={alert} />
            <Card title="Sáng: " size="small">
              <Input
                placeholder="Nhập số món bạn ăn trong buổi sáng ( 1 - 4 )"
                className="InputText_Quiz"
                name="morning"
                type="number"
                min="1"
                max="4"
                required
                onChange={onFormChange}
              />
            </Card>
            <Card title="Trưa" size="small">
              <Input
                placeholder="Nhập số món bạn ăn trong buổi trưa ( 1 - 4 )"
                className="InputText_Quiz"
                name="lunch"
                type="number"
                min="1"
                max="4"
                required
                onChange={onFormChange}
              />
            </Card>
            <Card title="Tối" size="small">
              <Input
                placeholder="Nhập số món bạn ăn trong buổi tối ( 1 - 4 )"
                className="InputText_Quiz"
                name="dinner"
                type="number"
                min="1"
                max="4"
                required
                onChange={onFormChange}
              />
            </Card>
          </Space>
          {/* <Link to="/onboarding/GetUserDiet"> */}
          <Button variant="success" className="button_Link" onClick={submit}>
            Tiếp tục
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <Footers></Footers>
    </>
  );
};

export default Quiz6;
