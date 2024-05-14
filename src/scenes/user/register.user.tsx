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
import { useState } from "react";
import { useEffect } from "react";
import { Loader } from "../../components/Lodar";
import { loading } from "./authSlice/auth.selector";
import { Toast } from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { register } from "./authSlice/authslice";
import { message } from "./authSlice/auth.selector";
import { useNavigate } from 'react-router-dom';


const RegisterCompany = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const [Status, setStatus] = useState<boolean>(false);
  const [Mobile, setMobile] = useState("");
  const lodingState = useSelector(loading);
  const getMessage  = useSelector(message)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  const ragisterUserSubmit = () => {

    dispatch(register({ email: Email, username: UserName, password: "admin@123", userrole: Role, status: Status, mobile: Mobile }));
   
  };



  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Register User" subtitle="Welcome to your dashboard" />

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
              User Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="User Name*"
              name="User Name*"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Email (User ID)*"
              name="Email (User ID)*"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Role"
              value={Role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="superadmin">Super Admin</MenuItem>
              <MenuItem value="cadmin">C Admin</MenuItem>
              <MenuItem value="projectmanager">Project Manager</MenuItem>
              <MenuItem value="salesanager">Sales Manager</MenuItem>
            </Select>

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
              ragisterUserSubmit();
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
