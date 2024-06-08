import {
  useTheme,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Input,
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
import {
  addgrnitems,
  getAttachment,
  getInvoiceById,
  userapprove,
  userreject,
} from "./needtoact.slice";
import { Iinvoicemovement } from "./needtoact.type";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import NumbersIcon from "@mui/icons-material/Numbers";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DownloadIcon from "@mui/icons-material/Download";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

// import Textarea from '@mui/joy/Textarea';

const NeedToactAction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);

  const getMessage = useSelector(message);
  const invoice = useSelector(currentInvoice);
  console.log("=>>", invoice);
  const navigate = useNavigate();

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${currentDate.getFullYear()}`;

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getInvoiceById(id));
    }
  }, [dispatch]);

  const [invoicenumber, setinvoicenumber] = useState<string>("");

  const [invoicemovement, setinvoicemovement] = useState<Iinvoicemovement[]>(
    []
  );

  const [invoicedate, setinvoicedate] = useState<string>(formattedDate);

  const [duedate, setduedate] = useState<string>(formattedDate);

  const [amount, setamount] = useState<number>(0);

  const [purchaseordernumber, setpurchaseordernumber] = useState<string>("");

  const [gstamount, setgstamount] = useState<number | string>(0);

  const [attachments, setattachments] = useState<string>();

  const [totalamount, settotalamount] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);

  const [commentEmapty, setCommentEmpty] = useState<boolean>(false);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [actionType, setActionType] = useState<string>("");
  const [currentuser, setCurrentUser] = useState<string>("");
  const [vendorName, setVendorName] = useState<string>("");
  const [showGrn, setShowGrn] = useState<boolean>(false);
  const [noteType, setNoteType] = useState<string>("Credit note");
  const [noteAmount, setNoteAmount] = useState<number>(0);
  const [grnNoteComment, setGrnNoteComment] = useState<string>("");
  const [grnattachments, setgrnattachments] = useState<File>();

  useEffect(() => {
    settotalamount(Number(amount) + Number(gstamount));
  }, [gstamount, amount]);

  useEffect(() => {
    if (invoice) {
      setinvoicenumber(invoice.invoicenumber);
      setinvoicedate(
        invoice.invoicedate ? invoice.invoicedate.toString() : formattedDate
      );
      setduedate(invoice.duedate ? invoice.duedate.toString() : formattedDate);
      setamount(invoice.amount);
      setpurchaseordernumber(invoice.purchaseordernumber || "");
      setgstamount(invoice.gstamount || 0);
      settotalamount(invoice.totalamount || 0);
      setinvoicemovement(invoice.invoicemovement || []);
      setattachments(invoice.attachments || "");
      setCurrentUser(
        (invoice.invoicemovement &&
          invoice.invoicemovement[invoice.invoicemovement?.length - 1]
            .username) ||
          ""
      );
      setVendorName(invoice.vendorname || "");
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

  const saveGRN = () => {
    
    const data = new FormData();
    data.append("attachments", grnattachments as Blob);
    data.append("id", id || "");
    data.append("notetype", noteType);
    data.append("noteamount", noteAmount.toString());
    data.append("noteremark", grnNoteComment);
    dispatch(addgrnitems(data))

    setShowGrn(!showGrn)

  }

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

  const handleApprove = () => {
    if (actionType === "approve") {
      id &&
        dispatch(userapprove({ id: id, comment: comment })).then(() => {
          dispatch(getInvoiceById(id));
        });
    } else if (actionType === "reject") {
      if (comment.length < 3) {
        setCommentEmpty(true);
        return;
      }

      id &&
        dispatch(userreject({ id: id, comment: comment })).then(() => {
          dispatch(getInvoiceById(id));
        });
    }

    setDialogOpen(!dialogOpen);
  };
  const handleClose = () => {
    setDialogOpen(!dialogOpen);
  };

  console.log("showGrn=>", showGrn);
 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);

      setgrnattachments(event.target.files[0]);
    }
  };

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
            >
              Back to list
            </Button>
          </Box>
          {sessionStorage.getItem("userrole") === "GRN" && (
            <Box m="10px">
              <Button
                color="info"
                variant="contained"
                onClick={() => setShowGrn(!showGrn)}
                startIcon={<LayersIcon />}
              >
                GRN items
              </Button>
            </Box>
          )}

          {sessionStorage.getItem("userrole") === "Finance" && (
            <Box m="10px">
              <Button
                color="info"
                variant="contained"
                startIcon={<LayersIcon />}
              >
                Add TDS details
              </Button>
            </Box>
          )}

          <Box m="10px">
            <Button
              onClick={() => {
                setActionType("reject");
                setDialogOpen(!dialogOpen);
              }}
              color="error"
              variant="contained"
              startIcon={<ThumbDownIcon />}
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
              Invoice Detail
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
                    Invoice Number
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {invoicenumber}
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
                    Purchase Order Number
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {purchaseordernumber}
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
                  <DateRangeIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></DateRangeIcon>{" "}
                </Box>
                <Box p="5px">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Invoice Date
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {invoicedate.split("T")[0]}
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
                  <DateRangeIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></DateRangeIcon>{" "}
                </Box>
                <Box p="5px">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Due Date
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {duedate.split("T")[0]}
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
                  <PersonIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></PersonIcon>{" "}
                </Box>
                <Box p="5px">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Vender Name
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {vendorName}
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
                  <PersonIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></PersonIcon>{" "}
                </Box>
                <Box p="5px">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Current User
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {currentuser}
                  </Typography>
                </Box>
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
              Other invoice Detail
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
                  <CurrencyRupeeIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></CurrencyRupeeIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {amount}
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
                  <CurrencyRupeeIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></CurrencyRupeeIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    GST Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {gstamount}
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
                  <CurrencyRupeeIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></CurrencyRupeeIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {totalamount}
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
                  <DownloadIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></DownloadIcon>{" "}
                </Box>
                <Box p="5px">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  ></Typography>

                  <Button
                    onClick={() => {
                      attachments && dispatch(getAttachment(attachments));
                    }}
                    color="secondary"
                    variant="contained"
                    startIcon={<DownloadIcon />}
                  >
                    Download Attachment
                  </Button>
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
                  <CurrencyRupeeIcon
                    style={{ fontSize: 50, color: "#94e2cd" }}
                  ></CurrencyRupeeIcon>{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Credit/Debit Note
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    XXXXXXX
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="left"
                mt="20px"
                gridColumn="span 3"
              ></Box>
            </Box>
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
            value={comment}
            error={commentEmapty}
            helperText={commentEmapty ? "Comment is required" : ""}
            onChange={(e) => {
              setCommentEmpty(false);
              setComment(e.target.value);
            }}
            sx={{ gridColumn: "span 12", marginTop: "12px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="info"
            startIcon={<CloseIcon />}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            color={actionType === "approve" ? "secondary" : "error"}
            startIcon={<DoneAllIcon />}
            variant="contained"
            autoFocus
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* dilog fro GRN */}

      <Dialog
        sx={{
          borderRadius: "20px",
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
            height: "400px",
            WebkitAlignContent: "center",
            width: "400px",
          },
        }}
        open={showGrn}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add GRN credit/debit note
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Credit note"
            name="radio-buttons-group"
            onChange={(e) => {
              setNoteType(e.target.value);
              console.log("e=>", e.target.value);
            }}
          >
            <FormControlLabel
              value="Credit note"
              control={<Radio />}
              label="Credit note"
            />
            <FormControlLabel
              value="Debit note"
              control={<Radio />}
              label="Debit note"
            />
          </RadioGroup>

          <TextField
            fullWidth
            id="amount"
            label={noteType+" Amount"}
            type="number"
            variant="outlined"
            value={noteAmount}
            onChange={(e) => {
              setNoteAmount(Number(e.target.value));
            }}
            sx={{ gridColumn: "span 12" }}
          />

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
            value={grnNoteComment}
            error={commentEmapty}
            helperText={commentEmapty ? "Comment is required" : ""}
            onChange={(e) => {
            //  setCommentEmpty(false);
            setGrnNoteComment(e.target.value);
            }}
            sx={{ gridColumn: "span 12", marginTop: "12px" }}
          />
          <input type="file" accept="pdf/*" style={{ marginTop: "20px" }} onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="info"
            startIcon={<CloseIcon />}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
           
            color="secondary"
            startIcon={<DoneAllIcon />}
            variant="contained"
            autoFocus
            onClick={saveGRN}
          >
            Add Grn
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NeedToactAction;
