// src/store/redux/reducers/staffReducer.ts
import { StaffMember } from "@/app/(admin)/types/staff";
import {
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_LIST_FAIL,
  STAFF_ROLE_UPDATE_REQUEST,
  STAFF_ROLE_UPDATE_SUCCESS,
  STAFF_ROLE_UPDATE_FAIL,
  STAFF_STATUS_UPDATE_REQUEST,
  STAFF_STATUS_UPDATE_SUCCESS,
  STAFF_STATUS_UPDATE_FAIL,
  StaffActionTypes,
} from "../../types/adminTypes/staffTypes";

interface StaffState {
  list: StaffMember[];
  listLoading: boolean;
  listError: string | null;
  actionLoadingId: string | null;
  actionError: string | null;
}

const initialState: StaffState = {
  list: [],
  listLoading: false,
  listError: null,
  actionLoadingId: null,
  actionError: null,
};

const replaceInList = (
  list: StaffMember[],
  updated: StaffMember,
): StaffMember[] => list.map((s) => (s.id === updated.id ? updated : s));

export const staffReducer = (
  state = initialState,
  action: StaffActionTypes,
): StaffState => {
  switch (action.type) {
    case STAFF_LIST_REQUEST:
      return { ...state, listLoading: true, listError: null };
    case STAFF_LIST_SUCCESS:
      return { ...state, listLoading: false, list: action.payload };
    case STAFF_LIST_FAIL:
      return { ...state, listLoading: false, listError: action.payload };

    case STAFF_ROLE_UPDATE_REQUEST:
      return { ...state, actionLoadingId: action.payload, actionError: null };
    case STAFF_ROLE_UPDATE_SUCCESS:
      return {
        ...state,
        actionLoadingId: null,
        list: replaceInList(state.list, action.payload),
      };
    case STAFF_ROLE_UPDATE_FAIL:
      return { ...state, actionLoadingId: null, actionError: action.payload };

    case STAFF_STATUS_UPDATE_REQUEST:
      return { ...state, actionLoadingId: action.payload, actionError: null };
    case STAFF_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        actionLoadingId: null,
        list: replaceInList(state.list, action.payload),
      };
    case STAFF_STATUS_UPDATE_FAIL:
      return { ...state, actionLoadingId: null, actionError: action.payload };

    default:
      return state;
  }
};
