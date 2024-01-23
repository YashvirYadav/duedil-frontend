import { Outlet } from "react-router-dom";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";

const AdminHome = () => {
  return (
    <div>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
