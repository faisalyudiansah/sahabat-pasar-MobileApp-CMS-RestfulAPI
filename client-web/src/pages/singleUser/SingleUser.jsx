import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserDetail from "../../components/userDetail/UserDetail";

const SingleUser = () => {
  const [userResponse, setUserResponse] = useState([]);

  const { idUser } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/dashboard`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      const response = data.data.find((el) => {
        if (el._id === idUser) {
          return el;
        }
      });
      setUserResponse(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idUser]);

  return (
    <div className="">
      {userResponse ? (
        <UserDetail userResponse={userResponse} />
      ) : (
        <p>This user does not have any orders.</p>
      )}
    </div>
  );
};

export default SingleUser;
