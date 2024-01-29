import jwt from "jwt-decode";
import UserAPI from "../Actions/UserAPI";
import { useHistory } from "react-router-dom";

const AuthUtil = {

  getUserFromToken() {
    try {
      let token = localStorage.getItem("jwt");
      if(token === null){
        return null;
      }
      // let token = JSON.parse(localStorage.getItem("token"));
      let tokenUser = jwt(token);
      return UserAPI.getByEmail(tokenUser.sub);
    } catch (error) {
      return null;
    }
  },
}


export default AuthUtil;
