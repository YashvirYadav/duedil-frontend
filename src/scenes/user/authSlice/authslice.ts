import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ILoginSuccessResponce,
} from "./user.type";
import { service } from "../../../services/ApiServices";

export const login = createAsyncThunk<ILoginSuccessResponce, ILoginRequest>(
  "auth/login",
  async (loginRequest: ILoginRequest, { rejectWithValue }) => {
    try {
      const { email, password } = loginRequest;
      const responce = await service.postCall("users/login", {
        email: email,
        password: password,
      });
      return responce.data;
    } catch (error) {
      const err = error as ILoginSuccessResponce;
      return rejectWithValue(err);
    }
  }
);

export const changePassword = createAsyncThunk<ILoginSuccessResponce, { oldPassword: string, newPassword: string }>(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const responce = await service.postCall("users/changepassword", data);
      return responce.data;
    } catch (error) {
      const err = error as ILoginSuccessResponce;
      return rejectWithValue(err);
    }
  }
);



interface InitialState {
  data: ILoginSuccessResponce | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string;
}

const initialState: InitialState = {
  data: null,
  status: "idle",
  error: null,
  message: "",
};

const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.data = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ILoginSuccessResponce>) => {
          state.status = "succeeded";
          state.error = "";
          state.data = action.payload;
          sessionStorage.setItem("token", action.payload.data.accessToken);
          sessionStorage.setItem("user", JSON.stringify(action.payload.data.user));
          sessionStorage.setItem("role", action.payload.data.user.userrole);
          sessionStorage.setItem("email", action.payload.data.user.email);  
          sessionStorage.setItem("name", action.payload.data.user.username);
          sessionStorage.setItem("companyId", action.payload.data.user.comapanyId);
          sessionStorage.setItem("userId", action.payload.data.user._id);
          sessionStorage.setItem("userrole", action.payload.data.user?.role?.rolename || ""); // Handle undefined value
        }
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message;
      }).addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = "";
      }).addCase(changePassword.fulfilled, (state, action: PayloadAction<ILoginSuccessResponce>) => {
        state.status = "succeeded";
        state.error = "";
        state.message = action.payload.message;
      }).addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.error = action.payload.response.data.message;
      });
  },
});

export const { resetUser } = postSlice.actions;

export default postSlice.reducer;
