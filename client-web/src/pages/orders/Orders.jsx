import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Table from "../../components/table/Table";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import { useState } from "react";
import { formatPriceToRupiah } from "../products/Products";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteOrder = async () => {
    await fetchData();
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/orders",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      // console.log("Data API:", data);

      setTimeout(() => {
        setListOrders(data);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error.message);
      setError("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayedKeys = [
    "_id",
    "storeName",
    "userName",
    "totalBill",
    "status",
    "createdAt",
  ];

  const columns = displayedKeys.map((key) => ({
    field: key,
    headerName:
      key === "_id"
        ? "Order ID"
        : key === "storeName"
        ? "Store Name"
        : key === "userName"
        ? "User Name"
        : key === "totalBill"
        ? "Total Bill"
        : key === "status"
        ? "Status"
        : key.charAt(0).toUpperCase() + key.slice(1),
    width: 210,
  }));

  const filteredListOrders =
    listOrders &&
    listOrders.map((order, index) => {
      const { _id, status, createdAt, store, user, totalBill } = order;

      const { _id: storeId, name: storeName } = store || {};

      const { _id: userId, name: userName } = user || {};

      const statusText = status === "confirmed" ? "Confirmed" : "Pending";

      return {
        _id,
        storeName: storeName || "Unknown Store",
        userId,
        userName: userName || "Unknown User",
        status: statusText,
        totalBill: formatPriceToRupiah(totalBill),
        createdAt,
      };
    });

  return (
    <div className="products">
      <div className="info">
        <h1>Orders Management</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Table
          slug="orders"
          columns={columns}
          rows={filteredListOrders}
          deleteUrl={`${import.meta.env.VITE_BASE_URL}/orders`}
          onDelete={handleDeleteOrder}
          onError={handleError}
        />
      )}
      {/* {open && <Add slug="product" columns={columns} setOpen={setOpen} />} */}
    </div>
  );
};

export default Orders;
