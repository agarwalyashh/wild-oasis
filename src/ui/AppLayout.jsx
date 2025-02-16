import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-12 font-poppins h-screen">
      <Sidebar/>
      <div className="col-span-10 grid grid-rows-12">
        <Header/>
        <main className="row-span-11">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
