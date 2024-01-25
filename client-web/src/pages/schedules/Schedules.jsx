import React from "react";
import Table from "../../components/table/Table";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import { useState } from "react";
import AddSchedule from "../addSchedule/AddSchedule";

const Schedules = () => {
  const [open, setOpen] = useState(false);
  const [lisSchedules, setListSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteSchedule = async () => {
    await fetchData();
  };

  const fetchSchedules = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/schedules",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      // console.log("data api", data);

      setTimeout(() => {
        setListSchedules(data);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const displayedKeys = [
    "_id",
    "storeName",
    "userName",
    "address",
    "time",
    "status",
  ];

  const columns = displayedKeys.map((key) => ({
    field: key,
    headerName:
      key === "storeName"
        ? "Store Name"
        : key === "userName"
        ? "User Name"
        : key === "address"
        ? "address"
        : key.charAt(0).toUpperCase() + key.slice(1),
    width: key === "status" ? 200 : 220,
  }));

  const filteredSchedules =
    lisSchedules &&
    lisSchedules.map((schedule, index) => {
      const { _id, storeInformations, userInformations, time, isCompleted } =
        schedule;

      const storeName = storeInformations?.name || "Unknown Store";
      const userName = userInformations?.name || "Unknown User";
      const address = storeInformations?.address || "Unknown Address";
      const status = isCompleted ? "Completed" : "Not Completed";
      const event = new Date(time);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      };
      const formattedTime = event.toLocaleDateString("id-ID", options);
      return {
        _id,
        storeName,
        userName,
        address,
        time: formattedTime,
        status,
      };
    });
  // console.log("response",filteredSchedules);

  return (
    <div className="products">
      <div className="info">
        <h1>Schedules Management</h1>
        <button className="logout-btn" onClick={() => setOpen(true)}>
          Add New Schedule
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Table
          slug="schedules"
          columns={columns}
          rows={filteredSchedules}
          deleteUrl={`${import.meta.env.VITE_BASE_URL}/schedules`}
          onDelete={handleDeleteSchedule}
        />
      )}

      {open && (
        <AddSchedule slug="product" columns={columns} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Schedules;
