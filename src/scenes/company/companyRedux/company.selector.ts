import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { categoryData } from "../../category/categorySlice/category.selector";

export const company = (state: RootState) => state.company;

export const companyData = createSelector(company, (state) => {
  return state.data;
});



export const companyDataById = (id: string) => createSelector(companyData, (companydata) => {
  return companydata?.find((item) =>  item._id === id);
});

export const getratecard = (id: string) => createSelector(companyData, categoryData, (companydata, category) => {
  console.log("id => ", id);

  const comapny = companydata?.find((item) =>  item._id === id);

  console.log("filter => ", comapny?.category);

  return comapny?.category || [];
});

export const loading = createSelector(company, (state) => {
  return state.status;
});

export const message = createSelector(company, (state) => {
  return state.message;
});