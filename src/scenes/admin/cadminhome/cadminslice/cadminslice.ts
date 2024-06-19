import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IClientAdminResponce } from "./cadmin.type";
import { service } from "../../../../services/ApiServices";


const initialState: IClientAdminResponce = {
  statusCode: 0,
  status: "idle",
  message: "",
  success: false,
  error: null,
  dashboard: {
    totalInvoicecount: 0,
    totalAmount: 0,
    rejectedInvoicecount: 0,
    rejectedAmount: 0,
    paidInvoicecount: 0,
    paidAmount: 0,
    wipInvoicecount: 0,
    wipAmount: 0,
    newInvoicecount: 0,
    newInvoiceAmount: 0
  },
  data: [],
  chartdata: [],
  sla: [],
  searchDashboardBydate: {
    totalInvoicecount: 0,
    totalAmount: 0,
    rejectedInvoicecount: 0,
    rejectedAmount: 0,
    paidInvoicecount: 0,
    paidAmount: 0,
    lineData: [],
    wipInvoicecount: 0,
    wipAmount: 0,
    newInvoicecount: 0,
    newInvoiceAmount: 0
  },
  Pendinginvoice: [],
  AagingReports: [],
};

export const charRoleWice = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/charRoleWice",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "invoice/getinvoicecountwithpendingrole/" +
          sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);

export const getdashboardforclientadmin =
  createAsyncThunk<IClientAdminResponce>(
    "clientadmin/getdashboard",
    async (_, { rejectWithValue }) => {
      try {
        const responce = await service.getCall(
          "users/getdashboardforclientadmin/" +
            sessionStorage.getItem("companyId")
        );
        return responce.data;
      } catch (error) {
        const err = error as IClientAdminResponce;
        return rejectWithValue(err);
      }
    }
  );

//getslaexpiry

export const getslaexpiry = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/getslaexpiry",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "users/getslaexpiry/" + sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);

//getinvoicebycompanyid
export const getinvoicebycompanyid = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/getinvoicebycompanyid",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "invoice/getinvoicebycompanyid/" + sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);
//underreviewbycompanyid
export const underreviewbycompanyid = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/underreviewbycompanyid",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "invoice/underreviewbycompanyid/" + sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);
//rejectedbycompanyid
export const rejectedbycompanyid = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/rejectedbycompanyid",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "invoice/rejectedbycompanyid/" + sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);

//completedbycompanyid
export const completedbycompanyid = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/completedbycompanyid",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "invoice/completedbycompanyid/" + sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);

export const getnewinvoicebycompanyid = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/getnewinvoicebycompanyid",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "invoice/getnewinvoicebycompanyid/" + sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);

//get dashboer report by date and cpmpany id

export const getdashboardreportbydate = createAsyncThunk<
  IClientAdminResponce,
  { startDate: Date; endDate: Date }
>("clientadmin/getdashboardreportbydate", async (data, { rejectWithValue }) => {
  try {
    const responce = await service.postCall(
      "report/cadminDashbordBydaterange",
      {
        companyId: sessionStorage.getItem("companyId"),
        startDateParam: data.startDate,
        endDateParam: data.endDate,
      }
    );
    return responce.data;
  } catch (error) {
    const err = error as IClientAdminResponce;
    return rejectWithValue(err);
  }
});

export const pendinginvoicesatusreport = createAsyncThunk<
  IClientAdminResponce,
  { startDate: Date; endDate: Date }
>(
  "clientadmin/pendinginvoicesatusreport",
  async (data, { rejectWithValue }) => {
    try {
      const responce = await service.postCall(
        "report/pendinginvoicesatusreport",
        {
          companyId: sessionStorage.getItem("companyId"),
          startDateParam: data.startDate,
          endDateParam: data.endDate,
        }
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);

export const agingReports = createAsyncThunk<IClientAdminResponce>(
  "clientadmin/aginginvoicesatusreport",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(
        "report/aginginvoicesatusreport/" + sessionStorage.getItem("companyId")
      );
      return responce.data;
    } catch (error) {
      const err = error as IClientAdminResponce;
      return rejectWithValue(err);
    }
  }
);

export const getinvoicebyvenderRole = createAsyncThunk<
  IClientAdminResponce,
  {
    id: string;
    role: string;
    startDate: string;
    endDate: string;
  }
>("clientadmin/getinvoicebyvenderRole", async (data, { rejectWithValue }) => {
  try {
    const responce = await service.postCall("report/getInvoiceByVenderRole", {
      companyId: sessionStorage.getItem("companyId"),
      vender: data.id,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    return responce.data;
  } catch (error) {
    const err = error as IClientAdminResponce;
    return rejectWithValue(err);
  }
});

export const singleageinvoiceReport = createAsyncThunk<
  IClientAdminResponce,
  {vendorId:string,age:string}
>("clientadmin/singleageinvoiceReport", async (data, { rejectWithValue }) => {
  try {
    const responce = await service.postCall(
      "report/singleageinvoiceReport",

      {
        companyId: sessionStorage.getItem("companyId"),
        vender: data.vendorId,
        age: data.age,
      }
    );
    return responce.data;
  } catch (error) {
    const err = error as IClientAdminResponce;
    return rejectWithValue(err);
  }
});

export const cadminSlice = createSlice({
  name: "clientadmin",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getdashboardforclientadmin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getdashboardforclientadmin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.dashboard = action.payload.data as any;
    });
    builder
      .addCase(getdashboardforclientadmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getslaexpiry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getslaexpiry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.sla = action.payload.data;
      })
      .addCase(getslaexpiry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(charRoleWice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(charRoleWice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        console.log("========", action.payload.data);
        state.chartdata = action.payload.data as any;
      })
      .addCase(charRoleWice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getinvoicebycompanyid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getinvoicebycompanyid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })
      .addCase(getinvoicebycompanyid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(underreviewbycompanyid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(underreviewbycompanyid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })
      .addCase(underreviewbycompanyid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(rejectedbycompanyid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rejectedbycompanyid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })
      .addCase(rejectedbycompanyid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(completedbycompanyid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completedbycompanyid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })
      .addCase(completedbycompanyid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getdashboardreportbydate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getdashboardreportbydate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.searchDashboardBydate = action.payload.data as any;
      })
      .addCase(getdashboardreportbydate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(pendinginvoicesatusreport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(pendinginvoicesatusreport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.Pendinginvoice = action.payload.data as any;
      })
      .addCase(pendinginvoicesatusreport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(agingReports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(agingReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.AagingReports = action.payload.data as any;
      })
      .addCase(agingReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getinvoicebyvenderRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getinvoicebyvenderRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })
      .addCase(getinvoicebyvenderRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(singleageinvoiceReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(singleageinvoiceReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })
      .addCase(singleageinvoiceReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getnewinvoicebycompanyid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getnewinvoicebycompanyid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })
      .addCase(getnewinvoicebycompanyid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { reset } = cadminSlice.actions;

export default cadminSlice.reducer;
