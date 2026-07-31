// src/redux/reducers/roomReducer.ts
import * as types from "../types";

interface RoomState {
  categories: any[];
  rooms: any[];
  selectedRoom: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  categories: [],
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
};

export const roomReducer = (state = initialState, action: any): RoomState => {
  switch (action.type) {
    case types.FETCH_ROOM_CATEGORIES_REQUEST:
    case types.FETCH_ROOMS_REQUEST:
    case types.FETCH_ROOM_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_ROOM_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case types.FETCH_ROOMS_SUCCESS:
      return { ...state, loading: false, rooms: action.payload };

    case types.FETCH_ROOM_DETAILS_SUCCESS:
      return { ...state, loading: false, selectedRoom: action.payload };

    case types.FETCH_ROOM_CATEGORIES_FAILURE:
    case types.FETCH_ROOMS_FAILURE:
    case types.FETCH_ROOM_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
