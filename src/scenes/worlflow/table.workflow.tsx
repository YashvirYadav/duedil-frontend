import { Box, Button, Switch, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { loading, workflowData, message } from "./workfowslice/workflow.selector";
import { Loader } from "../../components/Lodar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Toast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { getWorkflow } from "./workfowslice/workflowslice";

const TableWorflow = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const workflow = useSelector(workflowData);
  const navigate = useNavigate();

  const toastmessage = useSelector(message);
  console.log("toastmessage => ", toastmessage);
  console.log("depatrment => ", workflow);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getWorkflow(sessionStorage.getItem("companyId") ?? ""));
  }, [dispatch]);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    
    { field: "sequence", headerName: "sequence",  flex: 1 },
    
    { field: "rolename", headerName: "Role Name",  flex: 1 },

    {
      field: "roletype",
      headerName: "Role Type",
     
      flex: 1,
    },
    
    {
      field: "departmentname",
      headerName: "Department Name",
      flex: 1,
    }, 
    {
      field: "minamount",
      headerName: "Min Amount"
    },
    
    {
      field: "maxamount",
      headerName: "Max Amount"
    },

    
    {
      field: "tat",
      headerName: "TAT"
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: 200,
      // Remove the 'disableClickEventBubbling' property
      // from the object literal
      // The 'disableClickEventBubbling' property does not exist in type 'GridColDef<any>'
      renderCell: (params: GridRenderCellParams) => {
        const onClickEdit = () => {
          const id = params.id;
          // handle edit operation here
          console.log("id => ", id);

        };

        const onClickDelete = () => {
          const id = params.id.toString();
          

        };

        const onClickView = () => {
          // const id = params.id;
          // handle view operation here
        };

        return (
          <div>
            <IconButton color="primary" onClick={onClickEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={onClickDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={onClickView}>
              <VisibilityIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header
          title="Workflow"
          subtitle="List of Workflow for Future Reference"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => {
              navigate("addworkflow");
            }}
            color="secondary"
            variant="contained"
          >
            Create New workflow
          </Button>
        </Box>
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          {lodingState ? (
            lodingState !== "idle" && lodingState !== "loading" ? (
              <Toast
                open={open}
                handleClose={() => {}}
                setShowToast={setOpen}
                message="test"
                severity="error"
              />
            ) : lodingState === "loading" ? (
              <Loader />
            ) : null
          ) : null}

          <DataGrid
          sx={{
            "& .MuiDataGrid-cell": {
              fontSize: "14px", // Change this value to your desired font size
            },
          }}
          density="compact"
         
            // checkboxSelection
            rows={Array.isArray(workflow) ? workflow : []} // Ensure that company is an array
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Use the `_id` field as the unique id
          />
        </Box>
      </Box>
    </>
  );
};

export default TableWorflow;


