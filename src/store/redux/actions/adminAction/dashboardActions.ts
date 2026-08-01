// src/store/redux/actions/dashboardActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import {
  DASHBOARD_OVERVIEW_REQUEST,
  DASHBOARD_OVERVIEW_SUCCESS,
  DASHBOARD_OVERVIEW_FAIL,
  DashboardActionTypes,
} from "../../types/adminTypes/dashboardTypes";

export const fetchDashboardOverview =
  () => async (dispatch: Dispatch<DashboardActionTypes>) => {
    dispatch({ type: DASHBOARD_OVERVIEW_REQUEST });

    try {
      const { data } = await adminAxios.get("/dashboard/overview");

      dispatch({
        type: DASHBOARD_OVERVIEW_SUCCESS,
        payload: data.data,
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load dashboard overview";

      dispatch({
        type: DASHBOARD_OVERVIEW_FAIL,
        payload: message,
      });
    }
  };
