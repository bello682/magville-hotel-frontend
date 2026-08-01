// src/store/redux/types/bookingTypes.ts
import { Booking } from "@/app/(admin)/types/booking";

// Fetch all bookings
export const BOOKINGS_LIST_REQUEST = "BOOKINGS_LIST_REQUEST";
export const BOOKINGS_LIST_SUCCESS = "BOOKINGS_LIST_SUCCESS";
export const BOOKINGS_LIST_FAIL = "BOOKINGS_LIST_FAIL";

// Fetch single booking
export const BOOKING_DETAIL_REQUEST = "BOOKING_DETAIL_REQUEST";
export const BOOKING_DETAIL_SUCCESS = "BOOKING_DETAIL_SUCCESS";
export const BOOKING_DETAIL_FAIL = "BOOKING_DETAIL_FAIL";
export const BOOKING_DETAIL_CLEAR = "BOOKING_DETAIL_CLEAR";

// Create booking (admin on behalf of guest)
export const BOOKING_CREATE_REQUEST = "BOOKING_CREATE_REQUEST";
export const BOOKING_CREATE_SUCCESS = "BOOKING_CREATE_SUCCESS";
export const BOOKING_CREATE_FAIL = "BOOKING_CREATE_FAIL";
export const BOOKING_CREATE_RESET = "BOOKING_CREATE_RESET";

// Approve / Reject / Cancel (status update)
export const BOOKING_STATUS_UPDATE_REQUEST = "BOOKING_STATUS_UPDATE_REQUEST";
export const BOOKING_STATUS_UPDATE_SUCCESS = "BOOKING_STATUS_UPDATE_SUCCESS";
export const BOOKING_STATUS_UPDATE_FAIL = "BOOKING_STATUS_UPDATE_FAIL";

// Check-in / Check-out
export const BOOKING_CHECKIN_REQUEST = "BOOKING_CHECKIN_REQUEST";
export const BOOKING_CHECKIN_SUCCESS = "BOOKING_CHECKIN_SUCCESS";
export const BOOKING_CHECKIN_FAIL = "BOOKING_CHECKIN_FAIL";

export const BOOKING_CHECKOUT_REQUEST = "BOOKING_CHECKOUT_REQUEST";
export const BOOKING_CHECKOUT_SUCCESS = "BOOKING_CHECKOUT_SUCCESS";
export const BOOKING_CHECKOUT_FAIL = "BOOKING_CHECKOUT_FAIL";

// --- Action interfaces ---
interface ListRequest {
  type: typeof BOOKINGS_LIST_REQUEST;
}
interface ListSuccess {
  type: typeof BOOKINGS_LIST_SUCCESS;
  payload: Booking[];
}
interface ListFail {
  type: typeof BOOKINGS_LIST_FAIL;
  payload: string;
}

interface DetailRequest {
  type: typeof BOOKING_DETAIL_REQUEST;
}
interface DetailSuccess {
  type: typeof BOOKING_DETAIL_SUCCESS;
  payload: Booking;
}
interface DetailFail {
  type: typeof BOOKING_DETAIL_FAIL;
  payload: string;
}
interface DetailClear {
  type: typeof BOOKING_DETAIL_CLEAR;
}

interface CreateRequest {
  type: typeof BOOKING_CREATE_REQUEST;
}
interface CreateSuccess {
  type: typeof BOOKING_CREATE_SUCCESS;
  payload: Booking;
}
interface CreateFail {
  type: typeof BOOKING_CREATE_FAIL;
  payload: string;
}
interface CreateReset {
  type: typeof BOOKING_CREATE_RESET;
}

interface StatusUpdateRequest {
  type: typeof BOOKING_STATUS_UPDATE_REQUEST;
  payload: string;
}
interface StatusUpdateSuccess {
  type: typeof BOOKING_STATUS_UPDATE_SUCCESS;
  payload: Booking;
}
interface StatusUpdateFail {
  type: typeof BOOKING_STATUS_UPDATE_FAIL;
  payload: string;
}

interface CheckInRequest {
  type: typeof BOOKING_CHECKIN_REQUEST;
  payload: string;
}
interface CheckInSuccess {
  type: typeof BOOKING_CHECKIN_SUCCESS;
  payload: Booking;
}
interface CheckInFail {
  type: typeof BOOKING_CHECKIN_FAIL;
  payload: string;
}

interface CheckOutRequest {
  type: typeof BOOKING_CHECKOUT_REQUEST;
  payload: string;
}
interface CheckOutSuccess {
  type: typeof BOOKING_CHECKOUT_SUCCESS;
  payload: Booking;
}
interface CheckOutFail {
  type: typeof BOOKING_CHECKOUT_FAIL;
  payload: string;
}

export type BookingActionTypes =
  | ListRequest
  | ListSuccess
  | ListFail
  | DetailRequest
  | DetailSuccess
  | DetailFail
  | DetailClear
  | CreateRequest
  | CreateSuccess
  | CreateFail
  | CreateReset
  | StatusUpdateRequest
  | StatusUpdateSuccess
  | StatusUpdateFail
  | CheckInRequest
  | CheckInSuccess
  | CheckInFail
  | CheckOutRequest
  | CheckOutSuccess
  | CheckOutFail;
