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
import { loading, message } from "./categorySlice/category.selector";
import { Toast } from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { registerCategory } from "./categorySlice/categorySlice";

const RegisterCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();


  const [Status, setStatus] = useState<boolean>(false);
  const [productCategoryName, setProductCategoryName] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [minTat, setMinTat] = useState<string>("");
  const [maxTat, setMaxTat] = useState<string>("");
  const [productNames, setProductNames] = useState<string>("");
 

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
   dispatch(
      registerCategory({
        categoryproduct: productCategoryName,
        productname: productNames,
        rate: +rate,
        status: Status,
        minimumtat: +minTat,
        maximumtat: +maxTat,
        
      })
   );
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Category User" subtitle="Welcome to your dashboard" />

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
              Product
            </Typography>

            <InputLabel id="demo-simple-select-helper-label">Product category</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Product category"
              value={productCategoryName}
             onChange={(e) => setProductCategoryName(e.target.value)}
            >
              <MenuItem value="Employee verification">Employee verification</MenuItem>
              <MenuItem value="Company Verification">Company Verification</MenuItem>
              <MenuItem value="Property verification">Property verification</MenuItem>
            </Select>

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Product Name"
              name="Product"
             value={productNames}
              onChange={(e) => setProductNames(e.target.value)}
           
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Rate"
              name="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
             
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
              TAT
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Minimum Tat"
              name="Minimum Tat"
              value={minTat}
              onChange={(e) => setMinTat(e.target.value)}
             
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Maximum Tat"
              name="Maximum Tat"
              value={maxTat}
              onChange={(e) => setMaxTat(e.target.value)}
              
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

export default RegisterCategory;
