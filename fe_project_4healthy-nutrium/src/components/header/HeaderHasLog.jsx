import React, { useContext } from "react";
import "../../assets/style/user/header_footer.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const HeaderHasLog = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("quiz-data");
    history.push("/login");
  };

  return (
    <>
      <div className="header-wrapper">
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="wrapper-navbar-header"
        >
          <Container>
            <Navbar.Brand href="#home">
              <div className="custom-navbar">
                <div className="container">
                  <div className="navbar-header">
                    <button className="navbar-toggle"></button>
                    <div href="/home" className="navbar-brand">
                      4Healthy <span>.</span> Nutrium
                    </div>
                  </div>
                </div>
              </div>
            </Navbar.Brand>
            <div className="main-nav-link-btnLogin-btnSignin">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/home" className="text-nav-link">
                    Trang chủ
                  </Nav.Link>
                  <Nav.Link href="/library" className="text-nav-link">
                    Thư viện
                  </Nav.Link>
                  <Nav.Link href="/schedule" className="text-nav-link">
                    Kế hoạch ăn uống của bạn
                  </Nav.Link>
                  <Nav.Link href="/recommendation" className="text-nav-link">
                    Thông tin dinh dưỡng
                  </Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown
                    id="basic-nav-dropdown"
                    className="text-nav-link"
                  >
                    <Link to={"/profile"}>
                      <NavDropdown.Item href="#action/3.1">
                        Hồ sơ và bảo mật
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Divider />
                    <Link onClick={logout}>
                      <NavDropdown.Item href="#action/3.2">
                        Đăng xuất
                      </NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default HeaderHasLog;
