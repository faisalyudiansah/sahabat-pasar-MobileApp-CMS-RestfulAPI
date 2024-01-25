import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./updateOrder.scss";

const UpdateOrder = (props) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(props.listOrders.status || "confirmed");

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/orders/${props.listOrders._id}`,
                {
                    status: status,
                    productOrder: props.listOrders.productOrder,
                },
                {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
    
            if (response.status === 200) {
                toast.success("Order updated successfully");
                props.setOpen(false);
                window.location.reload()
            } else {
                toast.error("Failed to update order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Error updating order");
        }
    };
    

    return (
        <div className="addOrder">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Edit Order {props.idOrder}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label>Status</label>
                        <select name="status" value={status} className="custom-select" onChange={handleStatusChange}>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateOrder;
