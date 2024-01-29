import React, { useState, useEffect } from "react";
import HeaderUser from "../../components/header/HeaderUser";
import Footers from "../../components/footer/footers";
import "../../assets/style/user/detailPage.css";
import { Col, Row, Image, Card, Divider } from "antd";
import { useParams } from "react-router-dom";
import FoodAPI from "../../service/Actions/FoodAPI";

const gridStyle = {
  width: "33.33333%",
  height: "120px",
  textAlign: "center",
};
const DetailFood = () => {
  const { foodID } = useParams();
  const [food, setFood] = useState(null);
  const [seasonStr, setSeasonStr] = useState("");
  const [mealStr, setMealStr] = useState("");

  useEffect(async () => {
    console.log(foodID);
    await FoodAPI.getById(foodID)
      .then((res) => {
        setFood(res.data);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    let seasonS = "";
    let mealS = "";

    food?.seasons?.map((season) => {
      seasonS += season.seasonName + " ";
    });
    food?.meals?.map((meal) => {
      mealS += meal.mealName + " ";
    });
    setSeasonStr(seasonS);
    setMealStr(mealS);
  }, [food]);

  return (
    <div>
      <HeaderUser></HeaderUser>
      <div className="wrapper-DetailPage">
        {food ? (
          <>
            <div className="wrapper-Img_sumary">
              <Row>
                <Col span={18} push={6}>
                  <div className="name_food_DetailPage">{food.foodName}</div>
                  <Card title="Thông tin dinh dưỡng ( Dựa trên 100g )">
                    <Card.Grid style={gridStyle}>
                      <div className="name_SumaryNutrition_Food">
                        {" "}
                        Hàm lượng calo
                      </div>
                      <div className="data_SmaryNutrition_Food">
                        {" "}
                        {food.calo}
                      </div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <div className="name_SumaryNutrition_Food">
                        {" "}
                        Hàm lượng chất béo
                      </div>
                      <div className="data_SmaryNutrition_Food">
                        {" "}
                        {food.fat}
                      </div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <div className="name_SumaryNutrition_Food">
                        {" "}
                        Hàm lượng chất bột đường
                      </div>
                      <div className="data_SmaryNutrition_Food">
                        {" "}
                        {food.carb}
                      </div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <div className="name_SumaryNutrition_Food">
                        {" "}
                        Hàm lượng chất đạm
                      </div>
                      <div className="data_SmaryNutrition_Food">
                        {" "}
                        {food.protein}
                      </div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <div className="name_SumaryNutrition_Food">
                        {" "}
                        Phù hợp các mùa
                      </div>
                      <div className="data_SmaryNutrition_Food">
                        {" "}
                        {seasonStr}
                      </div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <div className="name_SumaryNutrition_Food">
                        Dành cho bữa
                      </div>
                      <div className="data_SmaryNutrition_Food"> {mealStr}</div>
                    </Card.Grid>
                  </Card>
                </Col>
                <Col span={6} pull={18}>
                  <Image
                    width={350}
                    height={350}
                    className="image_Food_Detail"
                    src={`http://localhost:8080/food/${food?.id}/image`}
                  />
                </Col>
              </Row>
            </div>
            <div className="wrapper_RelateFood">
              <div className="name_RelateFood">Thành phần trong món ăn</div>
              {food.ingredientMasses ? (
                food.ingredientMasses.map((ingredientMass) => (
                  <div className="box_RelateFood">
                    <Image
                      width={150}
                      height={100}
                      src={`http://localhost:8080/ingredient/${ingredientMass.ingredient.id}/image`}
                    />
                    <div className="main-box_RelateFood">
                      <div className="nameIngredient_boxDetailFood">
                        {ingredientMass.ingredient.ingredientName}
                      </div>
                      {/* <div className="contentIngredient_boxDetailFood">
                          Nội dung thành phần
                        </div> */}
                      <div className="contentIngredient_boxDetailFood">
                        {ingredientMass.mass} gram
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
              <div className="name_RelateFood">Công thức nấu</div>
              <div className="box_RelateFood">
                <div className="main-box_RelateFood">
                  <div className="nameIngredient_boxDetailRecipe">
                    {food?.recipe}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Footers></Footers>
    </div>
  );
};

export default DetailFood;
