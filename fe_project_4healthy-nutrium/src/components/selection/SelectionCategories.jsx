import React, { useState } from "react";
import { Select } from "antd";

function SelectionCategories({ categories, searchData, setSearchData }) {
  const [placement, SetPlacement] = useState("bottomLeft");
  const handleChange = (value) => {
    setSearchData({ ...searchData, categoryId: value });
  };
  return (
    <>
      <div>
        <strong>Lọc theo loại món ăn</strong>
      </div>
      <Select
        defaultValue={null}
        style={{
          width: 300,
        }}
        onChange={handleChange}
        options={categories}
      />
    </>
  );
}

export default SelectionCategories;
