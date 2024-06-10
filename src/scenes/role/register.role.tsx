import {
  TextField,
  useTheme,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";

import Header from "../../components/Header";

import { useState } from "react";
import { useEffect } from "react";
import { Loader } from "../../components/Lodar";
import { loading, message } from "./roleSlice/role.selector";
import { Toast } from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { registerRole } from "./roleSlice/role.slice";

const RegisterRole = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const [roletype, setRoleType] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [Description, setDescription] = useState<string>("");

  const [Status, setStatus] = useState<boolean>(false);

  const lodingState = useSelector(loading);
  const getMessage = useSelector(message);
  console.log("getMessage => ", getMessage);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  const ragisterUserSubmit = () => {
    dispatch(registerRole({
        rolename: roleName,
        description: Description,
        isactive: Status,
        roletype: roletype 
      }));
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Role User" subtitle="Welcome to your dashboard" />

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
              Role Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Role Name*"
              name="role Name*"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
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
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Other details
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              type="Description"
              label="Description"
              name="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <InputLabel id="demo-simple-select-helper-label">
              Role type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Country"
              value={roletype}
              onChange={(e) => {
                setRoleType(e.target.value as string);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="GRN">GRN</MenuItem>
              <MenuItem value="SCM">SCM</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Api">Api</MenuItem>
              <MenuItem value="Api">TAT</MenuItem>
            </Select>
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

export default RegisterRole;
