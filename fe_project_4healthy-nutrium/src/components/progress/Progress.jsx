import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";

const Progress = (props) => {
  return (
    <div>
      <ProgressBar animated now={props.per} />
    </div>
  );
};

export default Progress;
