import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IRegisterVendorResponce} from "./vendor.type";
import {IVendor} from "./vendor.type";
import { service } from "../../../services/ApiServices";


const initialState: IRegisterVendorResponce = {
    statusCode: 0,
    status: "idle",
    data: [],
    message: "",
    success: false,
    error: null,
  };


  export const registerVendor = createAsyncThunk<IRegisterVendorResponce,IVendor>(
    "vendor/registerVendor",
    async (data,{rejectWithValue}) => {

        try {
            const responce = await service.postCallBlob(
              "vendor/registerVendor",
              data
            );
            return responce.data;
          } catch (error) {
            const err = error as IRegisterVendorResponce;
            return rejectWithValue(err);
          }
      
    }
  );

    export const getVandor = createAsyncThunk<IRegisterVendorResponce>(
    "vendor/getVendor",
    async (_, { rejectWithValue }) => {
      try {
        const responce = await service.getCall("vendor/getVendor");
        return responce.data;
      } catch (error) {
        const err = error as IRegisterVendorResponce;
        return rejectWithValue(err);
      }
    }
    );

  const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
      resetVendor: (state) => {
        state.status = "idle";
        state.message = "";
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerVendor.pending, (state) => {
          state.status = "loading";
        })
        .addCase(registerVendor.fulfilled, (state, action: PayloadAction<IRegisterVendorResponce>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.success = action.payload.success;
          state.error = null;
        })
        .addCase(registerVendor.rejected, (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message || "Something went wrong";
          state.error = action.payload?.error || null;
        });
    },
  });

  export default vendorSlice.reducer;
  