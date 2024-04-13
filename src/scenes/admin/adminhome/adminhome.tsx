import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";

const AdminHome = () => {
  const authToken = sessionStorage.getItem("token");

  

  return (
    authToken ? <div>
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />

        <Outlet />
      </main>
    </div>
  </div> : <Navigate to="/"/>

    
  );
};

export default AdminHome;
