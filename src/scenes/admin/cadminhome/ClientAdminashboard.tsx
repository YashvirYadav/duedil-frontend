import { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import LineChart from "../../../components/LineChart";
import StatBox from "../../../components/StatBox";
import { Outlet } from "react-router-dom";
import {
  chartdata,
  selectorsearchDashboardBydate,
  loading,
  message,
} from "./cadminslice/cadmin.selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import { formatNumberIndian } from "../../../utils/utils";
import SearchIcon from "@mui/icons-material/Search";
import BasicDatePicker from "../../../components/BasicDatePicker";
import dayjs, { Dayjs } from "dayjs";

import { getdashboardreportbydate } from "./cadminslice/cadminslice";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PaidIcon from '@mui/icons-material/Paid';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Toast } from "../../../components/Toast";
import { Loader } from "../../../components/Lodar";



const ClientAdminashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [action, setAction] = useState<string>("");

  const dashboardData = useSelector(selectorsearchDashboardBydate);
  const navigate = useNavigate();

  //const slaexpiry = useSelector(dashboarddataSLA);
  const chartValue = useSelector(chartdata);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const toastmessage = useSelector(message);
  const [open, setOpen] = useState<boolean>(false);
  const currentDateJS = dayjs()
  const tenDaysAgoJS = dayjs().subtract(30, "day")

  const currentDate = dayjs().toDate();
  const tenDaysAgo =  dayjs().subtract(30, "day").toDate();

  const [startDate, setStartDate] = useState(tenDaysAgo);
  const [endDate, setEndDate] = useState(currentDate);

  console.log(startDate.toString()); // Current date
  console.log(endDate.toString()); // Date 10 days ago

  const actiontotalInvoice = () => {
    setAction("totalInvoice");
    navigate(`invoice/Total Invoices`,
      {
        state: {
          startDate: startDate,
          endDate: endDate,
        },
      }

    );
  };
  const actionunderReview = () => {
    setAction("underReview");
    navigate(`invoice/Under Review`
      ,
      {
        state: {
          startDate: startDate,
          endDate: endDate,
        },
      }
    );
  };
  const actionRejected = () => {
    setAction("rejected");
    navigate(`invoice/Rejected Invoices`
      ,
      {
        state: {
          startDate: startDate,
          endDate: endDate,
        },
      }
    );
  };
  const actionPaid = () => {
    setAction("paid");
    navigate(`invoice/Paid Invoices`
      ,
      {
        state: {
          startDate: startDate,
          endDate: endDate,
        },
      }
    );
  };

  const actionNewInvoice = () => {
    setAction("newInvoice");
    navigate(`invoice/New Invoices`
      ,
      {
        state: {
          startDate: startDate,
          endDate: endDate,
        },
      }
    );
  }

  const {
    totalInvoicecount,
    totalAmount,
  
    rejectedInvoicecount,
    rejectedAmount,
    paidInvoicecount,
    paidAmount,
    lineData,
  } = dashboardData;

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  useEffect(() => {
    // dispatch(getdashboardforclientadmin());
    dispatch(
      getdashboardreportbydate({ startDate: startDate, endDate: endDate })
    );
  }, [dispatch]);
  useEffect(() => {
    // dispatch(getslaexpiry());
  }, [dispatch]);
  useEffect(() => {
    //  dispatch(charRoleWice());
  }, [dispatch]);

  const dataChart = {
    id: "Progress",
    color: tokens("dark").greenAccent[500],
    data: chartValue,
  };

  console.log("chartValue=>", chartValue);

  const searchDeshboard = () => {
    dispatch(getdashboardreportbydate({ startDate, endDate }));
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

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />

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
          <BasicDatePicker onDateChange={endDateChange} dateLabel="End date"
          defaultValue={currentDateJS} />

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
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          onClick={actiontotalInvoice}
          gridColumn="span 2"
          bgcolor={
            action === "totalInvoice"
              ? colors.primary[800]
              : colors.primary[400]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(totalAmount)}
            subtitle="Total Invoices"
            progress="0.70"
            increase={totalInvoicecount}
            icon={
              <ReceiptIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

       
        <Box
          onClick={actionNewInvoice}
          gridColumn="span 2"
          bgcolor={
            action === "newInvoice"
              ? colors.primary[800]
              : colors.primary[400]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(dashboardData.newInvoiceAmount)}
            subtitle="New Invoices"
            progress="0.70"
            increase={dashboardData.newInvoicecount}
            icon={
              <FiberNewIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          onClick={actionunderReview}
          gridColumn="span 2"
          bgcolor={
            action === "underReview" ? colors.primary[800] : colors.primary[400]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(dashboardData.wipAmount)}
            subtitle="Under Processes"
            progress="0.50"
            increase={dashboardData.wipInvoicecount}
            icon={
              <PublishedWithChangesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          onClick={actionRejected}
          gridColumn="span 2"
          bgcolor={
            action === "rejected" ? colors.primary[800] : colors.primary[400]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(rejectedAmount)}
            subtitle="Rejected Invoices"
            progress="0.30"
            increase={rejectedInvoicecount}
            icon={
              <ThumbDownAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          onClick={actionPaid}
          gridColumn="span 2"
          bgcolor={
            action === "paid" ? colors.primary[800] : colors.primary[400]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title={formatNumberIndian(paidAmount)}
            subtitle="Paid Invoices"
            progress="0.80"
            increase={paidInvoicecount}
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
        
          gridColumn="span 2"
          bgcolor={
            
           
              colors.primary[400]
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary[800], // replace 'yourHoverColor' with your desired hover color
            },
            cursor: "pointer",
          }}
        >
          <StatBox
            title="0"
            subtitle="Purchase Orders"
            progress="0.70"
            increase="0"
            icon={
              <ShoppingBagIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
        >
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
                Pending invoices with roles
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {/* $59,342.32 */}
              </Typography>
            </Box>
            <Box>
              {/* <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
            </Box>
          </Box>
          <Box padding={2} height="250px" m="0 0 0 0">
            {chartValue && (
              <LineChart isDashboard={true} dataValue={lineData} />
            )}
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Expired SLA
            </Typography>
          </Box>
          {slaexpiry.map((invoice, i) => (
            <Box
              key={`${invoice._id}-${i}`}
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
                  {invoice.vendorname}
                </Typography>
                <Typography color={colors.grey[100]}>
                  <em>Pending with:</em>{" "}
                  {invoice.invoicemovement &&
                    invoice.invoicemovement.length > 0 &&
                    invoice.invoicemovement[invoice.invoicemovement.length - 1]
                      .username}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                <Typography fontWeight="600" color={colors.greenAccent[500]}>
                  <em>TAT:</em>{" "}
                  {invoice.invoicemovement &&
                    invoice.invoicemovement.length > 0 &&
                    invoice.invoicemovement[invoice.invoicemovement.length - 1]
                      .tat}
                </Typography>
                <em>Pending since:</em>{" "}
                {invoice.invoicemovement &&
                  invoice.invoicemovement.length > 0 &&
                  invoice.invoicemovement[
                    invoice.invoicemovement.length - 1
                  ].indate
                    .toString()
                    .split("T")[0]}
              </Box>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                onClick={() => {
                  navigate(`viewexsla/${invoice._id}`);
                }}
                sx={{
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: colors.greenAccent[800], // replace 'yourHoverColor' with your desired hover color
                  },
                  cursor: "pointer",
                }}
              >
                view
              </Box>
            </Box>
          ))}
        </Box> */}
      </Box>
      <Box>
        <Outlet></Outlet>
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
    </Box>
  );
};

export default ClientAdminashboard;
