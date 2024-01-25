import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./table.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Table = (props) => {
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
      await axios({
        method: "delete",
        url: `${props.deleteUrl}/${String(_id)}`,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      if (props.onDelete) {
        props.onDelete();
      }
      Swal.fire({
        icon: "success",
        title: "Deleted successfully!",
      });
      window.location.reload();
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Unable to delete confirmed Order"
      ) {
        Swal.fire({
          icon: "error",
          title: "Unable to delete confirmed Order",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error during deletion",
        });
      }
      if (props.onError) {
        props.onError(error.response.data.message);
      }
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row._id}`}>
            <img src="/view.svg" alt="" />
          </Link>
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
        columns={[...props.columns, actionColumn]}
        getRowId={(row) => row._id}
        pageSize={10}
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
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default Table;
