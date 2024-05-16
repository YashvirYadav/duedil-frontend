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
  const [CategoryName, setCategoryName] = useState("");
  const [Code, setCode] = useState("");
 
  const [Status, setStatus] = useState<boolean>(false);
  const [Description, setDescription] = useState("");
  const [c0to100, setC0to100] = useState(0);
  const [c101to500, setC101to500] = useState(0);
  const [c501to1000, setC501to1000] = useState(0);
  const [c1001plus, setC1001plus] = useState(0);

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
        name: CategoryName,
        code: Code,
        description: Description,
        status: Status.toString(),
        c0to100: c0to100,
        c101to500: c101to500,
        c501to1000: c501to1000,
        c1001plus: c1001plus,
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
              Category Detail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Category Name*"
              name="Category Name*"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
              Basic rate card
            </Typography>

          
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="0-100"
              name="0-100"
              value={c0to100}
              onChange={(e) => setC0to100(Number(e.target.value))}
           
              sx={{ gridColumn: "span 12" }}
            />
             <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="101-500"
              name="101-500"
              value={c101to500}
              onChange={(e) => setC101to500(Number(e.target.value))}
           
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="501-1000"
              name="501-1000"
              value={c501to1000}
              onChange={(e) => setC501to1000(Number(e.target.value))}
           
              sx={{ gridColumn: "span 12" }}
            />
           
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="1001+"
              name="1001+"
              value={c1001plus}
              onChange={(e) => setC1001plus(Number(e.target.value))}
           
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
