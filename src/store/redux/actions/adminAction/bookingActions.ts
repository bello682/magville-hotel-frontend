// src/store/redux/actions/adminAction/bookingActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { NewBookingFormValues } from "@/app/(admin)/admin/bookings/NewBookingModal";
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

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || error?.message || fallback;

// --- Fetch all bookings (optional status/roomId filters) ---
export const fetchAllBookings =
  (filters?: { status?: string; roomId?: string }) =>
  async (dispatch: Dispatch<BookingActionTypes>) => {
    dispatch({ type: BOOKINGS_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/bookings", { params: filters });
      dispatch({ type: BOOKINGS_LIST_SUCCESS, payload: data.data.bookings });
    } catch (error: any) {
      dispatch({
        type: BOOKINGS_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch bookings"),
      });
    }
  };

// --- Fetch single booking by ID ---
export const fetchBookingById =
  (id: string) => async (dispatch: Dispatch<BookingActionTypes>) => {
    dispatch({ type: BOOKING_DETAIL_REQUEST });
    try {
      const { data } = await adminAxios.get(`/bookings/${id}`);
      dispatch({ type: BOOKING_DETAIL_SUCCESS, payload: data.data.booking });
    } catch (error: any) {
      dispatch({
        type: BOOKING_DETAIL_FAIL,
        payload: getErrorMessage(error, "Failed to fetch booking details"),
      });
    }
  };

export const clearBookingDetail = () => ({ type: BOOKING_DETAIL_CLEAR });

// --- Create booking on behalf of guest ---
export const createBookingAdmin =
  (values: NewBookingFormValues) =>
  async (dispatch: Dispatch<BookingActionTypes>) => {
    dispatch({ type: BOOKING_CREATE_REQUEST });
    try {
      const payload = {
        roomId: values.roomId,
        guestName: values.guestName,
        guestEmail: values.guestEmail || undefined,
        guestPhone: values.guestPhone,
        idType: values.idType,
        idNumber: values.idNumber,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
        notes: values.notes || undefined,
        isDirectCheckIn: values.isDirectCheckIn,
      };
      const { data } = await adminAxios.post("/bookings", payload);
      dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data.data.booking });
      // Refresh the list so the new booking appears immediately
      dispatch(fetchAllBookings() as any);
    } catch (error: any) {
      dispatch({
        type: BOOKING_CREATE_FAIL,
        payload: getErrorMessage(error, "Failed to create booking"),
      });
    }
  };

export const resetBookingCreate = () => ({ type: BOOKING_CREATE_RESET });

// --- Approve / Reject / Cancel ---
export const updateBookingStatus =
  (
    id: string,
    status: "APPROVED" | "REJECTED" | "CANCELLED",
    rejectionReason?: string,
  ) =>
  async (dispatch: Dispatch<BookingActionTypes>) => {
    dispatch({ type: BOOKING_STATUS_UPDATE_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(`/bookings/${id}/status`, {
        status,
        ...(rejectionReason && { rejectionReason }),
      });
      dispatch({
        type: BOOKING_STATUS_UPDATE_SUCCESS,
        payload: data.data.booking,
      });
    } catch (error: any) {
      dispatch({
        type: BOOKING_STATUS_UPDATE_FAIL,
        payload: getErrorMessage(error, "Failed to update booking status"),
      });
    }
  };

// --- Check-In ---
export const checkInBookingAdmin =
  (id: string) => async (dispatch: Dispatch<BookingActionTypes>) => {
    dispatch({ type: BOOKING_CHECKIN_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(`/bookings/${id}/check-in`);
      dispatch({ type: BOOKING_CHECKIN_SUCCESS, payload: data.data.booking });
    } catch (error: any) {
      dispatch({
        type: BOOKING_CHECKIN_FAIL,
        payload: getErrorMessage(error, "Failed to check in guest"),
      });
    }
  };

// --- Check-Out ---
export const checkOutBookingAdmin =
  (id: string) => async (dispatch: Dispatch<BookingActionTypes>) => {
    dispatch({ type: BOOKING_CHECKOUT_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(`/bookings/${id}/check-out`);
      dispatch({ type: BOOKING_CHECKOUT_SUCCESS, payload: data.data.booking });
    } catch (error: any) {
      dispatch({
        type: BOOKING_CHECKOUT_FAIL,
        payload: getErrorMessage(error, "Failed to check out guest"),
      });
    }
  };

// Add to bookingActions.ts (or a shared roomActions.ts if you prefer)
export const fetchRoomsForBookingLookup =
  () => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await adminAxios.get("/rooms", {
        params: { status: "AVAILABLE" },
      });
      dispatch({
        type: "ADMIN_ROOMS_LOOKUP_SUCCESS",
        payload: data.data.rooms,
      });
    } catch (error: any) {
      dispatch({
        type: "ADMIN_ROOMS_LOOKUP_FAIL",
        payload: getErrorMessage(error, "Failed to fetch rooms"),
      });
    }
  };
