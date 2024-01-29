import React, { useEffect, useState } from "react";
import { Layout, Card, Col, Row, Image } from "antd";
import Footers from "../../components/footer/footers";
import "../../assets/style/user/UserPersonalSchedule.css";
import HeaderHasLog from "../../components/header/HeaderHasLog";
import ModalDetailFood from "../../components/modal/ModalDetailFood";
import DietAPI from "../../service/Actions/DietAPI";
import { useHistory } from "react-router-dom";
import AuthUtil from "../../service/utils/AuthUtil";

const { Header, Footer, Content } = Layout;
const UserPersonalSchedule = () => {
  const history = useHistory();
  const [diet, setDiet] = useState(null);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    // check user
    let user = AuthUtil.getUserFromToken();
    if (user) {
      user.then((res) => {
        getDiet(res.data);
      });
    } else {
      history.push("/login");
    }
  }, []);

  function getDiet(user) {
    DietAPI.getByUserID(user.id)
      .then((res) => {
        let d = res.data;
        let dietDate = new Date(d.date);
        console.log(dietDate);
        const month = dietDate.getMonth() === 12 ? 1 : dietDate.getMonth() + 1;
        let str =
          "Thực đơn lưu ngày " +
          dietDate.getDate() +
          ", tháng " +
          month +
          ", năm " +
          dietDate.getFullYear();
        setDateStr(str);
        setDiet(d);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getUserInfo = (diet) => {
    if (diet) {
      let jobTypeStr = "";
      switch (diet.job.jobType) {
        case 2:
          jobTypeStr = "(Lao động chân tay)";
          break;
        case 3:
          jobTypeStr = "(Lao động tri thức)";
          break;
      }
      let genderStr = diet.user.gender ? "nam giới" : "nữ giới";
      return (
        "Thực đơn dành cho " +
        genderStr +
        " " +
        diet.age +
        " tuổi, nghề " +
        diet.job.jobName +
        " " +
        jobTypeStr
      );
    } else {
      return "";
    }
  };

  return (
    <div>
      <HeaderHasLog></HeaderHasLog>

      {diet ? (
        // Diet existed
        <div className="wrapper-schedule_page">
          <div className="site-card-wrapper_Schedule">
            <div className="title-card-wrapper">
              <div className="title-card-time-schedule">{dateStr}</div>
            </div>
            <br></br>
            <div className="title-card-wrapper">
              <div className="title-card-amount-calo">{getUserInfo(diet)}</div>
            </div>
            <br></br>
            <div className="title-card-wrapper">
              <div className="title-card-amount-calo">
                Mỗi ngày bạn cần khoảng {diet.totalExpectedCalo} calo
              </div>
            </div>
            <br></br>
            <div className="title-card-wrapper">
              <div className="title-card-amount-calo">
                Thực đơn chứa tổng {diet.totalCalo} calo
              </div>
            </div>

            <Row gutter={16}>
              <Col span={8}>
                <Card
                  title="Sáng"
                  bordered={false}
                  extra={
                    <ModalDetailFood foods={diet.breakfast}></ModalDetailFood>
                  }
                >
                  {diet.breakfast?.map((foodMass) => (
                    <Row className="padding_20">
                      <Col span={18} push={6}>
                        <div className="wrapper-about">
                          <div className="about-title">
                            {foodMass.mass.toFixed(1)} suất{" "}
                            {foodMass.food.foodName}
                          </div>
                        </div>
                      </Col>
                      <Col span={6} pull={18}>
                        <Image
                          width={100}
                          height={70}
                          src={`http://localhost:8080/food/${foodMass.food.id}/image`}
                        />
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Trưa"
                  bordered={false}
                  extra={
                    <ModalDetailFood foods={diet?.lunch}></ModalDetailFood>
                  }
                >
                  {diet.lunch?.map((foodMass) => (
                    <Row className="padding_20">
                      <Col span={18} push={6}>
                        <div className="wrapper-about">
                          <h5 className="about-title">
                            {foodMass.mass.toFixed(1)} suất{" "}
                            {foodMass.food.foodName}
                          </h5>
                        </div>
                      </Col>
                      <Col span={6} pull={18}>
                        <Image
                          width={100}
                          height={70}
                          src={`http://localhost:8080/food/${foodMass.food.id}/image`}
                        />
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Tối  "
                  bordered={false}
                  extra={
                    <ModalDetailFood foods={diet?.dinner}></ModalDetailFood>
                  }
                >
                  {diet.dinner?.map((foodMass) => (
                    <Row className="padding_20">
                      <Col span={18} push={6}>
                        <div className="wrapper-about">
                          <h5 className="about-title">
                            {foodMass.mass.toFixed(1)} suất{" "}
                            {foodMass.food.foodName}
                          </h5>
                        </div>
                      </Col>
                      <Col span={6} pull={18}>
                        <Image
                          width={100}
                          height={70}
                          src={`http://localhost:8080/food/${foodMass.food.id}/image`}
                        />
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        // No diet
        <div className="wrapper-schedule_page">
          <div className="site-card-wrapper" style={{ width: "100%" }}>
            <div className="title-card-wrapper">
              <div
                className="title-card-time-schedule"
                style={{ width: "100%", textAlign: "center", fontSize: "30px" }}
              >
                Vui lòng hoàn thành các quiz và lưu thực đơn của bạn để xem kế
                hoạch ăn uống
              </div>
            </div>
          </div>
        </div>
      )}

      <Footers></Footers>
    </div>
  );
};

export default UserPersonalSchedule;
