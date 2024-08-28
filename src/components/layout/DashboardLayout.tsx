import { Outlet } from "react-router-dom";
import { Sidebar } from "../Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
