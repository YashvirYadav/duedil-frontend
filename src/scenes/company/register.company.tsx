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

const RegisterCompany = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [firstName, setFirstName] = useState();
  const [code, setCode] = useState();
  const [logo, setLogo] = useState();
  const [Country, setCountry] = useState();
  const [Currency, setCurrency] = useState();
  const [State, setState] = useState();
  const [City, setCity] = useState();
  const [Address, setAddress] = useState();
  const [ZIP, setZIP] = useState();
  const [PanNo, setPanNo] = useState();
  const [GSTNo, setGSTNo] = useState();
  const [CinNo, setCinNo] = useState();
  const [Website, setWebsite] = useState();
  const [Status, setStatus] = useState();
  const [AdminName, setAdminName] = useState();
  const [emailAdmin, setemailAdmin] = useState();
  const [Mobile, setMobile] = useState();
  const [Domain, setDomain] = useState();
  const [Type, setType] = useState();
  const [Plan, setPlan] = useState();
  const [Rate, setRate] = useState();

  return (
    <Box m="20px">
      {/* HEADER */}
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        <Box
          flexDirection="column"
          gridColumn="span 4"
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
            label="First Name"
            name="Company Name*"
            sx={{ gridColumn: "span 12" }}
          />

          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Code*"
            name="Code"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="file"
            label="Logo*"
            name="Logo"
            sx={{ gridColumn: "span 12" }}
          />

          <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Country"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>India</MenuItem>
            <MenuItem value={20}>India</MenuItem>
            <MenuItem value={30}>India</MenuItem>
          </Select>

          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Currency"
            name="Currency"
            sx={{ gridColumn: "span 12" }}
          />
          <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="State"
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
            name="City"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Address"
            name="Address"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="ZIP"
            name="ZIP"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Pan No*"
            name="Pan No*"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="GST No*"
            name="GST No*"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Cin No*"
            name="Cin No*"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Website"
            name="Website"
            sx={{ gridColumn: "span 12" }}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Status"
          />
        </Box>

        <Box
          flexDirection="column"
          gridColumn="span 4"
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
            label="Admin Name"
            name="Admin Name"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Email (User ID)*"
            name="Email (User ID)*"
            sx={{ gridColumn: "span 12" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Mobile"
            name="Mobile"
            sx={{ gridColumn: "span 12" }}
          />
        </Box>
        <Box
          flexDirection="column"
          gridColumn="span 4"
          bgcolor={colors.primary[400]}
          display="flex"
          p="10px"
          gap="10px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Subscription Detail
          </Typography>
          <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            label="Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-autowidth-label">Plan</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            label="Plan"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Mobile"
            name="Mobile"
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
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  );
};

export default RegisterCompany;
