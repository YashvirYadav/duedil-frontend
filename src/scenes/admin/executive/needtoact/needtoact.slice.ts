import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { service } from "../../../../services/ApiServices";
import { INeedtoactResponce } from "./needtoact.type";
import axios from "axios";

const initialState: INeedtoactResponce = {
  statusCode: 0,
  status: "idle",
  data: [],
  message: "",
  success: false,
  error: null,
  currentInvoice: null,
  pdfUrl: null,
};

export const getNeedtoact = createAsyncThunk<INeedtoactResponce>(
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

export const userapprove = createAsyncThunk<INeedtoactResponce, string>(
  "users/userapprove",
  async (id, { rejectWithValue }) => {
    try {
      console.log("id", id);
      const response = await service.postCall("users/userapprove", {
        invoiceId: id,
        userId: sessionStorage.getItem("userId"),
        companyId: sessionStorage.getItem("companyId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userreject = createAsyncThunk<INeedtoactResponce, string>(
  "users/userreject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await service.postCall("users/userrejectinvoice", {
        invoiceId: id,
        userId: sessionStorage.getItem("userId"),
        companyId: sessionStorage.getItem("companyId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getInvoiceById = createAsyncThunk<INeedtoactResponce, string>(
  "users/getInvoiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await service.getCall("invoice/getinvoiceid/" + id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// get attachment

export const getAttachment = createAsyncThunk<File, string>(
  "users/getAttachment",
  async (filename, { rejectWithValue }) => {
    try {

      const file = filename.split("/")[2]

      const response = await axios.get(
        "http://localhost:8000/api/v1/invoice/getattachment/"+file,
        {
          responseType: "blob", // Important for handling binary data
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf"); // Specify the file name here
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const needtoactSlice = createSlice({
  name: "needtoact",
  initialState,
  reducers: {
    resetNeedtoact: (state) => {
      state.status = "idle";
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNeedtoact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNeedtoact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getNeedtoact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getInvoiceById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getInvoiceById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.currentInvoice = action.payload.data;
          state.message = action.payload.message;
          state.success = action.payload.success;
        }
      )
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(userapprove.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userapprove.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.currentInvoice = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(userapprove.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(userreject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userreject.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.currentInvoice = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(userreject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getAttachment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAttachment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        console.log("action.payload", action.payload);
        state.pdfUrl = action.payload;
      })
      .addCase(getAttachment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetNeedtoact } = needtoactSlice.actions;
export default needtoactSlice.reducer;
