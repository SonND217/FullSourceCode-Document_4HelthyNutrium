import AxiosList from "./AxiosList";

const TestAPI = {
  login(data) {
    const querystring = require("querystring");
    const url = `/login`;
    return AxiosList.loginAxios.post(url, querystring.stringify(data));
  },

  getAllUser() {
    const url = `/user`;
    return AxiosList.authAxios.get(url);
  },

  sendEmail(email) {
    const url = `/user/forgot`;
    return AxiosList.authAxios.post(url,email);
  }

}
export default TestAPI