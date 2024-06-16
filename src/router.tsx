import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import App from "./App";

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage title="404" description="Page Not found" />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);
