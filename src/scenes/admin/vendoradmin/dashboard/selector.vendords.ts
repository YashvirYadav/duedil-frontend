import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";


export const vendorDashboard = (state: RootState) => state.vendorDashboardSlice;

export const vendorDashboardData = createSelector(vendorDashboard, (state) => {
  return state.data;
});





export const loading = createSelector(vendorDashboard, (state) => {
  return state.status;
});

export const message = createSelector(vendorDashboard, (state) => {
  return state.message;
});