// src/store/redux/reducers/dashboardReducer.ts
import { DashboardOverviewResponse } from "@/app/(admin)/types/dashboard";
import {
  DASHBOARD_OVERVIEW_REQUEST,
  DASHBOARD_OVERVIEW_SUCCESS,
  DASHBOARD_OVERVIEW_FAIL,
  DashboardActionTypes,
} from "../../types/adminTypes/dashboardTypes";

interface DashboardState {
  loading: boolean;
  data: DashboardOverviewResponse | null;
  error: string | null;
}

const initialState: DashboardState = {
  loading: false,
  data: null,
  error: null,
};

export const dashboardReducer = (
  state = initialState,
  action: DashboardActionTypes,
): DashboardState => {
  switch (action.type) {
    case DASHBOARD_OVERVIEW_REQUEST:
      return { ...state, loading: true, error: null };
    case DASHBOARD_OVERVIEW_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DASHBOARD_OVERVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
