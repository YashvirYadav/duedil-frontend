// add

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory, IRegisterCategoryResponce } from "./type.category";
import { service } from "../../../services/ApiServices";

const initialState: IRegisterCategoryResponce = {
  statusCode: 0,
  status: "idle",
  data: null,
  message: "",
  success: false,
  error: null,
};

//
export const registerCategory = createAsyncThunk<
  IRegisterCategoryResponce,
  ICategory
>("register/category", async (category, { rejectWithValue }) => {
  try {
    const { _id, ...rest } = category;
    const response = await service.postCall(
      "category/registercategory",
      rest
    );
    return response.data;
  } catch (error) {
    const err = error as IRegisterCategoryResponce;
    return rejectWithValue(err);
  }
});

export interface IUpdateCategory {
  id: string;
}

// update category status
export const updateCategoryStatus = createAsyncThunk<
  IRegisterCategoryResponce,
  IUpdateCategory
>("update/category", async (data, { rejectWithValue }) => {
  try {
    const id = data.id;
    const response = await service.putCall(
      "category/updatecategorystatus/" + id
    );
    return response.data;
  } catch (error) {
    const err = error as IRegisterCategoryResponce;
    return rejectWithValue(err);
  }
});

// delete category
export const deleteCategory = createAsyncThunk<
  IRegisterCategoryResponce,
  {id: string}
>("delete/category", async (data, { rejectWithValue }) => {
  try {
    const id = data.id;
    const response = await service.deleteCall("category/deletecategory/" + id);
    return response.data;
  } catch (error) {
    const err = error as IRegisterCategoryResponce;
    return rejectWithValue(err);
  }
});

export const getCategory = createAsyncThunk<IRegisterCategoryResponce>(
  "get/category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getCall("category/getallcategory");
      return response.data;
    } catch (error) {
      const err = error as IRegisterCategoryResponce;
      return rejectWithValue(err);
    }
  }
);

export const getCategoryById = createAsyncThunk<
  IRegisterCategoryResponce,
  IUpdateCategory
>("get/categorybyid", async (data, { rejectWithValue }) => {
  try {
    const id = data.id;
    const response = await service.getCall("category/getcategorybyid/" + id);
    return response.data;
  } catch (error) {
    const err = error as IRegisterCategoryResponce;
    return rejectWithValue(err);
  }
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategory: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCategory.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(registerCategory.fulfilled, (state, action: PayloadAction<IRegisterCategoryResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(registerCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message || "Something went wrong";
      })
      //getCategory
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
        state.error = "";
      }).addCase(getCategory.fulfilled, (state, action: PayloadAction<IRegisterCategoryResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      }).addCase(getCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message || "Something went wrong";

      }).addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
        state.error = "";
      }).addCase(deleteCategory.fulfilled, (state, action: PayloadAction<IRegisterCategoryResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      }).addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message || "Something went wrong";
      }).addCase(updateCategoryStatus.pending, (state) => {
        state.status = "loading";
        state.error = "";
      }).addCase(updateCategoryStatus.fulfilled, (state, action: PayloadAction<IRegisterCategoryResponce>) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      }).addCase(updateCategoryStatus.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message || "Something went wrong";
      }).addCase(getCategoryById.pending, (state) => {}).addCase(getCategoryById.fulfilled, (state, action: PayloadAction<IRegisterCategoryResponce>) => {
        state.data = action.payload.data;
      }).addCase(getCategoryById.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.response.data.message || "Something went wrong";
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetCategory } = categorySlice.actions;
export default categorySlice.reducer;

