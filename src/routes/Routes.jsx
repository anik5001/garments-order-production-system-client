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
import AllProduct from "../components/DashBoard/Admin/AllProducts/AllProduct";
import AllOrders from "../components/DashBoard/Admin/AllOrders/AllOrders";
import ManageUsers from "../components/DashBoard/Admin/ManageUsers/ManageUsers";
import ManageProducts from "../components/DashBoard/Manager/ManageProducts/ManageProducts";
import PendingOrders from "../components/DashBoard/Manager/PendingOrders/PendingOrders";
import ApproveOrders from "../components/DashBoard/Manager/ApproveOrders/ApproveOrders";
import Profile from "../components/DashBoard/Profile/Profile";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import UpdateProduct from "../Pages/UpdateProduct/UpdateProduct";
import ManagerUsers from "../components/DashBoard/Admin/ManageUsers/ManagerUsers";
import OrderDetails from "../Pages/OrderDetails/OrderDetails";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";

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
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
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
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard/add-product",
        element: (
          <PrivateRouter>
            <ManagerRoute>
              <AddProduct></AddProduct>
            </ManagerRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRouter>
            <MyOrders></MyOrders>
          </PrivateRouter>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRouter>
            {" "}
            <AllProduct></AllProduct>
          </PrivateRouter>
        ),
      },
      {
        path: "all-orders",
        element: (
          <PrivateRouter>
            <AdminRoute>
              {" "}
              <AllOrders></AllOrders>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "buyer-users",
        element: (
          <PrivateRouter>
            <AdminRoute>
              {" "}
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "manager-users",
        element: (
          <PrivateRouter>
            <AdminRoute>
              {" "}
              <ManagerUsers></ManagerUsers>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRouter>
            <ManagerRoute>
              {" "}
              <ManageProducts></ManageProducts>
            </ManagerRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <PrivateRouter>
            <ManagerRoute>
              {" "}
              <PendingOrders></PendingOrders>
            </ManagerRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <PrivateRouter>
            <ManagerRoute>
              <ApproveOrders></ApproveOrders>
            </ManagerRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRouter>
            <UpdateProduct></UpdateProduct>
          </PrivateRouter>
        ),
      },
      {
        path: "order-details/:id",
        element: (
          <PrivateRouter>
            <OrderDetails></OrderDetails>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
