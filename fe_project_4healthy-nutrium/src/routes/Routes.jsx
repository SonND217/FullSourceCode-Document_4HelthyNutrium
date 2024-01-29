import React from "react";
import HomePage from "../pages/user/HomePage";
import HomeUser from "../pages/user/HomeUser";
import UserPersonalSchedule from "../pages/user/UserPersonalSchedule";
import ListUser from "../pages/admin/ListUser";
import NutrionExpertPage from "../pages/nutrion/NutrionExpertPage";
import UserProfile from "../pages/user/UserProfile";
import Landing from "../Landing";
import { Route } from "react-router-dom";
import ProtectedRoute from "../Middleware/ProtectedRoute";
import Quiz1 from "../components/onboarding/Quiz1";
import Quiz2 from "../components/onboarding/Quiz2";
import Quiz3 from "../components/onboarding/Quiz3";
import Quiz4 from "../components/onboarding/Quiz4";
import Quiz5 from "../components/onboarding/Quiz5";
// import Quiz6 from "../components/onboarding/Quiz6";
import AddNewUser from "../components/drawn/AddNewUser";
import summaryInfo from "../components/onboarding/summaryInfo";
import pageLoadingQuiz from "../components/onboarding/pageLoadingQuiz";
import GetUserDiet from "../components/onboarding/GetUserDiet";
import LibraryPage from "../pages/user/LibraryPage";
import DetailFood from "../pages/user/DetailFood";
import DetailIngredient from "../pages/user/DetailIngredient";
import LoginForm from "../components/form/LoginForm";
import ResetPasswordForm from "../components/form/ResetPasswordForm";
import RegisterForm from "../components/form/RegisterForm";

const Routes = () => {

  const USER = 'USER';
  const ADMIN = 'ADMIN';
  const NUTRIENT = 'NUTRIENT_EXPERT';

  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/resetpassword" component={ResetPasswordForm} />
      
      <ProtectedRoute exact path="/user" component={ListUser} roles = {[ADMIN]} />
      <ProtectedRoute exact path="/home" component={HomePage} roles = {[USER]}/>
      <ProtectedRoute exact path="/profile" component={UserProfile} roles = {[USER]}/>
      <ProtectedRoute exact path="/nutrionexpert" component={NutrionExpertPage} roles = {[NUTRIENT]} />
      <ProtectedRoute exact path="/nutrionexpert/food" component={NutrionExpertPage}  changePage="food" roles = {[NUTRIENT]} />
      <ProtectedRoute exact path="/nutrionexpert/ingredients" component={NutrionExpertPage}  changePage="ingredients" roles = {[NUTRIENT]} />

      <ProtectedRoute exact path="/onboarding/quiz1" component={Quiz1} roles = {[USER]}/>
      <ProtectedRoute exact path="/onboarding/quiz2" component={Quiz2} roles = {[USER]}/>
      <ProtectedRoute exact path="/onboarding/quiz3" component={Quiz3} roles = {[USER]}/>
      <ProtectedRoute exact path="/onboarding/quiz4" component={Quiz4} roles = {[USER]}/>
      <ProtectedRoute exact path="/onboarding/quiz5" component={Quiz5} roles = {[USER]}/>
      <ProtectedRoute exact path="/onboarding/summaryInfo" component={summaryInfo} roles = {[USER]}/>
      
      <ProtectedRoute exact path="/onboarding/diet" component={GetUserDiet} roles = {[USER]}/>
      <ProtectedRoute exact path="/schedule" component={UserPersonalSchedule} roles = {[USER]}/>
      <ProtectedRoute exact path="/recommendation" component={HomeUser} roles = {[USER]}/>
      <Route exact path="/library" component={LibraryPage}/>
      <Route exact path="/food/:foodID" component={DetailFood}/>
      <Route exact path="/ingredient/:ingredientID" component={DetailIngredient}/>
      <Route exact path="/onboarding/pageLoadingQuiz" component={pageLoadingQuiz}/>
      <ProtectedRoute exact path="/admin/add-nutrient" component={AddNewUser} roles = {[ADMIN]}/>
    </div>
  );
};

export default Routes;
