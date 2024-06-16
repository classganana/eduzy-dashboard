import "./App.css";
import { Provider } from "react-redux";
import applicationStore from "./store";
import { Outlet } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

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
