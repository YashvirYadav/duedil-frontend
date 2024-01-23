import {
  TextField,
  useTheme,
  FormControlLabel,
  Switch,
  Select
} from "@mui/material";
import Box from "@mui/material/Box";

import { tokens } from "../../theme";

import InputLabel from "@mui/material/InputLabel";

import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";



const RegisterCompany = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        <Box
          flexDirection="column"
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="10px"
          gap="5px"
        >
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

          <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            label="Age"
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
            label="Currency"
            name="Currency"
            sx={{ gridColumn: "span 12" }}
          />

          <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            label="State"
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
          <FormControlLabel control={<Switch defaultChecked />} label="Label" />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
      </Box>
    </Box>
  );
};

export default RegisterCompany;
