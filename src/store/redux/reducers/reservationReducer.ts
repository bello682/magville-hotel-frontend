// // src/redux/reducers/reservationReducer.ts
// import * as types from "../types";

// interface ReservationState {
//   currentReservation: any | null;
//   bookingRef: string | null;
//   availabilityResult: {
//     available: boolean;
//     totalAvailable?: number;
//     availableRooms?: any[];
//   } | null;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// const initialState: ReservationState = {
//   currentReservation: null,
//   bookingRef: null,
//   availabilityResult: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// export const reservationReducer = (
//   state = initialState,
//   action: any,
// ): ReservationState => {
//   switch (action.type) {
//     case types.CHECK_AVAILABILITY_REQUEST:
//     case types.CREATE_RESERVATION_REQUEST:
//     case types.TRACK_RESERVATION_REQUEST:
//       return { ...state, loading: true, error: null, success: false };

//     case types.CHECK_AVAILABILITY_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         availabilityResult: action.payload,
//       };

//     case types.CREATE_RESERVATION_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         success: true,
//         bookingRef: action.payload.bookingRef,
//         currentReservation: action.payload.booking,
//       };

//     case types.TRACK_RESERVATION_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         currentReservation: action.payload,
//       };

//     case types.CHECK_AVAILABILITY_FAILURE:
//     case types.CREATE_RESERVATION_FAILURE:
//     case types.TRACK_RESERVATION_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         success: false,
//       };

//     case types.CLEAR_RESERVATION_STATE:
//       return initialState;

//     default:
//       return state;
//   }
// };

// src/redux/reducers/reservationReducer.ts

import * as types from "../types";

interface ReservationState {
  currentReservation: any | null;
  bookingRef: string | null;
  availabilityResult: {
    available: boolean;
    totalAvailable?: number;
    availableRooms?: any[];
  } | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ReservationState = {
  currentReservation: null,
  bookingRef: null,
  availabilityResult: null,
  loading: false,
  error: null,
  success: false,
};

export const reservationReducer = (
  state = initialState,
  action: any,
): ReservationState => {
  switch (action.type) {
    case types.CHECK_AVAILABILITY_REQUEST:
    case types.CREATE_RESERVATION_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    // Reset currentReservation when initiating a track request
    case types.TRACK_RESERVATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        currentReservation: null, // <-- Clears old search data immediately
      };

    case types.CHECK_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        availabilityResult: action.payload,
      };

    case types.CREATE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bookingRef: action.payload.bookingRef,
        currentReservation: action.payload.booking,
      };

    case types.TRACK_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentReservation: action.payload,
        error: null,
      };

    case types.CHECK_AVAILABILITY_FAILURE:
    case types.CREATE_RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    // Ensure tracking failure clears any previous reservation data
    case types.TRACK_RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        currentReservation: null, // <-- Guarantees no stale reservation displays on error
      };

    case types.CLEAR_RESERVATION_STATE:
      return initialState;

    default:
      return state;
  }
};
