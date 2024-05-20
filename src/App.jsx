import React from "react";
import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import AdminHome from "./scenes/admin/adminhome/adminhome";
import RegisterCompany from "./scenes/company/register.company";
import TableCompany from "./scenes/company/table.company";
import CadminHome from "./scenes/admin/cadminhome/cadmin";
import Users from "./scenes/user/table.user";
import Registeruser from "./scenes/user/register.user";
import { Company } from "./scenes/company/company";
import { UserContener } from "./scenes/user/user";
import { Category } from "./scenes/category/category";
import TableCategory from "./scenes/category/table.category";
import RegisterCategory from "./scenes/category/register.category";
import RegisterRatecard from "./scenes/ratecard/register.ratecard";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="admin" element={<AdminHome />}>
            <Route path="" element={<Dashboard />} />
            <Route path="team" element={<Team />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="form" element={<Form />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="bar" element={<Bar />} />
            <Route path="pie" element={<Pie />} />
            <Route path="line" element={<Line />} />
            <Route path="geography" element={<Geography />} />

            <Route path="company" element={<Company />}>
              <Route path="" element={<TableCompany />} />
              <Route path="addcmapany/:id?" element={<RegisterCompany />} />
            </Route>

            <Route path="user" element={<UserContener />}>
              <Route path="" element={<Users />} />
              <Route path="addUser" element={<Registeruser />} />
            </Route>

            <Route path="category" element={<Category />}>
              <Route path="" element={<TableCategory />} />
              <Route path="addCategory" element={<RegisterCategory />} />
            </Route>

            <Route path="ratecard" element={<Category />}>
              <Route path="" element={< RegisterRatecard/>} />
              
            </Route>

          </Route>

          

          <Route path="cadmin" element={<CadminHome />}></Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
