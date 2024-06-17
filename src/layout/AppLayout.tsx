import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return <div className="eduzy-dashboard h-screen w-screen">{children}</div>;
};

export default AppLayout;
