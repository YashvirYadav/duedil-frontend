import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
} from "@mui/x-data-grid";
import { tokens } from "../../../../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../components/Header";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  loading,
  message,
  selectorAagingReports
} from "../../cadminslice/cadmin.selector";
import { agingReports, pendinginvoicesatusreport } from "../../cadminslice/cadminslice";
import { Toast } from "../../../../../components/Toast";
import { Loader } from "../../../../../components/Lodar";
import { calculatePercentage } from "../../../../../utils/utils";

const AgingReports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();

  const currentDate = dayjs().toDate();
  const tenDaysAgo = dayjs().subtract(10, "day").toDate();
  const navigate = useNavigate();
  console.log(currentDate.toString()); // Current date
  console.log(tenDaysAgo.toString());
  const toastmessage = useSelector(message);
  const agingData = useSelector(
    selectorAagingReports
  );
  const lodingState = useSelector(loading);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  useEffect(() => {
    dispatch(
        agingReports()
    );
  }, [dispatch]);


  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "vendorname", headerName: "Vendor name",   flex: 2},

    {
      field: "total",
      headerName: "Total",
      flex: 1,
      valueGetter: (params) => `${params.row.total || 0}`,
    },
    {
      field: "invoices0to30",
      headerName: "0-30",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.invoices0to30 || 0} - ${calculatePercentage(params.row.invoices0to30 || 0, params.row.total || 0)} %`,
      renderCell: (params) => (
        <Button
          onClick={() => {
            navigate("viewlist", {
              state: {
                id: params.id,
                role: "0to30",
              },
            });
          }}
          style={{
            paddingLeft: "0px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" align="left">
            {params.value}
          </Typography>
        </Button>
      ),
    },
    {
      field: "invoices31to60",
      headerName: "31-60",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.invoices31to60 || 0} - ${calculatePercentage(params.row.invoices31to60 || 0, params.row.total || 0)} %`,
   
      renderCell: (params) => (
        <Button
          onClick={() => {
            navigate("viewlist", {
              state: {
                id: params.id,
                role: "31to60",
              },
            });
          }}
          style={{
            paddingLeft: "0px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" align="left">
            {params.value}
          </Typography>
        </Button>
      ),
    },

    {
      field: "invoices61to90",
      headerName: "61-90",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.invoices61to90 || 0} - ${calculatePercentage(params.row.invoices61to90 || 0, params.row.total || 0)} %`,
   
      renderCell: (params) => (
        <Button
          onClick={() => {
            navigate("viewlist", {
              state: {
                id: params.id,
                role: "61to90",
              },
            });
          }}
          style={{
            paddingLeft: "0px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" align="left">
            {params.value}
          </Typography>
        </Button>
      ),
    },
    {
      field: "invoices91to120",
      headerName: "91-120",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.invoices91to120 || 0} - ${calculatePercentage(params.row.invoices91to120 || 0, params.row.total || 0)} %`,
      renderCell: (params) => (
        <Button
          onClick={() => {
            navigate("viewlist", {
              state: {
                id: params.id,
                role: "91to120",
              },
            });
          }}
          style={{
            paddingLeft: "0px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" align="left">
            {params.value}
          </Typography>
        </Button>
      ),
  
    },

    {
      field: "invoices121next",
      headerName: "121+",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.invoices121next || 0} - ${calculatePercentage(params.row.invoices121next || 0, params.row.total || 0)} %`,
      renderCell: (params) => (
        <Button
          onClick={() => {
            navigate("viewlist", {
              state: {
                id: params.id,
                role: "121next",
              },
            });
          }}
          style={{
            paddingLeft: "0px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" align="left">
            {params.value}
          </Typography>
        </Button>
      ),
   
    },
  ];

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Aging report "
            subtitle="Welcome to your report"
          />
        </Box>

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
          <DataGrid
            sx={{
              "& .MuiDataGrid-cell": {
                fontSize: "14px", // Change this value to your desired font size
              },
            }}
            density="compact"
            // checkboxSelection
            rows={agingData} // Ensure that invoice is an array
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Use the `_id` field as the unique id
          />
        </Box>
      </Box>
      {lodingState ? (
        lodingState !== "idle" && lodingState !== "loading" ? (
          <Toast
            open={open}
            handleClose={() => {}}
            setShowToast={setOpen}
            message={toastmessage}
            severity="error"
          />
        ) : lodingState === "loading" ? (
          <Loader />
        ) : null
      ) : null}
    </>
  );
};

export default AgingReports;
