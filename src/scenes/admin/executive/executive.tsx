import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "../../global/Topbar";
import { useEffect, useState } from "react";

const ExecutiveHome = () => {
  const [isAuth,setIsAuth] = useState<boolean>(true)
 // const navigate = useNavigate();
 const authToken = sessionStorage.getItem("token");

  useEffect(() => {
    console.log("authToken=>")

    if (!authToken) {
      setIsAuth(false)
    //  navigate("/");
    }
  },[authToken]);

  return (
    isAuth?
    <div>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />

          <Outlet />
        </main>
      </div>
    </div>:<Navigate to={"/"} ></Navigate>
  );
};

export default ExecutiveHome;
