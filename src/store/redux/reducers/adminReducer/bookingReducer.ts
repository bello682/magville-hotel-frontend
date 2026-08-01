// src/store/redux/reducers/bookingReducer.ts
import { Booking } from "@/app/(admin)/types/booking";
import {
  BOOKINGS_LIST_REQUEST,
  BOOKINGS_LIST_SUCCESS,
  BOOKINGS_LIST_FAIL,
  BOOKING_DETAIL_REQUEST,
  BOOKING_DETAIL_SUCCESS,
  BOOKING_DETAIL_FAIL,
  BOOKING_DETAIL_CLEAR,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_RESET,
  BOOKING_STATUS_UPDATE_REQUEST,
  BOOKING_STATUS_UPDATE_SUCCESS,
  BOOKING_STATUS_UPDATE_FAIL,
  BOOKING_CHECKIN_REQUEST,
  BOOKING_CHECKIN_SUCCESS,
  BOOKING_CHECKIN_FAIL,
  BOOKING_CHECKOUT_REQUEST,
  BOOKING_CHECKOUT_SUCCESS,
  BOOKING_CHECKOUT_FAIL,
  BookingActionTypes,
} from "../../types/adminTypes/bookingTypes";

interface BookingState {
  list: Booking[];
  listLoading: boolean;
  listError: string | null;

  detail: Booking | null;
  detailLoading: boolean;
  detailError: string | null;

  createLoading: boolean;
  createError: string | null;
  createSuccess: boolean;

  // Tracks which specific booking id is mid-action, so only that row shows a spinner
  actionLoadingId: string | null;
  actionError: string | null;
}

const initialState: BookingState = {
  list: [],
  listLoading: false,
  listError: null,

  detail: null,
  detailLoading: false,
  detailError: null,

  createLoading: false,
  createError: null,
  createSuccess: false,

  actionLoadingId: null,
  actionError: null,
};

// Helper: replace one booking inside the list after an action succeeds,
// so the table updates instantly without needing a full refetch
const replaceInList = (list: Booking[], updated: Booking): Booking[] =>
  list.map((b) => (b.id === updated.id ? updated : b));

export const bookingReducer = (
  state = initialState,
  action: BookingActionTypes,
): BookingState => {
  switch (action.type) {
    case BOOKINGS_LIST_REQUEST:
      return { ...state, listLoading: true, listError: null };
    case BOOKINGS_LIST_SUCCESS:
      return { ...state, listLoading: false, list: action.payload };
    case BOOKINGS_LIST_FAIL:
      return { ...state, listLoading: false, listError: action.payload };

    case BOOKING_DETAIL_REQUEST:
      return { ...state, detailLoading: true, detailError: null };
    case BOOKING_DETAIL_SUCCESS:
      return { ...state, detailLoading: false, detail: action.payload };
    case BOOKING_DETAIL_FAIL:
      return { ...state, detailLoading: false, detailError: action.payload };
    case BOOKING_DETAIL_CLEAR:
      return { ...state, detail: null, detailError: null };

    case BOOKING_CREATE_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createSuccess: false,
      };
    case BOOKING_CREATE_SUCCESS:
      return { ...state, createLoading: false, createSuccess: true };
    case BOOKING_CREATE_FAIL:
      return { ...state, createLoading: false, createError: action.payload };
    case BOOKING_CREATE_RESET:
      return { ...state, createSuccess: false, createError: null };

    case BOOKING_STATUS_UPDATE_REQUEST:
      return { ...state, actionLoadingId: action.payload, actionError: null };
    case BOOKING_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        actionLoadingId: null,
        list: replaceInList(state.list, action.payload),
        detail:
          state.detail?.id === action.payload.id
            ? action.payload
            : state.detail,
      };
    case BOOKING_STATUS_UPDATE_FAIL:
      return { ...state, actionLoadingId: null, actionError: action.payload };

    case BOOKING_CHECKIN_REQUEST:
      return { ...state, actionLoadingId: action.payload, actionError: null };
    case BOOKING_CHECKIN_SUCCESS:
      return {
        ...state,
        actionLoadingId: null,
        list: replaceInList(state.list, action.payload),
        detail:
          state.detail?.id === action.payload.id
            ? action.payload
            : state.detail,
      };
    case BOOKING_CHECKIN_FAIL:
      return { ...state, actionLoadingId: null, actionError: action.payload };

    case BOOKING_CHECKOUT_REQUEST:
      return { ...state, actionLoadingId: action.payload, actionError: null };
    case BOOKING_CHECKOUT_SUCCESS:
      return {
        ...state,
        actionLoadingId: null,
        list: replaceInList(state.list, action.payload),
        detail:
          state.detail?.id === action.payload.id
            ? action.payload
            : state.detail,
      };
    case BOOKING_CHECKOUT_FAIL:
      return { ...state, actionLoadingId: null, actionError: action.payload };

    default:
      return state;
  }
};
