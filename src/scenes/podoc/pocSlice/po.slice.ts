import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPOResponce } from "./po.type";
import { service } from "../../../services/ApiServices";


const initialState: IPOResponce = {
    statusCode: 0,
    status: "idle",
    data: undefined,
    message: "",
    success: false,
    vendor: [],
    error: null
};

export const getVendor = createAsyncThunk<IPOResponce>(
 "po/getVendor",
    async (_, { rejectWithValue }) => {
        try {
            const response = await service.getCall("vendor/getVendorName/"+sessionStorage.getItem("companyId"));
                                                                                                 
            return response.data;
        } catch (error) {
            const err = error as IPOResponce;
            return rejectWithValue(err);
        }
    }   
)

export const registerPo = createAsyncThunk<IPOResponce,FormData>(
    "po/registerPo",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await service.postCallBlob("po/purchaseorder", data);
            return response.data;
        } catch (error) {
            const err = error as IPOResponce;
            return rejectWithValue(err);
        }
    }
);

export const getAllPo = createAsyncThunk<IPOResponce>(
    "po/getPo",
    async (_, { rejectWithValue }) => {
        try {
            const response = await service.getCall("po/getPOByCompanyId/"+sessionStorage.getItem("companyId"));
            return response.data;
        } catch (error) {
            const err = error as IPOResponce;
            return rejectWithValue(err);
        }
    }
);

export const deletePobyid = createAsyncThunk<IPOResponce, string>(
    "po/deletePobyid",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await service.deleteCall("po/deletepobyid/"+id);
            return response.data;
        } catch (error) {
            const err = error as IPOResponce;
            return rejectWithValue(err);
        }
    }
);

export const getPobyid = createAsyncThunk<IPOResponce, string>(
    "po/getPobyid",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await service.getCall("po/getPobyid/"+id);
            return response.data;
        } catch (error) {
            const err = error as IPOResponce;
            return rejectWithValue(err);
        }
    }
);

export const updatePo = createAsyncThunk<IPOResponce,{formdata:FormData,id:string}>(
    "po/updatePo",
    async (data, { rejectWithValue }) => {
        try {
            const response = await service.putCall("po/updatepobyid/"+data.id, data.formdata);
            return response.data;
        } catch (error) {
            const err = error as IPOResponce;
            return rejectWithValue(err);
        }
    }
);

const poSlice = createSlice({
    name: "po",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVendor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getVendor.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.vendor = action.payload.data;
        });
        builder.addCase(getVendor.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload.response.data.message as string;
        })
        .addCase(registerPo.pending, (state) => {
            state.status = "loading";
        })
        .addCase(registerPo.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.message = action.payload.message;
        })
        .addCase(registerPo.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload.response.data.message as string;
        })
        .addCase(getAllPo.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getAllPo.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data;
        })
        .addCase(getAllPo.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload.response.data.message as string;
        })
        .addCase(deletePobyid.pending, (state) => {
            state.status = "loading";
        })
        .addCase(deletePobyid.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data;
        })
        .addCase(deletePobyid.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload.response.data.message as string;
        })
        .addCase(getPobyid.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getPobyid.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data; 
        })
        .addCase(getPobyid.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload.response.data.message as string;
        });
    }
});

export default poSlice.reducer;
