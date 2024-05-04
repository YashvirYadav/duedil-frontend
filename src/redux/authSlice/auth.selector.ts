import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export const user = (state: RootState) => state.user;

export const loading = createSelector(user, (state) => {
  return state.status;
});
