import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const company = (state: RootState) => state.company;

export const companyData = createSelector(company, (state) => {
  return state.data;
});

export const loading = createSelector(company, (state) => {
  return state.status;
});