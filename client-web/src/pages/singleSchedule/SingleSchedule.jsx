import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ScheduleDetail from "../../components/scheduleDetail/ScheduleDetail";
const SingleSchedule = () => {
  const [listSchedule, setListSchedule] = useState([]);

  const { scheduleId } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/schedules/${scheduleId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setListSchedule(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <ScheduleDetail listSchedule={listSchedule} />
    </div>
  );
};

export default SingleSchedule;
