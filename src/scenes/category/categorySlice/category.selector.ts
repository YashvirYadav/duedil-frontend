import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ICategory } from "./type.category";

export const category = (state: RootState) => state.category;

export const categoryData = createSelector(category, (state) => {
  console.log("state => ", state);
  return state.data as ICategory[] | [];
});

export const loading = createSelector(category, (state) => {
  return state.status;
});

export const message = createSelector(category, (state) => {
  return state.message;
});