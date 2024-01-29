import React from "react";
import HeaderUser from "../../components/header/HeaderUser";
import HeaderHasLog from "../../components/header/HeaderHasLog";
import Footers from "../../components/footer/footers";
import "../../assets/style/user/libary.css";
import CardGroupFood from "../../components/groupCard/CardGroupFood";
import CardGroupIngredient from "../../components/groupCard/CardGroupIngredient";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import Pagination from "react-bootstrap/Pagination";

const LibaryPage = () => {
  return (
    <div>
      <HeaderHasLog></HeaderHasLog>
      <div className="wrapper-libary">
        <Tabs
          defaultActiveKey="Food"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          {/* Danh sách thức ăn hiển thị */}
          <Tab eventKey="Food" title="Món Ăn" activeKey>
            <CardGroupFood></CardGroupFood>
          </Tab>
          {/* Danh sách thành phần hiển thị */}
          <Tab eventKey="Ingredient" title="Thành Phần Món Ăn">
            <CardGroupIngredient></CardGroupIngredient>
          </Tab>
        </Tabs>
      </div>
      <Footers></Footers>
    </div>
  );
};

export default LibaryPage;
