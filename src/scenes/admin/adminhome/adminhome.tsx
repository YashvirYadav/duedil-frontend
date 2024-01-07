import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import Form from "../../form";

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
