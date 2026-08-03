// src/store/redux/reducers/guestReducer.ts
import { GuestListItem, GuestProfile } from "@/app/(admin)/types/guest";
import {
  GUESTS_LIST_REQUEST,
  GUESTS_LIST_SUCCESS,
  GUESTS_LIST_FAIL,
  GUEST_DETAIL_REQUEST,
  GUEST_DETAIL_SUCCESS,
  GUEST_DETAIL_FAIL,
  GUEST_DETAIL_CLEAR,
  GUEST_UPDATE_REQUEST,
  GUEST_UPDATE_SUCCESS,
  GUEST_UPDATE_FAIL,
  GuestActionTypes,
} from "../../types/adminTypes/guestTypes";

interface GuestState {
  list: GuestListItem[];
  listLoading: boolean;
  listError: string | null;
  detail: GuestProfile | null;
  detailLoading: boolean;
  detailError: string | null;
  actionLoadingId: string | null;
  actionError: string | null;
}

const initialState: GuestState = {
  list: [],
  listLoading: false,
  listError: null,
  detail: null,
  detailLoading: false,
  detailError: null,
  actionLoadingId: null,
  actionError: null,
};

export const guestReducer = (
  state = initialState,
  action: GuestActionTypes,
): GuestState => {
  switch (action.type) {
    case GUESTS_LIST_REQUEST:
      return { ...state, listLoading: true, listError: null };
    case GUESTS_LIST_SUCCESS:
      return { ...state, listLoading: false, list: action.payload };
    case GUESTS_LIST_FAIL:
      return { ...state, listLoading: false, listError: action.payload };

    case GUEST_DETAIL_REQUEST:
      return { ...state, detailLoading: true, detailError: null };
    case GUEST_DETAIL_SUCCESS:
      return { ...state, detailLoading: false, detail: action.payload };
    case GUEST_DETAIL_FAIL:
      return { ...state, detailLoading: false, detailError: action.payload };
    case GUEST_DETAIL_CLEAR:
      return { ...state, detail: null };

    case GUEST_UPDATE_REQUEST:
      return { ...state, actionLoadingId: action.payload, actionError: null };
    case GUEST_UPDATE_SUCCESS:
      return {
        ...state,
        actionLoadingId: null,
        list: state.list.map((g) =>
          g.id === action.payload.id ? { ...g, ...action.payload } : g,
        ),
      };
    case GUEST_UPDATE_FAIL:
      return { ...state, actionLoadingId: null, actionError: action.payload };

    default:
      return state;
  }
};
