import React from "react";

const Footers = () => {
  return (
    <div style={{ backgroundColor: "#001529" }}>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0">
          <div className="custom-navbar">
            <div className="container">
              <div className="navbar-header">
                <button className="navbar-toggle"></button>
                <div href="index.html" className="navbar-brand">
                  4Healthy <span>.</span> Nutrium
                </div>
              </div>
            </div>
          </div>
        </p>

        <div
          href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        ></div>

        {/* <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="#" className="nav-link px-2">
              Trang chủ
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2">
              Thư viện
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2">
              Chế độ ăn uống
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2">
              Bài tập thể thao dành cho bạn
            </a>
          </li>
        </ul> */}
      </footer>
    </div>
  );
};

export default Footers;
