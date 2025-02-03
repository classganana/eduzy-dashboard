import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import { getTokenFromLocalStorage } from "@/lib/utils";
import { Constants } from "@/lib/utils/constants";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenInfo = getTokenFromLocalStorage();

    if (tokenInfo?.isAuthenticated) {
      setIsLoggedin(true);
    } else {
      navigate(Constants.routes.login);
    }
  }, [location.pathname]);

  return isLoggedin ? (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  ) : null;
}

export default ProtectedRoute;
