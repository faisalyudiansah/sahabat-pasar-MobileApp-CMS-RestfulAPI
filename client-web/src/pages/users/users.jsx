import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import UserTable from "../../components/userTable/UserTable";
import AddUser from "../addUser/AddUser";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteUser = async () => {
    await fetchData();
  };

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/users",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      const usersWithIds = data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      // data pada apinya nested
      setTimeout(() => {
        setListUsers(usersWithIds);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayedKeys = ["id", "photo", "name", "email", "joinDate"];
  const columns =
    listUsers && listUsers.length > 0
      ? displayedKeys.map((key) => ({
          field: key,
          headerName:
            key === "joinDate"
              ? "Join Date"
              : key.charAt(0).toUpperCase() + key.slice(1),
          width: key === "photo" ? 170 : 250,
          renderCell: (params) => {
            return key === "photo" ? (
              <img
                src={params.value}
                alt={`User ${params.row.name}`}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : key === "joinDate" ? (
              new Date(params.value).toLocaleDateString()
            ) : (
              params.value
            );
          },
        }))
      : [];

  // const filteredListUsers =
  //   listUsers &&
  //   listUsers.map((user, index) =>
  //     displayedKeys.reduce((obj, key) => {
  //       if (key === "_id") {
  //         obj[key] = index + 1;
  //       } else {
  //         obj[key] = user[key];
  //       }
  //       return obj;
  //     }, {})
  //   );

  return (
    <div className="products">
      <div className="info">
        <h1>Users Management</h1>
        <button className="logout-btn" onClick={() => setOpen(true)}>
          Add New Users
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <UserTable
          baseRoute="users"
          entityRoute="finduser"
          columns={columns}
          rows={listUsers}
          deleteUrl={`${import.meta.env.VITE_BASE_URL}/users`}
          onDelete={handleDeleteUser}
        />
      )}
      {open && <AddUser slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
