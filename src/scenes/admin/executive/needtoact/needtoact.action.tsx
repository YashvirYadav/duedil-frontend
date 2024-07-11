import {
  useTheme,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  DialogContent,
  DialogActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Box from "@mui/material/Box";
import { tokens } from "../../../../theme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../../components/Lodar";
import { loading, message, currentInvoice } from "./needtoact.selector";
import { AppDispatch } from "../../../../app/store";
import { Toast } from "../../../../components/Toast";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import {
  addRemarks,
  getAttachment,
  getInvoiceById,
  setproductstatusdone,
  userapprove,
} from "./needtoact.slice";
import { Iinvoicemovement } from "./needtoact.type";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import NumbersIcon from "@mui/icons-material/Numbers";
import LinearProgressWithLabel from "../../../../components/LinearProgressWithLabel";
import CommentIcon from "@mui/icons-material/Comment";

// import Textarea from '@mui/joy/Textarea';

const NeedToactAction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);

  const getMessage = useSelector(message);
  const invoice = useSelector(currentInvoice);
  const currentDateJS = dayjs().toDate();

  const navigate = useNavigate();
  const [actionType, setActionType] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [remarkOpen, setRemarkOpen] = useState<boolean>(false);
  const [remark, setRemark] = useState<string>("");
  const [remarksid, setRemarksid] = useState<string>("");
  const [completedkOpen, setCompletedOpen] = useState<boolean>(false);
  const [doneProduct, setDoneProduct] = useState<File>();
  const [isCompleted, setisCompleted] = useState<boolean>(false);

  const { id } = useParams<{ id?: string }>();
  const doneproductFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setDoneProduct(event.target.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    // Handle the change (e.g., update state, make API call, etc.)
    setisCompleted(isChecked);
    console.log(isChecked); // Example action
  };

  const submitProductDone = () => {
    //{ id: id, productid: remarksid, remark: currentDateJS+"::"+remark }
    const dateandremark = currentDateJS.toDateString() + "::" + remark;
    if (id) {
      const formData = new FormData();
      formData.append("attachments", doneProduct as Blob);
      formData.append("remark", remark);
      formData.append("productid", remarksid);
      formData.append("id", id);
      formData.append("remark", dateandremark);
      dispatch(setproductstatusdone({ fromData: formData })).then(() =>
        dispatch(getInvoiceById(id))
      );
      setCompletedOpen(false);
      setisCompleted(false);
      setRemarkOpen(false);
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getInvoiceById(id));
    }
  }, [dispatch]);

  const [invoicemovement, setinvoicemovement] = useState<Iinvoicemovement[]>(
    []
  );

  const submitRemark = () => {

    if(isCompleted){
      submitProductDone()
    }else{
      id &&
      dispatch(
        addRemarks({
          id: id,
          productid: remarksid,
          remark: currentDateJS + "::" + remark,
        })
      ).then(() => dispatch(getInvoiceById(id)));
    setRemarkOpen(false);
    }

    
  };

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (invoice) {
      setinvoicemovement(invoice?.workflowemovement || []);
    }
  }, [invoice]);

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

  const handleClose = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleRemarkClose = () => {
    setRemarkOpen(!remarkOpen);
  };

  const handleApprove = () => {
    if (actionType === "approve" && id) {
      dispatch(userapprove({ id: id, comment: remark }));
    } else if (actionType === "reject") {
    }

    setDialogOpen(!dialogOpen);
  };

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
//map the action steps
  const actionSteps = invoice?.productrequest.map((item) => {
    const currentDate = new Date();
    const dueDate = new Date(item.duedate);
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (
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
                  : colors.blueAccent[500],
            }}
          >
            <Box display="flex" alignItems="center" gap="10px">
              {item.productname} : Due Date
              <Typography
                sx={{ textDecoration: "underline" }}
                color={colors.greenAccent[300]}
              >
                {item.duedate.toString().split("T")[0]}
                
                {/* diffrence duedate and current date */}
              </Typography>
            </Box>
            , { diffDays} days left

            {/* {item.productname} : Due Date  
              <Typography
                sx={{ textDecoration: "underline" }}
                variant="h5"
                fontWeight="600"
                color={colors.greenAccent[300]}
              >
                {item.duedate.toString().split("T")[0]}
              </Typography> */}
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
                {
                  item.finaldocument ? 
                    <DownloadIcon
                      onClick={() => {
                        console.log("Add Action", item.finaldocument);
                        item.finaldocument &&
                          dispatch(getAttachment(item.finaldocument));
                      }}
                    />
                  :null
                }    
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
                      setRemarksid(item._id);
                      setRemarkOpen(true);
                    }}
                     color="secondary"
                    variant="contained"
                    startIcon={<CommentIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Add remark
                  </Button>
                </Box>
                {/* <Box m="10px">
                  <Button
                    onClick={() => {
                      setRemarksid(item._id);
                      setCompletedOpen(true);
                    }}
                    color="secondary"
                    variant="contained"
                    startIcon={<DoneAllIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Completed
                  </Button>
                </Box> */}
              </Box>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  });

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
          <Box m="10px">
            <Button
              onClick={() => {
                setActionType("reject");
                setDialogOpen(!dialogOpen);
              }}
              color="error"
              variant="contained"
              startIcon={<ThumbDownIcon />}
              sx={{ textTransform: "none" }}
            >
              Reject
            </Button>
          </Box>

          <Box m="10px">
            <Button
              onClick={() => {
                setActionType("approve");
                setDialogOpen(!dialogOpen);
              }}
              color="secondary"
              variant="contained"
              startIcon={<ThumbUpAltIcon />}
              sx={{ textTransform: "none" }}
            >
              Approve
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
                    invoice?.biodata &&
                      dispatch(getAttachment(invoice?.biodata));
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
                    invoice?.concentdoc &&
                      dispatch(getAttachment(invoice?.concentdoc));
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
            rows={Array.isArray(invoicemovement) ? invoicemovement : []} // Ensure that invoice is an array
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
      <Dialog
        sx={{
          borderRadius: "20px",
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
            height: "300px",
            WebkitAlignContent: "center",
            width: "400px",
          },
        }}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {actionType === "approve" ? "Confirm Approval" : "Confirm Rejection"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {actionType === "approve"
              ? "Are you sure you want to approve this invoice"
              : "Please mention rejection reason in below field*"}
          </DialogContentText>
          <TextField
            fullWidth
            id="invoicenumber"
            variant="outlined"
            type="text"
            label="Remaks"
            name="Remaks"
            multiline
            rows={4}
            placeholder="Enter your comment here"
            maxRows={12}
            sx={{ gridColumn: "span 12", marginTop: "12px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="info"
            startIcon={<CloseIcon />}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            color={actionType === "approve" ? "secondary" : "error"}
            startIcon={<DoneAllIcon />}
            variant="contained"
            autoFocus
            sx={{ textTransform: "none" }}
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* add Remark */}
      <Dialog
        sx={{
          borderRadius: "20px",
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
            height: "300px",
            WebkitAlignContent: "center",
            width: "400px",
          },
        }}
        open={remarkOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Action</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Add today's remark
          </DialogContentText>
          <TextField
            fullWidth
            id="invoicenumber"
            variant="outlined"
            type="text"
            label="Remaks"
            name="Remaks"
            multiline
            rows={4}
            placeholder="Enter your comment here"
            maxRows={12}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            sx={{ gridColumn: "span 12", marginTop: "12px" }}
          />
          <FormControlLabel control={<Checkbox onChange={handleChange} />} label="Mark as completed" />
        </DialogContent>

        

        <DialogActions>
          <Button
            onClick={handleRemarkClose}
            color="info"
            startIcon={<CloseIcon />}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={submitRemark}
            color="secondary"
            startIcon={<DoneAllIcon />}
            variant="contained"
            autoFocus
            sx={{ textTransform: "none" }}
          >
            Add Remark
          </Button>
        </DialogActions>
      </Dialog>

      {/* add Done Action */}
      <Dialog
        sx={{
          borderRadius: "20px",
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
            height: "300px",
            WebkitAlignContent: "center",
            width: "400px",
          },
        }}
        open={completedkOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Action</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Upload document
          </DialogContentText>
          <input type="file" accept="pdf/*" onChange={doneproductFileChange} />
          <TextField
            fullWidth
            id="invoicenumber"
            variant="outlined"
            type="text"
            label="Remaks"
            name="Remaks"
            multiline
            rows={4}
            placeholder="Enter your comment here"
            maxRows={12}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            sx={{ gridColumn: "span 12", marginTop: "12px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCompletedOpen(false);
            }}
            color="info"
            startIcon={<CloseIcon />}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={submitProductDone}
            color="secondary"
            startIcon={<DoneAllIcon />}
            variant="contained"
            autoFocus
            sx={{ textTransform: "none" }}
          >
            Mark completed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NeedToactAction;
