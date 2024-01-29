import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../service/Actions/AuthAPI";
import Spinner from "react-bootstrap/Spinner";
import ReactDOM from "react-dom";
import AuthUtil from "../service/utils/AuthUtil";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const user = AuthUtil.getUserFromToken();
  const history = useHistory();

  const checkValidRole = async () => {
    let check = false;
    await user.then(res=> {
      roles.map(role => {
           if(res.data.role.name === role){
            check = true;
           }
      })
      if(check===false){
          history.push('/login');
      }
    })
  }

  return (
    <Route
      {...rest}
      render={() =>
        user? (
          <>
            <Component user={user} checkValidRole={checkValidRole} {...rest}/>
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};


export default ProtectedRoute;
