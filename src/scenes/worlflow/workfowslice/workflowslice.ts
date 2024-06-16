import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IWorkflow, IRegisterWorkflowResponce } from "./workflow.type";
import { service } from "../../../services/ApiServices";
import { ex } from "@fullcalendar/core/internal-common";

const initialState: IRegisterWorkflowResponce = {
    statusCode: 0,
    status: "idle",
    data: [],
    message: "",
    success: false,
    error: null,
    };

export const registerWorkflow = createAsyncThunk<IRegisterWorkflowResponce,IWorkflow>(
    "workflow/registerWorkflow",
    async (data: IWorkflow, { rejectWithValue }) => {
    try {
        const responce = await service.postCall(
            "workflow/registerworkflow",
            data
        );
        return responce.data;
    } catch (error) {
        return rejectWithValue(error);
    }
    }
);

export const getWorkflow = createAsyncThunk<IRegisterWorkflowResponce, string>(
    "workflow/getWorkflow",
    async (companyId: string, { rejectWithValue }) => {
    try {
        const responce = await service.getCall(`workflow/getworkflow/${companyId}`);
        return responce.data;
    } catch (error) {
        return rejectWithValue(error);
    }
    }

);

// delete workflow
export const deleteWorkflow = createAsyncThunk<IRegisterWorkflowResponce, string>(
    "workflow/deleteWorkflow",
    async (id: string, { rejectWithValue }) => {
    try {
        const responce = await service.deleteCall(`workflow/deleteworkflow/${id}`);
        return responce.data;
    } catch (error) {
        return rejectWithValue(error);
    }
    }
);

export const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        resetWorkflow: (state) => {
            state.status = "idle";
            state.message = "";
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerWorkflow.pending, (state) => {
            state.status = "loading";
        })
        .addCase(registerWorkflow.fulfilled, (state, action: PayloadAction<IRegisterWorkflowResponce>) => {
            state.status = "succeeded";
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.success = action.payload.success;
        })
        .addCase(registerWorkflow.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload as string;
        })
        .addCase(getWorkflow.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getWorkflow.fulfilled, (state, action: PayloadAction<IRegisterWorkflowResponce>) => {
            state.status = "succeeded";
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.success = action.payload.success;
        })
        .addCase(getWorkflow.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload as string;
        })
        .addCase(deleteWorkflow.pending, (state) => {
            state.status = "loading";
        })
        .addCase(deleteWorkflow.fulfilled, (state, action: PayloadAction<IRegisterWorkflowResponce>) => {
            state.status = "succeeded";
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.success = action.payload.success;
        })
        .addCase(deleteWorkflow.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload as string;
        });
    },
});

export const { resetWorkflow } = workflowSlice.actions;
export default workflowSlice.reducer;