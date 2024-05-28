import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { IWorkflow } from "./workflow.type";


export const workflow = (state: RootState) => state.workflow;

export const workflowData = createSelector(workflow, (state) => {
  console.log("state => ", state);
  return state.data as IWorkflow[] | [];
});

export const loading = createSelector(workflow, (state) => {
  return state.status;
});

export const message = createSelector(workflow, (state) => {
  return state.message;
});