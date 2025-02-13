import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen font-poppins">
      <Sidebar className="row-span-full" />
      <div className="grid grid-rows-[60px_1fr]">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
