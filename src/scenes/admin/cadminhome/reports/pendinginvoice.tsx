import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";

import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import BasicDatePicker from "../../../../components/BasicDatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  loading,
  message,
  selectorPendinginvoicesatusreport,
} from "../cadminslice/cadmin.selector";
import { pendinginvoicesatusreport } from "../cadminslice/cadminslice";
import { Toast } from "../../../../components/Toast";
import { Loader } from "../../../../components/Lodar";
import { calculatePercentage } from "../../../../utils/utils";

const Pendinginvoice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();

  const currentDateJS = dayjs()
  const tenDaysAgoJS = dayjs().subtract(10, "day");

  const currentDate = dayjs().toDate();
  const tenDaysAgo = dayjs().subtract(10, "day").toDate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log(currentDate.toString()); // Current date
  console.log(tenDaysAgo.toString());
  const toastmessage = useSelector(message);
  const pendinginvoicesatusreportdata = useSelector(
    selectorPendinginvoicesatusreport
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
      pendinginvoicesatusreport({ startDate: tenDaysAgo, endDate: currentDate })
    );
  }, [dispatch]);

  const searchDeshboard = () => {
    dispatch(pendinginvoicesatusreport({ startDate, endDate }));
  };

  const satrtDateChange = (date: Dayjs | null) => {
    if (date) {
      console.log("satrt date=>", date.date());
      setStartDate(date.toDate());
    }
  };

  const endDateChange = (date: Dayjs | null) => {
    if (date) {
      console.log("end date=>", date.toDate().toString());
      setEndDate(date.toDate());
    }
  };

  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "vendorname", headerName: "Vendor name", flex: 2 },

    {
      field: "total",
      headerName: "Total Invoice",
      flex: 1,
    },
    {
      field: "VHD",
      headerName: "VHD",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.VHD || 0} - ${calculatePercentage(params.row.VHD || 0, params.row.total || 0)} %`,
    },

    {
      field: "Approver",
      headerName: "Approver",
      flex: 1,

      valueGetter: (params) =>
        `${params.row.Approver || 0} - ${calculatePercentage(params.row.Approver || 0, params.row.total || 0)} %`,
    },
    {
      field: "GRN",
      headerName: "GRN",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.GRN || 0} - ${calculatePercentage(params.row.GRN || 0, params.row.total || 0)} %`,
    },

    {
      field: "Reviewer",
      headerName: "Reviewer",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.Reviewer || 0} - ${calculatePercentage(params.row.Reviewer || 0, params.row.total || 0)} %`,
    },
    {
      field: "Finance",
      headerName: "Finance",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.Finance || 0} - ${calculatePercentage(params.row.Finance || 0, params.row.total || 0)} %`,
    },
    {
      field: "API",
      headerName: "API",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.API || 0} - ${calculatePercentage(params.row.API || 0, params.row.total || 0)} %`,
    },
    {
      field: "Paid",
      headerName: "Paid",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.Paid || 0} - ${calculatePercentage(params.row.Paid || 0, params.row.total || 0)} %`,
    },
  ];

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Pending invoice satus report"
            subtitle="Welcome to your report"
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <BasicDatePicker
              onDateChange={satrtDateChange}
              dateLabel="Start date"
              defaultValue={tenDaysAgoJS}
            />
            <BasicDatePicker
              onDateChange={endDateChange}
              dateLabel="End date"
                defaultValue={currentDateJS}
            />

            <Button
              color="secondary"
              startIcon={<SearchIcon />}
              variant="contained"
              autoFocus
              sx={{
                textTransform: "none",
                width: "200px",
                height: "50px",
                marginTop: "3px",
              }}
              onClick={searchDeshboard}
            >
              Search
            </Button>
          </Box>
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
            rows={pendinginvoicesatusreportdata} // Ensure that invoice is an array
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

export default Pendinginvoice;
