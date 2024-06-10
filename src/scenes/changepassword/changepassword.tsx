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

  import { Toast } from "../../components/Toast";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch } from "../../app/store";
import { changePassword } from "../user/authSlice/authslice";
import { loading, message } from "../user/authSlice/auth.selector";



  const ChangePassword = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch<AppDispatch>();

    const [oldPassword, setOldPassword] = useState("");
    const [errorOldPassword, setErrorOldPassword] = useState<boolean>(false);


    const [newPassword, setNewPassword] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState<boolean>(false);

    const [reNewPassword, setReNewPassword] = useState("");
    const [errorReNewPassword, setErrorReNewPassword] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const lodingState = useSelector(loading);
    const getMessage = useSelector(message);
    
    useEffect(() => {
        if (lodingState === "failed" || lodingState === "succeeded") {
          setOpen(true);
        }
      }, [lodingState]);

    const submitChangePassword = () => {
        if (oldPassword === "") {
            setErrorOldPassword(true);
        } else {
            setErrorOldPassword(false);
        }
        if (newPassword === "") {
            setErrorNewPassword(true);
        } else {
            setErrorNewPassword(false);
        }
        if (reNewPassword === "") {
            setErrorReNewPassword(true);
        } else {
            setErrorReNewPassword(false);
        }

        if (oldPassword !== "" && newPassword !== "" && reNewPassword !== "") {
            if (newPassword !== reNewPassword) {
                setErrorReNewPassword(true);
            } else {
                setErrorReNewPassword(false);
            }
        }

        if(!(errorNewPassword || errorOldPassword || errorReNewPassword)){ 
            console.log("Calll  => ");
            dispatch(changePassword({oldPassword, newPassword}))        
        }
    }
    
    return (
      <>
        <Box m="20px">
          {/* HEADER */}
          <Header title="Category User" subtitle="" />
  
         <Box display="flex" justifyContent="end" mt="20px">
            <Button
          
              color="secondary"
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Back to Desbord
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
                Old Password
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="old Password"
                name="old Password*"
                value={oldPassword}
                error={errorOldPassword}
                helperText={errorOldPassword ? "Old Password is required" : ""}
                onChange={(e) => {
                    setOldPassword(e.target.value)
                    setErrorOldPassword(false)
                }}
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
                Change Password
              </Typography>
  
            
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="New Password"
                name="new password"
                value={newPassword}
                error={errorNewPassword}
                helperText={errorNewPassword ? "New Password is required" : ""}
                onChange={(e) => {
                    setNewPassword(e.target.value)
                    setErrorNewPassword(false)
                }}
                sx={{ gridColumn: "span 12" }}
              />
               <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Re-New Password"
                name="Re-New Password"
                value={reNewPassword}
                onChange={(e) => {
                    setReNewPassword(e.target.value)
                    setErrorReNewPassword(false)
                }}
                error={errorReNewPassword}
                helperText={errorReNewPassword ? "Re-New Password is required" : ""}
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
                submitChangePassword()
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
  
  export default ChangePassword;
  