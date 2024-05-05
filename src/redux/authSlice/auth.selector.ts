import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export const user = (state: RootState) => state.user;

export const userrole = createSelector(user, (state) => {
  console.log("state => ", state.data);
  return state.data?.data.user.userrole;
  // Add null check using optional chaining operator
});

export const loading = createSelector(user, (state) => {
  return state.status;
});
