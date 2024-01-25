import "./topBox.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { toRupiah } from "../../helpers/rupiahFormarter";

const TopBox = () => {
  const [topSales, setTopSales] = useState([]);

  async function fetchData() {
    const { data } = await axios({
      method: "GET",
      url: import.meta.env.VITE_BASE_URL + "/users/dashboard",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    setTopSales(data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="topBox">
      <h1>Top Sales</h1>
      <div className="list">
        {topSales &&
          topSales.slice(0, 7).map((user) => (
            <div className="listItem" key={user._id}>
              <div className="user">
                <img src={user.photo} alt="" />
                <div className="userTexts">
                  <span className="username">{user.name}</span>
                  {/* <span className="email">{user.email}</span> //emailnya g ada */}
                  {/* <span className="joinDate">{user.joinDate}</span> */}
                </div>
              </div>
              <span className="amount">{toRupiah(user.billPerUser)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopBox;
