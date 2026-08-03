// src/store/redux/types/adminTypes/guestTypes.ts
import { GuestListItem, GuestProfile } from "@/app/(admin)/types/guest";

export const GUESTS_LIST_REQUEST = "GUESTS_LIST_REQUEST";
export const GUESTS_LIST_SUCCESS = "GUESTS_LIST_SUCCESS";
export const GUESTS_LIST_FAIL = "GUESTS_LIST_FAIL";

export const GUEST_DETAIL_REQUEST = "GUEST_DETAIL_REQUEST";
export const GUEST_DETAIL_SUCCESS = "GUEST_DETAIL_SUCCESS";
export const GUEST_DETAIL_FAIL = "GUEST_DETAIL_FAIL";
export const GUEST_DETAIL_CLEAR = "GUEST_DETAIL_CLEAR";

export const GUEST_UPDATE_REQUEST = "GUEST_UPDATE_REQUEST";
export const GUEST_UPDATE_SUCCESS = "GUEST_UPDATE_SUCCESS";
export const GUEST_UPDATE_FAIL = "GUEST_UPDATE_FAIL";

interface ListRequest {
  type: typeof GUESTS_LIST_REQUEST;
}
interface ListSuccess {
  type: typeof GUESTS_LIST_SUCCESS;
  payload: GuestListItem[];
}
interface ListFail {
  type: typeof GUESTS_LIST_FAIL;
  payload: string;
}

interface DetailRequest {
  type: typeof GUEST_DETAIL_REQUEST;
}
interface DetailSuccess {
  type: typeof GUEST_DETAIL_SUCCESS;
  payload: GuestProfile;
}
interface DetailFail {
  type: typeof GUEST_DETAIL_FAIL;
  payload: string;
}
interface DetailClear {
  type: typeof GUEST_DETAIL_CLEAR;
}

interface UpdateRequest {
  type: typeof GUEST_UPDATE_REQUEST;
  payload: string;
}
interface UpdateSuccess {
  type: typeof GUEST_UPDATE_SUCCESS;
  payload: GuestListItem;
}
interface UpdateFail {
  type: typeof GUEST_UPDATE_FAIL;
  payload: string;
}

export type GuestActionTypes =
  | ListRequest
  | ListSuccess
  | ListFail
  | DetailRequest
  | DetailSuccess
  | DetailFail
  | DetailClear
  | UpdateRequest
  | UpdateSuccess
  | UpdateFail;
