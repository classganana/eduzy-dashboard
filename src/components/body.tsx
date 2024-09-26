type Props = {
  children: React.ReactNode;
};

const Body = ({ children }: Props) => {
  return <div className="flex-grow flex flex-col p-5">{children}</div>;
};

export default Body;
