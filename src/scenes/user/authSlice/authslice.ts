import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginSuccessResponce, IRegisterRequest } from "./user.type";
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

// register user
export const register = createAsyncThunk<ILoginSuccessResponce, IRegisterRequest>(
  "auth/register",
  async (loginRequest: IRegisterRequest, { rejectWithValue }) => {
    try {
      const { email, username, password, userrole, status } = loginRequest;
      const responce = await service.postCall("users/registerByAdmin", {
        email, username, password, userrole, status
      });
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
      state.status  = "idle";
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
        }
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message;
      })
      //add register
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = "";
      }).addCase(register.fulfilled, (state, action: PayloadAction<ILoginSuccessResponce>) => {
        state.status = "succeeded";
        state.error = "";
        state.data = action.payload;
        sessionStorage.setItem("token", action.payload.data.accessToken);
      }).addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message;
      });
  },
});

export const { resetUser } = postSlice.actions;

export default postSlice.reducer;
