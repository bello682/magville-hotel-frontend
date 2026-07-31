// src/redux/actions/publicAction.ts
import { Dispatch } from "redux";
import { api } from "../../services/api";
import * as types from "../types";

// Base API route prefix for public endpoints
const PUBLIC_ROOMS_URL = "/public/rooms";
const PUBLIC_BOOKINGS_URL = "/public/bookings";

// Interfaces aligned with backend Prisma Schema & Controllers
export interface CheckAvailabilityPayload {
  categoryId: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface ReservationPayload {
  fullName: string;
  email?: string;
  phone: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

// 🏷️ FETCH ROOM CATEGORIES
export const fetchRoomCategories = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.FETCH_ROOM_CATEGORIES_REQUEST });
  try {
    const response = await api.get(`${PUBLIC_ROOMS_URL}/categories`);
    dispatch({
      type: types.FETCH_ROOM_CATEGORIES_SUCCESS,
      payload: response.data.categories || response.data.data?.categories || [],
    });
  } catch (error: any) {
    dispatch({
      type: types.FETCH_ROOM_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch categories.",
    });
  }
};

// 🏨 FETCH ALL PUBLIC ROOMS
export const fetchPublicRooms = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.FETCH_ROOMS_REQUEST });
  try {
    const response = await api.get(PUBLIC_ROOMS_URL);
    dispatch({
      type: types.FETCH_ROOMS_SUCCESS,
      payload: response.data.rooms || response.data.data?.rooms || [],
    });
  } catch (error: any) {
    dispatch({
      type: types.FETCH_ROOMS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch rooms.",
    });
  }
};

// 🏨 FETCH SINGLE ROOM DETAILS
export const fetchRoomDetails =
  (roomId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: types.FETCH_ROOM_DETAILS_REQUEST });
    try {
      const response = await api.get(`${PUBLIC_ROOMS_URL}/${roomId}`);
      dispatch({
        type: types.FETCH_ROOM_DETAILS_SUCCESS,
        payload: response.data.room || response.data.data?.room,
      });
    } catch (error: any) {
      dispatch({
        type: types.FETCH_ROOM_DETAILS_FAILURE,
        payload:
          error.response?.data?.message || "Failed to fetch room details.",
      });
    }
  };

// 🔍 CHECK ROOM AVAILABILITY
export const checkRoomAvailability =
  (payload: CheckAvailabilityPayload) => async (dispatch: Dispatch) => {
    dispatch({ type: types.CHECK_AVAILABILITY_REQUEST });
    try {
      const response = await api.post(
        `${PUBLIC_BOOKINGS_URL}/check-availability`,
        payload,
      );
      dispatch({
        type: types.CHECK_AVAILABILITY_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to check availability.";
      dispatch({
        type: types.CHECK_AVAILABILITY_FAILURE,
        payload: errorMsg,
      });
      throw new Error(errorMsg);
    }
  };

// 📝 SUBMIT RESERVATION REQUEST
export const createReservation =
  (data: ReservationPayload) => async (dispatch: Dispatch) => {
    dispatch({ type: types.CREATE_RESERVATION_REQUEST });
    try {
      const response = await api.post(PUBLIC_BOOKINGS_URL, data);
      const createdBooking = response.data.data?.booking;

      dispatch({
        type: types.CREATE_RESERVATION_SUCCESS,
        payload: {
          booking: createdBooking,
          bookingRef: createdBooking?.bookingRef,
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Reservation request failed.";
      dispatch({
        type: types.CREATE_RESERVATION_FAILURE,
        payload: errorMsg,
      });
      throw new Error(errorMsg);
    }
  };

// 🔍 TRACK RESERVATION BY REFERENCE
export const trackReservation =
  (bookingRef: string) => async (dispatch: Dispatch) => {
    dispatch({ type: types.TRACK_RESERVATION_REQUEST });
    try {
      const formattedRef = bookingRef.trim().toUpperCase();
      const response = await api.get(
        `${PUBLIC_BOOKINGS_URL}/track/${formattedRef}`,
      );

      dispatch({
        type: types.TRACK_RESERVATION_SUCCESS,
        payload: response.data.data?.booking,
      });
    } catch (error: any) {
      dispatch({
        type: types.TRACK_RESERVATION_FAILURE,
        payload:
          error.response?.data?.message || "Booking reference not found.",
      });
    }
  };

// 🧹 CLEAR RESERVATION FORM / SUCCESS STATE
export const clearReservationState = () => ({
  type: types.CLEAR_RESERVATION_STATE,
});
