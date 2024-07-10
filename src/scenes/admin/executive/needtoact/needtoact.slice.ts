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

//getuserinvoicesbyhistorywip

export const getuserinvoicesbyhistorywip = createAsyncThunk<INeedtoactResponce>(
  "users/getuserinvoicesbyhistorywip",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall(
        "users/getuserinvoicesbyhistorywip",
        {
          userId: sessionStorage.getItem("userId"),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//getuserinvoicesbyhistoryrejected
export const getuserinvoicesbyhistoryrejected =
  createAsyncThunk<INeedtoactResponce>(
    "users/getuserinvoicesbyhistoryrejected",
    async (_, { rejectWithValue }) => {
      try {
        const response = await service.postCall(
          "users/getuserinvoicesbyhistoryrejected",
          {
            userId: sessionStorage.getItem("userId"),
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

//getuserinvoicesbyhistoryapproved

export const getuserinvoicesbyhistoryapproved =
  createAsyncThunk<INeedtoactResponce>(
    "users/getuserinvoicesbyhistorycompleted",
    async (_, { rejectWithValue }) => {
      try {
        const response = await service.postCall(
          "users/getuserinvoicesbyhistorycompleted",
          {
            userId: sessionStorage.getItem("userId"),
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

export const userapprove = createAsyncThunk<
  INeedtoactResponce,
  { id: string; comment: string }
>("users/userapprove", async (data, { rejectWithValue }) => {
  try {
    console.log("id", data.id);
    const response = await service.postCall("users/userapprove", {
      invoiceId: data.id,
      userId: sessionStorage.getItem("userId"),
      companyId: sessionStorage.getItem("companyId"),
      comment: data.comment,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const userreject = createAsyncThunk<
  INeedtoactResponce,
  { id: string; comment: string }
>("users/userreject", async (data, { rejectWithValue }) => {
  try {
    const response = await service.postCall("users/userrejectinvoice", {
      invoiceId: data.id,
      userId: sessionStorage.getItem("userId"),
      companyId: sessionStorage.getItem("companyId"),
      comment: data.comment,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

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
// add remarks
export const addRemarks = createAsyncThunk<
  INeedtoactResponce,
  { id: string; productid: string; remark: string }
>("users/addRemarks", async (data, { rejectWithValue }) => {
  try {
    const response = await service.postCall("invoice/addRemark", {
      id: data.id,
      productid: data.productid,
      remark: data.remark,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
//setproductstatusdone
export const setproductstatusdone = createAsyncThunk<
  INeedtoactResponce,
  { fromData: FormData }
>("users/setproductstatusdone", async (data, { rejectWithValue }) => {
  try {
    const response = await service.postCallBlob(
      "invoice/setproductstatusdone",
      data.fromData
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// get attachment

export const getAttachment = createAsyncThunk<File, string>(
  "users/getAttachment",
  async (filename, { rejectWithValue }) => {
    try {
      const file = filename.split("/")[2];

      console.log("file", file);

      const response = await axios.get(
        "http://localhost:8000/api/v1/invoice/getattachment/" + file,
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

//

export const addgrnitems = createAsyncThunk<INeedtoactResponce, FormData>(
  "users/addgrnitems",
  async (data, { rejectWithValue }) => {
    try {
      const response = await service.postCallBlob("invoice/addgrnitems", data);
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
      })
      .addCase(getuserinvoicesbyhistorywip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getuserinvoicesbyhistorywip.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getuserinvoicesbyhistorywip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getuserinvoicesbyhistoryrejected.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getuserinvoicesbyhistoryrejected.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getuserinvoicesbyhistoryrejected.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getuserinvoicesbyhistoryapproved.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getuserinvoicesbyhistoryapproved.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getuserinvoicesbyhistoryapproved.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addgrnitems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addgrnitems.fulfilled, (state, action) => {
        state.status = "succeeded";
        //state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(addgrnitems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetNeedtoact } = needtoactSlice.actions;
export default needtoactSlice.reducer;
