import React, { useState, useEffect } from "react";
import HeaderUser from "../../components/header/HeaderUser";
import Footers from "../../components/footer/footers";
import "../../assets/style/user/detailPage.css";
import { Col, Row, Image, Card, Divider } from "antd";
import Table from "react-bootstrap/Table";
import IngredientAPI from "../../service/Actions/IngredientAPI";
import { useParams } from "react-router-dom";

const gridStyle = {
  width: "33.33333%%",
  height: "120px",
  textAlign: "center",
};
const DetailIngredient = () => {
  const { ingredientID } = useParams();
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    IngredientAPI.getById(ingredientID).then((res) => {
      setIngredient(res.data);
    });
  }, []);

  return (
    <div>
      <HeaderUser></HeaderUser>
      <div className="wrapper-DetailPage">
        <div className="wrapper-Img_sumary">
          <Row>
            <Col span={18} push={6}>
              <div className="name_food_DetailPage">
                {ingredient?.ingredientName}
              </div>
              <Card title="Tóm tắt các chất dinh dưỡng chính ( Dựa trên 100g )">
                <Card.Grid style={gridStyle}>
                  <div className="name_SumaryNutrition"> Hàm lượng calo</div>
                  <div className="data_SmaryNutrition"> {ingredient?.calo}</div>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <div className="name_SumaryNutrition">
                    {" "}
                    Hàm lượng chất béo
                  </div>
                  <div className="data_SmaryNutrition"> {ingredient?.fat}</div>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <div className="name_SumaryNutrition">
                    {" "}
                    Hàm lượng chất bột đường
                  </div>
                  <div className="data_SmaryNutrition"> {ingredient?.carb}</div>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <div className="name_SumaryNutrition">
                    {" "}
                    Hàm lượng chất đạm
                  </div>
                  <div className="data_SmaryNutrition">
                    {" "}
                    {ingredient?.protein}
                  </div>
                </Card.Grid>
                {/* <Card.Grid style={gridStyle}>
                  <div className="name_SumaryNutrition">
                    Hàm lượng nước trong nguyên liệu
                  </div>
                  <div className="data_SmaryNutrition"> 120</div>
                </Card.Grid> */}
              </Card>
            </Col>
            <Col span={6} pull={18}>
              <Image
                width={350}
                height={350}
                className="image_Ingredient_Detail"
                src={`http://localhost:8080/ingredient/${ingredient?.id}/image`}
              />
            </Col>
          </Row>
        </div>
        <div className="wrapper-nutrionFacts_RelateFood">
          <Row>
            <Col span={24}>
              <div className="wrapper-nutrionFacts">
                {/* Bảng chưa giá trị dinh dưỡng */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Chất Dinh Dưỡng</th>
                      <th>Giá trị dinh dưỡng mỗi 100 g</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chất xơ</td>
                      <td>{ingredient?.fiber}</td>
                    </tr>
                    <tr>
                      <td>Tro</td>
                      <td>{ingredient?.ash}</td>
                    </tr>
                    <tr>
                      <td>Canxi</td>
                      <td>{ingredient?.canxi}</td>
                    </tr>
                    <tr>
                      <td>Nước</td>
                      <td>{ingredient?.water}</td>
                    </tr>
                    <tr>
                      <td>Sắt</td>
                      <td>{ingredient?.iron}</td>
                    </tr>
                    <tr>
                      <td>Kẽm</td>
                      <td>{ingredient?.zinc}</td>
                    </tr>
                    <tr>
                      <td>Vitamin A</td>
                      <td>{ingredient?.vitaminA}</td>
                    </tr>
                    <tr>
                      <td>Vitamin B1</td>
                      <td>{ingredient?.vitaminB1}</td>
                    </tr>
                    <tr>
                      <td>vitamin B2</td>
                      <td>{ingredient?.vitaminB2}</td>
                    </tr>
                    <tr>
                      <td>vitamin B3</td>
                      <td>{ingredient?.vitaminB3}</td>
                    </tr>
                    <tr>
                      <td>vitamin B6A</td>
                      <td>{ingredient?.vitaminB6A}</td>
                    </tr>
                    <tr>
                      <td>vitamin B12</td> <td>{ingredient?.vitaminB12}</td>
                    </tr>
                    <tr>
                      <td>Vitamin C</td>
                      <td>{ingredient?.vitaminC}</td>
                    </tr>
                    <tr>
                      <td>vitamin D</td> <td>{ingredient?.vitaminD}</td>
                    </tr>

                    <tr>
                      <td>vitamin ARae</td> <td>{ingredient?.vitaminARae}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
            {/* <Col span={12}>
              <div className="wrapper_RelateFood">
                <div className="name_RelateFood">
                  Những món ăn cùng chứa thành phần này
                </div>
                <div className="box_RelateFood">
                  <Image
                    width={150}
                    height={100}
                    src="https://images5.alphacoders.com/826/826208.jpg"
                  />
                  <div className="nameFood_box_RelateFood">Tên món ăn</div>
                </div>
                <div className="box_RelateFood">
                  <Image
                    width={150}
                    height={100}
                    src="https://images5.alphacoders.com/826/826208.jpg"
                  />
                  <div className="nameFood_box_RelateFood">Tên món ăn</div>
                </div>
                <div className="box_RelateFood">
                  <Image
                    width={150}
                    height={100}
                    src="https://images5.alphacoders.com/826/826208.jpg"
                  />
                  <div className="nameFood_box_RelateFood">Tên món ăn</div>
                </div>
              </div>
            </Col> */}
          </Row>
        </div>
      </div>
      <Footers></Footers>
    </div>
  );
};

export default DetailIngredient;
