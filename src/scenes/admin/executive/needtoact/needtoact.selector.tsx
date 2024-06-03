import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";


export const needtoact = (state: RootState) => state.needtoact;

export const invoiceData = createSelector(needtoact, (state) => {
  return state.data;
});

export const currentInvoice = createSelector(needtoact, (state) => {
  return state.currentInvoice;
});

export const loading = createSelector(needtoact, (state) => {
  return state.status;
});

export const message = createSelector(needtoact, (state) => {
  return state.message;
});