import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRegisterCompanyResponce } from "../../company/companyRedux/company.type";
import { service } from "../../../services/ApiServices";
import { ICategory } from "../../category/categorySlice/type.category";


const initialState: IRegisterCompanyResponce = {
    statusCode: 0,
    status: "idle",
    data: null,
    message: "",
    success: false,
    error: null
  };

// save rate card in copnay
export const updateCompanyRateCrd = createAsyncThunk<IRegisterCompanyResponce, {_id:string, category:ICategory[]}>(
    "update/company",
    async (data, { rejectWithValue }) => {
      try {
        const id = data._id;
        const {...rest} = data.category;
       
        console.log("rest==>", rest);
        const response = await service.putCall("company/insertcategory/"+id, rest);
        return response.data;
      } catch (error) {
        const err = error as IRegisterCompanyResponce;
        return rejectWithValue(err);
      }
    }
  );

  // add slice
  const ratecardSlice = createSlice({
    name: "ratecard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(updateCompanyRateCrd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCompanyRateCrd.fulfilled, (state, action: PayloadAction<IRegisterCompanyResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.statusCode = action.payload.statusCode;
      }).addCase(updateCompanyRateCrd.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message;
      })
    },
  });

  export default ratecardSlice.reducer;