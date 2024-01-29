import React, { useState } from "react";
import { Select } from "antd";

function SelectionMealtypeFoodFilter({ searchData, setSearchData }) {
  const [placement, SetPlacement] = useState("bottomLeft");
  const handleChange = (value) => {
    setSearchData({ ...searchData, mealId: value });
  };
  return (
    <>
      <div>
        <strong>Lọc theo bữa ăn</strong>
      </div>
      <Select
        defaultValue={null}
        style={{
          width: 300,
        }}
        onChange={handleChange}
        options={[
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
        ]}
      />
    </>
  );
}

export default SelectionMealtypeFoodFilter;
