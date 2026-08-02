// src/store/redux/types/roomAdminTypes.ts
import { Room, RoomCategory } from "@/app/(admin)/types/room";

// Categories
export const CATEGORIES_LIST_REQUEST = "CATEGORIES_LIST_REQUEST";
export const CATEGORIES_LIST_SUCCESS = "CATEGORIES_LIST_SUCCESS";
export const CATEGORIES_LIST_FAIL = "CATEGORIES_LIST_FAIL";

export const CATEGORY_CREATE_REQUEST = "CATEGORY_CREATE_REQUEST";
export const CATEGORY_CREATE_SUCCESS = "CATEGORY_CREATE_SUCCESS";
export const CATEGORY_CREATE_FAIL = "CATEGORY_CREATE_FAIL";
export const CATEGORY_CREATE_RESET = "CATEGORY_CREATE_RESET";

// Rooms
export const ADMIN_ROOMS_LIST_REQUEST = "ADMIN_ROOMS_LIST_REQUEST";
export const ADMIN_ROOMS_LIST_SUCCESS = "ADMIN_ROOMS_LIST_SUCCESS";
export const ADMIN_ROOMS_LIST_FAIL = "ADMIN_ROOMS_LIST_FAIL";

export const ROOM_DETAIL_REQUEST = "ROOM_DETAIL_REQUEST";
export const ROOM_DETAIL_SUCCESS = "ROOM_DETAIL_SUCCESS";
export const ROOM_DETAIL_FAIL = "ROOM_DETAIL_FAIL";
export const ROOM_DETAIL_CLEAR = "ROOM_DETAIL_CLEAR";

export const ROOM_SAVE_REQUEST = "ROOM_SAVE_REQUEST"; // covers both create & edit
export const ROOM_SAVE_SUCCESS = "ROOM_SAVE_SUCCESS";
export const ROOM_SAVE_FAIL = "ROOM_SAVE_FAIL";
export const ROOM_SAVE_RESET = "ROOM_SAVE_RESET";

interface CategoriesListRequest {
  type: typeof CATEGORIES_LIST_REQUEST;
}
interface CategoriesListSuccess {
  type: typeof CATEGORIES_LIST_SUCCESS;
  payload: RoomCategory[];
}
interface CategoriesListFail {
  type: typeof CATEGORIES_LIST_FAIL;
  payload: string;
}

interface CategoryCreateRequest {
  type: typeof CATEGORY_CREATE_REQUEST;
}
interface CategoryCreateSuccess {
  type: typeof CATEGORY_CREATE_SUCCESS;
  payload: RoomCategory;
}
interface CategoryCreateFail {
  type: typeof CATEGORY_CREATE_FAIL;
  payload: string;
}
interface CategoryCreateReset {
  type: typeof CATEGORY_CREATE_RESET;
}

interface RoomsListRequest {
  type: typeof ADMIN_ROOMS_LIST_REQUEST;
}
interface RoomsListSuccess {
  type: typeof ADMIN_ROOMS_LIST_SUCCESS;
  payload: Room[];
}
interface RoomsListFail {
  type: typeof ADMIN_ROOMS_LIST_FAIL;
  payload: string;
}

interface RoomDetailRequest {
  type: typeof ROOM_DETAIL_REQUEST;
}
interface RoomDetailSuccess {
  type: typeof ROOM_DETAIL_SUCCESS;
  payload: Room;
}
interface RoomDetailFail {
  type: typeof ROOM_DETAIL_FAIL;
  payload: string;
}
interface RoomDetailClear {
  type: typeof ROOM_DETAIL_CLEAR;
}

interface RoomSaveRequest {
  type: typeof ROOM_SAVE_REQUEST;
}
interface RoomSaveSuccess {
  type: typeof ROOM_SAVE_SUCCESS;
  payload: Room;
}
interface RoomSaveFail {
  type: typeof ROOM_SAVE_FAIL;
  payload: string;
}
interface RoomSaveReset {
  type: typeof ROOM_SAVE_RESET;
}

export type RoomAdminActionTypes =
  | CategoriesListRequest
  | CategoriesListSuccess
  | CategoriesListFail
  | CategoryCreateRequest
  | CategoryCreateSuccess
  | CategoryCreateFail
  | CategoryCreateReset
  | RoomsListRequest
  | RoomsListSuccess
  | RoomsListFail
  | RoomDetailRequest
  | RoomDetailSuccess
  | RoomDetailFail
  | RoomDetailClear
  | RoomSaveRequest
  | RoomSaveSuccess
  | RoomSaveFail
  | RoomSaveReset;
