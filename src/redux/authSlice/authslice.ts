import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginSuccessResponce } from "./user.type";
import { service } from "../../services/ApiServices";

export const login = createAsyncThunk<
  ILoginSuccessResponce,
  ILoginRequest
>("auth/login", async (loginRequest: ILoginRequest, thunkAPI) => {
  try {
    console.log("loginRequest",loginRequest)
    const { email, password } = loginRequest;
    const responce = await service.postCall("users/login", {
      email: email,
      password: password,
    });
    return responce.data;
  } catch (error) {
    return "error";
  }
});

interface InitialState {
  data: ILoginSuccessResponce | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  data: null,
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
        }
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export default postSlice.reducer


