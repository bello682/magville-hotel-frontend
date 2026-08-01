// src/store/redux/types/dashboardTypes.ts

export const DASHBOARD_OVERVIEW_REQUEST = "DASHBOARD_OVERVIEW_REQUEST";
export const DASHBOARD_OVERVIEW_SUCCESS = "DASHBOARD_OVERVIEW_SUCCESS";
export const DASHBOARD_OVERVIEW_FAIL = "DASHBOARD_OVERVIEW_FAIL";

export interface DashboardOverviewRequestAction {
  type: typeof DASHBOARD_OVERVIEW_REQUEST;
}

export interface DashboardOverviewSuccessAction {
  type: typeof DASHBOARD_OVERVIEW_SUCCESS;
  payload: import("@/app/(admin)/types/dashboard").DashboardOverviewResponse;
}

export interface DashboardOverviewFailAction {
  type: typeof DASHBOARD_OVERVIEW_FAIL;
  payload: string;
}

export type DashboardActionTypes =
  | DashboardOverviewRequestAction
  | DashboardOverviewSuccessAction
  | DashboardOverviewFailAction;
