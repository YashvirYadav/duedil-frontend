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
  const [BasicRate, setBasicRate] = useState("");
  const [Status, setStatus] = useState<boolean>(false);
  const [Description, setDescription] = useState("");

  const lodingState = useSelector(loading);
  const getMessage = useSelector(message);
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
        basicRate: BasicRate,
        status: Status.toString(),
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

            <InputLabel id="demo-simple-select-helper-label">
              Basic Rate
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Basic Rate"
              value={BasicRate}
              onChange={(e) => setBasicRate(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="0-100">Rs. 0-100</MenuItem>
              <MenuItem value="101-500">Rs. 101-500</MenuItem>
              <MenuItem value="501-1000">Rs. 501-1000</MenuItem>
              <MenuItem value="salesanager">Rs. 1001+</MenuItem>
            </Select>
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

            <Typography variant="h5" m="0 0 0 20px"  fontWeight="600" color={colors.grey[100]}>
              0-100 Rs. 500
            </Typography>
            <Typography variant="h5" m="0 0 0 20px"  fontWeight="600" color={colors.grey[100]}>
              101-500 Rs. 400
            </Typography>
            <Typography variant="h5" m="0 0 0 20px"  fontWeight="600" color={colors.grey[100]}>
              501-1000 Rs. 300
            </Typography>
            <Typography variant="h5" m="0 0 0 20px"  fontWeight="600" color={colors.grey[100]}>
              1001+  Rs. 250
            </Typography>

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
