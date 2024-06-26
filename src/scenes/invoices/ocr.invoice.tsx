// import {
//   useTheme,
//   Typography,
//   Button,
// } from "@mui/material";
// import Box from "@mui/material/Box";
// import { tokens } from "../../theme";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Loader } from "../../components/Lodar";
// import { loading, message, ocrData } from "./invoiceSlice/invoice.selector";
// import { AppDispatch } from "../../app/store";
// import { Toast } from "../../components/Toast";
// import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

// import NumbersIcon from "@mui/icons-material/Numbers";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import DownloadIcon from "@mui/icons-material/Download";

// import PersonIcon from "@mui/icons-material/Person";
// import { getInvoiceData } from "./invoiceSlice/invoice.slice";
// import { item } from "./invoiceSlice/invoice.type";

// const ViewOcrInvice = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch<AppDispatch>();
//   const lodingState = useSelector(loading);

//   const getMessage = useSelector(message);
//   const invoiceData = useSelector(ocrData);

//   const [open, setOpen] = useState<boolean>(false);
//   const [items, setItems] = useState<item[]>([]);
//   const [attachments, setattachments] = useState<File>();


//   useEffect(() => {
//     if (lodingState === "failed" || lodingState === "succeeded") {
//       setOpen(true);
//     }
//   }, [lodingState]);

//   // Declare the 'rows' variable here
//   const columns: GridColDef<any[number]>[] = [
//     { field: "item", headerName: "Item" },

//     {
//       field: "quantity",
//       headerName: "Quantity",
//       flex: 1,
//     },
//     {
//       field: "rate",
//       headerName: "Rate",
//     },
//     {
//       field: "amount",
//       headerName: "Amount",
//     },
//   ];

//   useEffect(() => {
//     setItems(invoiceData.items);
//   }, [invoiceData]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       console.log(event.target.files[0]);

//       setattachments(event.target.files[0]);
//       const formData = new FormData();
//       formData.append("attachments", event.target.files[0] as Blob);
//    // formData.append("attachments", attachments as Blob);

//     dispatch(getInvoiceData(formData));
//     }
//   };

//   return (
//     <>
//       <Box m="20px">
//         {/* HEADER */}
//         {/* <Header title="Action Invoice" subtitle="Welcome" /> */}
//         <Box display="flex" justifyContent="end" mt="20px">
//           <Box m="10px">
//           <input type="file" accept="pdf/*" onChange={handleFileChange} />
//           </Box>
//         </Box>

//         <Box
//           m="40px 0 0 0"
//           display="grid"
//           gridTemplateColumns="repeat(12, 1fr)"
//           gap="20px"
//         >
//           <Box
//             flexDirection="column"
//             gridColumn="span 6"
//             bgcolor={colors.primary[400]}
//             display="flex"
//             p="10px"
//             gap="10px"
//           >
//             <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
//               Invoice Detail
//             </Typography>
//             <Box
//               m="0px 0 0 0"
//               display="grid"
//               gridTemplateColumns="repeat(6, 1fr)"
//               gap="20px"
//             >
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <NumbersIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></NumbersIcon>{" "}
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Invoice Number
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     {invoiceData.invoice_number}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <NumbersIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></NumbersIcon>{" "}
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Purchase Order Number
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     {invoiceData.po_number}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box
//               m="0px 0 0 0"
//               display="grid"
//               gridTemplateColumns="repeat(6, 1fr)"
//               gap="20px"
//             >
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <DateRangeIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></DateRangeIcon>{" "}
//                 </Box>
//                 <Box p="5px">
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Invoice Date
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     {invoiceData.invoice_date}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <DateRangeIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></DateRangeIcon>{" "}
//                 </Box>
//                 <Box p="5px">
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Due Date
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     {invoiceData.due_date}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//             <Box
//               m="0px 0 0 0"
//               display="grid"
//               gridTemplateColumns="repeat(6, 1fr)"
//               gap="20px"
//             >
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <PersonIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></PersonIcon>{" "}
//                 </Box>
//                 <Box p="5px">
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Vender Name
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Vender Name
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <PersonIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></PersonIcon>{" "}
//                 </Box>
//                 <Box p="5px">
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Current User
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Current User
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>

//           <Box
//             flexDirection="column"
//             gridColumn="span 6"
//             bgcolor={colors.primary[400]}
//             display="flex"
//             p="10px"
//             gap="10px"
//           >
//             <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
//               Other invoice Detail
//             </Typography>

//             <Box
//               m="0px 0 0 0"
//               display="grid"
//               gridTemplateColumns="repeat(6, 1fr)"
//               gap="20px"
//             >
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <CurrencyRupeeIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></CurrencyRupeeIcon>{" "}
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Amount
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                      {invoiceData.amount}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <CurrencyRupeeIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></CurrencyRupeeIcon>{" "}
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     GST Amount
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     {invoiceData.tax}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box
//               m="0px 0 0 0"
//               display="grid"
//               gridTemplateColumns="repeat(6, 1fr)"
//               gap="20px"
//             >
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <CurrencyRupeeIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></CurrencyRupeeIcon>{" "}
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Total Amount
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     {invoiceData.total_Amount}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   {/* <DownloadIcon
//                       style={{ fontSize: 50, color: "#94e2cd" }}
//                     ></DownloadIcon>{" "} */}
//                 </Box>
//                 <Box p="5px">
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   ></Typography>

//                   <Button
//                     onClick={() => {}}
//                     color="secondary"
//                     variant="contained"
//                     startIcon={<DownloadIcon />}
//                   >
//                     Download Attachment
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//             <Box
//               m="0px 0 0 0"
//               display="grid"
//               gridTemplateColumns="repeat(6, 1fr)"
//               gap="20px"
//             >
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               >
//                 <Box>
//                   <CurrencyRupeeIcon
//                     style={{ fontSize: 50, color: "#94e2cd" }}
//                   ></CurrencyRupeeIcon>{" "}
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     Credit/Debit Note
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.grey[100]}
//                   >
//                     XXXXXXX
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="left"
//                 mt="20px"
//                 gridColumn="span 3"
//               ></Box>
//             </Box>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             marginTop: 2,
//             "& .MuiDataGrid-root": {
//               border: "none",
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//             },
//             "& .name-column--cell": {
//               color: colors.greenAccent[300],
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: colors.blueAccent[700],
//               borderBottom: "none",
//             },
//           }}
//           flexDirection="column"
//           gridColumn="span 12"
//           bgcolor={colors.primary[400]}
//           alignItems="right"
//           p="20px"
//           gap="10px"
//         >
//           <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
//             Movement details
//           </Typography>
//           <DataGrid
//             sx={{
//               "& .MuiDataGrid-cell": {
//                 fontSize: "14px", // Change this value to your desired font size
//               },
//             }}
//             density="compact"
//             // checkboxSelection
//             rows={items} // Ensure that invoice is an array
//             columns={columns}
//             components={{ Toolbar: GridToolbar }}
//             getRowId={(row) => row._id} // Use the `_id` field as the unique id
//           />
//         </Box>
//       </Box>

//       {lodingState ? (
//         lodingState === "succeeded" ? (
//           <Toast
//             open={open}
//             handleClose={() => {}}
//             setShowToast={setOpen}
//             message={getMessage}
//             severity="error"
//           />
//         ) : lodingState === "loading" ? (
//           <Loader />
//         ) : null
//       ) : null}
//     </>
//   );
// };

// export default ViewOcrInvice;

export {}
