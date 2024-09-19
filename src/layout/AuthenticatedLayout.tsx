import { PropsWithChildren } from "react";

import Body from "@/components/body";
import HeaderNavBar from "@/components/navbar";

const AuthenticatedLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full w-full">
      <HeaderNavBar />
      <Body>{children}</Body>
    </div>
  );
};

export default AuthenticatedLayout;
