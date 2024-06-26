import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";


export const invoice = (state: RootState) => state.invoice;

export const invoiceData = createSelector(invoice, (state) => {
  return state.data;
});

export const ocrData = createSelector(invoice, (state) => {
  return state.OCR;
}
);


export const invoiceDataById = (id: string) => createSelector(invoiceData, (invoicedata) => {
  return invoicedata?.find((item) =>  item._id === id);
});


export const loading = createSelector(invoice, (state) => {
  return state.status;
});

export const message = createSelector(invoice, (state) => {
  return state.message;
});