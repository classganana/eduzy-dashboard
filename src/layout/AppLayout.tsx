import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import applicationStore from "@/store";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <Provider store={applicationStore}>
        <div className="eduzy-dashboard h-screen w-screen">{children}</div>
      </Provider>
    </NextUIProvider>
  );
};

export default AppLayout;
