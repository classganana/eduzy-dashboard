import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";
import ProtectedRoute from "./components/protected-route";
import { Constants } from "./lib/utils/constants";
import Assessments from "./pages/assessments";
import CreateTest from "./pages/create-test";
import ErrorPage from "./pages/error";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import Reports from "./pages/reports";

export const applicationRouter = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage description="Page Not found" title="404" />,
    children: [
      {
        path: Constants.routes.login,
        element: <LoginPage />,
      },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            // Redirect to /home when accessing the root path
            path: "/",
            element: <Navigate to={Constants.routes.home} />,
          },
          {
            path: Constants.routes.home,
            element: <Home />,
          },
          {
            path: Constants.routes.assessments,
            element: <Assessments />,
          },
          {
            path: Constants.routes.reports,
            element: <Reports />,
          },
          {
            path: Constants.routes.createTest,
            element: <CreateTest />,
          },
        ],
      },
    ],
  },
]);
