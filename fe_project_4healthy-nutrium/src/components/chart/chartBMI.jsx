import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Gauge } from "@ant-design/plots";

const ChartBMI = () => {
  const config = {
    percent: 0.25,
 range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: "36px",
          lineHeight: "36px",
        },
      },
    },
  };
  return <Gauge {...config} />;
};

export default ChartBMI;
