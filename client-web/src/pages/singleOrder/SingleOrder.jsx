import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderDetail from "../../components/orderDetail/OrderDetail";

const SingleOrder = () => {
  const [listOrders, setListOrders] = useState([]);

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      setListOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <OrderDetail listOrders={listOrders} />
    </div>
  );
};

export default SingleOrder;
