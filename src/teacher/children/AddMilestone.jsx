import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { data } from "../../App";

export default function AddMilestone() {
  const employee = useContext(data);
  const [allChildren, setAllChildren] = useState([]);
  const [allExams, setAllExams] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allGrades, setAllGrades] = useState([]);
  const [currentChildId, setCurrentChildId] = useState(-1);
  const [currentChild, setCurrentChild] = useState(null);
  const [currentExam, setCurrentExam] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [marksScored, setMarksScored] = useState(0);
  const [grade, setGrade] = useState("");
  const [result, setResult] = useState("");
  const [remarks, setRemarks] = useState("");

  const getAllChildren = () => {
    axios
      .get(
        `https://csdemoproject.info/SchoolProject/api/children/getAllChildren`
      )
      .then((response) => {
        if (response.data) {
          setAllChildren(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllExams = () => {
    axios
      .get(`https://csdemoproject.info/SchoolProject/api/exams/getAllExams`)
      .then((response) => {
        if (response.data) {
          setAllExams(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllSubjects = () => {
    axios
      .get(
        `https://csdemoproject.info/SchoolProject/api/subjects/getAllSubjects`
      )
      .then((response) => {
        if (response.data) {
          setAllSubjects(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllGrades = () => {
    axios
      .get(`https://csdemoproject.info/SchoolProject/api/grades/getAllGrades`)
      .then((response) => {
        if (response.data) {
          setAllGrades(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddMilestone = () => {
    currentChildId > -1
      ? axios
          .post(
            `https://csdemoproject.info/SchoolProject/api/student-progress/createStudentProgress`,
            {
              examName: currentExam,
              subjectName: currentSubject,
              childId: currentChildId,
              className: currentChild.studentClass,
              marksScored,
              totalMarks,
              grade,
              empId: employee.employeeData.empId,
              progressDate: new Date().toISOString().slice(0, 10),
              result,
              remarks,
            }
          )
          .then((response) => {
            if (response.data) {
              alert("Milestone added successfully...");
              resetData();
            } else {
              alert("Something went wrong...");
            }
          })
          .catch((error) => console.error(error))
      : alert("Invalid form data...");
  };

  const resetData = () => {
    setCurrentChildId(-1);
    setCurrentChild(null);
    setCurrentExam("");
    setCurrentSubject("");
    setTotalMarks(0);
    setMarksScored(0);
    setGrade("");
    setResult("");
    setRemarks("");
  };

  useEffect(() => getAllChildren(), []);
  useEffect(() => getAllExams(), []);
  useEffect(() => getAllSubjects(), []);
  useEffect(() => getAllGrades(), []);

  useEffect(() => {
    if (currentChildId > -1) {
      for (let index = 0; index < allChildren.length; index++) {
        if (allChildren[index].id == currentChildId) {
          setCurrentChild(allChildren[index]);
          break;
        }
      }
    }
  }, [currentChildId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>
            <b>Add Milestone</b>
          </h3>
        </div>
      </div>
      <div className="card mt-4 p-3">
        <div className="row">
          <div className="col-sm-3">
            <div className="card p-2 mt-2" style={{ display: "flex" }}>
              <div className="row pl-3 pr-3">
                {currentChild ? (
                  <>
                    <img
                      id="childPic"
                      className="img-fluid rounded-circle"
                      src={`https://csdemoproject.info/SchoolProject/images/childrens/${currentChild.childPic}`}
                      alt="ChildPicture"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <label htmlFor="childPic" className="ml-3 text-dark mt-2">
                      <b>{`${currentChild.firstName} ${currentChild.lastName}`}</b>
                    </label>
                  </>
                ) : (
                  <h6 className="pt-1 text-danger">
                    <b>No Child Selected...</b>
                  </h6>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <label className="small">Child</label>
            <select
              className="form-control form-control-sm"
              value={currentChildId}
              onChange={(e) => setCurrentChildId(e.target.value)}
            >
              <option value={-1} disabled>
                Select Child
              </option>
              {allChildren &&
                allChildren.map((item, index) => (
                  <option value={item.id} key={index}>
                    {`${item.firstName} ${item.lastName} (${item.nickName})`}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-3">
            <label className="small">Exam</label>
            <select
              className="form-control form-control-sm"
              value={currentExam}
              onChange={(e) => setCurrentExam(e.target.value)}
            >
              <option value="" disabled>
                Select Exam
              </option>
              {allExams &&
                allExams.map((item, index) => (
                  <option value={item.examName} key={index}>
                    {item.examName}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-3">
            <label className="small">Subject</label>
            <select
              className="form-control form-control-sm"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
            >
              <option value="" disabled>
                Select Subject
              </option>
              {allSubjects &&
                allSubjects.map((item, index) => (
                  <option value={item.subjectName} key={index}>
                    {item.subjectName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-3">
            <label className="small">Total Marks</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <label className="small">Marks Scored</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={marksScored}
              onChange={(e) => setMarksScored(e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <label className="small">Grade</label>
            <select
              className="form-control form-control-sm"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="" disabled>
                Select Grade
              </option>
              <option value="A">A</option>
              {allGrades &&
                allGrades.map((item, index) => (
                  <option value={item.grade} key={index}>
                    {item.grade}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-3">
            <label className="small">Result</label>
            <select
              className="form-control form-control-sm"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="" disabled>
                Select Result
              </option>
              <option value="Pass" className="text-success">
                Pass
              </option>
              <option value="Fail" className="text-danger">
                Fail
              </option>
              <option value="Absent" className="text-warning">
                Absent
              </option>
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <label className="small">Remarks</label>
            <textarea
              className="form-control form-control-sm"
              value={remarks}
              rows="2"
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleAddMilestone}
            >
              Add Milestone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
