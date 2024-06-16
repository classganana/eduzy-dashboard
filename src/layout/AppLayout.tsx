import React, { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return <div className="eduzy-dashboard">{children}</div>;
};

export default AppLayout;
