import {
  TextField,
  useTheme,
  FormControlLabel,
  Switch,
  Select,
  Typography,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";
import InputLabel from "@mui/material/InputLabel";
import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

import { Loader } from "../../components/Lodar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { loading, message } from "./invoiceSlice/invoice.selector";
import { Toast } from "../../components/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { registerInvoice } from "./invoiceSlice/invoice.slice";
import { IInvoice } from "./invoiceSlice/invoice.type";

const RegisterInvoice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const getMessage = useSelector(message);
  const navigate = useNavigate();

  // invoicenumber: string;
  // invoicedate?: Date;
  // duedate?: Date;
  // vendorname: string;
  // vendorcontactinfo?: string;
  // amount: number;
  // currency: string;
  // description: string;
  // purchaseordernumber?: string;
  // gstnumber?: string;
  // notes?: string;
  // attachments?: string;
  // vendorId?: string;

  const [invoicenumber, setinvoicenumber] = useState<string>("");
  const [invoicedate, setinvoicedate] = useState<string>();
  const [duedate, setduedate] = useState<string>();
  const [vendorname, setvendorname] = useState<string>("");
  const [vendorcontactinfo, setvendorcontactinfo] = useState<string>("");
  const [amount, setamount] = useState<number>();
  const [currency, setcurrency] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [purchaseordernumber, setpurchaseordernumber] = useState<string>("");
  const [gstnumber, setgstnumber] = useState<string>("");
  const [attachments, setattachments] = useState<File>();

  const [open, setOpen] = useState<boolean>(false);

  const ragisterVendorSubmit = () => {};

  const { id } = useParams<{ id?: string }>();
  useEffect(() => {
    if (id) {
      // If an ID was passed, fetch the Vendor data and set it in the state
    } else {
      // If no ID was passed, initialize the state with default values
      // initializeState();
    }
  }, [id]);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);

      setattachments(event.target.files[0]);
    }
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Register Vendor" subtitle="Welcome to your dashboard" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => navigate(-1)}
            color="secondary"
            variant="contained"
          >
            Back to list
          </Button>
        </Box>

        <Box
          m="40px 0 0 0"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="20px"
        >
          <Box
            flexDirection="column"
            gridColumn="span 6"
            bgcolor={colors.primary[400]}
            display="flex"
            p="10px"
            gap="10px"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Vendor Detail
            </Typography>

            <TextField
              id="invoicenumber"
              variant="outlined"
              type="text"
              label="invoice Number"
              name="invoicenumber"
              value={invoicenumber}
              onChange={(e) => setinvoicenumber(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              id="date"
              label="invoice Date"
              type="date"
              variant="outlined"
              value={invoicedate}
              onChange={(e) => setinvoicedate(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              id="date"
              label="due Date"
              type="date"
              variant="outlined"
              value={duedate}
              onChange={(e) => setduedate(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Amount"
              name="amount"
              value={amount}
              onChange={(e) => setamount(Number(e.target.value))}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Currency"
              value={currency}
              onChange={(e) => setcurrency(e.target.value)}
              name="currency"
              sx={{ gridColumn: "span 12" }}
            />
          </Box>

          <Box
            flexDirection="column"
            gridColumn="span 6"
            bgcolor={colors.primary[400]}
            display="flex"
            p="10px"
            gap="10px"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Vendor User Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              value={vendorname}
              onChange={(e) => setvendorname(e.target.value)}
              label="Vendor Name"
              name="vendorname"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Purchase Order Number"
              name="purchaseordernumber"
              value={purchaseordernumber}
              onChange={(e) => setpurchaseordernumber(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="GST Number"
              name="gstnumber"
              value={gstnumber}
              onChange={(e) => setgstnumber(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <input
              type="file"
              accept="pdf/*"
              onChange={handleFileChange}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Vendor Contact Info"
              name="vendorcontactinfo"
              value={vendorcontactinfo}
              onChange={(e) => setvendorcontactinfo(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 2,
            // Add more styling properties as needed backgroundColor={colors.primary[400]}
          }}
          flexDirection="column"
          gridColumn="span 12"
          bgcolor={colors.primary[400]}
          alignItems="right"
          p="30px"
          gap="10px"
        >
          <Button
            variant="contained"
            onClick={() => {
              ragisterVendorSubmit();
            }}
          >
            Save
          </Button>
        </Box>
      </Box>

      {lodingState ? (
        lodingState === "succeeded" ? (
          <Toast
            open={open}
            handleClose={() => {}}
            setShowToast={setOpen}
            message={getMessage}
            severity="error"
          />
        ) : lodingState === "loading" ? (
          <Loader />
        ) : null
      ) : null}
    </>
  );
};

export default RegisterInvoice;
