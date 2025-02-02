import SideNavBar from "./side-navbar";

type Props = {
  children: React.ReactNode;
};

const Body = ({ children }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row py-3">
      <SideNavBar />
      <div className="grow flex flex-col p-3">{children}</div>
    </div>
  );
};

export default Body;
