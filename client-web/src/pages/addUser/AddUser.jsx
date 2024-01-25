import React from "react";
import "./addUser.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const AddUser = (props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    mobilePhone: "",
    address: "",
    role: "sales",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/users/register",
        data: input,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });


      Swal.fire({
        icon: "success",
        title: "User added successfully!",
        timer: 1000,
        timerProgressBar: true,

        willClose: () => {
          setLoading(false);
          props.setOpen(false);
          navigate("/users");
          window.location.reload();
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
        <h1>Add new user</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Name</label>
            <input name="name" type="text" id="name" onChange={handleChange} />
          </div>
          <div className="item">
            <label>Email</label>
            <input
              name="email"
              type="text"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Password</label>
            <input
              name="password"
              type="text"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Mobile Phone</label>
            <input
              name="mobilePhone"
              type="text"
              id="mobilePhone"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Adress</label>
            <input
              name="address"
              type="text"
              id="address"
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
