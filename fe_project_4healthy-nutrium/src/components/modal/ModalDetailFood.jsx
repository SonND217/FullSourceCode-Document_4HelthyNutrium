import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Col, Row } from "antd";
import "../../assets/style/common/Modal-detail.css";
import { Image } from "antd";
const ModalDetailFood = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foods, setFoods] = useState(props.foods);

  useEffect(() => {
    setFoods(props.foods);
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#059669", borderColor: "#059669" }}
      >
        Xem chi tiết
      </Button>
      <Modal
        title="Thông tin món ăn của bạn"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="1700px"
      >
        {foods ? (
          foods.map((foodMass) => (
            <div className="wrapper-detail">
              <div className="detail-nameFood">
                <Image
                  width={100}
                  src={`http://localhost:8080/food/${foodMass.food.id}/image`}
                />
                <h4>
                  {foodMass.mass} suất {foodMass.food.foodName}
                </h4>
              </div>

              <div className="site-card-wrapper">
                <Row gutter={24} bordered={false}>
                  <Col span={6}>
                    <Card
                      title="Hàm lượng Calo"
                      bordered={false}
                      headStyle={{
                        fontSize: 20,
                        fontWeight: 1000,
                        textAlign: "center",
                      }}
                    >
                      <p className="content-card-detailFood">
                        {(foodMass.mass * foodMass.food.calo).toFixed(1)} kcal
                      </p>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      title="Hàm lượng chất bột đường"
                      bordered={false}
                      headStyle={{
                        fontSize: 20,
                        fontWeight: 1000,
                        textAlign: "center",
                      }}
                    >
                      <p className="content-card-detailFood">
                        {" "}
                        {(foodMass.mass * foodMass.food.carb).toFixed(1)} g
                      </p>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      title="Hàm lượng chất béo"
                      headStyle={{
                        fontSize: 20,
                        fontWeight: 1000,
                        textAlign: "center",
                      }}
                      bordered={false}
                    >
                      <p className="content-card-detailFood">
                        {" "}
                        {(foodMass.mass * foodMass.food.fat).toFixed(1)} g
                      </p>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      title="Hàm lượng chất đạm"
                      headStyle={{
                        fontSize: 20,
                        fontWeight: 1000,
                        textAlign: "center",
                      }}
                      bordered={false}
                    >
                      <p className="content-card-detailFood">
                        {" "}
                        {(foodMass.mass * foodMass.food.protein).toFixed(1)} g
                      </p>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};
export default ModalDetailFood;
