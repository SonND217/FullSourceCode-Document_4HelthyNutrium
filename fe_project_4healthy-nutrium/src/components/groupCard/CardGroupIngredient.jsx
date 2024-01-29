import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ModalDetailFood from "../modal/ModalDetailFood";
import Button from "react-bootstrap/Button";
import { Col, Row, Select, Input } from "antd";
import Pagination from "react-bootstrap/Pagination";
import IngredientAPI from "../../service/Actions/IngredientAPI";
import React, { useEffect, useState } from "react";
const { Search } = Input;
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

function CardGroupIngredient() {
  const pageSize = 6;
  const [ingredients, setIngredient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentIngredientFood = ingredients.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

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

  for (let i = 1; i <= Math.ceil(ingredients.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const loadIngredient = () => {
    IngredientAPI.getActive()
      .then((res) => {
        console.log("data = " + JSON.stringify(res.data));
        setIngredient(res.data);
        setLoading(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    loadIngredient();
  }, []);

  const [searchData, setSearchData] = useState({
    text: "",
    seasonId: null,
  });

  const onSearch = async (text) => {
    let trimText = "";
    if (text) {
      trimText = text.trim();
    }
    searchData.text = trimText;
    await IngredientAPI.searchActive(searchData).then((res) => {
      setIngredient(res.data);
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
      <Row gutter={[24, 24]}>
        {currentIngredientFood ? (
          currentIngredientFood.map((ingredientValue) => (
            <Col span={6}>
              <Card className="group-card-libaryPage">
                <Card.Img
                  variant="top"
                  width={50}
                  height={250}
                  src={`http://localhost:8080/ingredient/${ingredientValue.id}/image`}
                />
                <Card.Body>
                  <Card.Title className="title-food_libary">
                    {ingredientValue.ingredientName}
                  </Card.Title>
                </Card.Body>
                <Button
                  className="btn_libaryFood"
                  href={`/ingredient/${ingredientValue.id}`}
                >
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

export default CardGroupIngredient;
