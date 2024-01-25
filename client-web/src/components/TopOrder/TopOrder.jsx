import { useEffect, useState } from "react";
import "./topOrder.scss";
import axios from "axios";
import { toRupiah } from "../../helpers/rupiahFormarter";

const TopOrder = () => {
  const [topOrder, setTopOrder] = useState([]);

  async function fetchData() {
    const { data } = await axios({
      method: "GET",
      url: import.meta.env.VITE_BASE_URL + "/products/dashboard",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    setTopOrder(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="topBox">
      <h1>Top Orders</h1>
      <div className="list">
        {topOrder.slice(0, 7).map((order) => (
          <div className="listItem" key={order._id}>
            <div className="order">
              <img src={order.image} alt="" />
              <div className="orderText">
                <span className="name">{order.name}</span>
                {/* <span className="soldQty">{order.confirmedOrderQty} bill</span> */}
              </div>
            </div>
            <span className="confirmedOrderValue">
              {toRupiah(order.confirmedOrderValue)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopOrder;
