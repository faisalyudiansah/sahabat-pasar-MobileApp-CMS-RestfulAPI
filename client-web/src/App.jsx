import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import "./styles/global.scss";
import Products from "./pages/products/Products";
import Users from "./pages/users/users";
import Stores from "./pages/stores/Stores";
import Orders from "./pages/orders/Orders";
import Schedules from "./pages/schedules/Schedules";
import DetailPage from "./components/detailPage/DetailPage";
import Product from "./pages/singleProduct/singleProduct";
import SingleProduct from "./pages/singleProduct/singleProduct";
import SingleStore from "./pages/singleStore/SingleStore";
import SingleUser from "./pages/singleUser/SingleUser";
import SingleSchedule from "./pages/singleSchedule/SingleSchedule";
import SingleOrder from "./pages/singleOrder/SingleOrder";
import TestingMap from "./pages/testing-maps/testingMap";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">

              <Outlet />

          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const authHome = () => {
    const access_token = localStorage.access_token;
    if (!access_token) {
      throw redirect("/login");
    }
    return null;
  };

  const authLogin = () => {
    const access_token = localStorage.access_token;
    if (access_token) {
      throw redirect("/");
    }
    return null;
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: authLogin,
    },
    {
      path: "/",
      element: <Layout />,
      loader: authHome,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:id",
          element: <SingleProduct />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/users/finduser/:idUser",
          element: <SingleUser />,
        },
        {
          path: "/stores",
          element: <Stores />,
        },
        {
          path: "/stores/:id",
          element: <SingleStore />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/orders/:id",
          element: <SingleOrder />,
        },
        {
          path: "/schedules",
          element: <Schedules />,
        },
        {
          path: "/schedules/:scheduleId",
          element: <SingleSchedule />,
        },
        {
          path: "/testing/map",
          element: <TestingMap />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
