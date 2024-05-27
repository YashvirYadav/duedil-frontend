
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBank, IRegisterBankResponce } from "./bank.type";
import { service } from "../../../services/ApiServices";


export const registerBank = createAsyncThunk<IRegisterBankResponce,IBank>(
    "bank/registerBank",
    async (data: IBank, { rejectWithValue }) => {
        try {
        const responce = await service.postCall(
            "bank/registerbank",
            {...data, userId:sessionStorage.getItem("userId")}
            );
            return responce.data;
        } catch (error) {
        return rejectWithValue(error);
        }
    }
);

export const getallBank = createAsyncThunk<IRegisterBankResponce>(
    "bank/getallBank",
    async (_, { rejectWithValue }) => {
        try {
        const responce = await service.getCall("bank/getallbank/"+sessionStorage.getItem("userId"));
        return responce.data;
        } catch (error) {
        return rejectWithValue(error);
        }
    }
);


export const bankSlice = createSlice({
    name: "bank",
    initialState: {
        statusCode: 0,
        status: "idle",
        data: [],
        message: "",
        success: false,
        error: null,
    } as IRegisterBankResponce,
    reducers: {
        clearState: (state) => {
            state.statusCode = 0;
            state.status = "idle";
            state.data = [];
            state.message = "";
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerBank.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(registerBank.fulfilled, (state, action: PayloadAction<IRegisterBankResponce>) => {
            state.statusCode = action.payload.statusCode;
            state.status = "succeeded";
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.error = action.payload.error;
        });
        builder.addCase(registerBank.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.message = action.payload.message;
        })
        .addCase(getallBank.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getallBank.fulfilled, (state, action: PayloadAction<IRegisterBankResponce>) => {
            state.statusCode = action.payload.statusCode;
            state.status = "succeeded";
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.error = action.payload.error;
        })
        .addCase(getallBank.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.message = action.payload.message;
        });
    },
});

export const { clearState } = bankSlice.actions;
export default bankSlice.reducer;
