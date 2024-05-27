import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { IRole } from "./role.type";


export const role = (state: RootState) => state.role;

export const roleData = createSelector(role, (state) => {
  console.log("state => ", state);
  return state.data as IRole[] | [];
});

export const loading = createSelector(role, (state) => {
  return state.status;
});

export const message = createSelector(role, (state) => {
  return state.message;
});