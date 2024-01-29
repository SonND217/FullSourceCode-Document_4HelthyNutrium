import React, { useState } from "react";
import { Select } from "antd";

function SelectionSeasonFood({ searchData, setSearchData }) {
  const [placement, SetPlacement] = useState("bottomLeft");
  const handleChange = (value) => {
    setSearchData({ ...searchData, seasonId: value });
  };
  return (
    <>
      <div>
        <strong>Lọc theo mùa</strong>
      </div>
      <Select
        defaultValue={null}
        style={{
          width: 300,
        }}
        onChange={handleChange}
        options={[
          {
            label: "Tất cả",
            value: null,
          },
          {
            label: "Xuân",
            value: 1,
          },
          {
            label: "Hạ",
            value: 2,
          },
          {
            label: "Thu",
            value: 3,
          },
          {
            label: "Đông",
            value: 4,
          },
        ]}
      />
    </>
  );
}

export default SelectionSeasonFood;
