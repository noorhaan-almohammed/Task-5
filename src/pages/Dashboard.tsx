import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

function Dashboard() {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-2 w-80 custom-scrollbar overflow-y-scroll overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
