import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./updateSchedule.scss";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSchedule = (props) => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loadingPopulate, setLoadingPopulate] = useState(true);
  let { scheduleId } = useParams();
  const [scheduleInput, setScheduleInput] = useState({
    storeId: ``,
    userId: ``,
    isCompleted: false,
    time: "",
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: import.meta.env.VITE_BASE_URL + "/stores/simple ",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: import.meta.env.VITE_BASE_URL + "/users/select?role=sales",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setScheduleInput({
      ...scheduleInput,
      [name]: value,
    });
  };

  useEffect(() => {
    function padZero(num) {
      return num.toString().padStart(2, "0");
    }
    async function getScheduleForPopulate() {
      try {
        const { data } = await axios({
          method: "get",
          url: import.meta.env.VITE_BASE_URL + `/schedules/${scheduleId}`,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        const utcTime = new Date(data.time);
        const formattedTime = `${utcTime.getFullYear()}-${padZero(
          utcTime.getMonth() + 1
        )}-${padZero(utcTime.getDate())}T${padZero(
          utcTime.getHours()
        )}:${padZero(utcTime.getMinutes())}`;
        setScheduleInput({
          storeId: data.storeInformations._id,
          userId: data.userInformations._id,
          isCompleted: data.isCompleted,
          time: formattedTime,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPopulate(false);
      }
    }
    getScheduleForPopulate();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (scheduleInput.isCompleted === "true") {
        scheduleInput.isCompleted = true;
      }
      if (scheduleInput.isCompleted === "false") {
        scheduleInput.isCompleted = false;
      }
      const response = await axios({
        method: "put",
        url: import.meta.env.VITE_BASE_URL + `/schedules/${scheduleId}`,
        data: {
          ...scheduleInput,
          isCompleted: scheduleInput.isCompleted,
        },
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Schedule has been updated",
        }).then((result) => {
          if (result.isConfirmed) {
            props.setOpen(false);
            window.location.reload();
          }
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Update Schedule</h1>
        {loadingPopulate ? (
          "Loading..."
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Store</label>
              <select
                name="storeId"
                id="storeId"
                onChange={handleChange}
                value={scheduleInput.storeId}
              >
                {stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="item">
              <label>User</label>
              <select
                name="userId"
                id="userId"
                onChange={handleChange}
                value={scheduleInput.userId}
              >
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="item">
              <label>Status Schedule</label>
              <select
                name="isCompleted"
                id="isCompleted"
                onChange={handleChange}
                value={scheduleInput.isCompleted}
              >
                {[true, false].map((status, i) => (
                  <option key={i} value={status}>
                    {status === true ? "Completed" : "Uncompleted"}
                  </option>
                ))}
              </select>
            </div>
            <div className="item">
              <label>Time and Date</label>
              <input
                style={{ backgroundColor: "white", color: "black" }}
                name="time"
                type="datetime-local"
                value={scheduleInput.time}
                id="time"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateSchedule;
