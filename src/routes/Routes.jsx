import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut/MainLayOut";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import AllProducts from "../Pages/AllProducts/AllProducts";
import PrivateRouter from "./PrivateRouter";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import BookingForm from "../Pages/BookingForm/BookingForm";
import DashboardLayout from "../LayOut/DashBoardLayout/DashboardLayout";
import AddProduct from "../components/Form/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRouter>
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/booking-product/:id",
        element: (
          <PrivateRouter>
            <BookingForm></BookingForm>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/add-product",
        element: <AddProduct></AddProduct>,
      },
    ],
  },
]);
