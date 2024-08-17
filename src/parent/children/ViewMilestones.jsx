import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewMilestones() {
  const { childId } = useParams();
  const [records, setRecords] = useState([]);
  const [currentChild, setCurrentChild] = useState(null);
  const [allChildren, setAllChildren] = useState([]);

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

  const getMilestoneRecordsByChildId = () => {
    axios
      .get(
        `https://csdemoproject.info/SchoolProject/api/student-progress/getStudentProgressByChildId/${childId}`
      )
      .then((response) => {
        if (response.data) {
          setRecords(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    for (let index = 0; index < allChildren.length; index++) {
      if (allChildren[index].id == childId) {
        setCurrentChild(allChildren[index]);
        break;
      }
    }
  }, [childId, records]);

  useEffect(() => getAllChildren(), []);
  useEffect(() => getMilestoneRecordsByChildId(), [childId]);

  return (
    <div className="container mt-4">
      <div className="col-sm-12 text-center">
        <h3>
          <b>Milestone Records</b>
        </h3>
      </div>
      <div className="card mt-4 p-3">
        <div className="row mt-3">
          <div className="col-sm-12">
            <div className="table-responsive mt-3">
              {allChildren && records && records.length > 0 ? (
                <>
                  <table className="table table-sm mb-0" id="child_table_id">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Class</th>
                        <th>Exam</th>
                        <th>Subject</th>
                        <th>Total</th>
                        <th>Scored</th>
                        <th>Grade</th>
                        <th>Result</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((item, index) => (
                        <tr key={index}>
                          <td>{item.progressDate}</td>
                          <td>{item.className}</td>
                          <td>{item.examName}</td>
                          <td>{item.subjectName}</td>
                          <td>{item.totalMarks}</td>
                          <td>{item.marksScored}</td>
                          <td>{item.grade}</td>
                          <td>{item.result}</td>
                          <td>{item.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr className="mt-0" />
                </>
              ) : (
                <h4 className="text-danger mt-3">No records found...</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
