import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICompany, IRegisterCompanyResponce } from "./company.type";
import { service } from "../../services/ApiServices";

interface InitialState {
    data: ICompany | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }

  const initialState: InitialState = {
    data: null,
    status: "idle",
    error: null,
  };

  export const registerCompany = createAsyncThunk<IRegisterCompanyResponce, FormData>(
    "register/company",
    async (formdata, { rejectWithValue }) => {
      try {
       
        const responce = await service.postCall("users/login", {formdata
        });
        return responce.data;
      } catch (error) {
        const err = error as IRegisterCompanyResponce;
        return rejectWithValue(err);
      }
    }
  );

  const companyPostSlice = createSlice({
    name: "companyPost",
    initialState,
    reducers: {
      resetUser: (state) => {
        state.data = null;
        state.status  = "idle";
      },
    },
    extraReducers: (builder) => {
    builder
        .addCase(registerCompany.pending, (state) => {
            state.status = "loading";
            state.error = "";
        })
        .addCase(
                registerCompany.fulfilled,
            (state, action: PayloadAction<IRegisterCompanyResponce>) => {
                state.status = "succeeded";
                state.error = "";
                state.data = action.payload.data;                
            }
        )
        .addCase(registerCompany.rejected, (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload.response.data.message;
        });
    },
  });

  export default companyPostSlice.reducer;
