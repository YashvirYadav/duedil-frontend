import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRole, IRegisterRoleResponce } from "./role.type";
import { service } from "../../../services/ApiServices";

const initialState: IRegisterRoleResponce = {
  statusCode: 0,
  status: "idle",
  data: [],
  message: "",
  success: false,
  error: null,
};

export const registerRole = createAsyncThunk<IRegisterRoleResponce, IRole>(
  "role/registerRole",
  async (data: IRole, { rejectWithValue }) => {
    try {
      const responce = await service.postCall("role/registerrole", {
        ...data,
        companyId: sessionStorage.getItem("companyId"),
      });
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// getcompanyById/:id

export const getroleBycompanyId = createAsyncThunk<IRegisterRoleResponce, string>(
  "role/getcompanyById",
  async (id: string, { rejectWithValue }) => {
    try {
      const responce = await service.getCall(`role/getroleBycompanyId/${id}`);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerRole.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      registerRole.fulfilled,
      (state, action: PayloadAction<IRegisterRoleResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.error = action.payload.error;
      }
    );
    builder.addCase(
      registerRole.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = "failed";
      }
    );
    builder.addCase(getroleBycompanyId.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        getroleBycompanyId.fulfilled,
      (state, action: PayloadAction<IRegisterRoleResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.error = action.payload.error;
      }
    );
    builder.addCase(
        getroleBycompanyId.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = "failed";
      }
    );
  },
});

export const { clearState } = roleSlice.actions;
export default roleSlice.reducer;
