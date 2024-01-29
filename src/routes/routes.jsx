import { createHashRouter } from "react-router-dom";
import Login from "../Components/Login/Login";
import HomePage from "../Components/HomePage/HomePage";
import PopupLayout from "../Components/Common/PopupLayout";
import UsageSummary from "../Components/UsageSummary/UsageSummary";
import Layout from "../Components/Common/Layout";
import ErrorPage from "../Components/Common/ErrorPage";
import Details from "../Components/Details/Details";

const routes = [
  {
    element: <PopupLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <UsageSummary />,
      },
      {
        path: "/summary",
        element: <UsageSummary />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
    ],
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/details",
        element: <Details />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
