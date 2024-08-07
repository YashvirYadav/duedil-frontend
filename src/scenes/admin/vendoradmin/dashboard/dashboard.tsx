import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { mockTransactions } from "../../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../../components/Header";

import LineChart from "../../../../components/LineChart";
import GeographyChart from "../../../../components/GeographyChart";
import BarChart from "../../../../components/BarChart";
import StatBox from "../../../../components/StatBox";
import ProgressCircle from "../../../../components/ProgressCircle";
import { Outlet } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import {
  loading,
  message,
  vendorDashboardData,
  vendorInvoiceList,
} from "./selector.vendords";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedInvoice, getMyInvoice, getMyInvoiceNew, getMyPaidInvoice, getMyRejectedInvoice, getMyWipInvoice, getVenderDashboard } from "./dashboardslice";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Toast } from "../../../../components/Toast";
import { Loader } from "../../../../components/Lodar";
import { formatNumberIndian } from "../../../../utils/utils";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PaidIcon from '@mui/icons-material/Paid';
import WalletIcon from '@mui/icons-material/Wallet';
import FileCopyIcon from '@mui/icons-material/FileCopy';






const DashboardVendor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(vendorDashboardData);
  const lodingState = useSelector(loading);
  const toastmessage = useSelector(message);
  const invoice = useSelector(vendorInvoiceList);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTotalInvoice, setselectedTotalInvoice] = useState<boolean>(true);
  const [selectedNewInvoice, setselectedNewInvoice] = useState<boolean>(false);
  const [selectedRejectedInvoice, setselectedRejectedInvoice] = useState<boolean>(false);
  const [selectedUnderApproval, setselectedUnderApproval] = useState<boolean>(false); 
  const [selectedPaidInvoice, setselectedPaidInvoice] = useState<boolean>(false);

  console.log("invoice", invoice);


  useEffect(() => {
    dispatch(getVenderDashboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyInvoice());
  }, [dispatch]);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  const columns: GridColDef<any[number]>[] = [
    { field: "clientname", headerName: "Client name" , flex: 1, },

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
          navigate(`viewinvoice/${id || ""}`);
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

  const actionNewInvoice=()=>{
    dispatch(getMyInvoiceNew());
    setselectedNewInvoice(true);
    // other false
    setselectedTotalInvoice(false);
    setselectedUnderApproval(false);
    setselectedPaidInvoice(false);
    setselectedRejectedInvoice(false);
  }

  const actionRejectInvoice=()=>{
    dispatch(getMyRejectedInvoice());
    setselectedRejectedInvoice(true);
    // other false
    setselectedNewInvoice(false);
    setselectedTotalInvoice(false);
    setselectedUnderApproval(false);
    setselectedPaidInvoice(false);



    }

  const actionUnderApproval=()=>{
    dispatch(getMyWipInvoice());
    setselectedUnderApproval(true);
    // other false
    setselectedNewInvoice(false);
    setselectedTotalInvoice(false);
    setselectedPaidInvoice(false);
    setselectedRejectedInvoice(false);

  }

  const actionPaidInvoice=()=>{

    dispatch(getCompletedInvoice());
    setselectedPaidInvoice(true);
    // other false
    setselectedNewInvoice(false);
    setselectedUnderApproval(false);
    setselectedTotalInvoice(false);
    setselectedRejectedInvoice(false);

  }

  const actionTotalInvoice=()=>{
    dispatch(getMyInvoice());
    setselectedTotalInvoice(true);
    // other false
    setselectedNewInvoice(false);
    setselectedUnderApproval(false);
    setselectedPaidInvoice(false);
    setselectedRejectedInvoice(false);

  }

  return (
    <Box sx={{ 
      marginLeft: '20px',  // replace 'yourMargin' with your desired margin
      marginRight: '20px', // replace 'yourMargin' with your desired margin
      marginTop: '0px',   // replace 'yourMargin' with your desired margin
      marginBottom: '20px' // replace 'yourMargin' with your desired margin
    }}>
      {/* HEADER */}
      
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 2"
          bgcolor={selectedTotalInvoice?colors.primary[800]:colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionTotalInvoice}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
          
        >
          <StatBox
            title=""
            subtitle="Total Request"
            progress="0.75"
            increase={data.totalInvoice}
           
            icon={
              <WalletIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          bgcolor={selectedNewInvoice ?colors.primary[800]:colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionNewInvoice}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title=""
            subtitle="New Request"
            progress="0.50"
            increase={data.newInvoice}
            icon={
              <FiberNewIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 2"
          bgcolor={selectedRejectedInvoice ?colors.primary[800]:colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionRejectInvoice}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title=""
            subtitle="Rejected Request"
            progress="0.50"
            increase={data.rejectedInvoice}
            icon={
              <ThumbDownAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 2"
          bgcolor={selectedUnderApproval?colors.primary[800]:colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionUnderApproval}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title="" // Amount
            subtitle="Under approval"
            progress="0.30"
            increase={data.wipInvoice} // count
            icon={
              <PublishedWithChangesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          bgcolor={selectedPaidInvoice?colors.primary[800]:colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionPaidInvoice}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title=""
            subtitle="Completed"
            progress="0.80"
            increase={data.paidInvoice}
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 2"
          bgcolor={selectedPaidInvoice?colors.primary[800]:colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionPaidInvoice}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title="0"
            subtitle="Puchase Order"
            progress="0.80"
            increase="0"
            icon={
              <FileCopyIcon
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

        {/* ROW 2 */}
        {/* <Box gridColumn="span 8" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            // colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        {/* <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      
      <Outlet></Outlet>
    </Box>
  );
};

export default DashboardVendor;
