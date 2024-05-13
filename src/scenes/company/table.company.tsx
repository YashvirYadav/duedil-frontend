import { Box, Switch } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCompany, updateCompanyStatus } from "./companyRedux/companyslice";
import { loading, companyData } from "./companyRedux/company.selector";
import { Loader } from "../../components/Lodar";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const company = useSelector(companyData);
  const [action, setAction] = useState<string>("");

  console.log("company => ", company);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);
  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "companyname", headerName: "Company Name" },

    {
      field: "code",
      headerName: "Code",
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },

    {
      field: "zip",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "panno",
      headerName: "Pan No",
      flex: 1,
    },
    {
      field: "gstno",
      headerName: "GST No",
      flex: 1,
    },
    {
      field: "cinno",
      headerName: "CIN No",
      flex: 1,
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
    },
    {
      field: "isactive",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          size="small"
          checked={params.value as boolean}
          onChange={(event) => {
            const newStatus = event.target.checked;

            // Get the id of the row
            const id = params.id.toString();
            console.log("id => ", id);
            console.log("newStatus => ", newStatus);
            // Handle status change
            // You might want to dispatch an action here to update the status on the server
            dispatch(updateCompanyStatus({ id:id })).then(()=>{
              dispatch(getCompany());
            
            });
          }}
        />
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="COMPANY" subtitle="List of company for Future Reference" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {lodingState && lodingState === "loading" ? <Loader /> : null}
        <DataGrid
          checkboxSelection
          rows={Array.isArray(company) ? company : []} // Ensure that company is an array
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id} // Use the `_id` field as the unique id
        />
      </Box>
    </Box>
  );
};

export default Contacts;
