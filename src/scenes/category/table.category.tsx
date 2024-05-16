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

import { loading, categoryData, message } from "./categorySlice/category.selector";
import { Loader } from "../../components/Lodar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Toast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { deleteCategory, getCategory } from "./categorySlice/categorySlice";

const TableCategory = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const category = useSelector(categoryData);
  const navigate = useNavigate();

  const toastmessage = useSelector(message);
  console.log("toastmessage => ", toastmessage);
  console.log("category => ", category);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "name", headerName: "Category Name",  flex: 1 },

    {
      field: "code",
      headerName: "Code",
     
      flex: 1,
    },
    
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    }, 
    {
      field: "c0to100",
      headerName: "0 to 100"
    },
    {
      field: "c101to500",
      headerName: "101 to 500"
    },
    {
      field: "c501to1000",
      headerName: "501 to 1000"
    },
    {
      field: "c1001plus",
      headerName: "1001+"
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
            // dispatch(updateCompanyStatus({ id: id })).then(() => {
            //   dispatch(getCompany());
            //    }
            // );
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
        };

        const onClickDelete = () => {
          const id = params.id.toString();

            dispatch(deleteCategory({ id: id })).then(() => {
              dispatch(getCategory());
            });
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
          title="Category"
          subtitle="List of company for Future Reference"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => {
              navigate("addCategory");
            }}
            color="secondary"
            variant="contained"
          >
            Create New Category
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
         
            // checkboxSelection
            rows={Array.isArray(category) ? category : []} // Ensure that company is an array
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Use the `_id` field as the unique id
          />
        </Box>
      </Box>
    </>
  );
};

export default TableCategory;
