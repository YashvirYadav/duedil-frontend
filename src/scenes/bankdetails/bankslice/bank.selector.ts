import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { IBank } from "./bank.type";


export const bank = (state: RootState) => state.bank;

export const bankData = createSelector(bank, (state) => {
  return state.data as IBank[] | [];
});

export const loading = createSelector(bank, (state) => {
  return state.status;
});

export const message = createSelector(bank, (state) => {
  return state.message;
});