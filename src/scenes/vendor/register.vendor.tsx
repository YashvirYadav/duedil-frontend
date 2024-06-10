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
import { loading, message, vendorData } from "./venderSlice/vendor.selector";
import { Toast } from "../../components/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { registerVendor } from "./venderSlice/vendor.slice";
import { IVendor } from "./venderSlice/vendor.type";

const Registervendor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const getMessage = useSelector(message);
  const navigate = useNavigate();

  const [VendorName, setVendorName] = useState<string>("");
  const [errorVendorName, setErrorVendorName] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");
  const [errorcode, setErrorcode] = useState<boolean>(false);

  const [Country, setCountry] = useState<string>("");
  const [errorCountry, setErrorCountry] = useState<boolean>(false);

  const [State, setState] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);

  const [City, setCity] = useState<string>("");
  const [errorCity, setErrorCity] = useState<boolean>(false);

  const [Address, setAddress] = useState<string>("");
  const [errorAddress, setErrorAddress] = useState<boolean>(false);

  const [ZIP, setZIP] = useState<string>("");
  const [errorZIP, setErrorZIP] = useState<boolean>(false);

  const [PanNo, setPanNo] = useState<string>("");
  const [errorPanNo, setErrorPanNo] = useState<boolean>(false);

  const [GSTNo, setGSTNo] = useState<string>("");
  const [errorGSTNo, setErrorGSTNo] = useState<boolean>(false);

  const [CinNo, setCinNo] = useState<string>("");
  const [errorCinNo, setErrorCinNo] = useState<boolean>(false);

  const [Website, setWebsite] = useState<string>("");
  const [errorWebsite, setErrorWebsite] = useState<boolean>(false);

  const [Status, setStatus] = useState<boolean>(false);

  const [AdminName, setAdminName] = useState<string>("");
  const [errorAdminName, setErrorAdminName] = useState<boolean>(false);

  const [emailAdmin, setemailAdmin] = useState<string>("");
  const [erroremailAdmin, setErroremailAdmin] = useState<boolean>(false);

  const [Mobile, setMobile] = useState<string>("");
  const [errorMobile, setErrorMobile] = useState<boolean>(false);

  const [paymentterms, setpaymentterms] = useState<string>("");
  const [credlimit, setcredlimit] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);

  const Vendor = useSelector(vendorData)[0];

  const ragisterVendorSubmit = () => {
    if (!VendorName || VendorName.length < 3) {
      setErrorVendorName(true);
      return;
    }
    if (!code || code.length < 3) {
      setErrorcode(true);
      return;
    }
    if (!Country) {
      setErrorCountry(true);
      return;
    }
    if (!State) {
      setErrorState(true);
      return;
    }
    if (!City) {
      setErrorCity(true);
      return;
    }
    if (!Address) {
      setErrorAddress(true);
      return;
    }
    if (!ZIP || ZIP.length < 3) {
      setErrorZIP(true);
      return;
    }
    if (!PanNo || PanNo.length < 3) {
      setErrorPanNo(true);
      return;
    }
    if (!GSTNo || GSTNo.length < 3) {
      setErrorGSTNo(true);
      return;
    }
    if (!CinNo || CinNo.length < 3) {
      setErrorCinNo(true);
      return;
    }
    if (!Website || Website.length < 3) {
      setErrorWebsite(true);
      return;
    }
    if (!AdminName || AdminName.length < 3) {
      setErrorAdminName(true);
      return;
    }
    if (
      !emailAdmin ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailAdmin)
    ) {
      setErroremailAdmin(true);
      return;
    }

       const vendor :IVendor = {
           vendorname: VendorName,
           code: code,
           country: Country,
           state: State,
           city: City,
           address: Address,
           zip: ZIP,
           panno: PanNo,
           gstno: GSTNo,
           cinno: CinNo,
           website: Website,
           isactive: Status,
           adminname: AdminName,
           email: emailAdmin,
           mobile: Mobile,
           paymentterms: paymentterms,
           creditlimit: credlimit,
           companyId: sessionStorage.getItem("companyId")?.toString() ?? ""
       }

     dispatch(registerVendor(vendor));
  };

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

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Register Vendor" subtitle="" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => navigate(-1)}
            color="secondary"
            variant="contained"
            sx={{ textTransform: 'none' }}
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
              fullWidth
              variant="outlined"
              type="text"
              label="Vendor Name*"
              name="Vendor Name*"
              value={VendorName}
              onChange={(e) => {
                setErrorVendorName(false);
                setVendorName(e.target.value);
              }}
              sx={{ gridColumn: "span 12" }}
              error={errorVendorName}
              helperText={errorVendorName ? "Vendor Name is required" : ""}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Code*"
              name="Code"
              value={code}
              onChange={(e) => {
                setErrorcode(false);
                setCode(e.target.value);
              }}
              sx={{ gridColumn: "span 12" }}
              error={errorcode}
              helperText={errorcode ? "Code is required" : ""}
            />

            <InputLabel id="demo-simple-select-helper-label">
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Country"
              value={Country}
              onChange={(e) => {
                setErrorCountry(false);
                setCountry(e.target.value);
              }}
              error={errorCountry}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="State"
              value={State}
              onChange={(e) => {
                setErrorState(false);
                setState(e.target.value);
              }}
              error={errorState}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
            </Select>

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="City"
              value={City}
              onChange={(e) => {
                setErrorCity(false);
                setCity(e.target.value);
              }}
              name="City"
              sx={{ gridColumn: "span 12" }}
              error={errorCity}
              helperText={errorCity ? "City is required" : ""}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Address"
              value={Address}
              onChange={(e) => {
                setErrorAddress(false);
                setAddress(e.target.value);
              }}
              name="Address"
              sx={{ gridColumn: "span 12" }}
              error={errorAddress}
              helperText={errorAddress ? "Address is required" : ""}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="ZIP"
              value={ZIP}
              onChange={(e) => {
                setErrorZIP(false);
                setZIP(e.target.value);
              }}
              name="ZIP"
              sx={{ gridColumn: "span 12" }}
              error={errorZIP}
              helperText={errorZIP ? "ZIP is required" : ""}
            />

            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onChange={(e) => setStatus(e.target.checked)}
                  name="Status"
                  color="primary"
                />
              }
              label="Status"
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
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Pan No*"
              value={PanNo}
              onChange={(e) => {
                setErrorPanNo(false);
                setPanNo(e.target.value);
              }}
              name="Pan No*"
              sx={{ gridColumn: "span 12" }}
              error={errorPanNo}
              helperText={errorPanNo ? "Pan No is required" : ""}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="GST No*"
              value={GSTNo}
              onChange={(e) => {
                setErrorGSTNo(false);
                setGSTNo(e.target.value);
              }}
              name="GST No*"
              sx={{ gridColumn: "span 12" }}
              error={errorGSTNo}
              helperText={errorGSTNo ? "GST No is required" : ""}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Cin No*"
              value={CinNo}
              onChange={(e) => {
                setErrorCinNo(false);
                setCinNo(e.target.value);
              }}
              name="Cin No*"
              sx={{ gridColumn: "span 12" }}
              error={errorCinNo}
              helperText={errorCinNo ? "Cin No is required" : ""}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Website"
              value={Website}
              onChange={(e) => {
                setErrorWebsite(false);
                setWebsite(e.target.value);
              }}
              name="Website"
              sx={{ gridColumn: "span 12" }}
              error={errorWebsite}
              helperText={errorWebsite ? "Website is required" : ""}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Payment Terms"
              value={paymentterms}
              onChange={(e) => {
                setpaymentterms(e.target.value);
              }}
              name="paymentterms"
              sx={{ gridColumn: "span 12" }}
              helperText={errorWebsite ? "paymentterms is required" : ""}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Cred Limit"
              value={credlimit}
              onChange={(e) => {
                setcredlimit(e.target.value);
              }}
              name="credlimit"
              sx={{ gridColumn: "span 12" }}
            />

            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Vendor User Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Admin Name"
              value={AdminName}
              onChange={(e) => {
                setErrorAdminName(false);
                setAdminName(e.target.value);
              }}
              name="Admin Name"
              sx={{ gridColumn: "span 12" }}
              error={errorAdminName}
              helperText={errorAdminName ? "Admin Name is required" : ""}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Email (User ID)*"
              name="Email (User ID)*"
              value={emailAdmin}
              onChange={(e) => {
                setErroremailAdmin(false);
                setemailAdmin(e.target.value);
              }}
              sx={{ gridColumn: "span 12" }}
              error={erroremailAdmin}
              helperText={erroremailAdmin ? "Email is required" : ""}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Mobile"
              name="Mobile"
              value={Mobile}
              onChange={(e) => {
                setErrorMobile(false);
                setMobile(e.target.value);
              }}
              sx={{ gridColumn: "span 12" }}
              error={errorMobile}
              helperText={errorMobile ? "Mobile is required" : ""}
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

export default Registervendor;
