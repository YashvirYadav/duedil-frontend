import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { service } from "../../../services/ApiServices";
import { IRegisterRequest, IUser, IUserDashboard } from "../authSlice/user.type";

interface ILoginSuccessResponce {
  data: IUser[] | null;
  dashboard: IUserDashboard ;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string;
}

const initialState: ILoginSuccessResponce = {
  data: null,
  status: "idle",
  error: null,
  message: "",
  dashboard: {
    needtoact: 0,
    invoiceWip: 0,
    invoiceCompleted: 0,
    invoiceRejected: 0,
  },
  
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
      const { email, username, password, status, role, userrole, mobile } =
        loginRequest;
      const responce = await service.postCall("users/registerByAdmin", {
        email,
        username,
        password,
        status,
        role,
        comapanyId: sessionStorage.getItem("companyId"),
        userrole,
        mobile,
      });
      return responce.data;
    } catch (error) {
      const err = error as ILoginSuccessResponce;
      return rejectWithValue(err);
    }
  }
);

//getUsersByCompanyId

export const getUsersByCompanyId = createAsyncThunk<
  ILoginSuccessResponce,
  string
>("auth/getUsersByCompanyId", async (id, { rejectWithValue }) => {
  try {
    const responce = await service.getCall(`users/getUsersByCompanyId/${id}`);
    return responce.data;
  } catch (error) {
    const err = error as ILoginSuccessResponce;
    return rejectWithValue(err);
  }
});
// delete user

export const deleteUser = createAsyncThunk<ILoginSuccessResponce, string>(
  "auth/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const responce = await service.deleteCall(`users/deleteUser/${id}`);
      return responce.data;
    } catch (error) {
      const err = error as ILoginSuccessResponce;
      return rejectWithValue(err);
    }
  }
);




// export const getuserDashbord = createAsyncThunk<ILoginSuccessResponce>(
//   "auth/getDashbord",
//   async (_,{ rejectWithValue }) => {
//     try {
//       const responce = await service.postCall(`users/userdashboard`,{
//         companyId: sessionStorage.getItem("companyId"),
//         userId: sessionStorage.getItem("userId")
//       });
//       return responce.data;
//     } catch (error) {
//       const err = error;
//       return rejectWithValue(err);
//     }
//   }

// );


export const getuserDashbord = createAsyncThunk<ILoginSuccessResponce>(
  "auth/getDashbord",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.postCall(`users/userdashboard`, {
        companyId: sessionStorage.getItem("companyId"),
        userId: sessionStorage.getItem("userId"),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<ILoginSuccessResponce>) => {
          state.status = "succeeded";
          state.error = "";
          state.data = action.payload.data;
        }
      )
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<ILoginSuccessResponce>) => {
          state.status = "succeeded";
          state.error = "";
          state.message = action.payload.message;
        }
      )
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload.message;
        state.error = action.payload as string;
      })
      .addCase(getUsersByCompanyId.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getUsersByCompanyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.data = action.payload.data;
      })
      .addCase(getUsersByCompanyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<ILoginSuccessResponce>) => {
          state.status = "succeeded";
          state.error = "";
          state.message = action.payload.message;
        }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getuserDashbord.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getuserDashbord.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.error = "";

        console.log("action.payload.dashboard", action.payload);
        state.dashboard = action.payload.data;
      })
      .addCase(getuserDashbord.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetUser } = userSliceByRoll.actions;
export default userSliceByRoll.reducer;
