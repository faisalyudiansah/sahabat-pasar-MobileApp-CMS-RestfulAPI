import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./addSchedule.scss";

const AddSchedule = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [scheduleInput, setScheduleInput] = useState({
    storeId: "",
    userId: "",
    time: new Date(),
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/schedules",
        data: scheduleInput,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      if (response.status === 201) {
        toast.success("Schedule added successfully!");
        props.setOpen(false);
        window.location.reload();
      } else {
        toast.error("Failed to add schedule");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (
          error.response.data &&
          error.response.data.message === "Schedule already exists"
        ) {
          toast.error(
            "Schedule already exists. Please choose a different time."
          );
        } else if (
          error.response.data &&
          error.response.data.message ===
            "Store with that ID has not been verified"
        ) {
          toast.error(
            "Store has not been verified. Please verify the store before scheduling."
          );
        } else {
          toast.error("Bad request. Please check the form.");
        }
      } else {
        toast.error("Error adding schedule. Please check the form.");
      }
    }
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new Schedule</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Store</label>
            <select
              name="storeId"
              id="storeId"
              onChange={handleChange}
              value={scheduleInput.storeId}
            >
              <option value="" disabled>
                Select a store
              </option>
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
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="item">
            <label>Time and Date</label>
            <input name="time" type="date" id="time" onChange={handleChange} />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSchedule;
