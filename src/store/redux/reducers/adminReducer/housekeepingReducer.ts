// src/store/redux/reducers/housekeepingReducer.ts
import {
  HousekeepingRoom,
  MaintenanceRequestItem,
} from "@/app/(admin)/types/housekeeping";
import {
  HK_BOARD_REQUEST,
  HK_BOARD_SUCCESS,
  HK_BOARD_FAIL,
  HK_STATUS_UPDATE_REQUEST,
  HK_STATUS_UPDATE_SUCCESS,
  HK_STATUS_UPDATE_FAIL,
  MAINT_LIST_REQUEST,
  MAINT_LIST_SUCCESS,
  MAINT_LIST_FAIL,
  MAINT_CREATE_REQUEST,
  MAINT_CREATE_SUCCESS,
  MAINT_CREATE_FAIL,
  MAINT_CREATE_RESET,
  MAINT_UPDATE_REQUEST,
  MAINT_UPDATE_SUCCESS,
  MAINT_UPDATE_FAIL,
  HousekeepingActionTypes,
} from "../../types/adminTypes/housekeepingTypes";

interface HousekeepingState {
  board: HousekeepingRoom[];
  boardLoading: boolean;
  boardError: string | null;
  roomActionLoadingId: string | null;

  requests: MaintenanceRequestItem[];
  requestsLoading: boolean;
  requestsError: string | null;

  createLoading: boolean;
  createError: string | null;
  createSuccess: boolean;

  requestActionLoadingId: string | null;
}

const initialState: HousekeepingState = {
  board: [],
  boardLoading: false,
  boardError: null,
  roomActionLoadingId: null,
  requests: [],
  requestsLoading: false,
  requestsError: null,
  createLoading: false,
  createError: null,
  createSuccess: false,
  requestActionLoadingId: null,
};

const replaceRoom = (list: HousekeepingRoom[], updated: HousekeepingRoom) =>
  list.map((r) => (r.id === updated.id ? { ...r, ...updated } : r));

const replaceRequest = (
  list: MaintenanceRequestItem[],
  updated: MaintenanceRequestItem,
) => list.map((r) => (r.id === updated.id ? updated : r));

export const housekeepingReducer = (
  state = initialState,
  action: HousekeepingActionTypes,
): HousekeepingState => {
  switch (action.type) {
    case HK_BOARD_REQUEST:
      return { ...state, boardLoading: true, boardError: null };
    case HK_BOARD_SUCCESS:
      return { ...state, boardLoading: false, board: action.payload };
    case HK_BOARD_FAIL:
      return { ...state, boardLoading: false, boardError: action.payload };

    case HK_STATUS_UPDATE_REQUEST:
      return { ...state, roomActionLoadingId: action.payload };
    case HK_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        roomActionLoadingId: null,
        board: replaceRoom(state.board, action.payload),
      };
    case HK_STATUS_UPDATE_FAIL:
      return { ...state, roomActionLoadingId: null };

    case MAINT_LIST_REQUEST:
      return { ...state, requestsLoading: true, requestsError: null };
    case MAINT_LIST_SUCCESS:
      return { ...state, requestsLoading: false, requests: action.payload };
    case MAINT_LIST_FAIL:
      return {
        ...state,
        requestsLoading: false,
        requestsError: action.payload,
      };

    case MAINT_CREATE_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createSuccess: false,
      };
    case MAINT_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        requests: [action.payload, ...state.requests],
      };
    case MAINT_CREATE_FAIL:
      return { ...state, createLoading: false, createError: action.payload };
    case MAINT_CREATE_RESET:
      return { ...state, createSuccess: false, createError: null };

    case MAINT_UPDATE_REQUEST:
      return { ...state, requestActionLoadingId: action.payload };
    case MAINT_UPDATE_SUCCESS:
      return {
        ...state,
        requestActionLoadingId: null,
        requests: replaceRequest(state.requests, action.payload),
      };
    case MAINT_UPDATE_FAIL:
      return { ...state, requestActionLoadingId: null };

    default:
      return state;
  }
};
