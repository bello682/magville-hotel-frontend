// src/store/redux/types/adminTypes/staffTypes.ts
import { StaffMember } from "@/app/(admin)/types/staff";

export const STAFF_LIST_REQUEST = "STAFF_LIST_REQUEST";
export const STAFF_LIST_SUCCESS = "STAFF_LIST_SUCCESS";
export const STAFF_LIST_FAIL = "STAFF_LIST_FAIL";

export const STAFF_ROLE_UPDATE_REQUEST = "STAFF_ROLE_UPDATE_REQUEST";
export const STAFF_ROLE_UPDATE_SUCCESS = "STAFF_ROLE_UPDATE_SUCCESS";
export const STAFF_ROLE_UPDATE_FAIL = "STAFF_ROLE_UPDATE_FAIL";

export const STAFF_STATUS_UPDATE_REQUEST = "STAFF_STATUS_UPDATE_REQUEST";
export const STAFF_STATUS_UPDATE_SUCCESS = "STAFF_STATUS_UPDATE_SUCCESS";
export const STAFF_STATUS_UPDATE_FAIL = "STAFF_STATUS_UPDATE_FAIL";

interface ListRequest {
  type: typeof STAFF_LIST_REQUEST;
}
interface ListSuccess {
  type: typeof STAFF_LIST_SUCCESS;
  payload: StaffMember[];
}
interface ListFail {
  type: typeof STAFF_LIST_FAIL;
  payload: string;
}

interface RoleUpdateRequest {
  type: typeof STAFF_ROLE_UPDATE_REQUEST;
  payload: string;
}
interface RoleUpdateSuccess {
  type: typeof STAFF_ROLE_UPDATE_SUCCESS;
  payload: StaffMember;
}
interface RoleUpdateFail {
  type: typeof STAFF_ROLE_UPDATE_FAIL;
  payload: string;
}

interface StatusUpdateRequest {
  type: typeof STAFF_STATUS_UPDATE_REQUEST;
  payload: string;
}
interface StatusUpdateSuccess {
  type: typeof STAFF_STATUS_UPDATE_SUCCESS;
  payload: StaffMember;
}
interface StatusUpdateFail {
  type: typeof STAFF_STATUS_UPDATE_FAIL;
  payload: string;
}

export type StaffActionTypes =
  | ListRequest
  | ListSuccess
  | ListFail
  | RoleUpdateRequest
  | RoleUpdateSuccess
  | RoleUpdateFail
  | StatusUpdateRequest
  | StatusUpdateSuccess
  | StatusUpdateFail;
