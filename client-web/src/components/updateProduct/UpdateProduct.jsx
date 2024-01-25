import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./updateProduct.scss";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const UpdateProduct = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [input, setInput] = useState({
    name: "",
    category: "",
    stock: 0,
    price: 0,
    discQty: 10,
    discPercent: 5,
    isAvailable: true,
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([
    "Beauty & Wellbeing",
    "Personal Care",
    "Home Care",
    "Nutrition",
    "Ice Cream",
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
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
      formData.append("image", image);
      formData.append("name", input.name);
      formData.append("category", input.category);
      formData.append("stock", input.stock);
      formData.append("price", input.price);
      formData.append("discQty", input.discQty);
      formData.append("discPercent", input.discPercent);
      formData.append(
        "isAvailable",
        input.isAvailable === "true" ? true : false
      );
      const { data } = await axios({
        method: "put",
        url: import.meta.env.VITE_BASE_URL + `/products/${id}`,
        data: formData,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      Swal.fire({
        icon: "success",
        title: "Product has been updated",
        timerProgressBar: true,
        willClose: () => {
          setLoading(false);
          props.setOpen(false);
          window.location.reload();
          navigate("/products");
        },
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    async function getPopulate() {
      try {
        const { data } = await axios({
          method: "get",
          url: import.meta.env.VITE_BASE_URL + `/products/${id}`,
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setInput({
          name: data.name,
          category: data.category,
          stock: data.stock,
          price: data.price,
          discQty: data.discPercent,
          discPercent: data.discPercent,
          isAvailable: data.isAvailable,
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    }
    getPopulate();
  }, []);

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Name</label>
            <input
              name="name"
              value={input.name}
              type="text"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={input.category}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="item">
            <label>Stock</label>
            <input
              value={input.stock}
              name="stock"
              type="number"
              id="stock"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Price</label>
            <input
              value={input.price}
              name="price"
              type="number"
              id="price"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>DiscQty</label>
            <input
              value={input.discQty}
              name="discQty"
              type="number"
              id="discQty"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>discPercent</label>
            <input
              name="discPercent"
              type="number"
              id="discPercent"
              value={input.discPercent}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>isAvailable</label>
            <select
              name="isAvailable"
              id="isAvailable"
              onChange={handleChange}
              value={input.isAvailable}
            >
              {[true, false].map((status, i) => (
                <option key={i} value={status}>
                  {status === true ? "true" : "false"}
                </option>
              ))}
            </select>
          </div>
          <div className="item">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
