// src/store/redux/actions/adminAction/reportsActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";

export const fetchRevenueTrend =
  (period: string) => async (dispatch: Dispatch) => {
    dispatch({ type: "REVENUE_TREND_REQUEST" });
    try {
      const { data } = await adminAxios.get("/reports/revenue", {
        params: { period },
      });
      dispatch({ type: "REVENUE_TREND_SUCCESS", payload: data.data.trend });
    } catch (error: any) {
      dispatch({
        type: "REVENUE_TREND_FAIL",
        payload:
          error?.response?.data?.message || "Failed to load revenue trend",
      });
    }
  };

export const fetchOccupancyTrend =
  (period: string) => async (dispatch: Dispatch) => {
    dispatch({ type: "OCCUPANCY_TREND_REQUEST" });
    try {
      const { data } = await adminAxios.get("/reports/occupancy", {
        params: { period },
      });
      dispatch({ type: "OCCUPANCY_TREND_SUCCESS", payload: data.data.trend });
    } catch (error: any) {
      dispatch({
        type: "OCCUPANCY_TREND_FAIL",
        payload:
          error?.response?.data?.message || "Failed to load occupancy trend",
      });
    }
  };

export const fetchKeyMetrics =
  (period: string) => async (dispatch: Dispatch) => {
    dispatch({ type: "KEY_METRICS_REQUEST" });
    try {
      const { data } = await adminAxios.get("/reports/metrics", {
        params: { period },
      });
      dispatch({ type: "KEY_METRICS_SUCCESS", payload: data.data });
    } catch (error: any) {
      dispatch({
        type: "KEY_METRICS_FAIL",
        payload: error?.response?.data?.message || "Failed to load metrics",
      });
    }
  };
