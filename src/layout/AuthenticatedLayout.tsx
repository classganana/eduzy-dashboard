import { PropsWithChildren } from "react";

import HeaderNavBar from "@/components/navbar";

const AuthenticatedLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full w-full">
      <HeaderNavBar />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
