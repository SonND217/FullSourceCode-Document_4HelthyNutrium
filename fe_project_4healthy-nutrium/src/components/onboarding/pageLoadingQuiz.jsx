import React, { useState, useEffect } from "react";
import HeaderUser from "../header/HeaderUser";
import Footers from "../footer/footers";
import "../../assets/style/user/quizpage.css";
import { Card, Space, Result } from "antd";
import { Link } from "react-router-dom";
import ChartSuccess from "../chart/chartSuccess";
import Button from "react-bootstrap/Button";
import Progress from "../progress/Progress";

const resultQuiz = () => {
  return (
    <>
      <HeaderUser></HeaderUser>
      <div className="wrapper-quiz_page">
        <div className="wrapper-ProgressBar">
          <Progress per="80"></Progress>
        </div>
        <div className="wrapper-title-quiz">
          <p>Đang xử lý kế hoạch bữa ăn</p>
        </div>
        <div className="wrapper-table-option">
          <ChartSuccess></ChartSuccess>
          <Link to="/onboarding/quiz7">
            <Button variant="success" className="button_Link">
              Tiếp tục
            </Button>
          </Link>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
};

export default resultQuiz;
