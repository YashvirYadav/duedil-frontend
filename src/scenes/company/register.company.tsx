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
import { registerCompany } from "./companyRedux/companyslice";
import { Loader } from "../../components/Lodar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { loading,message } from "./companyRedux/company.selector";
import { Toast } from "../../components/Toast";
import { useNavigate } from 'react-router-dom';


const RegisterCompany = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const getMessage  = useSelector(message)
  const navigate = useNavigate();

  const [CompanyName, setCompanyName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [logo, setLogo] = useState<File>();
  const [Country, setCountry] = useState<string>("");

  const [State, setState] = useState<string>("");
  const [City, setCity] = useState<string>("");
  const [Address, setAddress] = useState<string>("");
  const [ZIP, setZIP] = useState<string>("");
  const [PanNo, setPanNo] = useState<string>("");
  const [GSTNo, setGSTNo] = useState<string>("");
  const [CinNo, setCinNo] = useState<string>("");
  const [Website, setWebsite] = useState<string>("");
  const [Status, setStatus] = useState<boolean>(false);
  const [AdminName, setAdminName] = useState<string>("");
  const [emailAdmin, setemailAdmin] = useState<string>("");
  const [Mobile, setMobile] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);


  const ragisterCompanySubmit = () => {
    if(logo){
      const formData = new FormData();
      formData.append("companyname", CompanyName);
      formData.append("code", code);
      formData.append("logo", logo as Blob); //
      formData.append("country", Country);
      formData.append("state", State);
      formData.append("city", City);
      formData.append("address", Address);
      formData.append("zip", ZIP);
      formData.append("panno", PanNo);
      formData.append("gstno", GSTNo);
      formData.append("cinno", CinNo);
      formData.append("website", Website);
      formData.append("isactive", Status.toString());
      formData.append("adminname", AdminName);
      formData.append("emailAdmin", emailAdmin);
      formData.append("mobile", Mobile);
      dispatch(registerCompany(formData));
    }
    
  };

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);

      setLogo(event.target.files[0]);
    }
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Register company" subtitle="Welcome to your dashboard" />
        <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick={() => navigate(-1) }color="secondary" variant="contained">
                Back to list
              </Button>
            </Box>

        <Box m="40px 0 0 0" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
          <Box
            flexDirection="column"
            gridColumn="span 6"
            bgcolor={colors.primary[400]}
            display="flex"
            p="10px"
            gap="10px"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Company Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Company Name*"
              name="Company Name*"
              value={CompanyName}
              onChange={(e) => setCompanyName(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Code*"
              name="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
            />

            <InputLabel id="demo-simple-select-helper-label">
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Country"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>India</MenuItem>
              <MenuItem value={20}>India</MenuItem>
              <MenuItem value={30}>India</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="State"
              value={State}
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Uttar Pradesh</MenuItem>
              <MenuItem value={20}>Uttar Pradesh</MenuItem>
              <MenuItem value={30}>Uttar Pradesh</MenuItem>
            </Select>

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="City"
              value={City}
              onChange={(e) => setCity(e.target.value)}
              name="City"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              name="Address"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="ZIP"
              value={ZIP}
              onChange={(e) => setZIP(e.target.value)}
              name="ZIP"
              sx={{ gridColumn: "span 12" }}
            />

            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onChange={(e) => setStatus(e.target.checked)}
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
              onChange={(e) => setPanNo(e.target.value)}
              name="Pan No*"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="GST No*"
              value={GSTNo}
              onChange={(e) => setGSTNo(e.target.value)}
              name="GST No*"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Cin No*"
              value={CinNo}
              onChange={(e) => setCinNo(e.target.value)}
              name="Cin No*"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Website"
              value={Website}
              onChange={(e) => setWebsite(e.target.value)}
              name="Website"
              sx={{ gridColumn: "span 12" }}
            />

            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Admin User Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Admin Name"
              value={AdminName}
              onChange={(e) => setAdminName(e.target.value)}
              name="Admin Name"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Email (User ID)*"
              name="Email (User ID)*"
              value={emailAdmin}
              onChange={(e) => setemailAdmin(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Mobile"
              name="Mobile"
              value={Mobile}
              onChange={(e) => setMobile(e.target.value)}
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
              ragisterCompanySubmit();
            }}
          >
            Save
          </Button>
        </Box>
      </Box>

      {lodingState ? (
        lodingState !== "idle" && lodingState !== "loading" ? (
          <Toast
            open={open}
            handleClose={() => {}}
            setShowToast = {setOpen}
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

export default RegisterCompany;
