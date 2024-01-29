import React, { useState } from "react";
import { Select } from "antd";

function SelectionFoods() {
  const [placement, SetPlacement] = useState("bottomLeft");
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div>Lọc theo nguyên liệu</div>
      <Select
        defaultValue="Mùa Xuân"
        style={{
          width: 300,
        }}
        onChange={handleChange}
        options={[
          {
            value: "Mùa Xuân",
            label: "Mùa Xuân",
          },
          {
            value: "Mùa Hạ",
            label: "Mùa Hạ",
          },
          {
            value: "Mùa Thu",
            label: "Mùa Thu",
          },
          {
            value: "Mùa Đông",
            label: "Mùa Đông",
          },
        ]}
      />
    </>
  );
}

export default SelectionFoods;
