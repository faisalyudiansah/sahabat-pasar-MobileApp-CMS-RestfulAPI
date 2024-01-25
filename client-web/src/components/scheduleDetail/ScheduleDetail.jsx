import React, { useState } from "react";
import "./scheduleDetail.scss";
import UpdateSchedule from "../updateSchedule/UpdateSchedule";

const ScheduleDetail = ({ listSchedule }) => {
  const storePhoto = listSchedule?.storeInformations?.photo;
  const storeName = listSchedule?.storeInformations?.name;
  const storeAddress = listSchedule?.storeInformations?.address;
  const salesName = listSchedule?.userInformations?.name;
  const [open, setOpen] = useState(false);

  const event = new Date(listSchedule.time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const formattedTime = event.toLocaleDateString("id-ID", options);

  const getStatus = () => {
    return listSchedule.isCompleted === true ? "Completed" : "Uncompleted";
  };

  return (
    <>
      <div class="card">
        <div class="card__title">
          <div class="icon">
            <a href="#">
              <i class="fa fa-arrow-left"></i>
            </a>
          </div>
          <h3>Products Details</h3>
        </div>
        <div class="card__body">
          <div class="half">
            <div class="featured_text">
              <h1>{storeName}</h1>
              <p class="sub"></p>
            </div>
            <div class="imageSchedule">
              <img src={storePhoto} alt="" />
            </div>
            <span class="stock">
              <span>sales : {salesName}</span>
            </span>
          </div>
          <div class="half">
            <div class="description">
              <p></p>
            </div>

            <div class="reviews"></div>
          </div>
        </div>
        <div class="card__footer">
          <div class="recommend">
            <h3>Status : {getStatus()}</h3>
            <h3>{storeAddress}</h3>
            <p>{formattedTime}</p>
          </div>
          <div class="action">
            <button onClick={() => setOpen(true)}>Edit Schedule</button>
          </div>
        </div>
      </div>
      {open && <UpdateSchedule slug="product" setOpen={setOpen} />}
    </>
  );
};

export default ScheduleDetail;
