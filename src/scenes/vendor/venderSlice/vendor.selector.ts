import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";


export const vendor = (state: RootState) => state.vendor;

export const vendorData = createSelector(vendor, (state) => {
  return state.data;
});

export const loading = createSelector(vendor, (state) => {
  return state.status;
});

export const message = createSelector(vendor, (state) => {
  return state.message;
});