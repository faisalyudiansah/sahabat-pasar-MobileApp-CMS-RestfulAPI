import { useEffect, useState } from "react";
import "./topStore.scss";
import axios from "axios";
import { toRupiah } from "../../helpers/rupiahFormarter";

const TopStore = () => {
  const [topStore, setTopStore] = useState([]);

  async function fetchData() {
    const { data } = await axios({
      method: "GET",
      url: import.meta.env.VITE_BASE_URL + "/stores",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    setTopStore(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="topBox">
      <h1>Top Store</h1>
      <div className="list">
        {topStore &&
          topStore.slice(0, 7).map((store) => (
            <div className="listItem" key={store._id}>
              <div className="store">
                <img src={store.photo} alt="" />
                <div className="storeText">
                  <span className="name">{store.name}</span>
                  {/* <span className="ownerName">{store.ownerName}</span> */}
                </div>
              </div>
              <span className="totalOrder">
                {toRupiah(store.confirmedOrderValue)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopStore;
