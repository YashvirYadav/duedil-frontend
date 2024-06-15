import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export const poslice = (state: RootState) => state.poslice;

export const getvenderName = createSelector(poslice, (state) => {
  return state.vendor;
});

export const loading = createSelector(poslice, (state) => {
  return state.status;
});

export const message = createSelector(poslice, (state) => {
  return state.message;
});
