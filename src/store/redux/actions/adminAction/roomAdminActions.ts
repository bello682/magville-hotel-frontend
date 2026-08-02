// src/store/redux/actions/adminAction/roomAdminActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { RoomFormValues } from "@/app/(admin)/admin/rooms/RoomFormModal";
import { NewCategoryFormValues } from "@/app/(admin)/admin/rooms/CreateCategoryModal";
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

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || error?.message || fallback;

// --- Categories ---
export const fetchCategories =
  () => async (dispatch: Dispatch<RoomAdminActionTypes>) => {
    dispatch({ type: CATEGORIES_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/rooms/categories");
      // Flatten _count.rooms into roomCount for the frontend type
      const categories = data.data.categories.map((c: any) => ({
        ...c,
        roomCount: c._count?.rooms ?? 0,
      }));
      dispatch({ type: CATEGORIES_LIST_SUCCESS, payload: categories });
    } catch (error: any) {
      dispatch({
        type: CATEGORIES_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch room categories"),
      });
    }
  };

export const createCategoryAdmin =
  (values: NewCategoryFormValues) =>
  async (dispatch: Dispatch<RoomAdminActionTypes>) => {
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    try {
      const { data } = await adminAxios.post("/rooms/categories", {
        name: values.name,
        description: values.description || undefined,
        basePrice: Number(values.basePrice),
        capacity: Number(values.capacity) || 2,
      });
      dispatch({
        type: CATEGORY_CREATE_SUCCESS,
        payload: { ...data.data.category, roomCount: 0 },
      });
      dispatch(fetchCategories() as any); // refresh list to be safe
    } catch (error: any) {
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload: getErrorMessage(error, "Failed to create category"),
      });
    }
  };

export const resetCategoryCreate = () => ({ type: CATEGORY_CREATE_RESET });

// --- Rooms List ---
export const fetchAdminRooms =
  (filters?: { status?: string; categoryId?: string }) =>
  async (dispatch: Dispatch<RoomAdminActionTypes>) => {
    dispatch({ type: ADMIN_ROOMS_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/rooms", { params: filters });
      dispatch({ type: ADMIN_ROOMS_LIST_SUCCESS, payload: data.data.rooms });
    } catch (error: any) {
      dispatch({
        type: ADMIN_ROOMS_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch rooms"),
      });
    }
  };

// --- Room Detail ---
export const fetchRoomById =
  (id: string) => async (dispatch: Dispatch<RoomAdminActionTypes>) => {
    dispatch({ type: ROOM_DETAIL_REQUEST });
    try {
      const { data } = await adminAxios.get(`/rooms/${id}`);
      dispatch({ type: ROOM_DETAIL_SUCCESS, payload: data.data.room });
    } catch (error: any) {
      dispatch({
        type: ROOM_DETAIL_FAIL,
        payload: getErrorMessage(error, "Failed to fetch room details"),
      });
    }
  };

export const clearRoomDetail = () => ({ type: ROOM_DETAIL_CLEAR });

// --- Create or Update Room (multipart/form-data for media uploads) ---
export const saveRoomAdmin =
  (values: RoomFormValues, editingRoomId: string | null) =>
  async (dispatch: Dispatch<RoomAdminActionTypes>) => {
    dispatch({ type: ROOM_SAVE_REQUEST });
    try {
      const formData = new FormData();
      formData.append("roomNumber", values.roomNumber);
      formData.append("categoryId", values.categoryId);
      formData.append("pricePerNight", values.pricePerNight);
      if (values.description)
        formData.append("description", values.description);
      formData.append("status", values.status);

      // Existing images/videos to KEEP (edit mode) — backend expects this as `existingImages`
      if (editingRoomId) {
        formData.append(
          "existingImages",
          JSON.stringify(values.existingImages),
        );
      }

      // Newly selected files — field name must be "images" to match req.files.images on backend
      values.newFiles.forEach((file) => {
        formData.append("images", file);
      });

      const url = editingRoomId ? `/rooms/${editingRoomId}` : "/rooms";
      const method = editingRoomId ? "patch" : "post";

      const { data } = await adminAxios.request({
        url,
        method,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch({ type: ROOM_SAVE_SUCCESS, payload: data.data.room });
      dispatch(fetchAdminRooms() as any); // refresh list
    } catch (error: any) {
      dispatch({
        type: ROOM_SAVE_FAIL,
        payload: getErrorMessage(error, "Failed to save room"),
      });
    }
  };

export const resetRoomSave = () => ({ type: ROOM_SAVE_RESET });
