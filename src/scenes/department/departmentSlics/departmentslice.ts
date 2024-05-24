import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDepartment, IRegisterDepartmentResponce } from "./type.department";
import { service } from "../../../services/ApiServices";


const initialState: IRegisterDepartmentResponce = {
    statusCode: 0,
    status: "idle",
    data: [],
    message: "",
    success: false,
    error: null,
  };

  export const registerDepartment = createAsyncThunk<IRegisterDepartmentResponce,IDepartment>(
    "department/registerDepartment",
    async (data: IDepartment, { rejectWithValue }) => {
      try {
        const responce = await service.postCall(
            "department/registerdepartment",
            data
          );
          return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  //getdepartmentByid/:id

  export const getDepartmentById = createAsyncThunk<IRegisterDepartmentResponce,string>(
    "department/getDepartmentById",
    async (id: string, { rejectWithValue }) => {
      try {
        const responce = await service.getCall(`department/getdepartmentByid/${id}`);
        return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  //updatedeparmentStatus

  export const updateDepartmentStatus = createAsyncThunk<IRegisterDepartmentResponce,string>(
    "department/updateDepartmentStatus",
    async (id: string, { rejectWithValue }) => {
      try {
        const responce = await service.putCall(`department/updatedeparmentStatus/${id}`);
        return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


  export const getAllDepartment = createAsyncThunk<IRegisterDepartmentResponce>(
    "department/getAllDepartment",
    async (_, { rejectWithValue }) => {
      try {
        const responce = await service.getCall("department/getdepartments");
        return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder.addCase(registerDepartment.pending, (state) => {
        state.status = "loading";
      });
      builder.addCase(registerDepartment.fulfilled, (state, action: PayloadAction<IRegisterDepartmentResponce>) => {
        state.status = "succeeded";
        state.statusCode = action.payload.statusCode;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      });
      builder.addCase(registerDepartment.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload.message;
       
      }).addCase(getAllDepartment.pending, (state) => {
        state.status = "loading";
      }).addCase(getAllDepartment.fulfilled, (state, action: PayloadAction<IRegisterDepartmentResponce>) => {
        state.status = "succeeded";
        state.statusCode = action.payload.statusCode;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      }).addCase(getAllDepartment.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload.message;

      }).addCase(getDepartmentById.pending, (state) => {
        state.status = "loading";
      }).addCase(getDepartmentById.fulfilled, (state, action: PayloadAction<IRegisterDepartmentResponce>) => {
        state.status = "succeeded";
        state.statusCode = action.payload.statusCode;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      }).addCase(getDepartmentById.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload.message;
      }).addCase(updateDepartmentStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDepartmentStatus.fulfilled, (state, action: PayloadAction<IRegisterDepartmentResponce>) => {
        state.status = "succeeded";
        state.statusCode = action.payload.statusCode;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(updateDepartmentStatus.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload.message;
      });
    },
  })

    export default departmentSlice.reducer;