// src/store/redux/actions/adminAction/paymentActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { RecordPaymentFormValues } from "@/app/(admin)/admin/payments/RecordPaymentModal";
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
  OUTSTANDING_REQUEST,
  OUTSTANDING_SUCCESS,
  OUTSTANDING_FAIL,
} from "../../types/adminTypes/paymentTypes";

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || error?.message || fallback;

export const fetchAllPayments =
  (method?: string) => async (dispatch: Dispatch<PaymentActionTypes>) => {
    dispatch({ type: PAYMENTS_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/payments", {
        params: method ? { method } : undefined,
      });
      dispatch({
        type: PAYMENTS_LIST_SUCCESS,
        payload: {
          payments: data.data.payments,
          totalRevenue: data.data.totalRevenue,
        },
      });
    } catch (error: any) {
      dispatch({
        type: PAYMENTS_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch payments"),
      });
    }
  };

export const recordPaymentAdmin =
  (values: RecordPaymentFormValues, bookingRef: string, guestName: string) =>
  async (dispatch: Dispatch<PaymentActionTypes>) => {
    dispatch({ type: PAYMENT_CREATE_REQUEST });
    try {
      const { data } = await adminAxios.post("/payments", {
        bookingId: values.bookingId,
        amount: Number(values.amount),
        method: values.method,
        transactionRef: values.transactionRef || undefined,
      });
      dispatch({
        type: PAYMENT_CREATE_SUCCESS,
        payload: {
          ...data.data.payment,

          balanceRemaining: data.data.bookingSummary.balanceRemaining,
        },
      });
      dispatch(fetchAllPayments() as any); // refresh list + totalRevenue
    } catch (error: any) {
      dispatch({
        type: PAYMENT_CREATE_FAIL,
        payload: getErrorMessage(error, "Failed to record payment"),
      });
    }
  };

export const resetPaymentCreate = () => ({ type: PAYMENT_CREATE_RESET });

export const fetchPaymentsForBooking =
  (bookingId: string) => async (dispatch: Dispatch<PaymentActionTypes>) => {
    dispatch({ type: BOOKING_PAYMENTS_REQUEST });
    try {
      const { data } = await adminAxios.get(`/payments/booking/${bookingId}`);
      dispatch({
        type: BOOKING_PAYMENTS_SUCCESS,
        payload: {
          bookingRef: data.data.bookingRef,
          summary: data.data.summary,
          payments: data.data.payments,
        },
      });
    } catch (error: any) {
      dispatch({
        type: BOOKING_PAYMENTS_FAIL,
        payload: getErrorMessage(
          error,
          "Failed to fetch booking payment history",
        ),
      });
    }
  };

export const searchBookingsForPayment =
  (query: string) => async (dispatch: Dispatch<any>) => {
    if (query.trim().length < 2) {
      dispatch({ type: "PAYMENT_BOOKING_SEARCH_RESULTS", payload: [] });
      return;
    }
    try {
      const { data } = await adminAxios.get("/bookings");
      const filtered = data.data.bookings
        .filter((b: any) => b.status !== "CANCELLED" && b.status !== "REJECTED")
        .filter(
          (b: any) =>
            b.guestName.toLowerCase().includes(query.toLowerCase()) ||
            b.bookingRef.toLowerCase().includes(query.toLowerCase()),
        )
        .map((b: any) => {
          const totalPaid = (b.payments || []).reduce(
            (sum: number, p: any) => sum + p.amount,
            0,
          );
          return {
            id: b.id,
            bookingRef: b.bookingRef,
            guestName: b.guestName,
            totalAmount: b.totalAmount,
            totalPaid,
            balanceRemaining: b.totalAmount - totalPaid,
          };
        })
        .filter((b: any) => b.balanceRemaining > 0); // only show bookings that actually have a balance
      dispatch({ type: "PAYMENT_BOOKING_SEARCH_RESULTS", payload: filtered });
    } catch {
      dispatch({ type: "PAYMENT_BOOKING_SEARCH_RESULTS", payload: [] });
    }
  };

export const fetchOutstandingBalances =
  () => async (dispatch: Dispatch<PaymentActionTypes>) => {
    dispatch({ type: OUTSTANDING_REQUEST });
    try {
      const { data } = await adminAxios.get("/payments/outstanding");
      dispatch({
        type: OUTSTANDING_SUCCESS,
        payload: {
          bookings: data.data.bookings,
          totalOutstanding: data.data.totalOutstanding,
        },
      });
    } catch (error: any) {
      dispatch({
        type: OUTSTANDING_FAIL,
        payload:
          error?.response?.data?.message ||
          "Failed to fetch outstanding balances",
      });
    }
  };

export const clearBookingPayments = () => ({ type: BOOKING_PAYMENTS_CLEAR });
