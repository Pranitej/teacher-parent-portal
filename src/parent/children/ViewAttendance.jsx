import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewAttendance() {
  const data = useParams();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 8) + "01"
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [currentChildId, setCurrentChildId] = useState(data.childId);
  const [currentChild, setCurrentChild] = useState(null);
  const [records, setRecords] = useState([]);
  const [allChildren, setAllChildren] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

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

  const getAllRooms = () => {
    axios
      .get(`https://csdemoproject.info/SchoolProject/api/rooms/getAllRooms`)
      .then((response) => {
        if (response.data) {
          setAllRooms(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAttendanceRecordsByDate = () => {
    currentChildId > -1 &&
      axios
        .get(
          `https://csdemoproject.info/SchoolProject/api/child-attendance/getChildAttendanceBetweenDates/${currentChildId}/${startDate}/${endDate}`
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

  const getRoomNameByRoomId = (id) => {
    for (let index = 0; index < allRooms.length; index++) {
      if (allRooms[index].roomId === id) {
        return allRooms[index].roomName;
      }
    }
  };

  useEffect(() => {
    if (currentChildId < 0) {
      setCurrentChild(null);
    }
    for (let index = 0; index < allChildren.length; index++) {
      if (allChildren[index].id == currentChildId) {
        setCurrentChild(allChildren[index]);
        break;
      }
    }
  }, [currentChildId]);

  useEffect(
    () => getAttendanceRecordsByDate(),
    [currentChildId, startDate, endDate]
  );

  useEffect(() => getAllChildren(), []);
  useEffect(() => getAllRooms(), []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>
            <b>Attendance Records</b>
          </h3>
        </div>
      </div>
      <div className="card p-3 mt-4">
        <div className="row">
          <div className="col-sm-3">
            <label className="small">Start Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <label className="small">End Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive mt-3">
              {allChildren && records && records.length > 0 ? (
                <>
                  <table className="table table-sm mb-0" id="child_table_id">
                    <thead className="table-dark">
                      <tr>
                        <th>Attend Date</th>
                        <th>Room Name</th>
                        <th>Check In</th>
                        <th>Checked Out</th>
                        <th>Hours</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((row) => (
                        <tr key={row.attendanceId}>
                          <td>{row.attendDate}</td>
                          <td>{getRoomNameByRoomId(row.roomId)}</td>
                          <td>
                            {row.checkedIn
                              ? `${row.checkedIn} (${row.dropOff})`
                              : "-"}
                          </td>
                          <td>
                            {row.checkedOut
                              ? `${row.checkedOut} (${row.pickup})`
                              : "-"}
                          </td>
                          <td>{row.hours ? `${row.hours}hrs` : "-"}</td>
                          <td>
                            {row.status === "Present" ? (
                              <div className="text-success">Present</div>
                            ) : (
                              <div className="text-danger">Absent</div>
                            )}
                          </td>
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
