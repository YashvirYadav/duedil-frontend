
import { IRegisterInvoiceResponce } from "./invoice.type";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { service } from "../../../services/ApiServices";

const initialState: IRegisterInvoiceResponce = {
  statusCode: 0,
  status: "idle",
  data: [],
  message: "",
  success: false,
  error: null,
};

export const registerInvoice = createAsyncThunk<IRegisterInvoiceResponce, FormData>
(
  "invoice/registerInvoice",async(data,{rejectWithValue})=>{
    try {
      const response = await service.postCallBlob("invoice/createInvoice",data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }  
);

export const getallInvoice = createAsyncThunk<IRegisterInvoiceResponce>(
    "invoice/getallInvoice",async(_, {rejectWithValue})=>{
        try {
        const response = await service.getCall("invoice/getallInvoice/"+sessionStorage.getItem("userId")?.toString());
        return response.data;
        } catch (error) {
        return rejectWithValue(error);
        }
    }
);

// deleteInvoice
export const deleteInvoice = createAsyncThunk<IRegisterInvoiceResponce, string>(
    "invoice/deleteInvoice",async(id,{rejectWithValue})=>{
        try {
        const response = await service.postCall(`invoice/deleteInvoice`
        ,{ 
          invoiceId :id,
          userid: sessionStorage.getItem("userId")?.toString() || ""
        });
        return response.data;
        } catch (error) {
        return rejectWithValue(error);
        }
    }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    resetInvoice: (state) => {
      state.status = "idle";
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerInvoice.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerInvoice.fulfilled, (state, action: PayloadAction<IRegisterInvoiceResponce>) => {
      state.status = "succeeded";
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(registerInvoice.rejected, (state, action: PayloadAction<any>) => {
      state.status = "failed";
      state.message = action.payload.message;
    }).addCase(getallInvoice.pending, (state) => {
        state.status = "loading";
    })
    .addCase(getallInvoice.fulfilled, (state, action: PayloadAction<IRegisterInvoiceResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = null;
    })
    .addCase(getallInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload.message;
    }).addCase(deleteInvoice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deleteInvoice.fulfilled, (state, action: PayloadAction<IRegisterInvoiceResponce>) => {
      state.status = "succeeded";
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.error = null;
    })
    .addCase(deleteInvoice.rejected, (state, action: PayloadAction<any>) => {
      state.status = "failed";
      state.message = action.payload.message;
    });
  },
});

export const { resetInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;


