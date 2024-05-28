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
import { loading, message } from "./workfowslice/workflow.selector";
import { Toast } from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { registerWorkflow } from "./workfowslice/workflowslice";
import { roleData } from "../role/roleSlice/role.selector";
import { getroleBycompanyId } from "../role/roleSlice/role.slice";
import { IRole } from "../role/roleSlice/role.type";
import { getAllDepartment } from "../department/departmentSlics/departmentslice";
import { depatmentData } from "../department/departmentSlics/department.selector";
import { IDepartment } from "../department/departmentSlics/type.department";

const WorkflowRagistar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();

  const [roleType, setRoleType] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [minimumAmount, setMinimumAmount] = useState<string>("");
  const [maximumAmount, setMaximumAmount] = useState<string>("");
  const [TAT, setTAT] = useState<string>("");

  const [rolearray, setRoleArray] = useState<IRole[]>([]);
  const [roleSelect, setRoleSelect] = useState<IRole>();
  const [depatrmentarray, setDepartmentArray] = useState<IDepartment[]>([]);
  const lodingState = useSelector(loading);
  const getMessage = useSelector(message);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const role = useSelector(roleData);
  const depatrment = useSelector(depatmentData);

  console.log("roleType=>",   roleType);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  useEffect(() => {
    if (role) {
      setRoleArray(role);
    }
  }, [role]);

  useEffect(() => {
    if (depatrment) {
      setDepartmentArray(depatrment);
    }
  }, depatrment);

  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getroleBycompanyId(sessionStorage.getItem("companyId")?.toString() ?? "")
    );
  }, [dispatch]);

  const ragisterUserSubmit = () => {
    
      roleSelect && 
      dispatch(
        registerWorkflow({
          rolename: roleSelect.rolename,
          roletype: roleSelect.roletype,
          departmentname: roleType,
          minamount: minimumAmount,
          maxamount: maximumAmount,
          tat: TAT,
          companyId: sessionStorage.getItem("companyId") ?? "",
        })
      );
    
    
  };

  const roleList = rolearray.map((role) => (
    <MenuItem key={role._id} value={role._id}>
      {role.rolename} -{role.roletype}
    </MenuItem>
  ));

  const departmentList = depatrmentarray.map((list) => (
    <MenuItem key={list._id} value={list.departmentname}>
      {list.departmentname}
    </MenuItem>
  ));

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Workflow User" subtitle="Welcome to your dashboard" />

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
              Workflow Detail
            </Typography>

            <InputLabel id="demo-simple-select-helper-label">
              Role type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Country"
              value={roleSelect?.rolename}
              onChange={(e) => {
                const role = rolearray.find(
                  (role) => role._id === e.target.value
                );

                setRoleSelect(role)
               
              }}
            >
              {roleList}
            </Select>

            <InputLabel id="demo-simple-select-helper-label">
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Role"
              value={roleType}
              onChange={(e) => {
                setRoleType(e.target.value);
              }}
            >
              <MenuItem value="Normal">All department</MenuItem>
              {departmentList}
            </Select>
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
              type="Minimum Amount"
              label="Minimum Amount"
              name="Minimum Amount"
              value={minimumAmount}
              onChange={(e) => setMinimumAmount(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Maximum amount"
              name="Maximum amount"
              value={maximumAmount}
              onChange={(e) => setMaximumAmount(e.target.value)}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="TAT"
              name="TAT"
              value={TAT}
              onChange={(e) => setTAT(e.target.value)}
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

export default WorkflowRagistar;
