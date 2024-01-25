import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import "./singleStore.scss";
import StoreDetail from "../../components/storeDetail/StoreDetail";

const SingleStore = () => {
  const [listStore, setListStore] = useState([]);

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + `/stores/${id}`,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      // data pada apinya nested
      setListStore(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <StoreDetail listStore={listStore} />
    </div>
  );
};

export default SingleStore;
