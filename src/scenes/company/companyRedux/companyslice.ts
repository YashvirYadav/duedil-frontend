import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRegisterCompanyResponce } from "./company.type";
import { service } from "../../../services/ApiServices";

const initialState: IRegisterCompanyResponce = {
  statusCode: 0,
  status: "idle",
  data: [],
  message: "",
  success: false,
  error: null,
};

// get Company by id
export const getCompanyById = createAsyncThunk<
  IRegisterCompanyResponce,
  string
>("get/companyById", async (id, { rejectWithValue }) => {
  try {
    console.log("id id id id => ", id);
    const response = await service.getCall("company/getcompanyByid/" + id);
    return response.data;
  } catch (error) {
    const err = error as IRegisterCompanyResponce;
    return rejectWithValue(err);
  }
});

export const registerCompany = createAsyncThunk<
  IRegisterCompanyResponce,
  FormData
>("register/company", async (formdata, { rejectWithValue }) => {
  try {
    const responce = await service.postCallBlob(
      "company/registercompany",
      formdata
    );
    return responce.data;
  } catch (error) {
    const err = error as IRegisterCompanyResponce;
    return rejectWithValue(err);
  }
});
export interface IUpdateCompany {
  id: string;
}

// update company status
export const updateCompanyStatus = createAsyncThunk<
  IRegisterCompanyResponce,
  IUpdateCompany
>("update/company", async (data, { rejectWithValue }) => {
  try {
    const id = data.id;
    const response = await service.putCall("company/updatecompanystatus/" + id);
    return response.data;
  } catch (error) {
    const err = error as IRegisterCompanyResponce;
    return rejectWithValue(err);
  }
});

// delete company
export const deleteCompany = createAsyncThunk<
  IRegisterCompanyResponce,
  IUpdateCompany
>("delete/company", async (data, { rejectWithValue }) => {
  try {
    const id = data.id;
    const response = await service.deleteCall("company/deletecompany/" + id);
    return response.data;
  } catch (error) {
    const err = error as IRegisterCompanyResponce;
    return rejectWithValue(err);
  }
});

export const getCompany = createAsyncThunk<IRegisterCompanyResponce>(
  "get/company",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getCall("company/getallcompany");
      console.log(response.data as IRegisterCompanyResponce);
      return response.data;
    } catch (error) {
      const err = error as IRegisterCompanyResponce;
      return rejectWithValue(err);
    }
  }
);

//editcompany
export const editCompany = createAsyncThunk<
  IRegisterCompanyResponce,
  { id: string; formData: FormData }
>("edit/company", async (data, { rejectWithValue }) => {
  try {
    const response = await service.putCallBlob(
      "company/editcompany/" + data.id,
      data.formData
    );
    return response.data;
  } catch (error) {
    const err = error as IRegisterCompanyResponce;
    return rejectWithValue(err);
  }
});

const companyPostSlice = createSlice({
  name: "companyPost",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.data = [];
      state.status = "idle";
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
          state.message = action.payload.message;
        }
      )
      .addCase(
        registerCompany.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload.response.data.message;
        }
      )
      .addCase(getCompany.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        getCompany.fulfilled,
        (state, action: PayloadAction<IRegisterCompanyResponce>) => {
          state.status = "succeeded";
          state.error = "";
          state.data = action.payload.data;
        }
      )
      .addCase(getCompany.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message;
      })
      .addCase(updateCompanyStatus.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        updateCompanyStatus.fulfilled,
        (state, action: PayloadAction<IRegisterCompanyResponce>) => {
          state.status = "succeeded";
          state.error = "";
          state.data = action.payload.data;
          state.message = action.payload.message;
        }
      )
      .addCase(
        updateCompanyStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload.response.data.message;
        }
      )
      .addCase(deleteCompany.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        deleteCompany.fulfilled,
        (state, action: PayloadAction<IRegisterCompanyResponce>) => {
          state.status = "succeeded";
          state.error = "";
          state.data = action.payload.data;
          state.message = action.payload.message;
        }
      )
      .addCase(deleteCompany.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message;
      })
      .addCase(getCompanyById.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        getCompanyById.fulfilled,
        (state, action: PayloadAction<IRegisterCompanyResponce>) => {
          state.status = "succeeded";
          state.error = "";

          console.log("action.payload.data => ", action.payload);
          state.data = action.payload.data;
          state.message = action.payload.message;
        }
      )
      .addCase(getCompanyById.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = "error";
      });
  },
});

export default companyPostSlice.reducer;
