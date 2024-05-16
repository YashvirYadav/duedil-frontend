import {
  TextField,
  useTheme,
  Typography,
  Button,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import Header from "../../components/Header";

import { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";

import { getCategory } from "../category/categorySlice/categorySlice";
import { categoryData } from "../category/categorySlice/category.selector";
import { companyData } from "../company/companyRedux/company.selector";
import { getCompany } from "../company/companyRedux/companyslice";
import { ICategory } from "../category/categorySlice/type.category";

const RegisterRatecard = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector(companyData);
  console.log("company => ", company);
  const [open, setOpen] = useState(false);
  const category = useSelector(categoryData);
  const [companyName, setCompanyName] = useState("");
  const [allCategory, setAllCategory] = useState<ICategory[] | null>([]);

  console.log("allCategory => ", allCategory);
  console.log("categorynew  => ", category);

  const ragisterUserSubmit = () => {};
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    setAllCategory(category);
  }, [category]);

  // Declare the 'rows' variable here
  const columns: GridColDef<any[number]>[] = [
    { field: "name", headerName: "Category Name", flex: 1 },

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
      headerName: "0 to 100",
      editable: true,
      type: "number",
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TextField
            type="number"
            value={params.value}
            onChange={(e) => {
              const id = params.id.toString();
              console.log("e => ", e.target.value + " id => " + id);
              if (allCategory) {
                setAllCategory(
                  allCategory.map((item) =>
                    item._id === id
                      ? { ...item, c0to100: Number(e.target.value) } // Parse e.target.value to a number
                      : item
                  )
                );
              }
            }}
          />
        );
      },
    },
    {
      field: "c101to500",
      headerName: "101 to 500",
      editable: true,
      type: "number",
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TextField
            type="number"
            value={params.value}
            onChange={(e) => {
              const id = params.id.toString();
              console.log("e => ", e.target.value + " id => " + id);
              if (allCategory) {
                setAllCategory(
                  allCategory.map((item) =>
                    item._id === id
                      ? { ...item, c101to500: Number(e.target.value) } // Parse e.target.value to a number
                      : item
                  )
                );
              }
            }}
          />
        );
      },
    },
    {
      field: "c501to1000",
      headerName: "501 to 1000",
      editable: true,
      type: "number",
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TextField
            type="number"
            value={params.value}
            onChange={(e) => {
              const id = params.id.toString();
              console.log("e => ", e.target.value + " id => " + id);
              if (allCategory) {
                setAllCategory(
                  allCategory.map((item) =>
                    item._id === id
                      ? { ...item, c501to1000: Number(e.target.value) } // Parse e.target.value to a number
                      : item
                  )
                );
              }
            }}
          />
        );
      },
    },
    {
      field: "c1001plus",
      headerName: "1001+",
      editable: true,
      type: "number",
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TextField
            type="number"
            value={params.value}
            onChange={(e) => {
              const id = params.id.toString();
              console.log("e => ", e.target.value + " id => " + id);
              if (allCategory) {
                setAllCategory(
                  allCategory.map((item) =>
                    item._id === id
                      ? { ...item, c1001plus: Number(e.target.value) } // Parse e.target.value to a number
                      : item
                  )
                );
              }
            }}
          />
        );
      },
    },
  ];

  //get name and id from company
  const meneItmeArray =
    Array.isArray(company) &&
    company.map((option, index) => ({
      _id: option._id,
      name: option.companyname,
    }));

  console.log("meneItmeArray => ", meneItmeArray);

  const menuItem =
    Array.isArray(company) &&
    company.map((option, index) => {
      return (
        <MenuItem key={index} value={option._id}>
          {option.companyname}
        </MenuItem>
      );
    });

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Header title="Category User" subtitle="Welcome to your dashboard" />

        <Box
          m="40px 0 0 0"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="20px"
        >
          <Box
            flexDirection="column"
            gridColumn="span 12"
            bgcolor={colors.primary[400]}
            display="flex"
            p="10px"
            gap="10px"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Category Detail
            </Typography>

            <InputLabel id="demo-simple-select-helper-label">
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            >
              {menuItem}
            </Select>

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
              }}
            >
              <DataGrid
                editMode="row"
                rows={allCategory ? allCategory : []}
                columns={columns}
                getRowId={(row) => row._id}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 2,
            // Add more styling properties as needed backgroundColor={colors.primary[400]}
          }}
          flexDirection="column"
          gridColumn="span 12"
          bgcolor={colors.primary[400]}
          alignItems="right"
          p="30px"
          gap="10px"
        >
          <Button
            variant="contained"
            onClick={() => {
              ragisterUserSubmit();
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RegisterRatecard;
