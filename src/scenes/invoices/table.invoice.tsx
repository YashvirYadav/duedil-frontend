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

import { loading, message,invoiceData } from "./invoiceSlice/invoice.selector";
import { Loader } from "../../components/Lodar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Toast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { registerInvoice ,getallInvoice} from "./invoiceSlice/invoice.slice";

const InvoiceTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const invoice = useSelector(invoiceData);
  const navigate = useNavigate();

  const toastmessage = useSelector(message);
  console.log("toastmessage => ", toastmessage);

  const [open, setOpen] = useState<boolean>(false);

  console.log("invoice => ", invoice);

  useEffect(() => {
    dispatch(getallInvoice());
  }, [dispatch]);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "invoicename", headerName: "Vonder Name" },

    {
      field: "code",
      headerName: "Code",
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },

    {
      field: "zip",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "panno",
      headerName: "Pan No",
      flex: 1,
    },
    {
      field: "gstno",
      headerName: "GST No",
      flex: 1,
    },
    {
      field: "cinno",
      headerName: "CIN No",
      flex: 1,
    },
    {
      field: "website",
      headerName: "Website",
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
        
            // Handle status change
            // You might want to dispatch an action here to update the status on the server
            
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
          navigate(`addcmapany/${id || ''}`);

         };

        const onClickDelete = () => {
          const id = params.id.toString();

       
          // handle delete operation here
          
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
          title="invoice"
          subtitle="List of invoice for Future Reference"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => {
              navigate("addinvoice");
            }}
            color="secondary"
            variant="contained"
          >
            Create New invoice
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
                 message={toastmessage}
                severity="error"
              />
            ) : lodingState === "loading" ? (
              <Loader />
            ) : null
          ) : null}

          <DataGrid
            // checkboxSelection
            rows={Array.isArray(invoice) ? invoice : []} // Ensure that invoice is an array
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Use the `_id` field as the unique id
          />
        </Box>
      </Box>
    </>
  );
};

export default InvoiceTable;