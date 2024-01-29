import "./assets/style/common/App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthContextProvider from "./service/Actions/AuthAPI";
import "antd/dist/antd.css";
import "./assets/style/common/layout.css";
import Routes from "./routes/Routes";
import "./assets/style/admin/style.css";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Routes></Routes>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
