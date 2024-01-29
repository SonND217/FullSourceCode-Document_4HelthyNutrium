import React from "react";
import { Layout, Card, Col, Row, Carousel } from "antd";
import Footers from "../../components/footer/footers";
import "../../assets/style/user/homepage.css";
import { Link } from "react-router-dom";
import HeaderUser from "../../components/header/HeaderUser";
import slideImage1 from "../../assets/image/slider-image1.jpg";
import slideImage2 from "../../assets/image/slider-image2.jpg";
import slideImage3 from "../../assets/image/slider-image3.jpg";
import imageCardTeachUseWeb1 from "../../assets/image/p1.png";
import imageCardTeachUseWeb2 from "../../assets/image/p2.png";
import imageCardTeachUseWeb3 from "../../assets/image/p3.png";
const { Header, Footer, Content } = Layout;
const contentStyle1 = {
  height: "500px",
  color: "#fff",
  lineHeight: "500px",
  textAlign: "center",
  backgroundImage: `url(${slideImage1})`,
};
const contentStyle2 = {
  height: "500px",
  color: "#fff",
  lineHeight: "500px",
  textAlign: "center",
  backgroundImage: `url(${slideImage2})`,
};
const contentStyle3 = {
  height: "500px",
  color: "#fff",
  lineHeight: "500px",
  textAlign: "center",
  backgroundImage: `url(${slideImage3})`,
};

const contentStyle4 = {
  fontSize: "30px",
  height: "240px",
  width: "240px",
  backgroundSize: "cover",
  backgroundImage: `url(${imageCardTeachUseWeb1})`,
};
const contentStyle5 = {
  fontSize: "20px",
  height: "240px",
  width: "240px",
  backgroundSize: "cover",
  backgroundImage: `url(${imageCardTeachUseWeb2})`,
  marginBottom: "50px",
  marginTop: "50px",
};
const contentStyle6 = {
  fontSize: "30px",
  height: "240px",
  width: "240px",
  backgroundSize: "cover",
  backgroundImage: `url(${imageCardTeachUseWeb3})`,
};
const HomePage = ({checkValidRole}) =>{ 
  checkValidRole();
  return (
  <>
    <HeaderUser></HeaderUser>
    <Layout>
      <Content className="wrapper-cover">
        <div className="wrapper-slider-image">
          <Carousel autoplay dotPosition="left">
            <div>
              <div style={contentStyle1} className="margin-bottom-30"></div>
            </div>
            <div>
              <div style={contentStyle2}></div>
            </div>
            <div>
              <div style={contentStyle3}></div>
            </div>
          </Carousel>
          <div className="wraper-slider-content">
            <div className="title-content-head">
              Tận hưởng ăn uống một cách thoải mái và hiệu quả
            </div>
            <div className="title-content-head-small">
              Hãy để bản thân được hướng dẫn bởi các chuyên gia của chúng tôi và
              các mục tiêu về sức khỏe của bạn sẽ nằm trong tầm tay.
            </div>
            <Link to="/onboarding/quiz1">
              <a>
                <div className="btn-content-head">
                  Làm bài kiểm tra của chúng tôi
                </div>
              </a>
            </Link>
          </div>
        </div>
        {/* <div className="wrapper-page-second"> */}
        <div className="title-page-second__wrapper">
          <p className="title-page-second-1">Cách mà chúng tôi sẽ giúp bạn</p>
          <p className="title-page-second-2">
            Hãy nói cho chúng tôi các mục tiêu của bạn
            <p className="title-page-second-3">
              Chúng tôi sẽ giúp bạn đạt được mục tiêu
            </p>
          </p>
          <div class="flex-image-contain">
            <div style={contentStyle4}>
              <div className="step-one_title">
                Trả lời câu hỏi trong phần{" "}
                <Link to="/login">
                  <a>kiểm tra</a>
                </Link>{" "}
                của chúng tôi
                <h5>Một bài kiểm tra nhỏ chỉ tốn vài phút của bạn</h5>
              </div>
            </div>
            <div style={contentStyle5}>
              <div className="step-two_title">
                Nhận lấy kế hoạch của bạn
                <h5>
                  Chúng tôi sẽ tạo một kế hoạch bữa ăn phù hợp với sở thích và
                  nhu cầu của bạn
                </h5>
              </div>
            </div>
            <div style={contentStyle6}>
              <div className="step-three_title">
                Thực hiện từng bước một mục tiêu
                <h5>
                  Hướng dẫn chuyên gia của chúng tôi giúp bạn đi đúng hướng.
                </h5>
              </div>
            </div>
          </div>
        </div>

        <Footers></Footers>
      </Content>
    </Layout>
  </>
);
}
export default HomePage;
