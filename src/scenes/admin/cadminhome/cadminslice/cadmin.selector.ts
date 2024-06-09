import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";


export const clientadmin = (state: RootState) => state.clientadmin;

export const dashboard = createSelector(clientadmin, (state) => {
  return state.dashboard;
});

export const dashboarddata = createSelector(clientadmin, (state) => {
    return state.data;
  });

export const loading = createSelector(clientadmin, (state) => {
  return state.status;
});

export const message = createSelector(clientadmin, (state) => {
  return state.message;
});