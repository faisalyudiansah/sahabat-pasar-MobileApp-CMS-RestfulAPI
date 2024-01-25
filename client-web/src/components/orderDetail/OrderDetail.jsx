import React, { useState } from "react";
import UpdateOrder from "../updateOrder/UpdateOrder";

const OrderDetail = ({ listOrders }) => {
  const storeName = listOrders?.store?.name;
  const salesName = listOrders?.user?.name;
  const productOrder = listOrders?.productOrder?.name;
  const productPrice = listOrders?.productOrder?.price;
  const [open, setOpen] = useState(false);

  const formattedTime = new Date(listOrders?.createdAt).toLocaleString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    }
  );

  return (
    <>
      <div className="card">
        <div className="card__title">
          <div className="icon">
            <a href="#">
              <i className="fa fa-arrow-left"></i>
            </a>
          </div>
          <h3> Order Detail {listOrders._id}</h3>
        </div>
        <div className="card__body">
          <div className="half">
            <div className="featured_text">
              <h1>{storeName}</h1>

              <div className="image"></div>
              <div className="reviews"></div>
              <span className="stock">
                <span>
                  <br />
                  Sales : {salesName}
                </span>
              </span>
            </div>
          </div>
          <div className="half">
            <div className="description">
              <p > Ordered List:</p>
              {listOrders?.productOrder?.map((product, index) => (
                <div key={index}>
                  <h1>
                    - Product {index + 1} :
                  </h1>
                  <p>Name: {product.name}</p>
                  <p>Category: {product.category}</p>
                  <p>Qty Sold: {product.qtySold} pcs</p>
                  <p>
                    total Price perItem :{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.billPerItem)}
                  </p>
                </div>
              ))}
              <br />
              <p>
                Total Bill :
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(listOrders.totalBill)}
              </p>
            </div>
          </div>
        </div>
        <div className="card__footer">
          <div className="recommend">
            <h3>Status : {listOrders.status}</h3>
            <h3>{formattedTime}</h3>
          </div>
          <div className="action">
            <button onClick={() => setOpen(true)}>Edit Status</button>
          </div>
        </div>
      </div>
      {open && (
        <UpdateOrder slug="product" setOpen={setOpen} listOrders={listOrders} />
      )}
    </>
  );
};

export default OrderDetail;
