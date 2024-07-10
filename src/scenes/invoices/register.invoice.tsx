import {
  useTheme,
  Typography,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

import { Loader } from "../../components/Lodar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { loading, message } from "./invoiceSlice/invoice.selector";
import { Toast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { getInvoiceData, registerInvoice } from "./invoiceSlice/invoice.slice";
import { userID } from "../../utils/utils";
import { getproductbycategory } from "../category/categorySlice/categorySlice";
import { categoryData } from "../productcategory/categorySlice/category.selector";
import FormGroup from "@mui/material/FormGroup";
import dayjs from "dayjs";

type product = {
  id: string;
  productname: string;
  maximumtat: number;
  duedate: string;
};

const RegisterInvoice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const lodingState = useSelector(loading);
  const getMessage = useSelector(message);
  const navigate = useNavigate();
  const categoryProduct = useSelector(categoryData);

  const [productname, setproductname] = useState<product[]>([]);

  const [biodata, setBiodata] = useState<File>();
  const [concentdoc, setconcentdoc] = useState<File>();

  const [productCategoryName, setProductCategoryName] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [maxTat, setMaxTat] = useState<number>(0);
  const currentDateJS = dayjs().toDate();
  const LAST = dayjs().subtract(10, "day").toDate();

  console.log("LAST => ", LAST);

  useEffect(() => {
    if (lodingState === "failed" || lodingState === "succeeded") {
      setOpen(true);
    }
  }, [lodingState]);

  const biodataFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setBiodata(event.target.files[0]);
    }
  };

  const consentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setconcentdoc(event.target.files[0]);
    }
  };

  const submitInvoice = () => {
    const formData = new FormData();
    formData.append("productrequest", JSON.stringify(productname));
    formData.append("productcategory", productCategoryName);
    formData.append("concentdoc", concentdoc as Blob);

    formData.append("biodata", biodata as Blob);
    formData.append("clientid", userID() as string);
    formData.append("companyid", sessionStorage.getItem("companyId") as string);
    formData.append("clientname", sessionStorage.getItem("name") as string);
    formData.append("requestdate", currentDateJS.toDateString());
    formData.append("duedate", dayjs().subtract(-maxTat, "day").toDate().toDateString());
    formData.append("progressstepscount", productname.length.toString());
    formData.append("progressstepsdone", "0");
    formData.append("movementstatus", "new");

    dispatch(registerInvoice(formData));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // You can access the checkbox value, checked state, or use a custom attribute to identify the checkbox

    if (event.target.checked) {
      console.log("index =>  check",);
      const index = categoryProduct.findIndex(
        (item) => item._id === event.target.value
      );
      console.log("index => ", index);
      const value = categoryProduct[index].productname
      setproductname([
        ...productname,
        { 
          id: event.target.value, 
          productname: value,
          maximumtat: categoryProduct[index].maximumtat,
          duedate : dayjs().subtract(-categoryProduct[index].maximumtat, "day").toDate().toDateString()
        }
      ]);
    } else {
      const index = productname.findIndex(
        (item) => item.id === event.target.value
      );
      const newProductname = [...productname];
      newProductname.splice(index, 1);
      setproductname(newProductname);
    }

    // Add your logic here to handle the change
  };

  console.log("productname => ", productname);

  const checkBoxnodeList = categoryProduct.map((item) => {
    if(item.maximumtat>maxTat){
      setMaxTat(item.maximumtat)
    }
    return(
    <Grid item key={item._id} xs={4}>
      <FormControlLabel
        control={<Checkbox onChange={handleCheckboxChange} value={item._id} />}
        label={item.productname}
      />
    </Grid>
  )});

  return (
    <>``
      <Box m="20px">
        {/* HEADER */}
        <Header title="Due diligence Request" subtitle="" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => navigate(-1)}
            color="secondary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Back to list
          </Button>
        </Box>

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
              Invoice Detail
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputLabel id="demo-simple-select-helper-label">
                  Product category
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Product category"
                  value={productCategoryName}
                  onChange={(e) => {
                    dispatch(
                      getproductbycategory({
                        category: e.target.value as string,
                      })
                    );
                    setProductCategoryName(e.target.value);
                  }}
                >
                  <MenuItem value="Employee verification">
                    Employee verification
                  </MenuItem>
                  <MenuItem value="Company Verification">
                    Company Verification
                  </MenuItem>
                  <MenuItem value="Property verification">
                    Property verification
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  fontWeight="200"
                  color={colors.grey[100]}
                >
                  Upload biodata/cv
                </Typography>
                <input
                  type="file"
                  accept="pdf/*"
                  onChange={biodataFileChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  fontWeight="200"
                  color={colors.grey[100]}
                >
                  Upload consent letter
                </Typography>
                <input
                  type="file"
                  accept="pdf/*"
                  onChange={consentFileChange}
                />
              </Grid>
            </Grid>
            <FormGroup>
              <Grid container spacing={2}>
                {checkBoxnodeList}
              </Grid>
            </FormGroup>
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
              submitInvoice();
            }}
          >
            Save
          </Button>
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

export default RegisterInvoice;
