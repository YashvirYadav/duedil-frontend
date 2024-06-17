import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVendorDashboardResponce } from "./vendor.type";
import { service } from "../../../../services/ApiServices";

const initialState: IVendorDashboardResponce = {
  statusCode: 0,
  status: "idle",
  data: {
    totalInvoice: 0,
    totalAmount: 0,
    newInvoice: 0,
    newInvoiceAmount: 0,
    wipInvoice: 0,
    wipInvoiceAmount: 0,
    paidInvoice: 0,
    paidInvoiceAmount: 0,
  },
  message: "",
  success: false,
  error: null,
  invoice: [],
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

export const getNeedtoact = createAsyncThunk<IVendorDashboardResponce>(
  "users/getNeedtoact",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/getuserneetoact", {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMyInvoice = createAsyncThunk<IVendorDashboardResponce>(
  "users/getMyInvoice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/getmyinvoice", {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// getmyNewinvoiceByVender,
//   getmyRejectedinvoiceByVender

export const getMyInvoiceNew = createAsyncThunk<IVendorDashboardResponce>(
  "users/getMyInvoicenew",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/getmynewinvoicebyvender", {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const getMyRejectedInvoice = createAsyncThunk<IVendorDashboardResponce>(
  "users/getMyInvoiceRejected",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/getmyrejectedinvoicebyvender", {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMyPaidInvoice = createAsyncThunk<IVendorDashboardResponce>(
  "users/getMyInvoicePaid",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/getmypaidinvoicebyvender", {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


//

export const getMyWipInvoice = createAsyncThunk<IVendorDashboardResponce>(
  "users/getMyInvoiceWip",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/getmywipinvoicebyvender", {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//getmycompletedinvoicebyvender

export const getCompletedInvoice = createAsyncThunk<IVendorDashboardResponce>(
  "users/getMyInvoiceCompleted",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/getmycompletedinvoicebyvender", {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
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
      )
      .addCase(getMyInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.invoice = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getMyInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(getMyInvoiceNew.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyInvoiceNew.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.invoice = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getMyInvoiceNew.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(getMyRejectedInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyRejectedInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.invoice = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getMyRejectedInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(getMyWipInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyWipInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.invoice = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getMyWipInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(getCompletedInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCompletedInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";

        console.log("action.payload.data", action.payload.data);

        state.invoice = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getCompletedInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});


export const { resetVendorDashboard } = vendorDashboardSlice.actions;
export default vendorDashboardSlice.reducer;
