import React from "react";
import HeaderUser from "../header/HeaderUser";
import HeaderHasLog from "../header/HeaderHasLog";
import Footers from "../footer/footers";
import "../../assets/style/user/quizpage.css";
import { Card, Space, Image } from "antd";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Progress from "../progress/Progress";
import ChartBMI from "../chart/chartBMI";
import ChartCalo from "../chart/chartCalo";
import ModalChangeInfoUser_Summary from "../modal/ModalChangeInfoUser_Summary";
import Notification from "../toats/Notification";
import imageCalo from "../../assets/image/Calo_image.png";
import imageFarina from "../../assets/image/Farina_image.png";
import imageProtein from "../../assets/image/protein_image.jpg";
import imageFat from "../../assets/image/Fat_Image.png";
const summaryInfo = () => {
  return (
    <>
      <HeaderHasLog></HeaderHasLog>
      <div className="wrapper-quiz_page">
        <Notification
          message="lưu thành công"
          description="lưu thành công tài khoản"
        ></Notification>
        <div className="wrapper-ProgressBar">
          <Progress per="45"></Progress>
        </div>
        <div className="wrapper-title-quiz">
          <p>Tóm tắt thông tin</p>
        </div>
        <div className="wrapper-table-option">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Card
              title="Thông tin cơ thể"
              size="small"
              extra={
                <ModalChangeInfoUser_Summary
                  age="Bác Sĩ"
                  kg="175"
                  cm="7"
                ></ModalChangeInfoUser_Summary>
              }
            >
              <p>Bác Sĩ</p>
              <p>175 chiều cao (cm) </p>
              <p>77 cân nặng (kg)</p>
            </Card>
            <Card title="BMI của bạn" size="small">
              <ChartBMI></ChartBMI>
              <p className="center-text">Quá cân</p>
            </Card>
            <Card title="Lượng nước nạp vào" size="small">
              <div className="icon-water">
                <div className="center-icon" />
                <p className="center-text">2L nước</p>
                <p className="center-text">
                  Lượng nước ít nhận một ngày của bạn cần cho cơ thể
                </p>
              </div>
            </Card>
            <Card title="Lượng Calo hàng ngày" size="small">
              <div className="image_center">
                <Image width={200} src={imageCalo} />
              </div>
              <p className="center-text">
                <p>Được khuyến nghị</p>2000 KCal
              </p>
            </Card>
            <Card title="Lượng chất bột đường hàng ngày" size="small">
              <div className="image_center">
                <Image width={200} src={imageFarina} />
              </div>
              <p className="center-text">
                <p>Được khuyến nghị</p>170 G
              </p>
            </Card>
            <Card title="Lượng đạm hàng ngày" size="small">
              <div className="image_center">
                <Image
                  width={200}
                  src={imageProtein}
                  style={{ margin: "auto" }}
                />
              </div>

              <p className="center-text">
                <p>Được khuyến nghị</p>50 G
              </p>
            </Card>
            <Card title="Lượng chất béo hàng ngày" size="small">
              <div className="image_center">
                <Image width={200} src={imageFat} />
              </div>
              <p className="center-text">
                <p>Được khuyến nghị</p>35 G
              </p>
            </Card>
          </Space>
          <Link to="/onboarding/quiz5">
            <Button variant="success" className="button_Link">
              Lưu và tiếp tục
            </Button>
          </Link>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
};

export default summaryInfo;
