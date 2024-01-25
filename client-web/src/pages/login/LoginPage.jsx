import React from "react";
import "./LoginPage.scss"; // Import sass
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/users/login",
        data: input,
      });

      localStorage.access_token = data.access_token;
      localStorage.setItem("_id", data._id);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="control">
        <h1>Sign In</h1>
      </div>
      <div className="control block-cube block-input">
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
          placeholder="Username"
        />
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
      </div>
      <div className="control block-cube block-input">
        <input
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
      </div>
      <button className="btn block-cube block-cube-hover" type="submit">
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
        <div className="text">Log In</div>
      </button>
    </form>
  );
};

export default LoginPage;
