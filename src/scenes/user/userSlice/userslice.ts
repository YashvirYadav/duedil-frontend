import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { service } from "../../../services/ApiServices";
import { ILoginSuccessResponce, IRegisterRequest } from "../authSlice/user.type";
import { company } from "../../company/companyRedux/company.selector";


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


  // get all users
export const getAllUsers = createAsyncThunk<ILoginSuccessResponce>(
    "auth/getAllUsers",
    async (_, { rejectWithValue }) => {
      try {
        const responce = await service.getCall("users/getAllUsers");
        return responce.data;
      } catch (error) {
        const err = error as ILoginSuccessResponce;
        return rejectWithValue(err);
      }
    }
  );

// register user
export const register = createAsyncThunk<
ILoginSuccessResponce,
IRegisterRequest
>(
"auth/register",
async (loginRequest: IRegisterRequest, { rejectWithValue }) => {
  try {
    const { email, username, password, status, role } = loginRequest;
    const responce = await service.postCall("users/registerByAdmin", {
      email,
      username,
      password,
      status,
      role,
      comapanyId : sessionStorage.getItem("companyId")
    });
    return responce.data;
  } catch (error) {
    const err = error as ILoginSuccessResponce;
    return rejectWithValue(err);
  }
}
);

// create slice
export const userSliceByRoll = createSlice({
name: "userSliceByRoll",
initialState: initialState,
reducers: {
  resetUser: (state) => {
    state.data = null;
    state.status = "idle";
  },
},
extraReducers: (builder) => {
  builder
    .addCase(getAllUsers.pending, (state) => {
      state.status = "loading";
      state.error = "";
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.data = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    })
    .addCase(register.pending, (state) => {
      state.status = "loading";
      state.error = "";
    })
    .addCase(register.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.message = action.payload.message;
    })
    .addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.status = "failed";
      state.message = action.payload.message;
      state.error = action.payload as string;
    });
},
});

export const { resetUser } = userSliceByRoll.actions;
export default userSliceByRoll.reducer;