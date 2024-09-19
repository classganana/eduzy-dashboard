type Props = {
  children: React.ReactNode;
};

const Body = ({ children }: Props) => {
  return <div className="h-full w-full flex flex-col p-5">{children}</div>;
};

export default Body;
