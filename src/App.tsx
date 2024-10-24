import { Outlet } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default App;
