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
  import { loading, message } from "./bankslice/bank.selector";
  import { Toast } from "../../components/Toast";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch } from "../../app/store";
  import { useNavigate } from "react-router-dom";
  import { registerBank } from "./bankslice/bank.slice";
  
  const RegisterBank = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch<AppDispatch>();



    const [Status, setStatus] = useState<boolean>(false);
  const [owner, setOwner] = useState<string>("");
  const [bankname, setBankName] = useState<string>("");
  const [branchname, setBranchName] = useState<string>("");
  const [accountnumber, setAccountNumber] = useState<string>("");
  const [ifsc_code, setIfscCode] = useState<string>("");

  
  
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
  
    const ragisterBankSubmit = () => {
    dispatch(registerBank({
      owner: owner,
      name: bankname,
      branch: branchname,
      ifsc_code: ifsc_code,
      accountnumber: accountnumber,
      isactive: Status,
      }));
    };
  
    return (
      <>
        <Box m="20px">
          {/* HEADER */}
          <Header title="Bank" subtitle="" />
  
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
              Bank Detail
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Account owner name*"
                name="Account owner name*"
                onChange={(e) => setOwner(e.target.value)}
                value={owner}
             
                sx={{ gridColumn: "span 12" }}
              />
  
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Bank Name"
                name="bankname"
                value={bankname}
                onChange={(e) => setBankName(e.target.value)}
             
                sx={{ gridColumn: "span 12" }}
              />

<TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Branch Name"
                name="branchname"
                value={branchname}
                onChange={(e) => setBranchName(e.target.value)}
             
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
                type="Account Number"
                label="Account Number"
                name="Account Number"
                value={accountnumber}
                onChange={(e) => setAccountNumber(e.target.value)}
             
                sx={{ gridColumn: "span 12" }}
              />
  
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="IFSC Code"
                name="IFSC Code"
                value={ifsc_code}
                onChange={(e) => setIfscCode(e.target.value)}
              
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
                ragisterBankSubmit();
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
  
  export default RegisterBank;
  