import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../components/Header";
import LineChart from "../../../components/LineChart";
import GeographyChart from "../../../components/GeographyChart";
import BarChart from "../../../components/BarChart";
import StatBox from "../../../components/StatBox";
import ProgressCircle from "../../../components/ProgressCircle";
import { Outlet } from "react-router-dom";
import { dashboard, dashboarddata } from "./cadminslice/cadmin.selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  getdashboardforclientadmin,
  getslaexpiry,
} from "./cadminslice/cadminslice";
import ReceiptIcon from "@mui/icons-material/Receipt";

const ClientAdminashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [action, setAction] = useState<string>("totalInvoice");

  const dashboardData = useSelector(dashboard);
  const slaexpiry = useSelector(dashboarddata);
  const dispatch = useDispatch<AppDispatch>();

  const actiontotalInvoice = () => {
    setAction("totalInvoice");
  };
  const actionunderReview = () => {
    setAction("underReview");
  };
  const actionRejected = () => {
    setAction("rejected");
  };
  const actionPaid = () => {
    setAction("paid");
  };

  const {
    totalInvoicecount,
    totalAmount,
    newandwipInvoicecount,
    newandwipAmount,
    rejectedInvoicecount,
    rejectedAmount,
    paidInvoicecount,
    paidAmount,
  } = dashboardData;

  console.log("slaexpiry=>", Array.from(slaexpiry));

  useEffect(() => {
    dispatch(getdashboardforclientadmin());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getslaexpiry());
  }, [dispatch]);

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
          onClick={actiontotalInvoice}
          gridColumn="span 3"
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
            title={totalAmount}
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
          onClick={actionunderReview}
          gridColumn="span 3"
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
            title={newandwipAmount}
            subtitle="Under process"
            progress="0.50"
            increase={newandwipInvoicecount}
            icon={
              <ReceiptIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          onClick={actionRejected}
          gridColumn="span 3"
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
            title={rejectedAmount}
            subtitle="Rejected Invoices"
            progress="0.30"
            increase={rejectedInvoicecount}
            icon={
              <ReceiptIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          onClick={actionPaid}
          gridColumn="span 3"
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
            title={rejectedAmount}
            subtitle="Completed Invoices"
            progress="0.80"
            increase={paidInvoicecount}
            icon={
              <ReceiptIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 6" gridRow="span 2" bgcolor={colors.primary[400]}>
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
        </Box>
        <Box
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
                  {invoice.invoicenumber}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {invoice.invoicemovement &&
                    invoice.invoicemovement.length > 0 &&
                    invoice.invoicemovement[invoice.invoicemovement.length - 1]
                      .username}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
              <Typography  fontWeight="600" color={colors.greenAccent[500]}>
                  {invoice.invoicemovement &&
                    invoice.invoicemovement.length > 0 &&
                    invoice.invoicemovement[invoice.invoicemovement.length - 1]
                      .username}
                </Typography>
                {invoice.invoicemovement &&
                  invoice.invoicemovement.length > 0 &&
                  invoice.invoicemovement[invoice.invoicemovement.length - 1]
                    .indate.toString()
                    .split("T")[0]}
              </Box>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                
                {/* ${invoice.totalamount} */}
                view
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Outlet></Outlet>
    </Box>
  );
};

export default ClientAdminashboard;