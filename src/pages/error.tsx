type Props = {
  title: string;
  description: string;
};

const ErrorPage = ({ title, description }: Props) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div>
        {title} | {description}
      </div>
    </div>
  );
};

export default ErrorPage;
