import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import applicationStore from "@/store";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={applicationStore}>
      <div className="eduzy-dashboard h-screen w-screen">{children}</div>
    </Provider>
  );
};

export default AppLayout;
