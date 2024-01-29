import React from "react";
import HeaderNutritionExpertManager from "../../components/header/HeaderNutritionExpertManager";
import SlidebarNutrionExp from "./SlidebarNutrionExp";
import NutriongExpertInformation from "./NutrionExpertInformation";
import NutrionExpertIngredients from "./NutrionExpertIngredients";
import NutrionExpertFood from "./NutrionExpertFood";

function NutrionExpertPage({ user, changePage, checkValidRole }) {
  let body = (
    <>
      {/* {changePage === "information" && <NutriongExpertInformation />} */}
      {/* {changePage === "" && <NutriongExpertInformation />} */}
      {changePage === "food" && (
        <NutrionExpertFood checkValidRole={checkValidRole} />
      )}
      {changePage === "ingredients" && (
        <NutrionExpertIngredients checkValidRole={checkValidRole} />
      )}
    </>
  );
  return (
    <div>
      <HeaderNutritionExpertManager
        title={"Trang chuyên gia dinh dưỡng"}
        user={user}
      ></HeaderNutritionExpertManager>
      <SlidebarNutrionExp>{body}</SlidebarNutrionExp>
    </div>
  );
}

export default NutrionExpertPage;
