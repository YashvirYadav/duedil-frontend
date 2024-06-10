import { Box, Button, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { tokens } from "../../../../theme";

import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { loading, message, invoiceData } from "./needtoact.selector";
import { Loader } from "../../../../components/Lodar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Toast } from "../../../../components/Toast";
import { useNavigate } from "react-router-dom";
import { getNeedtoact } from "./needtoact.slice";

const NeedtoactTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const invoice = useSelector(invoiceData);
  const navigate = useNavigate();
  const toastmessage = useSelector(message);

  const [open, setOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  console.log("invoice => ", invoice);

  useEffect(() => {
    dispatch(getNeedtoact());
  }, [dispatch]);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "invoicenumber", headerName: "Invoice Number" },

    {
      field: "invoicedate",
      headerName: "Invoice date",
      flex: 1,
      valueGetter: (params) =>
        params.row.invoicedate && params.row.invoicedate.split("T")[0],
    },
    {
      field: "duedate",
      headerName: "Due Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.duedate && params.row.duedate.split("T")[0],
    
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "gstamount",
      headerName: "GST Amount",
      flex: 1,
    },

    {
      field: "totalamount",
      headerName: "Total Amount",
      flex: 1,
    },
    {
      field: "purchaseordernumber",
      headerName: "PO Number",
      flex: 1,
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
          navigate(`addcmapany/${id || ""}`);
        };

        const onClickDelete = () => {
          const id = params.id.toString();
          // handle delete operation here
        };

        const onClickView = () => {
          // const id = params.id;
          // handle view operation here
          const id = params.id.toString();
          navigate(`action/${id || ''}`);
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

  const handleClose = () => {
    setModal(!modal)
  }
  const handleOpen = () => {
    console.log("open");
  }

  return (
    <>
      <Box m="20px">
        <Header
          title="Need to action"
          subtitle="List of Need action on invoice"
        />
        {/* <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => {
             // navigate("addinvoice");
             setModal(!modal)
            }}
            color="secondary"
            variant="contained"
          >
            Create New invoice
          </Button>
        </Box> */}
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
          sx={{
            "& .MuiDataGrid-cell": {
              fontSize: "16px", // Change this value to your desired font size
            },
          }}
          
          density="compact"
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

export default NeedtoactTable;
