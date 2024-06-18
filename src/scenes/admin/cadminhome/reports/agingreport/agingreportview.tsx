import { Box, Button, Switch, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { tokens } from "../../../../../theme";

import Header from "../../../../../components/Header";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Loader } from "../../../../../components/Lodar";

import { Toast } from "../../../../../components/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { loading, message, invoice } from "../../cadminslice/cadmin.selector";

import { singleageinvoiceReport } from "../../cadminslice/cadminslice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatNumberIndian } from "../../../../../utils/utils";
import { useLocation } from "react-router-dom";



const AgingreportviewByAge = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const navigate = useNavigate();
  const invoiceData = useSelector(invoice);
  const toastmessage = useSelector(message);
  const [open, setOpen] = useState<boolean>(false);

  const { typeaction } = useParams<{ typeaction?: string }>();
  const location = useLocation();

  const { id, role, startDate, endDate } = location.state || { data: {} };



  useEffect(() => {
    dispatch(
      singleageinvoiceReport({
        vendorId:id,
        age:role
      })
    );
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
      valueGetter: (params) =>
        params.row.amount && formatNumberIndian(params.row.amount),
    },
    {
      field: "gstamount",
      headerName: "GST Amount",
      flex: 1,
      valueGetter: (params) =>
        params.row.gstamount && formatNumberIndian(params.row.gstamount),
    },

    {
      field: "totalamount",
      headerName: "Total Amount",
      flex: 1,
      valueGetter: (params) =>
        params.row.totalamount && formatNumberIndian(params.row.totalamount),
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
            onClick={() => navigate(-1)}
            color="secondary"
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Back to dashboard
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
            density="compact"
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

export default AgingreportviewByAge;
