import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.scss";
import DetailPage from "../../components/detailPage/DetailPage";

const SingleProduct = () => {
  const [listProducts, setListProducts] = useState([]);
  //Fetch data and send to Single Component

  const { id } = useParams();

  // console.log("Type of listProducts:", typeof listProducts); check typedata coz error

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + `/products/${id}`,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      // data pada apinya nested
      setListProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="product">
      <DetailPage listProducts={listProducts} />
    </div>
  );
};

export default SingleProduct;
