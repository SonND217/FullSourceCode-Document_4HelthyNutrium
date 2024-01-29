import React, { useState } from "react";
import { Row, Col } from "antd";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Thịt", value: "Thịt" },
  { label: "Trứng", value: "Trứng" },
  { label: "Bánh", value: "Bánh" },
];

const MultiSelectCategory = () => {
  const [selected, setSelected] = useState([]);
  console.log(JSON.stringify(selected));
  let selectOptionFood = [];
  for (var i = 0; i < selected.length; i++) {
    console.log(selected[i]["value"]);
    selectOptionFood.push(selected[i].value);
  }
  let arr = [selectOptionFood];
  console.log(selectOptionFood);
  let showChoose;
  showChoose = <div>Bạn đã chọn: {" " + arr + " "} </div>;

  return (
    <div>
      {showChoose}

      <div className="dropdown-multiSelectionChoose">
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Chọn những loại thực phẩm bạn thích"
          className="button-opinion-quiz-text"
          shouldToggleOnHover="true"
        />
      </div>
    </div>
  );
};

export default MultiSelectCategory;
