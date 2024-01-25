import React from "react";
import "./userDetail.scss";

const UserDetail = ({ userResponse }) => {
  return (
    <div className="products">
      <div className="">
        <div className="info">
          <div className="container px-6 py-10 mx-auto">
            <div className="mt-8 lg:flex lg:items-center">
              <img
                className="h-65 lg:w-1/2 lg:h-70 rounded-xl mb-6 lg:mb-0"
                src={userResponse.photo}
                alt=""
              />

              <div className="lg:w-1/2 lg:ml-6">
                <p className="text-lg text-black uppercase underline font-bold">
                  User Detail
                </p>

                <a
                  href="#"
                  className="block mt-4 text-3xl font-semibold text-gray-800 hover:underline dark:text-black md:text-4xl"
                >
                  {userResponse.name}
                </a>

                <div className="card-description mt-3 rounded-md">
                  <p className="text-lg text-gray-700 dark:text-black md:text-2xl underline">
                    {" "}
                    Since: {userResponse.joinDate}
                  </p>
                </div>
                <br />
                <div>
                  <h1 className="text-lg text-gray-700 dark:text-black font-bold">
                    total Sales:{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(userResponse.billPerUser)}
                  </h1>
                </div>
                <div>
                  <h1 className="text-lg text-gray-700 dark:text-black font-bold">
                    role: {userResponse.role}
                  </h1>
                </div>

                <a
                  href="#"
                  className="inline-block mt-2 text-blue-500 underline hover:text-blue-400 text-lg"
                >
                  update
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
