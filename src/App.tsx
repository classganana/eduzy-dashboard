import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import applicationStore from "./store";

function App() {
  return (
    <Provider store={applicationStore}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Provider>
  );
}

export default App;
