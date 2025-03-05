import DashboardFilter from "../features/dashboard/DashboardFilter"
import DashboardLayout from "../features/dashboard/DashboardLayout";
function Dashboard() {
  return (
    <div className="bg-grey-100 h-screen overflow-y-scroll w-[98%] p-20 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold text-start">Dashboard</h1>
        <DashboardFilter/>
      </div>
      <DashboardLayout/>
    </div>
  );
}

export default Dashboard;
