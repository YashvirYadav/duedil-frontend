import { Box, Button, Switch, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Lodar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Toast } from "../../../components/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { loading, message } from "./cadminslice/cadmin.selector";

import {
    completedbycompanyid,
  getinvoicebycompanyid,
  rejectedbycompanyid,
  underreviewbycompanyid,
} from "./cadminslice/cadminslice";
import { invoice } from "./cadminslice/cadmin.selector";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Clientadmintable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const navigate = useNavigate();
  const invoiceData = useSelector(invoice);
  const toastmessage = useSelector(message);
  const [open, setOpen] = useState<boolean>(false);

  const { typeaction } = useParams<{ typeaction?: string }>();

  useEffect(() => {
    if (typeaction === "Total Invoice") {
      dispatch(getinvoicebycompanyid());
    } else if (typeaction === "Under Review") {
      dispatch(underreviewbycompanyid());
    } else if(typeaction === "Rejected Invoice"){
        dispatch(rejectedbycompanyid());
    } else if(typeaction === "Paid Invoice"){
       dispatch(completedbycompanyid());
    }
  }, [dispatch, typeaction]);

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
    },
    {
      field: "duedate",
      headerName: "Due Date",
      flex: 1,
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
        const onClickView = () => {
          // const id = params.id;
          // handle view operation here
          const id = params.id;

          navigate(`viewinvoice/${id || ""}`);
        };

        return (
          <div>
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
        <Header title={typeaction} subtitle="" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => {
              navigate("addUser");
            }}
            color="secondary"
            variant="contained"
          >
            Create New User
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
          <DataGrid
            sx={{
              "& .MuiDataGrid-cell": {
                fontSize: "14px", // Change this value to your desired font size
              },
            }}
            // checkboxSelection
            rows={Array.isArray(invoiceData) ? invoiceData : []} // Ensure that company is an array
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Use the `_id` field as the unique id
          />
        </Box>
      </Box>
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
    </>
  );
};

export default Clientadmintable;
