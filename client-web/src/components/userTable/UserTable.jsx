import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./userTable.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const UserTable = (props) => {
  const { baseRoute, entityRoute } = props;
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDeleteConfirmation = (itemId) => {
    setDeleteItemId(itemId);

    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(itemId);
      } else {
        setDeleteItemId(null);
      }
    });
  };

  const handleDelete = async (_id) => {
    try {

      const response = await axios({
        method: "delete",
        url: `${props.deleteUrl}/${_id}`,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });


      if (response.status === 200) {
        if (props.onDelete) {
          props.onDelete();
        }
        Swal.fire({
          icon: "success",
          title: "Deleted successfully!",
        });
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);


      if (props.onError) {
        props.onError(
          error.response ? error.response.data.message : error.message
        );
      }
    }
  };

  const actionColumns = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          {/* <Link to={`/${baseRoute}/${entityRoute}/${params.row._id}`}>
            <img src="/view.svg" alt="" />
          </Link> */}
          <div
            className="delete"
            onClick={() => handleDeleteConfirmation(params.row._id)}
          >
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default UserTable;
