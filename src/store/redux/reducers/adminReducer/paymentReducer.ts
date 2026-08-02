// src/store/redux/reducers/paymentReducer.ts
import { OutstandingBooking, Payment } from "@/app/(admin)/types/payment";
import {
  PAYMENTS_LIST_REQUEST,
  PAYMENTS_LIST_SUCCESS,
  PAYMENTS_LIST_FAIL,
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
  PAYMENT_CREATE_RESET,
  BOOKING_PAYMENTS_REQUEST,
  BOOKING_PAYMENTS_SUCCESS,
  BOOKING_PAYMENTS_FAIL,
  BOOKING_PAYMENTS_CLEAR,
  PaymentActionTypes,
  OUTSTANDING_REQUEST, // 🆕
  OUTSTANDING_SUCCESS, // 🆕
  OUTSTANDING_FAIL, // 🆕
} from "../../types/adminTypes/paymentTypes";

interface PaymentState {
  payments: Payment[];
  totalRevenue: number;
  listLoading: boolean;
  listError: string | null;

  lastRecordedPayment:
    | (Payment & {
        bookingRef?: string;
        guestName?: string;
        balanceRemaining?: number;
      })
    | null;

  createLoading: boolean;
  createError: string | null;
  createSuccess: boolean;

  outstanding: OutstandingBooking[];
  outstandingTotal: number;
  outstandingLoading: boolean;
  outstandingError: string | null;

  bookingHistory: {
    bookingRef: string;
    summary: {
      totalAmount: number;
      totalPaid: number;
      balanceRemaining: number;
      paymentStatus: string;
    };
    payments: Payment[];
  } | null;
  bookingHistoryLoading: boolean;
  bookingHistoryError: string | null;
}

const initialState: PaymentState = {
  payments: [],
  totalRevenue: 0,
  listLoading: false,
  listError: null,

  lastRecordedPayment: null,

  outstanding: [],
  outstandingTotal: 0,
  outstandingLoading: false,
  outstandingError: null,

  createLoading: false,
  createError: null,
  createSuccess: false,

  bookingHistory: null,
  bookingHistoryLoading: false,
  bookingHistoryError: null,
};

export const paymentReducer = (
  state = initialState,
  action: PaymentActionTypes,
): PaymentState => {
  switch (action.type) {
    case PAYMENTS_LIST_REQUEST:
      return { ...state, listLoading: true, listError: null };
    case PAYMENTS_LIST_SUCCESS:
      return {
        ...state,
        listLoading: false,
        payments: action.payload.payments,
        totalRevenue: action.payload.totalRevenue,
      };
    case PAYMENTS_LIST_FAIL:
      return { ...state, listLoading: false, listError: action.payload };

    case PAYMENT_CREATE_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createSuccess: false,
      };

    case PAYMENT_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        lastRecordedPayment: action.payload,
      };
    case PAYMENT_CREATE_FAIL:
      return { ...state, createLoading: false, createError: action.payload };
    case PAYMENT_CREATE_RESET:
      return { ...state, createSuccess: false, createError: null };

    case BOOKING_PAYMENTS_REQUEST:
      return {
        ...state,
        bookingHistoryLoading: true,
        bookingHistoryError: null,
      };
    case BOOKING_PAYMENTS_SUCCESS:
      return {
        ...state,
        bookingHistoryLoading: false,
        bookingHistory: action.payload,
      };
    case BOOKING_PAYMENTS_FAIL:
      return {
        ...state,
        bookingHistoryLoading: false,
        bookingHistoryError: action.payload,
      };
    case BOOKING_PAYMENTS_CLEAR:
      return { ...state, bookingHistory: null, bookingHistoryError: null };

    case OUTSTANDING_REQUEST:
      return { ...state, outstandingLoading: true, outstandingError: null };
    case OUTSTANDING_SUCCESS:
      return {
        ...state,
        outstandingLoading: false,
        outstanding: action.payload.bookings,
        outstandingTotal: action.payload.totalOutstanding,
      };
    case OUTSTANDING_FAIL:
      return {
        ...state,
        outstandingLoading: false,
        outstandingError: action.payload,
      };

    default:
      return state;
  }
};
