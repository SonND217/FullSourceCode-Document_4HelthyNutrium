import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload, Input } from "antd";

const UploadImageFile = ({ setImage, setResult }) => {
  const [antPics, setAntPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);

  const handleAnt = (e) => {
    setAntPics(e.file.originFileObj);
  };

  const sendAnt = async (e) => {
    setLoading(true);
    console.log("uploading...");
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setResult(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setImage(event.target.files[0]);
    } else {
      setImage(null);
      setResult(null);
    }
  };

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size="large"
      >
        {/* <Upload listType="picture" maxCount={1} onChange={handleAnt}>
          <Button icon={<UploadOutlined />}>Thay ảnh</Button>
        </Upload> */}
        <Input
          type="file"
          require={true}
          onChange={onImageChange}
          accept=".jpg,.jpeg,.png"
        />
      </Space>
    </div>
  );
};
export default UploadImageFile;
