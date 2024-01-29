import React from "react";
import { Select } from "antd";
const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const Ingredient_SelectionRender = () => (
  <Select
    mode="multiple"
    style={{
      width: "100%",
    }}
    placeholder="Chọn nguyên liệu"
    defaultValue={["Calo"]}
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="Calo" label="Calo">
      <div className="demo-option-label-item">Calo</div>
    </Option>
    <Option value="fat" label="fat">
      <div className="demo-option-label-item">fat</div>
    </Option>
    <Option value="protein" label="protein">
      <div className="demo-option-label-item">protein</div>
    </Option>
    <Option value="carb" label="carb">
      <div className="demo-option-label-item">carb</div>
    </Option>
    <Option value="water" label="water">
      <div className="demo-option-label-item">water</div>
    </Option>
  </Select>
);
export default Ingredient_SelectionRender;
