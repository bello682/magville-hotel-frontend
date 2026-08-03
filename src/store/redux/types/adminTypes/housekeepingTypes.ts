// src/store/redux/types/adminTypes/housekeepingTypes.ts
import {
  HousekeepingRoom,
  MaintenanceRequestItem,
} from "@/app/(admin)/types/housekeeping";

export const HK_BOARD_REQUEST = "HK_BOARD_REQUEST";
export const HK_BOARD_SUCCESS = "HK_BOARD_SUCCESS";
export const HK_BOARD_FAIL = "HK_BOARD_FAIL";

export const HK_STATUS_UPDATE_REQUEST = "HK_STATUS_UPDATE_REQUEST";
export const HK_STATUS_UPDATE_SUCCESS = "HK_STATUS_UPDATE_SUCCESS";
export const HK_STATUS_UPDATE_FAIL = "HK_STATUS_UPDATE_FAIL";

export const MAINT_LIST_REQUEST = "MAINT_LIST_REQUEST";
export const MAINT_LIST_SUCCESS = "MAINT_LIST_SUCCESS";
export const MAINT_LIST_FAIL = "MAINT_LIST_FAIL";

export const MAINT_CREATE_REQUEST = "MAINT_CREATE_REQUEST";
export const MAINT_CREATE_SUCCESS = "MAINT_CREATE_SUCCESS";
export const MAINT_CREATE_FAIL = "MAINT_CREATE_FAIL";
export const MAINT_CREATE_RESET = "MAINT_CREATE_RESET";

export const MAINT_UPDATE_REQUEST = "MAINT_UPDATE_REQUEST";
export const MAINT_UPDATE_SUCCESS = "MAINT_UPDATE_SUCCESS";
export const MAINT_UPDATE_FAIL = "MAINT_UPDATE_FAIL";

interface BoardRequest {
  type: typeof HK_BOARD_REQUEST;
}
interface BoardSuccess {
  type: typeof HK_BOARD_SUCCESS;
  payload: HousekeepingRoom[];
}
interface BoardFail {
  type: typeof HK_BOARD_FAIL;
  payload: string;
}

interface StatusUpdateRequest {
  type: typeof HK_STATUS_UPDATE_REQUEST;
  payload: string;
}
interface StatusUpdateSuccess {
  type: typeof HK_STATUS_UPDATE_SUCCESS;
  payload: HousekeepingRoom;
}
interface StatusUpdateFail {
  type: typeof HK_STATUS_UPDATE_FAIL;
  payload: string;
}

interface MaintListRequest {
  type: typeof MAINT_LIST_REQUEST;
}
interface MaintListSuccess {
  type: typeof MAINT_LIST_SUCCESS;
  payload: MaintenanceRequestItem[];
}
interface MaintListFail {
  type: typeof MAINT_LIST_FAIL;
  payload: string;
}

interface MaintCreateRequest {
  type: typeof MAINT_CREATE_REQUEST;
}
interface MaintCreateSuccess {
  type: typeof MAINT_CREATE_SUCCESS;
  payload: MaintenanceRequestItem;
}
interface MaintCreateFail {
  type: typeof MAINT_CREATE_FAIL;
  payload: string;
}
interface MaintCreateReset {
  type: typeof MAINT_CREATE_RESET;
}

interface MaintUpdateRequest {
  type: typeof MAINT_UPDATE_REQUEST;
  payload: string;
}
interface MaintUpdateSuccess {
  type: typeof MAINT_UPDATE_SUCCESS;
  payload: MaintenanceRequestItem;
}
interface MaintUpdateFail {
  type: typeof MAINT_UPDATE_FAIL;
  payload: string;
}

export type HousekeepingActionTypes =
  | BoardRequest
  | BoardSuccess
  | BoardFail
  | StatusUpdateRequest
  | StatusUpdateSuccess
  | StatusUpdateFail
  | MaintListRequest
  | MaintListSuccess
  | MaintListFail
  | MaintCreateRequest
  | MaintCreateSuccess
  | MaintCreateFail
  | MaintCreateReset
  | MaintUpdateRequest
  | MaintUpdateSuccess
  | MaintUpdateFail;
