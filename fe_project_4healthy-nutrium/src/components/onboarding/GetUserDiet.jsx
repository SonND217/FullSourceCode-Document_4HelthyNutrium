import HeaderUser from "../header/HeaderUser";
import Footers from "../footer/footers";
import "../../assets/style/user/quizpage.css";
import { Card, Space, Row, Col, Image, Modal } from "antd";
import Button from "react-bootstrap/Button";
import Progress from "../progress/Progress";
import Spinner from "react-bootstrap/Spinner";
import React, { useEffect, useState } from "react";
import DietAPI from "../../service/Actions/DietAPI";
import FoodAPI from "../../service/Actions/FoodAPI";
import Moment from "moment";
import AlertMessage from "../alert/AlertMessage";

const GetUserDiet = ({ checkValidRole }) => {
  checkValidRole();
  const [diet, setDiet] = useState(null);
  const [breakfastIndex, setBreakfastIndex] = useState(0);
  const [lunchIndex, setLunchIndex] = useState(0);
  const [dinnerIndex, setDinnerIndex] = useState(0);
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [detailMass, setDetailMass] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const gridStyle = {
    width: "20%",
    textAlign: "center",
  };
  useEffect(async () => {
    const quizData = JSON.parse(localStorage.getItem("quiz-data"));
    if (quizData === null) {
      setAlert({
        type: "danger",
        message: "Vui lòng hoàn thành tất cả quiz để tìm thực đơn của bạn",
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    await DietAPI.getDietOptions(quizData)
      .then((res) => {
        setDiet(res.data);
      })
      .catch((e) => {
        setAlert({
          type: "danger",
          message: e.response.data
            ? e.response.data.message
            : "Không thể tìm thực đơn phù hợp với bạn",
        });
        setTimeout(() => setAlert(null), 5000);
      });
  }, []);

  const changeBreakfast = (event) => {
    if (breakfastIndex < diet.breakfastOptions.length - 1) {
      setBreakfastIndex(breakfastIndex + 1);
    } else {
      setBreakfastIndex(0);
    }
  };

  const changeLunch = (event) => {
    if (lunchIndex < diet.lunchOptions.length - 1) {
      setLunchIndex(lunchIndex + 1);
    } else {
      setLunchIndex(0);
    }
  };

  const changeDinner = (event) => {
    if (dinnerIndex < diet.dinnerOptions.length - 1) {
      setDinnerIndex(dinnerIndex + 1);
    } else {
      setDinnerIndex(0);
    }
  };

  async function saveDiet(event) {
    event.preventDefault();
    if (diet) {
      let today = new Date();
      // let toDayStr = new Date(today.toLocaleString("en-US", {t5imeZone: "Asia/Jakarta"}));
      let toDayStr = Moment(today).format("yyyy-MM-DD HH:mm:ss");

      const breakfast = diet.breakfastOptions
        ? diet.breakfastOptions[breakfastIndex]
        : [];
      const lunch = diet.lunchOptions ? diet.lunchOptions[lunchIndex] : [];
      const dinner = diet.dinnerOptions
        ? diet.dinnerOptions[breakfastIndex]
        : [];

      let data = {
        user: diet.user,
        job: diet.job,
        weight: diet.weight,
        height: diet.height,
        date: toDayStr,
        breakfastCalo: diet?.breakfastCalo,
        lunchCalo: diet?.lunchCalo,
        dinnerCalo: diet?.dinnerCalo,
        breakfastCarb: diet?.breakfastCarb,
        lunchCarb: diet?.lunchCarb,
        dinnerCarb: diet?.dinnerCarb,
        breakfastProtein: diet?.breakfastProtein,
        lunchProtein: diet?.lunchProtein,
        dinnerProtein: diet?.dinnerProtein,
        breakfastFat: diet?.breakfastFat,
        lunchFat: diet?.lunchFat,
        dinnerFat: diet?.dinnerFat,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
      };

      await DietAPI.save(data)
        .then((res) => {
          setAlert({ type: "success", message: "Lưu thực đơn thành công" });
          setTimeout(() => setAlert(null), 5000);
        })
        .catch((e) => {
          setAlert({
            type: "danger", message: e.response ? e.response.data.message : "Lưu thực đơn không thành công",
          });
          setTimeout(() => setAlert(null), 5000);
        });
    } else {
      setAlert({ type: "danger", message: "Không có thực đơn để lưu" });
      setTimeout(() => setAlert(null), 5000);
    }
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, [loading]);

  useEffect(async () => {
    if (detail) {
      await FoodAPI.getById(detail.food.id)
        .then(res => {
          setDetailMass(res.data);
        })
        .catch(e => {
          setDetailMass(null);
        })
    }
  }, [detail]);

  return (
    <>
      <HeaderUser></HeaderUser>
      {/* Modal mở ra ở đây */}
      <Modal
        title="Thông tin chi tiết"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Card
          title={detail ? `${detail.mass} suất ${detail.food.foodName}` : ""}
        >
          <Image
            width={190}
            height={140}
            src={`http://localhost:8080/food/${detail ? detail.food.id : ""
              }/image`}
          />
          <Card.Grid style={gridStyle}>
            {detail ? (
              <>
                Hàm lượng calo: <br />{" "}
                {(detail.food.calo * detail.mass).toFixed(1)}
              </>
            ) : (
              <></>
            )}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            {detail ? (
              <>
                Hàm lượng chất béo: <br />{" "}
                {(detail.food.fat * detail.mass).toFixed(1)}
              </>
            ) : (
              <></>
            )}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            {detail ? (
              <>
                Hàm lượng chất đạm: <br />{" "}
                {(detail.food.protein * detail.mass).toFixed(1)}
              </>
            ) : (
              <></>
            )}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            {detail ? (
              <>
                Hàm lượng bột đường: <br />{" "}
                {(detail.food.carb * detail.mass).toFixed(1)}
              </>
            ) : (
              <></>
            )}
          </Card.Grid>
        </Card>

        {detail ?
          (detailMass?.ingredientMasses?.map(ingredientMass => (
            <Card
              title={`${detail.mass * ingredientMass.mass} gram ${ingredientMass.ingredient.ingredientName}`}
            >
              <Image
                width={190}
                height={140}
                src={`http://localhost:8080/ingredient/${ingredientMass.ingredient.id}/image`}
              />
              <Card.Grid style={gridStyle}>
                Hàm lượng calo: <br />{" "}
                {(ingredientMass.ingredient.calo * ingredientMass.mass * detail.mass * 0.01).toFixed(1)}
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                Hàm lượng chất béo: <br />{" "}
                {(ingredientMass.ingredient.fat * ingredientMass.mass * detail.mass * 0.01).toFixed(1)}
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                Hàm lượng chất đạm: <br />{" "}
                {(ingredientMass.ingredient.protein * ingredientMass.mass * detail.mass * 0.01).toFixed(1)}
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                Hàm lượng bột đường: <br />{" "}
                {(ingredientMass.ingredient.carb * ingredientMass.mass * detail.mass * 0.01).toFixed(1)}
              </Card.Grid>
            </Card>
          )))
          : <></>
        }
      </Modal>

      <div className="wrapper-quiz_page">
        <div className="wrapper-ProgressBar">
          <Progress per="100"></Progress>
        </div>
        <div className="wrapper-title-quiz">
          <p>
            <a style={{ color: "#ff8000" }}>Hoàn thành!!</a> dưới đây là kế
            hoạch cho bữa ăn hàng ngày của bạn
          </p>
        </div>
        <div className="wrapper-table-option">
          <AlertMessage info={alert} />
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {/* Sáng */}
            <Card
              title="Bữa Sáng"
              size="small"
              extra={<Button onClick={changeBreakfast}>Đổi món</Button>}
            >
              {diet?.breakfastOptions.length > 0 ? (
                <Row>
                  <div className="CardTitle-Info_Calo">
                    Tổng calo cần xấp xỉ
                  </div>
                  <div className="CardTitle-Info_Number">
                    {diet.breakfastCalo}
                  </div>
                </Row>
              ) : (
                <>
                  {/* <Row>
                      <div className="CardTitle-Info_Calo">
                        Chưa tìm được thực đơn cho bữa sáng
                      </div>
                    </Row> */}
                </>
              )}
              {diet?.breakfastOptions.length > 0 ? (
                diet.breakfastOptions[breakfastIndex]?.map((foodMass) => (
                  <div
                    onClick={() => {
                      setDetail(foodMass);
                      showModal();
                    }}
                  >
                    <Row className="padding_20">
                      <Col span={18} push={6}>
                        <div className="wrapper-food-quantitative">
                          <h5 className="CardName-food">
                            {foodMass.mass.toFixed(1)} suất{" "}
                            {foodMass.food.foodName}
                          </h5>

                          <h5 className="CardName-caloFood">
                            Calo: <b> {foodMass.food.calo}</b>
                          </h5>
                        </div>
                      </Col>
                      <Col span={6} pull={18}>
                        <Image
                          width={120}
                          height={80}
                          src={`http://localhost:8080/food/${foodMass.food.id}/image`}
                        />
                      </Col>
                    </Row>
                  </div>
                ))
              ) : loading ? (
                <div>
                  <div className="Messageloading-getUserDiet">
                    <div className="title-name">Đang tải món ăn....</div>
                    <Spinner animation="border" variant="primary" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="Messageloading-getUserDiet">
                    <div className="title-name">
                      Chưa tìm được thực đơn cho bữa sáng
                    </div>
                  </div>
                </div>
              )}
            </Card>
            {/* Trưa */}
            <Card
              title="Bữa Trưa"
              size="small"
              extra={<Button onClick={changeLunch}>Đổi món</Button>}
            >
              {diet?.lunchOptions.length > 0 ? (
                <Row>
                  <div className="CardTitle-Info_Calo">
                    Tổng calo cần xấp xỉ
                  </div>
                  <div className="CardTitle-Info_Number">{diet.lunchCalo}</div>
                </Row>
              ) : (
                <>
                  {/* <Row>
                    <div className="CardTitle-Info_Calo">
                      Không tìm được thực đơn phù hợp cho bữa trưa
                    </div>
                  </Row> */}
                </>
              )}
              {diet?.lunchOptions.length > 0 ? (
                diet.lunchOptions[lunchIndex]?.map((foodMass) => (
                  <div
                    onClick={() => {
                      setDetail(foodMass);
                      showModal();
                    }}
                  >
                    <Row className="padding_20">
                      <Col span={18} push={6}>
                        <div className="wrapper-food-quantitative">
                          <h5 className="CardName-food">
                            {foodMass.mass.toFixed(1)} suất{" "}
                            {foodMass.food.foodName}
                          </h5>

                          <h5 className="CardName-caloFood">
                            Calo: <b> {foodMass.food.calo}</b>
                          </h5>
                        </div>
                      </Col>
                      <Col span={6} pull={18}>
                        <Image
                          width={120}
                          height={80}
                          src={`http://localhost:8080/food/${foodMass.food.id}/image`}
                        />
                      </Col>
                    </Row>
                  </div>
                ))
              ) : loading ? (
                <div>
                  <div className="Messageloading-getUserDiet">
                    <div className="title-name">Đang tải món ăn....</div>
                    <Spinner animation="border" variant="primary" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="Messageloading-getUserDiet">
                    <div className="title-name">
                      Chưa tìm được thực đơn cho bữa trưa
                    </div>
                  </div>
                </div>
              )}
            </Card>
            {/* Tối */}
            <Card
              title="Bữa Tối"
              size="small"
              extra={<Button onClick={changeDinner}>Đổi món</Button>}
            >
              {diet?.dinnerOptions.length > 0 ? (
                <Row>
                  <div className="CardTitle-Info_Calo">
                    Tổng calo cần xấp xỉ
                  </div>
                  <div className="CardTitle-Info_Number">{diet.dinnerCalo}</div>
                </Row>
              ) : (
                <>
                  {/* <Row>
                    <div className="CardTitle-Info_Calo">
                      Không tìm được thực đơn phù hợp cho bữa tối
                    </div>
                  </Row> */}
                </>
              )}
              {diet?.dinnerOptions.length > 0 ? (
                diet.dinnerOptions[dinnerIndex]?.map((foodMass) => (
                  <div
                    onClick={() => {
                      setDetail(foodMass);
                      showModal();
                    }}
                  >
                    <Row className="padding_20">
                      <Col span={18} push={6}>
                        <div className="wrapper-food-quantitative">
                          <h5 className="CardName-food">
                            {foodMass.mass.toFixed(1)} suất{" "}
                            {foodMass.food.foodName}
                          </h5>

                          <h5 className="CardName-caloFood">
                            Calo: <b> {foodMass.food.calo}</b>
                          </h5>
                        </div>
                      </Col>
                      <Col span={6} pull={18}>
                        <Image
                          width={120}
                          height={80}
                          src={`http://localhost:8080/food/${foodMass.food.id}/image`}
                        />
                      </Col>
                    </Row>
                  </div>
                ))
              ) : loading ? (
                <div>
                  <div className="Messageloading-getUserDiet">
                    <div className="title-name">Đang tải món ăn....</div>
                    <Spinner animation="border" variant="primary" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="Messageloading-getUserDiet">
                    <div className="title-name">
                      Chưa tìm được thực đơn cho bữa tối
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </Space>
          {/* <Link to="/login"> */}
          <Button variant="success" className="button_Link" onClick={saveDiet}>
            Lưu thực đơn
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <Footers></Footers>
    </>
  );
};

export default GetUserDiet;
