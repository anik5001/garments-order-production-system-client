import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut/MainLayOut";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
  },
]);
