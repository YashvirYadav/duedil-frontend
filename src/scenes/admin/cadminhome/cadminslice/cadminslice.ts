import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IClientAdminResponce } from "./cadmin.type"
import { service } from "../../../../services/ApiServices"

const initialState: IClientAdminResponce = {
    statusCode: 0,
    status: "idle",
    message: "",
    success: false,
    error: null,
    dashboard: {
        totalInvoicecount: 0,
        totalAmount: 0,
        newandwipInvoicecount: 0,
        newandwipAmount: 0,
        rejectedInvoicecount: 0,
        rejectedAmount: 0,
        paidInvoicecount: 0,
        paidAmount: 0,
    },
    data: []
}

export const getdashboardforclientadmin = createAsyncThunk<IClientAdminResponce>(
    "clientadmin/getdashboard",
    async (_, { rejectWithValue }) => {
        try {
            const responce = await service.getCall(
                "users/getdashboardforclientadmin/"+ sessionStorage.getItem("companyId")
            )
            return responce.data
        } catch (error) {
            const err = error as IClientAdminResponce
            return rejectWithValue(err)
        }
    }
)

//getslaexpiry

export const getslaexpiry = createAsyncThunk<IClientAdminResponce>(
    "clientadmin/getslaexpiry",
    async (_, { rejectWithValue }) => {
        try {
            const responce = await service.getCall(
                "users/getslaexpiry/"+ sessionStorage.getItem("companyId")
            )
            return responce.data
        } catch (error) {
            const err = error as IClientAdminResponce
            return rejectWithValue(err)
        }
    }

)

export const cadminSlice = createSlice({
    name: "clientadmin",
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getdashboardforclientadmin.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getdashboardforclientadmin.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.success = action.payload.success
            state.dashboard = action.payload.data as any
        })
        builder.addCase(getdashboardforclientadmin.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string
        })
        .addCase(getslaexpiry.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getslaexpiry.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.success = action.payload.success
            state.data = action.payload.data 
        })
        .addCase(getslaexpiry.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string
        })
    },

})

export const { reset } = cadminSlice.actions    

export default cadminSlice.reducer


