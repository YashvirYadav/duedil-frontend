import {
  TextField,
  useTheme,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
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
import { useNavigate } from "react-router-dom";
import { getvenderName, loading, message } from "./pocSlice/po.selector";
import { getVendor } from "./pocSlice/po.slice";
import { IVendor } from "./pocSlice/po.type";

const PoRagistar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const [Status, setStatus] = useState<boolean>(false);

  const [vendor, setVendor] = useState<IVendor[]>([]);
  const [attachments, setattachments] = useState<File>();

  const lodingState = useSelector(loading);
  const getMessage = useSelector(message);
  const vendorData: IVendor[] = useSelector(getvenderName);

  console.log("vendorData", vendorData);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVendor(vendorData);
  }, [vendorData]);
  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  useEffect(() => {
    dispatch(getVendor());
  }, []);

  const ragisterBankSubmit = () => {};

  const MenuItemVender = vendor.map((item, index) => {
    console.log("item", item);

    return (
      <MenuItem key={item._id} value={item._id}>
        {item.vendorname}
      </MenuItem>
    );
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);

      setattachments(event.target.files[0]);
    }
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Purchase Order" subtitle="" />

        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => navigate(-1)}
            color="secondary"
            variant="contained"
            sx={{ textTransform: "none" }}
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
              PO Detail
            </Typography>
            <InputLabel id="demo-simple-select-helper-label">
              Select Vender
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Country"
              onChange={(e) => {}}
            >
              {MenuItemVender}
            </Select>

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="PO Number"
              name="Ponumber"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              id="podate"
              label="Po Date"
              type="date"
              variant="outlined"
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              id="expireDate"
              label="expire Date"
              type="date"
              variant="outlined"
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
              type="number"
              label="Open Amount"
              name="OpenAmount"
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="PO Value"
              name="PO Value"
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Consumed Amount"
              name="ConsumedAmount"
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Po Nature"
              name="ponature"
              sx={{ gridColumn: "span 12" }}
            />

            <Typography variant="h6" fontWeight="200" color={colors.grey[100]}>
              Attachment
            </Typography>
            <input type="file" accept="pdf/*" onChange={handleFileChange} />
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

export default PoRagistar;
