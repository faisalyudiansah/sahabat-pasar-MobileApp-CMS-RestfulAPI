import React, { useState } from "react";
import "./storeDetail.scss";
import UpdateStore from "../updateStore/UpdateStore";

const StoreDetail = ({ listStore }) => {
  const [open, setOpen] = useState(false);
  const getStatus = () => {
    return listStore.status === 'verified' ? "Verified" : "Unverified";
  };
  const event = new Date(listStore.joinDate);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedTime = event.toLocaleDateString('id-ID', options)

  const renderCoordinates = () => {
    if (listStore.location && listStore.location.coordinates) {
      const { coordinates } = listStore.location;
      return (
        <div>
          <h1 className="text-lg text-gray-700 dark:text-black font-bold">
            Latitude: {coordinates[1]}
          </h1>
          <h1 className="text-lg text-gray-700 dark:text-black font-bold">
            Longitude: {coordinates[0]}
          </h1>
        </div>
      );
    }

    return null;
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
          <h3> Store Detail</h3>
        </div>
        <div class="card__body">
          <div class="half">
            <div class="featured_text">
              <h1> {listStore.name}</h1>
              <p class="sub"> {listStore.ownerName}</p>
            </div>
            <div class="imageStore">
              <img src={listStore.photo} alt={listStore.name} />
            </div>
            <span class="stock">
              <span> Status : {getStatus()}</span>
            </span>
          </div>
          <div class="half">
            <div class="description">
              <p></p>
            </div>

            <div class="reviews">
              <span></span>
            </div>
          </div>
        </div>
        <div class="card__footer">
          <div class="recommend">
            <h3> phone: {listStore.mobilePhone}</h3>
            <h3> Since: {formattedTime}</h3>
            <p> address: {listStore.address}</p>
          </div>
          <div class="action">
            <button onClick={() => setOpen(true)}>Edit Store</button>
          </div>
        </div>
      </div>
      {open && <UpdateStore slug="product" setOpen={setOpen} />}
    </>
  );
};

export default StoreDetail;
