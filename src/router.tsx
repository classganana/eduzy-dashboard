import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import ErrorPage from "./pages/error";
import App from "./App";

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage description="Page Not found" title="404" />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);
