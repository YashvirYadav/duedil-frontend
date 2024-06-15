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
        });
    }
});

export default poSlice.reducer;
