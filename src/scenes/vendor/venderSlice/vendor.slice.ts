import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRegisterVendorResponce } from "./vendor.type";
import { IVendor } from "./vendor.type";
import { service } from "../../../services/ApiServices";

const initialState: IRegisterVendorResponce = {
  statusCode: 0,
  status: "idle",
  data: [],
  message: "",
  success: false,
  error: null,
};

export const registerVendor = createAsyncThunk<
  IRegisterVendorResponce,
  IVendor
>("vendor/registerVendor", async (data, { rejectWithValue }) => {
  try {
    const responce = await service.postCall(
      "vendor/registerVendor",
      data
    );
    return responce.data;
  } catch (error) {
    const err = error as IRegisterVendorResponce;
    return rejectWithValue(err);
  }
});

export const getVandor = createAsyncThunk<IRegisterVendorResponce, string>(
  "vendor/getVendor",
  async (id, { rejectWithValue }) => {
    try {
      const responce = await service.getCall("vendor/getVendor/" + id);
      return responce.data;
    } catch (error) {
      const err = error as IRegisterVendorResponce;
      return rejectWithValue(err);
    }
  }
);

// deleteVendor

export const deleteVendor = createAsyncThunk<IRegisterVendorResponce, string>(
  "vendor/deleteVendor",
  async (id: string, { rejectWithValue }) => {
    try {
      const responce = await service.deleteCall(`vendor/deleteVendor/${id}`);
      return responce.data;
    } catch (error) {
      const err = error as IRegisterVendorResponce;
      return rejectWithValue(err);
    }
  }
);

//updateVendor
export const updateVendorStatus = createAsyncThunk<
  IRegisterVendorResponce,
  string
>("vendor/updateVendor", async (id: string, { rejectWithValue }) => {
  try {
    const responce = await service.putCall(`vendor/updateVendor/${id}`);
    return responce.data;
  } catch (error) {
    const err = error as IRegisterVendorResponce;
    return rejectWithValue(err);
  }
});
const companyid = () => sessionStorage.getItem("comapanyId");

const addComapnyID = (obj: any) => {
  return { ...obj, companyid: companyid() };
};

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
      .addCase(
        registerVendor.fulfilled,
        (state, action: PayloadAction<IRegisterVendorResponce>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.success = action.payload.success;
          state.error = null;
        }
      )
      .addCase(registerVendor.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload?.message || "Something went wrong";
        state.error = action.payload?.error || null;
      })
      .addCase(getVandor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getVandor.fulfilled,
        (state, action: PayloadAction<IRegisterVendorResponce>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.success = action.payload.success;
          state.error = null;
        }
      )
      .addCase(getVandor.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload?.message || "Something went wrong";
        state.error = action.payload?.error || null;
      })
      .addCase(deleteVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteVendor.fulfilled,
        (state, action: PayloadAction<IRegisterVendorResponce>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.success = action.payload.success;
          state.error = null;
        }
      )
      .addCase(deleteVendor.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload?.message || "Something went wrong";
        state.error = action.payload?.error || null;
      });
  },
});

export default vendorSlice.reducer;
