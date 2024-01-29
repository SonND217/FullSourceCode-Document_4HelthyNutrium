import React, { useState } from "react";
import { Select } from "antd";

function SelectionSeasonIngredient({searchData,setSearchData}) {
  const [placement, SetPlacement] = useState("bottomLeft");
  const handleChange = (value) => {
    setSearchData({...searchData, season: value});
  };
  return (
    <>
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
            value: "Xuân",
            label: "Mùa Xuân",
          },
          {
            value: "Hạ",
            label: "Mùa Hạ",
          },
          {
            value: "Thu",
            label: "Mùa Thu",
          },
          {
            value: "Đông",
            label: "Mùa Đông",
          },
        ]}
      />
    </>
  );
}

export default SelectionSeasonIngredient;
