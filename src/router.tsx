import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Assessments from "./pages/assessments";
import ErrorPage from "./pages/error";
import Reports from "./pages/reports";

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage description="Page Not found" title="404" />,
    children: [
      {
        path: "/assessments",
        element: <Assessments />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
]);
