import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { IDepartment } from "./type.department";


export const depatment = (state: RootState) => state.depatment;

export const depatmentData = createSelector(depatment, (state) => {
  console.log("state => ", state);
  return state.data as IDepartment[] | [];
});

export const loading = createSelector(depatment, (state) => {
  return state.status;
});

export const message = createSelector(depatment, (state) => {
  return state.message;
});