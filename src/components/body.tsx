import { useLocation } from "react-router-dom";

import SideNavBar from "./side-navbar";

import { Constants } from "@/lib/utils/constants";

type Props = {
  children: React.ReactNode;
};

const Body = ({ children }: Props) => {
  const location = useLocation();

  return (
    <div className="flex flex-col sm:flex-row py-3">
      {Constants.sidebarNeededPages.includes(location.pathname) && (
        <SideNavBar />
      )}
      <div className="grow flex flex-col p-3">{children}</div>
    </div>
  );
};

export default Body;
