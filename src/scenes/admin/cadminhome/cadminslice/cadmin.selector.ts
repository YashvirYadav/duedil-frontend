import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";


export const clientadmin = (state: RootState) => state.clientadmin;

export const dashboard = createSelector(clientadmin, (state) => {
  return state.dashboard;
});

export const invoice = createSelector(clientadmin, (state) => {
  return state.data;
}
);

export const dashboarddataSLA = createSelector(clientadmin, (state) => {
    return state.sla;
  });

export const chartdata = createSelector(clientadmin, (state) => {

    return state.chartdata;
  });  

export const loading = createSelector(clientadmin, (state) => {
  return state.status;
});

export const message = createSelector(clientadmin, (state) => {
  return state.message;
});