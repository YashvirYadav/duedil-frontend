import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVendorDashboardResponce } from "./vendor.type";
import { service } from "../../../../services/ApiServices";

const initialState: IVendorDashboardResponce = {
  statusCode: 0,
  status: "idle",
  data: {
    totalInvoice: 0,
    totalAmount: 0,
    pendingInvoice: 0,
    wipInvoice: 0,
    paidInvoice: 0,
    rejectedInvoice: 0,
  },
  message: "",
  success: false,
  error: null,
};

export const getVenderDashboard = createAsyncThunk<IVendorDashboardResponce>(
  "invoice/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall(`invoice/dashboard`, {
        companyId: sessionStorage.getItem("companyId"),
        vendorId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const vendorDashboardSlice = createSlice({
  name: "vendorDashboard",
  initialState,
  reducers: {
    resetVendorDashboard: (state) => {
      state.status = "idle";
      state.message = "";
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVenderDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getVenderDashboard.fulfilled,
        (state, action: PayloadAction<IVendorDashboardResponce>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.success = action.payload.success;
          state.error = action.payload.error;
        }
      )
      .addCase(
        getVenderDashboard.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload.message;
          state.error = action.payload.error;
        }
      );
  },
});

export const { resetVendorDashboard } = vendorDashboardSlice.actions;
export default vendorDashboardSlice.reducer;
