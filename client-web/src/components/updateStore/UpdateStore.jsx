import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./updateStore.scss";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom'

const UpdateStore = (props) => {
    const navigate = useNavigate();
    const [loadingPopulate, setLoadingPopulate] = useState(true);
    let { id } = useParams()
    const [storeInput, setStoreInput] = useState({
        name: "",
        longitude: 0,
        latitude: 0,
        address: "",
        ownerName: "",
        mobilePhone: "",
        status: "",
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStoreInput({
            ...storeInput,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await axios({
                method: "put",
                url: import.meta.env.VITE_BASE_URL + `/stores/${id}`,
                data: storeInput,
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            });
            if (image) {
                const formData = new FormData();
                formData.append("photo", image);
                await axios({
                    url: import.meta.env.VITE_BASE_URL + `/stores/${id}`,
                    method: "patch",
                    data: formData,
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    },
                });
            }
            Swal.fire({
                icon: 'success',
                title: 'Store has been updated',
                timerProgressBar: true,
                willClose: () => {
                    setLoading(false);
                    props.setOpen(false);
                    window.location.reload();
                    navigate("/products");
                },
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        }
    };

    useEffect(() => {
        function padZero(num) {
            return num.toString().padStart(2, '0');
        }
        async function getScheduleForPopulate() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: import.meta.env.VITE_BASE_URL + `/stores/${id}`,
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    },
                })
                // console.log(data)
                setStoreInput({
                    name: data.name,
                    longitude: data.location.coordinates[0],
                    latitude: data.location.coordinates[1],
                    address: data.address,
                    ownerName: data.ownerName,
                    mobilePhone: data.mobilePhone,
                    status: data.status,
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingPopulate(false)
            }
        }
        getScheduleForPopulate()
    }, [])

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Update Store</h1>
                {loadingPopulate ? (
                    <h2 style={{ textAlign: 'center' }}>Loading...</h2>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label>Name</label>
                            <input name="name" value={storeInput.name} type="text" id="name" onChange={handleChange} />
                        </div>
                        <div className="item">
                            <label>Longitude</label>
                            <input
                                name="longitude"
                                type="number"
                                id="longitude"
                                value={storeInput.longitude}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="item">
                            <label>Latitude</label>
                            <input
                                name="latitude"
                                type="number"
                                id="latitude"
                                value={storeInput.latitude}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="item">
                            <label>Address</label>
                            <input
                                value={storeInput.address}
                                name="address"
                                type="text"
                                id="address"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="item">
                            <label>Owner Name</label>
                            <input
                                value={storeInput.ownerName}
                                name="ownerName"
                                type="text"
                                id="ownerName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="item">
                            <label>mobilePhone</label>
                            <input
                                value={storeInput.mobilePhone}
                                name="mobilePhone"
                                type="text"
                                id="mobilePhone"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="item">
                            <label>status</label>
                            <select
                                name="status"
                                id="status"
                                onChange={handleChange}
                                value={storeInput.status}
                            >
                                {["unverified", "verified"].map((status, i) => (
                                    <option key={i} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="item">
                            <label>Image</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Send"}
                        </button>
                    </form>
                )}
            </div>

        </div>
    );
};

export default UpdateStore;
