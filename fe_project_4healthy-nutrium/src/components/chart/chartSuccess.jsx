import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Liquid } from "@ant-design/plots";

const chartSuccess = () => {
  const config = {
    percent: 0.99,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };
  return <Liquid {...config} />;
};

export default chartSuccess;
