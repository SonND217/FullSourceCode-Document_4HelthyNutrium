import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ModalDetailFood from "../modal/ModalDetailFood";
import Button from "react-bootstrap/Button";
import { Col, Row, Input, Select } from "antd";
import Pagination from "react-bootstrap/Pagination";
import FoodAPI from "../../service/Actions/FoodAPI";
import CategoryAPI from "../../service/Actions/CategoryAPI";
import React, { useEffect, useState } from "react";

const { Search } = Input;
const mealOptions = [
  {
    value: null,
    label: "Tất cả",
  },
  {
    value: 1,
    label: "Bữa Sáng",
  },
  {
    value: 2,
    label: "Bữa Trưa",
  },
  {
    value: 3,
    label: "Bữa Tối",
  },
];

const seasonOptions = [
  {
    value: null,
    label: "Tất cả",
  },
  {
    value: 1,
    label: "Mùa Xuân",
  },
  {
    value: 2,
    label: "Mùa Hạ",
  },
  {
    value: 3,
    label: "Mùa Thu",
  },
  {
    value: 4,
    label: "Mùa Đông",
  },
];

function CardGroupFood() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFood = foods.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNum) => {
    if (pageNum <= 0) {
      pageNum = 1;
    } else if (pageNum > pageNumbers.length) {
      pageNum = pageNumbers.length;
    }
    setCurrentPage(pageNum);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(foods.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const loadFoodList = async () => {
    await FoodAPI.getActive()
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {});
  };
  const loadCategories = async () => {
    await CategoryAPI.getAll()
      .then((res) => {
        let cList = [];
        cList.push({
          value: null,
          label: "Tất cả",
        });
        res.data.map((category) => {
          cList.push({
            value: category.id,
            label: category.categoryName,
          });
        });
        setCategories(cList);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    loadFoodList();
    loadCategories();
  }, []);

  const [searchData, setSearchData] = useState({
    text: "",
    categoryId: null,
    mealId: null,
    seasonId: null,
  });

  //Lấy giá trị search
  const onSearch = async (text) => {
    let trimText = "";
    if (text) {
      trimText = text.trim();
    }
    searchData.text = trimText;
    FoodAPI.searchActive(searchData).then((res) => {
      setFoods(res.data);
    });
  };

  return (
    <>
      <div className="wrapper-search_select">
        <div className="search-input-text_libaryPage">
          Tìm Kiếm Món Ăn
          <Search
            placeholder="Nhập tên món ăn mà bạn cần tìm ở đây"
            allowClear
            enterButton="Tìm Kiếm"
            size="large"
            className="search-input-inside_libaryPage"
            onSearch={onSearch}
          />
        </div>
        <div className="wrapper_select-libary">
          <div className="name-select_libary">Loại món ăn</div>
          <Select
            defaultValue={null}
            className="select-list_Libary"
            bordered={false}
            options={categories}
            onChange={(value) => {
              setSearchData({ ...searchData, categoryId: value });
            }}
          />
        </div>

        {/* Kiểu món Ăn */}

        <div className="wrapper_select-libary">
          <div className="name-select_libary">Lọc theo bữa ăn</div>
          <Select
            defaultValue={null}
            className="select-list_Libary"
            bordered={false}
            options={mealOptions}
            onChange={(value) => {
              setSearchData({ ...searchData, mealId: value });
            }}
          />
        </div>
        {/* Lọc theo mùa*/}

        <div className="wrapper_select-libary">
          <div className="name-select_libary">Lọc theo mùa</div>
          <Select
            defaultValue={null}
            className="select-list_Libary"
            bordered={false}
            options={seasonOptions}
            onChange={(value) => {
              setSearchData({ ...searchData, seasonId: value });
            }}
          />
        </div>
      </div>
      <div className="wrapper-libary-card">
        {/* Hiển thị danh sách theo món ăn / thành phần khi nhấn vào tab */}
        <Row gutter={[24, 24]}>
          {currentFood ? (
            currentFood.map((f) => (
              <Col span={6}>
                <Card className="group-card-libaryPage">
                  <Card.Img
                    variant="top"
                    width={50}
                    height={250}
                    src={`http://localhost:8080/food/${f.id}/image`}
                  />
                  <Card.Body>
                    <Card.Title className="title-food_libary">
                      {f.foodName}
                    </Card.Title>
                  </Card.Body>
                  <Button className="btn_libaryFood" href={`food/${f.id}`}>
                    Xem thông tin chi tiết
                  </Button>
                  {/* <ModalDetailFood></ModalDetailFood> */}
                </Card>
              </Col>
            ))
          ) : (
            <div></div>
          )}
        </Row>
      </div>
      <Pagination className="libary_pagidivide">
        <ul className="pagination">
          <li className="page-item">
            <a onClick={() => paginate(currentPage - 1)} className="page-link">
              Trang trước
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a onClick={() => paginate(currentPage + 1)} className="page-link">
              Trang sau
            </a>
          </li>
        </ul>
      </Pagination>
    </>
  );
}

export default CardGroupFood;
