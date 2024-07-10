import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../../../components/Header";
import StatBox from "../../../components/StatBox";
import { Outlet } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { userDashborde } from "../../../scenes/user/userSlice/user.selector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserDashbord } from "../../user/userSlice/userslice";
import { AppDispatch } from "../../../app/store";
import { Loader } from "../../../components/Lodar";
import { Toast } from "../../../components/Toast";
import { loading, message, invoiceData } from "./needtoact/needtoact.selector";
import { useNavigate } from "react-router-dom";
import { getNeedtoact, getuserinvoicesbyhistoryapproved, getuserinvoicesbyhistoryrejected, getuserinvoicesbyhistorywip } from "./needtoact/needtoact.slice";
import { formatNumberIndian } from "../../../utils/utils";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TimelineIcon from '@mui/icons-material/Timeline';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PaidIcon from '@mui/icons-material/Paid';











const DashboardUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(userDashborde);

  const lodingState = useSelector(loading);
  const invoice = useSelector(invoiceData);
  const toastmessage = useSelector(message);
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>("neeToAct");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNeedtoact());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getuserDashbord());
  }, [dispatch]);

  const columns: GridColDef<any[number]>[] = [
    { field: "clientname", headerName: "Clientname"  ,   flex: 1,},

    {
      field: "createdAt",
      headerName: "Creation Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.createdAt && params.row.createdAt.split("T")[0],
    },
    {
      field: "duedate",
      headerName: "Due Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.duedate && params.row.duedate.split("T")[0],
    },

    {
      field: "movementstatus",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: 200,
      // Remove the 'disableClickEventBubbling' property
      // from the object literal
      // The 'disableClickEventBubbling' property does not exist in type 'GridColDef<any>'
      renderCell: (params: GridRenderCellParams) => {
       
        const onClickView = () => {
          // const id = params.id;
          // handle view operation here
          const id = params.id.toString();
          if (action === "neeToAct") {
            navigate(`action/${id || ""}`);
          }else{
            navigate(`viewinvoice/${id || ""}`);
          }
          
        };

        return (
          <div>
            <IconButton onClick={onClickView}>
              <VisibilityIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const actionNeetoact=()=>{  
    dispatch(getNeedtoact());
    setAction("neeToAct");
  }

  const actionUnderApproval = () => {
    dispatch(getuserinvoicesbyhistorywip());
    setAction("underApproval");
  }

  const actionRejected = () => {
    dispatch(getuserinvoicesbyhistoryrejected());
    setAction("rejected");
  }

  const actionCompleted = () => {
    dispatch(getuserinvoicesbyhistoryapproved());
    setAction("completed");
  }

  return (
    <Box sx={{ 
      marginLeft: '20px',  // replace 'yourMargin' with your desired margin
      marginRight: '20px', // replace 'yourMargin' with your desired margin
      marginTop: '0px',   // replace 'yourMargin' with your desired margin
      marginBottom: '20px' // replace 'yourMargin' with your desired margin
    }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* <Header title="DASHBOARD" subtitle="Welcome to your dashboard" /> */}

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          bgcolor={action== "neeToAct"?colors.primary[800]: colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionNeetoact}
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: 'pointer'
          }}
        >
          <StatBox
            title={formatNumberIndian(data.needtoacttotal)}
            subtitle="Need to act"
            progress="0.75"
            increase={data.needtoact}
            icon={
              <NewReleasesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={action== "underApproval"?colors.primary[800]: colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionUnderApproval}
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(data.invoiceWipAmount)}
            subtitle="Under approval"
            progress="0.50"
            increase={data.invoiceWip}
            icon={
              <TimelineIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          bgcolor={action== "rejected"?colors.primary[800]: colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionRejected}
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(data.invoiceRejectedAmount)} // Amount
            subtitle="Rejected invoice"
            progress="0.30"
            increase={data.invoiceRejected} // count
            icon={
              <ThumbDownAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={action== "completed"?colors.primary[800]: colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionCompleted}
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(data.invoiceCompletedAmount)}
            subtitle="Paid invoice"
            progress="0.80"
            increase={data.invoiceCompleted}
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
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

        <DataGrid
          sx={{
            "& .MuiDataGrid-cell": {
              fontSize: "14px", // Change this value to your desired font size
            },
          }}
         
          density="compact"
          // checkboxSelection
          rows={Array.isArray(invoice) ? invoice : []} // Ensure that invoice is an array
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id} // Use the `_id` field as the unique id
        />
      </Box>
      <Outlet></Outlet>
    </Box>
  );
};

export default DashboardUser;
