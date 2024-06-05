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
import { getCompletedInvoice, getMyInvoice, getMyInvoiceNew, getMyWipInvoice, getVenderDashboard } from "./dashboardslice";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Toast } from "../../../../components/Toast";
import { Loader } from "../../../../components/Lodar";

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
    { field: "invoicenumber", headerName: "Invoice Number" },

    {
      field: "invoicedate",
      headerName: "Invoice date",
      flex: 1,
    },
    {
      field: "duedate",
      headerName: "Due Date",
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "gstamount",
      headerName: "GST Amount",
      flex: 1,
    },

    {
      field: "totalamount",
      headerName: "Total Amount",
      flex: 1,
    },
    {
      field: "purchaseordernumber",
      headerName: "PO Number",
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
          navigate(`action/${id || ""}`);
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
  }

  const actionUnderApproval=()=>{
    dispatch(getMyWipInvoice());
  }

  const actionPaidInvoice=()=>{
    dispatch(getCompletedInvoice());
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
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
        </Box>
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
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          <StatBox
            title={data.totalAmount}
            subtitle="Total invoice"
            progress="0.75"
            increase={data.totalInvoice}
            icon={
              <ReceiptIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionNewInvoice}
        >
          <StatBox
            title={data.newInvoiceAmount}
            subtitle="New Invoice"
            progress="0.50"
            increase={data.newInvoice}
            icon={
              <ReceiptIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionUnderApproval}
        >
          <StatBox
            title={data.wipInvoiceAmount} // Amount
            subtitle="Under approval"
            progress="0.30"
            increase={data.wipInvoice} // count
            icon={
              <ReceiptIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={actionPaidInvoice}
        >
          <StatBox
            title={data.paidInvoice}
            subtitle="Paid invoice"
            progress="0.80"
            increase={data.paidInvoiceAmount}
            icon={
              <ReceiptIcon
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
                fontSize: "16px", // Change this value to your desired font size
              },
            }}
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
