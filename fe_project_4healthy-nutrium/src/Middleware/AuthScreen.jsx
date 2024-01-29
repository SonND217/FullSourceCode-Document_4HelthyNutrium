import React from "react";
import LoginForm from "../components/form/LoginForm";
import RegisterForm from "../components/form/RegisterForm";
import { AuthContext } from "../service/Actions/AuthAPI";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import SendMailForm from "../components/form/SendMailForm";
import ResetPasswordForm from "../components/form/ResetPasswordForm";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated, UserRole },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated && UserRole === "ADMIN") {
    return <Redirect to="/admin/dashboard" />;
  } else if (isAuthenticated && UserRole === "USER") {
    return <Redirect to="/homeuser" />;
  } else if (isAuthenticated && UserRole === "NUTRIENT_EXPERT") {
    return <Redirect to="/nutrionexpert/information" />;
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
        {authRoute === "sendmail" && <SendMailForm />}
        {authRoute === "resetpassword" && <ResetPasswordForm />}
      </>
    );
  }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-all">
          <div className="landing-inner-second">{body}</div>
          <div className="landing-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
