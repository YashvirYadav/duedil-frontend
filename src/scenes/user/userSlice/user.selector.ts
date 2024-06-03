import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export const userRoll = (state: RootState) => state.userbyrole;

export const userDashborde = createSelector(userRoll, (state) => {
  return state.dashboard;
})

export const userData = createSelector(userRoll, (state) => {
  return state.data;
});

export const loading = createSelector(userRoll, (state) => {
  return state.status;
});

export const message = createSelector(userRoll, (state) => {
  return state.message;
});