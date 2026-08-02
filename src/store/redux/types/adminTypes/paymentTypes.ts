// src/store/redux/types/paymentTypes.ts
import { OutstandingBooking, Payment } from "@/app/(admin)/types/payment";

export const PAYMENTS_LIST_REQUEST = "PAYMENTS_LIST_REQUEST";
export const PAYMENTS_LIST_SUCCESS = "PAYMENTS_LIST_SUCCESS";
export const PAYMENTS_LIST_FAIL = "PAYMENTS_LIST_FAIL";

export const PAYMENT_CREATE_REQUEST = "PAYMENT_CREATE_REQUEST";
export const PAYMENT_CREATE_SUCCESS = "PAYMENT_CREATE_SUCCESS";
export const PAYMENT_CREATE_FAIL = "PAYMENT_CREATE_FAIL";
export const PAYMENT_CREATE_RESET = "PAYMENT_CREATE_RESET";

export const BOOKING_PAYMENTS_REQUEST = "BOOKING_PAYMENTS_REQUEST";
export const BOOKING_PAYMENTS_SUCCESS = "BOOKING_PAYMENTS_SUCCESS";
export const BOOKING_PAYMENTS_FAIL = "BOOKING_PAYMENTS_FAIL";
export const BOOKING_PAYMENTS_CLEAR = "BOOKING_PAYMENTS_CLEAR";

export const OUTSTANDING_REQUEST = "OUTSTANDING_REQUEST";
export const OUTSTANDING_SUCCESS = "OUTSTANDING_SUCCESS";
export const OUTSTANDING_FAIL = "OUTSTANDING_FAIL";

interface ListRequest {
  type: typeof PAYMENTS_LIST_REQUEST;
}
interface ListSuccess {
  type: typeof PAYMENTS_LIST_SUCCESS;
  payload: { payments: Payment[]; totalRevenue: number };
}
interface ListFail {
  type: typeof PAYMENTS_LIST_FAIL;
  payload: string;
}

interface CreateRequest {
  type: typeof PAYMENT_CREATE_REQUEST;
}
interface CreateSuccess {
  type: typeof PAYMENT_CREATE_SUCCESS;
  payload: Payment;
}
interface CreateFail {
  type: typeof PAYMENT_CREATE_FAIL;
  payload: string;
}
interface CreateReset {
  type: typeof PAYMENT_CREATE_RESET;
}

interface BookingPaymentsRequest {
  type: typeof BOOKING_PAYMENTS_REQUEST;
}
interface BookingPaymentsSuccess {
  type: typeof BOOKING_PAYMENTS_SUCCESS;
  payload: {
    bookingRef: string;
    summary: {
      totalAmount: number;
      totalPaid: number;
      balanceRemaining: number;
      paymentStatus: string;
    };
    payments: Payment[];
  };
}
interface BookingPaymentsFail {
  type: typeof BOOKING_PAYMENTS_FAIL;
  payload: string;
}
interface BookingPaymentsClear {
  type: typeof BOOKING_PAYMENTS_CLEAR;
}

interface OutstandingRequest {
  type: typeof OUTSTANDING_REQUEST;
}
interface OutstandingSuccess {
  type: typeof OUTSTANDING_SUCCESS;
  payload: { bookings: OutstandingBooking[]; totalOutstanding: number };
}
interface OutstandingFail {
  type: typeof OUTSTANDING_FAIL;
  payload: string;
}

export type PaymentActionTypes =
  | ListRequest
  | ListSuccess
  | ListFail
  | CreateRequest
  | CreateSuccess
  | CreateFail
  | CreateReset
  | BookingPaymentsRequest
  | BookingPaymentsSuccess
  | BookingPaymentsFail
  | BookingPaymentsClear
  | OutstandingRequest
  | OutstandingSuccess
  | OutstandingFail;
