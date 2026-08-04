// src/store/redux/reducers/reportsReducer.ts
interface ReportsState {
  revenueTrend: { date: string; revenue: number }[];
  occupancyTrend: { date: string; occupancyRate: number }[];
  metrics: any | null;
  loading: boolean;
  error: string | null;
}
const initialState: ReportsState = {
  revenueTrend: [],
  occupancyTrend: [],
  metrics: null,
  loading: false,
  error: null,
};

export const reportsReducer = (
  state = initialState,
  action: any,
): ReportsState => {
  switch (action.type) {
    case "REVENUE_TREND_REQUEST":
    case "OCCUPANCY_TREND_REQUEST":
    case "KEY_METRICS_REQUEST":
      return { ...state, loading: true, error: null };
    case "REVENUE_TREND_SUCCESS":
      return { ...state, loading: false, revenueTrend: action.payload };
    case "OCCUPANCY_TREND_SUCCESS":
      return { ...state, loading: false, occupancyTrend: action.payload };
    case "KEY_METRICS_SUCCESS":
      return { ...state, loading: false, metrics: action.payload };
    case "REVENUE_TREND_FAIL":
    case "OCCUPANCY_TREND_FAIL":
    case "KEY_METRICS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
