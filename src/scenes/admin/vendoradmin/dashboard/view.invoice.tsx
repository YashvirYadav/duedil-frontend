import {
  useTheme,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Box from "@mui/material/Box";
import { tokens } from "../../../../theme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../../components/Lodar";
import {
  loading,
  message,
  currentInvoice,
} from "../../executive/needtoact/needtoact.selector";
import { AppDispatch } from "../../../../app/store";
import { Toast } from "../../../../components/Toast";
import {
  getAttachment,
  getInvoiceById,
} from "../../executive/needtoact/needtoact.slice";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import NumbersIcon from "@mui/icons-material/Numbers";
import DownloadIcon from "@mui/icons-material/Download";
import { Iinvoicemovement } from "../../executive/needtoact/needtoact.type";
import LinearProgressWithLabel from "../../../../components/LinearProgressWithLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";


const ViewInvice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);

  const getMessage = useSelector(message);
  const invoice = useSelector(currentInvoice);
  console.log("=>>", invoice);
  const navigate = useNavigate();

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getInvoiceById(id));
    }
  }, [dispatch]);

  const [open, setOpen] = useState<boolean>(false);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      // If an ID was passed, fetch the Vendor data and set it in the state
    } else {
      // If no ID was passed, initialize the state with default values
      // initializeState();
    }
  }, [id]);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "index", headerName: "Seq" },

    {
      field: "username",
      headerName: "Action with",
      flex: 1.5,
      valueGetter: (params) => `${params.row.username} - ${params.row.role}`,
    },
    {
      field: "tat",
      headerName: "TAT",
    },
    {
      field: "atat",
      headerName: "ATAT",
    },
    {
      field: "indate",
      headerName: "In Date",

      valueGetter: (params) =>
        params.row.indate && params.row.indate.split("T")[0],
    },
    {
      field: "outdate",
      headerName: "Out Date",
      flex: 1,
      valueGetter: (params) =>
        params.row.outdate && params.row.outdate.split("T")[0],
    },
    {
      field: "comment",
      headerName: "Remarks",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
    },
  ];

  const handleApprove = () => {};
  const handleClose = () => {
    setDialogOpen(!dialogOpen);
  };

  console.log("userrole", sessionStorage.getItem("rolename"));

  const actionSteps = invoice?.productrequest.map((item) => (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor:
              item.status !== "Done"
                ? colors.primary[800]
                : colors.primary[400],
          }}
        >
          <Box display="flex" alignItems="center" gap="10px">
            {item.productname} : Due Date
            <Typography
              sx={{ textDecoration: "underline" }}
              variant="h5"
              fontWeight="600"
              color={colors.greenAccent[300]}
            >
              {item.duedate.toString().split("T")[0]}
            </Typography>
          </Box>

         
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#080b12" }}>
          {item.remark.map((action, index) => (
            <Box display="flex" justifyContent="left" mt="20px">
              <Typography
                sx={{ textDecoration: "underline" }}
                variant="h5"
                fontWeight="600"
                color={colors.greenAccent[300]}
              >
                {new Date(action.split("::")[0]).toDateString()}
              </Typography>
              - {action.split("::")[1]}
              {item.status === "Done" && index === item.remark.length - 1 ? (
                <Box sx={{ cursor: "pointer" }}>
                  <DownloadIcon
                    onClick={() => {
                      console.log("Add remark", item.finaldocument);
                      item.finaldocument &&  dispatch(getAttachment(item.finaldocument));
                    }}
                  ></DownloadIcon>{" "}
                </Box>
              ) : null}
            </Box>
          ))}

          {item.status !== "Done" ? (
            <Box display="flex" justifyContent="end">
              <Box m="10px">
                <Button
                  onClick={() => {
                    console.log("Add remark", item._id);
                   
                  }}
                  color="error"
                  variant="contained"
                  startIcon={<CommentIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Add remark
                </Button>
              </Box>
              <Box m="10px">
                <Button
                  onClick={() => {
                   
                  }}
                  color="secondary"
                  variant="contained"
                  startIcon={<DoneAllIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Completed
                </Button>
              </Box>
            </Box>
          ) : null}
        </AccordionDetails>
      </Accordion>
    </Box>
  ));

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        {/* <Header title="Action Invoice" subtitle="Welcome" /> */}
        <Box display="flex" justifyContent="end" mt="20px">
          <Box m="10px">
            <Button
              onClick={() => navigate(-1)}
              color="inherit"
              variant="contained"
              startIcon={<KeyboardBackspaceIcon />}
              sx={{ textTransform: "none" }}
            >
              Back to list
            </Button>
          </Box>
          
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
              Request Detail
            </Typography>
            <Box
              m="0px 0 0 0"
              display="grid"
              gridTemplateColumns="repeat(6, 1fr)"
              gap="20px"
            >
              <Box
                display="flex"
                justifyContent="left"
                mt="20px"
                gridColumn="span 3"
              >
                <Box>
                  <NumbersIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></NumbersIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Client name
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {invoice?.clientname}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="left"
                mt="20px"
                gridColumn="span 3"
              >
                <Box>
                  <NumbersIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></NumbersIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Sataus
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {invoice?.movementstatus}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              m="0px 0 0 0"
              display="grid"
              gridTemplateColumns="repeat(6, 1fr)"
              gap="20px"
            >
              <Box
                display="flex"
                justifyContent="left"
                mt="20px"
                gridColumn="span 3"
              >
                <Box>
                  <NumbersIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></NumbersIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Request date
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {invoice?.requestdate?.toString().split("T")[0]}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="left"
                mt="20px"
                gridColumn="span 3"
              >
                <Box>
                  <NumbersIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></NumbersIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Due date
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {invoice?.duedate?.toString().toString().split("T")[0]}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Progress bar
            </Typography>

            {/* <ProgressCircle size="50" /> */}
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel
                value={
                  invoice &&
                  (invoice.movementstatus === "wip" ||
                    invoice.movementstatus === "completed")
                    ? (invoice?.progressstepsdone /
                        invoice?.progressstepscount) *
                      100
                    : 0
                }
              />
            </Box>

            <Box display="flex" justifyContent="center" mt="20px">
              <Box m="10px">
                <Button
                  onClick={() => {
                    // setActionType("reject");
                    // setDialogOpen(!dialogOpen);
                    invoice?.biodata &&  dispatch(getAttachment(invoice?.biodata));
                  }}
                  color="secondary"
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Download biodata
                </Button>
              </Box>

              <Box m="10px">
                <Button
                  onClick={() => {
                    // setActionType("approve");
                    // setDialogOpen(!dialogOpen);
                    invoice?.concentdoc &&  dispatch(getAttachment(invoice?.concentdoc));
                  }}
                  color="secondary"
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Download consent letter
                </Button>
              </Box>
            </Box>
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
              Requested Products
            </Typography>

            {actionSteps}
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: 2,
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
          }}
          flexDirection="column"
          gridColumn="span 12"
          bgcolor={colors.primary[400]}
          alignItems="right"
          p="20px"
          gap="10px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Movement details
          </Typography>
          <DataGrid
            sx={{
              "& .MuiDataGrid-cell": {
                fontSize: "14px", // Change this value to your desired font size
              },
            }}
            density="compact"
            // checkboxSelection
            rows={invoice?.workflowemovement|| []} // Ensure that invoice is an array
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Use the `_id` field as the unique id
          />
        </Box>
      </Box>

      {lodingState ? (
        lodingState === "succeeded" ? (
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

export default ViewInvice;
