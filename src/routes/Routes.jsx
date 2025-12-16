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
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import MyOrders from "../components/DashBoard/Buyer/MyOrders";

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
      {
        path: "/payment-success",
        Component: PaymentSuccess,
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
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
    ],
  },
]);
