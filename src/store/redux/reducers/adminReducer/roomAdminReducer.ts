// src/store/redux/reducers/roomAdminReducer.ts
import { Room, RoomCategory } from "@/app/(admin)/types/room";
import {
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS,
  CATEGORIES_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  ADMIN_ROOMS_LIST_REQUEST,
  ADMIN_ROOMS_LIST_SUCCESS,
  ADMIN_ROOMS_LIST_FAIL,
  ROOM_DETAIL_REQUEST,
  ROOM_DETAIL_SUCCESS,
  ROOM_DETAIL_FAIL,
  ROOM_DETAIL_CLEAR,
  ROOM_SAVE_REQUEST,
  ROOM_SAVE_SUCCESS,
  ROOM_SAVE_FAIL,
  ROOM_SAVE_RESET,
  RoomAdminActionTypes,
} from "../../types/adminTypes/roomAdminTypes";

interface RoomAdminState {
  categories: RoomCategory[];
  categoriesLoading: boolean;
  categoriesError: string | null;

  categoryCreateLoading: boolean;
  categoryCreateError: string | null;
  categoryCreateSuccess: boolean;

  rooms: Room[];
  roomsLoading: boolean;
  roomsError: string | null;

  detail: Room | null;
  detailLoading: boolean;
  detailError: string | null;

  saveLoading: boolean;
  saveError: string | null;
  saveSuccess: boolean;
}

const initialState: RoomAdminState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  categoryCreateLoading: false,
  categoryCreateError: null,
  categoryCreateSuccess: false,

  rooms: [],
  roomsLoading: false,
  roomsError: null,

  detail: null,
  detailLoading: false,
  detailError: null,

  saveLoading: false,
  saveError: null,
  saveSuccess: false,
};

export const roomAdminReducer = (
  state = initialState,
  action: RoomAdminActionTypes,
): RoomAdminState => {
  switch (action.type) {
    case CATEGORIES_LIST_REQUEST:
      return { ...state, categoriesLoading: true, categoriesError: null };
    case CATEGORIES_LIST_SUCCESS:
      return { ...state, categoriesLoading: false, categories: action.payload };
    case CATEGORIES_LIST_FAIL:
      return {
        ...state,
        categoriesLoading: false,
        categoriesError: action.payload,
      };

    case CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        categoryCreateLoading: true,
        categoryCreateError: null,
        categoryCreateSuccess: false,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        categoryCreateLoading: false,
        categoryCreateSuccess: true,
      };
    case CATEGORY_CREATE_FAIL:
      return {
        ...state,
        categoryCreateLoading: false,
        categoryCreateError: action.payload,
      };
    case CATEGORY_CREATE_RESET:
      return {
        ...state,
        categoryCreateSuccess: false,
        categoryCreateError: null,
      };

    case ADMIN_ROOMS_LIST_REQUEST:
      return { ...state, roomsLoading: true, roomsError: null };
    case ADMIN_ROOMS_LIST_SUCCESS:
      return { ...state, roomsLoading: false, rooms: action.payload };
    case ADMIN_ROOMS_LIST_FAIL:
      return { ...state, roomsLoading: false, roomsError: action.payload };

    case ROOM_DETAIL_REQUEST:
      return { ...state, detailLoading: true, detailError: null };
    case ROOM_DETAIL_SUCCESS:
      return { ...state, detailLoading: false, detail: action.payload };
    case ROOM_DETAIL_FAIL:
      return { ...state, detailLoading: false, detailError: action.payload };
    case ROOM_DETAIL_CLEAR:
      return { ...state, detail: null, detailError: null };

    case ROOM_SAVE_REQUEST:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case ROOM_SAVE_SUCCESS:
      return { ...state, saveLoading: false, saveSuccess: true };
    case ROOM_SAVE_FAIL:
      return { ...state, saveLoading: false, saveError: action.payload };
    case ROOM_SAVE_RESET:
      return { ...state, saveSuccess: false, saveError: null };

    default:
      return state;
  }
};
