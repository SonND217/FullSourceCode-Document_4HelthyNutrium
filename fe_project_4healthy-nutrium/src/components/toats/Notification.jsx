import React from "react";
import { Button, notification } from "antd";
const Notification = (props) => {
  return (
    <>
      <notification
        message={props.message}
        description={props.description}
      ></notification>
    </>
  );
};
export default Notification;
