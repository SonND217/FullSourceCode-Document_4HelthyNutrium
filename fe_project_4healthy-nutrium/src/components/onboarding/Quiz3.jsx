import React, { useState, useEffect } from "react";
import HeaderUser from "../header/HeaderUser";
import Footers from "../footer/footers";
import "../../assets/style/user/quizpage.css";
import { Card, Space, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Progress from "../progress/Progress";
import { useHistory } from "react-router-dom";
import JobAPI from "../../service/Actions/JobAPI";
import Spinner from "react-bootstrap/Spinner";
import AlertMessage from "../alert/AlertMessage";
import { Row, Col } from "antd";
import ModalAddNewFoodQuiz5 from "../modal/ModalAddNewFoodQuiz5";

const Quiz4 = ({checkValidRole, user}) => {
  checkValidRole();
  const history = useHistory();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    JobAPI.getAll()
      .then((res) => {
        setJobs(res.data);
        console.log("data = " + JSON.stringify(res.data));
      })
      .catch((err) => {});
  }, []);

  const onChange = (e) => {
    setSelectedJob(e.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();

    if (selectedJob === null) {
      setAlert({
        type: "danger",
        message: "Vui lòng chọn công việc của bạn",
      });
      return;
    }

    let data;
    const u = await user.then(res => {return res.data});

    try {
      data = JSON.parse(localStorage.getItem("quiz-data"));
      data.job = selectedJob;
    } catch (error) {
      data = {
        user: u,
        height: null,
        weight: null,
        job: selectedJob,
        categories: null,
        counts: null,
      };
    }

    localStorage.setItem("quiz-data", JSON.stringify(data));
    history.push("/onboarding/quiz4");
  };

  return (
    <>
      <HeaderUser></HeaderUser>
      <div className="wrapper-quiz_page">
        <div className="wrapper-ProgressBar">
          <Progress per="50"></Progress>
        </div>
        <div className="wrapper-title-quiz">
          <p>Công việc của bạn là gì?</p>
          <AlertMessage info={alert} />
        </div>
        <div className="wrapper-table-option">
          {/* check-box */}
          <Row gutter={[16, 16]}>
            <Radio.Group onChange={onChange} value={selectedJob} size="large">
              {jobs ? (
                jobs.map((job) => (
                  <Radio value={job} className="btn-radio-quiz">
                    {job.jobName}
                  </Radio>
                ))
              ) : (
                <>
                  <Spinner animation="border" variant="primary" />
                </>
              )}
            </Radio.Group>
          </Row>
          <Button variant="success" className="button_Link" onClick={submit}>
            Tiếp tục
          </Button>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
};

export default Quiz4;
