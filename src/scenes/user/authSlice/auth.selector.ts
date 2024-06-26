import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../../app/store";

export const user = (state: RootState) => state.user;

export const userrole = createSelector(user, (state) => {
  console.log("state => ", state.data);
  return state.data?.data.user.userrole;
  // Add null check using optional chaining operator
});

// all users
export const users = createSelector(user, (state) => {
  return state.data?.data;
});

export const loading = createSelector(user, (state) => {
  return state.status;
});

export const message = createSelector(user, (state) => {
  return state.message;
});
