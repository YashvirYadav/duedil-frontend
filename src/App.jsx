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
import { VendorContainer } from "./scenes/vendor/vendor";
import { DepartmentContainer } from "./scenes/department/depatment";
import TableCategory from "./scenes/category/table.category";
import RegisterCategory from "./scenes/category/register.category";
import RegisterRatecard from "./scenes/ratecard/register.ratecard";
import ChangePassword from "./scenes/changepassword/changepassword";
import Vendor from "./scenes/vendor/table.vendor";
import RegisterVendor from "./scenes/vendor/register.vendor";
import Department from "./scenes/department/table.department";
import RegisterDepatrment from "./scenes/department/register.department";
import VendorHome from "./scenes/admin/vendoradmin/vendoradmin";
import { InvoiceContainer } from "./scenes/invoices/invoive";
import InvoiceTable from "./scenes/invoices/table.invoice";
import RegisterInvoice from "./scenes/invoices/register.invoice";

import { BankDetails } from "./scenes/bankdetails/bankdetails";
import RegisterBank from "./scenes/bankdetails/register.bank";
import TableBank from "./scenes/bankdetails/table.bank";

import { Role } from "./scenes/role/Role";
import TableRole from "./scenes/role/table.role";
import RegisterRole from "./scenes/role/register.role";
import { Workflow } from "./scenes/worlflow/Workflow";
import WorkflowRagistar from "./scenes/worlflow/ragistar.workflow";
import TableWorflow from "./scenes/worlflow/table.workflow";
import DashboardVendor from "./scenes/admin/vendoradmin/dashboard/dashboard";
import ExecutiveHome from "./scenes/admin/executive/executive";
import DashboardUser from "./scenes/admin/executive/executiveDashbord";
import { Needtoact } from "./scenes/admin/executive/needtoact/needtoact";
import NeedtoactTable from "./scenes/admin/executive/needtoact/needtoact.table";
import NeedToactAction from "./scenes/admin/executive/needtoact/needtoact.action";
import ViewInvice from "./scenes/admin/vendoradmin/dashboard/view.invoice";
import ClientAdminashboard from "./scenes/admin/cadminhome/ClientAdminashboard";
import Clientadmintable from "./scenes/admin/cadminhome/cadmin.table";
import { AdminInviceView } from "./scenes/admin/cadminhome/AdminInviceView";
import { ViewExSla } from "./scenes/admin/cadminhome/ViewExSla";

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
            <Route path="changepassword" element={<ChangePassword />} />

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
              <Route path="" element={<RegisterRatecard />} />
            </Route>
          </Route>

          <Route path="clientadmin" element={<CadminHome />}>
            <Route path="" element={<ClientAdminashboard />} />

            <Route path="viewexsla/:id?" element={<ViewExSla />}>
              <Route path="" element={<ViewInvice />} />
            </Route>

            <Route path="invoice/:typeaction?" element={<AdminInviceView />}>
              <Route path="" element={<Clientadmintable />} />
              <Route path="viewinvoice/:id?" element={<ViewInvice />} />
            </Route>

            <Route path="user" element={<UserContener />}>
              <Route path="" element={<Users />} />
              <Route path="addUser" element={<Registeruser />} />
            </Route>

            <Route path="vendor" element={<VendorContainer />}>
              <Route path="" element={<Vendor />} />
              <Route path="addVendor" element={<RegisterVendor />} />
            </Route>

            <Route path="department" element={<DepartmentContainer />}>
              <Route path="" element={<Department />} />
              <Route path="adddepatrment" element={<RegisterDepatrment />} />
            </Route>

            <Route path="role" element={<Role />}>
              <Route path="" element={<TableRole />} />
              <Route path="addrole" element={<RegisterRole />} />
            </Route>

            <Route path="workflow" element={<Workflow />}>
              <Route path="" element={<TableWorflow />} />
              <Route path="addworkflow" element={<WorkflowRagistar />} />
            </Route>

            <Route path="changepassword" element={<ChangePassword />} />
          </Route>

          <Route path="vendor" element={<VendorHome />}>
            <Route path="" element={<DashboardVendor />} />
            <Route path="viewinvoice/:id?" element={<ViewInvice />} />

            <Route path="invoice" element={<InvoiceContainer />}>
              <Route path="" element={<InvoiceTable />} />
              <Route path="addinvoice" element={<RegisterInvoice />} />
            </Route>

            <Route path="generateinvoice" element={<InvoiceContainer />}>
              <Route path="" element={<InvoiceTable />} />
              <Route path="addinvoice" element={<RegisterInvoice />} />
            </Route>

            <Route path="bank" element={<BankDetails />}>
              <Route path="" element={<TableBank />} />
              <Route path="addbank" element={<RegisterBank />} />
            </Route>
          </Route>

          <Route path="user" element={<ExecutiveHome />}>
            <Route path="" element={<DashboardUser />} />
            <Route path="addUser" element={<Registeruser />} />
            <Route path="viewinvoice/:id?" element={<ViewInvice />} />
            <Route path="action/:id?" element={<NeedToactAction />} />

            <Route path="neetoact" element={<Needtoact />}>
              <Route path="" element={<NeedtoactTable />} />
              {/* <Route path="addbank" element={<RegisterBank />} /> */}
              <Route path="action/:id?" element={<NeedToactAction />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
