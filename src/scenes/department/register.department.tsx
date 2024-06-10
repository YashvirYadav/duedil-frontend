import {
  TextField,
  useTheme,
  FormControlLabel,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";

import Header from "../../components/Header";

import { useState } from "react";
import { useEffect } from "react";
import { Loader } from "../../components/Lodar";
import { loading, message } from "./departmentSlics/department.selector";
import { Toast } from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { registerDepartment } from "./departmentSlics/departmentslice";

const RegisterDepatrment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const [depatrmentName, setdepatrmentName] = useState("");
  const [Code, setCode] = useState("");
  const [ETA, setETA] = useState("");
  const [Status, setStatus] = useState<boolean>(false);

  const [Description, setDescription] = useState("");

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
  dispatch(registerDepartment({
      departmentname: depatrmentName,
      code: Code,
      description: Description,
      eta: ETA,
      isactive:Status
    }));
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="depatrment User" subtitle="Welcome to your dashboard" />

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
              depatrment Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Depatrment Name*"
              name="depatrment Name*"
              value={depatrmentName}
              onChange={(e) => setdepatrmentName(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Code"
              name="Code"
              value={Code}
              onChange={(e) => setCode(e.target.value)}
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
              type="text"
              label="ETA"
              name="eta"
              value={ETA}
              onChange={(e) => setETA(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Description"
              name="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
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

export default RegisterDepatrment;
