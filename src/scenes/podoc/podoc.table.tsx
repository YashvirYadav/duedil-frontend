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

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { loading, getPo, message } from "./pocSlice/po.selector";
import { Loader } from "../../components/Lodar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Toast } from "../../components/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { deletePobyid, getAllPo, getPobyid } from "./pocSlice/po.slice";
import { AppDispatch } from "../../app/store";


const TablePO = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const podata = useSelector(getPo);
  const navigate = useNavigate();

  const toastmessage = useSelector(message);
  console.log("toastmessage => ", toastmessage);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllPo());
  }, [dispatch]);

  

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  


  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { 
      field: "ponumber", 
      headerName: "PO Number",
      flex: 1 },

    {
      field: "podate",
      headerName: "Po Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.podate && params.row.podate.split("T")[0],

    },
    
    {
      field: "poexpirydate",
      headerName: "Expire Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.poexpirydate && params.row.poexpirydate.split("T")[0],
    }, 
    
    
    {
      field: "povalue",
      headerName: "Po Value",
      flex: 1,
    },

    {
        field: "openamout",
        headerName: "Open Amount",
        flex: 1,
      },

      {
        field: "consumeamout",
        headerName: "Consumed Amount",
        flex: 1,
      },

    


    {
      field: "isactive",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          size="small"
          checked={params.value as boolean}
          onChange={(event) => {
            const newStatus = event.target.checked;

            // Get the id of the row
            const id = params.id.toString();
            console.log("id => ", id);
            console.log("newStatus => ", newStatus);
          
            
          }}
        />
      ),
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

          navigate(`addpo/${id || ''}`);


        };

        const onClickDelete = () => {
          const id = params.id.toString();
          dispatch(deletePobyid(id)).then(() => dispatch(getAllPo()));

        };

     

        return (
          <div>
            <IconButton color="primary" onClick={onClickEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={onClickDelete}>
              <DeleteIcon />
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
          title="purchase order"
          subtitle="List of purchase order for Future Reference"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => {
              navigate("addpo");
            }}
            color="secondary"
            variant="contained"
          >
            Add New PO
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
            fontSize: "16px", // Change this value to your desired font size
          },
        }}
      
        density="compact"
            // checkboxSelection
            rows={Array.isArray(podata) ? podata : []} // Ensure that company is an array
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Use the `_id` field as the unique id
          />
        </Box>
      </Box>
    </>
  );
};

export default TablePO;


