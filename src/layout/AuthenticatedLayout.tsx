import { PropsWithChildren, useEffect } from "react";

import Body from "@/components/body";
import HeaderNavBar from "@/components/header-navbar";
import { useAppDispatch } from "@/lib/utils/hooks";
import { fetchUserDetails } from "@/store/slices/userSlice";

const AuthenticatedLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    /* Once authenticated, fetch userDetails */
    dispatch(fetchUserDetails());
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <HeaderNavBar />
      <Body>{children}</Body>
    </div>
  );
};

export default AuthenticatedLayout;
