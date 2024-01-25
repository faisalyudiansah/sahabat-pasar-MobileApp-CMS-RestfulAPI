import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./addStore.scss";
import Swal from "sweetalert2";
import TestingMap from "../testing-maps/testingMap";

const AddStore = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleMapButtonClick = () => {
    event.preventDefault();
    setShowMap(true);
  };

  const handleMapClose = () => {
    setShowMap(true);
  };

  const handleMapClick = (selectedPosition) => {
    setStoreInput({
      ...storeInput,
      longitude: selectedPosition.lng,
      latitude: selectedPosition.lat,
    });
    handleMapClose();
  };

  //const position = useContext blablablabla
  const [storeInput, setStoreInput] = useState({
    name: "",
    longitude: 112.63070356923028, //position.lng
    latitude: -7.986860420618447, //position.lat
    address: "",
    joinDate: new Date(),
    ownerName: "",
    mobilePhone: "",
    status: "unverified",
  });
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStoreInput({
      ...storeInput,
      [name]: value,
    });
  };

  const handleMarkerClick = (selectedPosition) => {
    setStoreInput({
      ...storeInput,
      longitude: selectedPosition.lng,
      latitude: selectedPosition.lat,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", image);
      formData.append("name", storeInput.name);
      formData.append("longitude", storeInput.longitude);
      formData.append("latitude", storeInput.latitude);
      formData.append("address", storeInput.address);
      formData.append("joinDate", storeInput.joinDate);
      formData.append("ownerName", storeInput.ownerName);
      formData.append("mobilePhone", storeInput.mobilePhone);
      formData.append("status", storeInput.status);

      const response = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/stores",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      Swal.fire({
        icon: "success",
        title: "Store added successfully!",
        timerProgressBar: true,

        willClose: () => {
          setLoading(false);
          props.setOpen(false);
          window.location.reload();
          navigate("/stores");
        },
      });
    } catch (error) {
      console.error(error);
      setLoading(false);

      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error adding store. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new Store</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Name</label>
            <input name="name" type="text" id="name" onChange={handleChange} />
          </div>
          <div className="item">
            <label>Longitude</label>
            <input
              name="longitude"
              type="number"
              id="longitude"
              value={storeInput.longitude}
              readOnly
            />
          </div>
          <div className="item">
            <label>Latitude</label>
            <input
              name="latitude"
              type="number"
              id="latitude"
              value={storeInput.latitude}
              readOnly
            />
          </div>
          <div className="item">
            <label>Address</label>
            <input
              name="address"
              type="text"
              id="address"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Join Date</label>
            <input
              name="joinDate"
              type="date"
              id="joinDate"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Owner Name</label>
            <input
              name="ownerName"
              type="text"
              id="ownerName"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>mobilePhone</label>
            <input
              name="mobilePhone"
              type="text"
              id="mobilePhone"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>status</label>
            <input
              name="status"
              type="text"
              id="status"
              value={storeInput.status}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {showMap && (
            <TestingMap
              position={
                storeInput.longitude && storeInput.latitude
                  ? { lng: storeInput.longitude, lat: storeInput.latitude }
                  : null
              }
              onMapClick={handleMapClick}
              onMarkerClick={handleMarkerClick}
              setStoreInput={(newStoreInput) => setStoreInput(newStoreInput)}
            />
          )}
          <div className="item">
            <label>Maps</label>
            <button onClick={handleMapButtonClick}>Open Map</button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
