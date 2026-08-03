// src/store/redux/actions/adminAction/housekeepingActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { HousekeepingStatus } from "@/app/(admin)/types/housekeeping";
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

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || error?.message || fallback;

export const fetchHousekeepingBoard =
  () => async (dispatch: Dispatch<HousekeepingActionTypes>) => {
    dispatch({ type: HK_BOARD_REQUEST });
    try {
      const { data } = await adminAxios.get("/housekeeping/rooms");
      dispatch({ type: HK_BOARD_SUCCESS, payload: data.data.rooms });
    } catch (error: any) {
      dispatch({
        type: HK_BOARD_FAIL,
        payload: getErrorMessage(error, "Failed to fetch housekeeping board"),
      });
    }
  };

export const updateRoomHousekeepingStatus =
  (id: string, housekeepingStatus: HousekeepingStatus) =>
  async (dispatch: Dispatch<HousekeepingActionTypes>) => {
    dispatch({ type: HK_STATUS_UPDATE_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(`/housekeeping/rooms/${id}`, {
        housekeepingStatus,
      });
      dispatch({ type: HK_STATUS_UPDATE_SUCCESS, payload: data.data.room });
    } catch (error: any) {
      dispatch({
        type: HK_STATUS_UPDATE_FAIL,
        payload: getErrorMessage(error, "Failed to update status"),
      });
    }
  };

export const fetchMaintenanceRequests =
  (status?: string) => async (dispatch: Dispatch<HousekeepingActionTypes>) => {
    dispatch({ type: MAINT_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/housekeeping/maintenance", {
        params: status ? { status } : undefined,
      });
      dispatch({ type: MAINT_LIST_SUCCESS, payload: data.data.requests });
    } catch (error: any) {
      dispatch({
        type: MAINT_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch maintenance requests"),
      });
    }
  };

export const createMaintenanceRequestAdmin =
  (roomId: string, description: string) =>
  async (dispatch: Dispatch<HousekeepingActionTypes>) => {
    dispatch({ type: MAINT_CREATE_REQUEST });
    try {
      const { data } = await adminAxios.post("/housekeeping/maintenance", {
        roomId,
        description,
      });
      dispatch({ type: MAINT_CREATE_SUCCESS, payload: data.data.request });
      dispatch(fetchHousekeepingBoard() as any); // room flipped to OUT_OF_ORDER — refresh board
    } catch (error: any) {
      dispatch({
        type: MAINT_CREATE_FAIL,
        payload: getErrorMessage(error, "Failed to log maintenance request"),
      });
    }
  };

export const resetMaintenanceCreate = () => ({ type: MAINT_CREATE_RESET });

export const updateMaintenanceStatusAdmin =
  (id: string, status: "PENDING" | "IN_PROGRESS" | "RESOLVED") =>
  async (dispatch: Dispatch<HousekeepingActionTypes>) => {
    dispatch({ type: MAINT_UPDATE_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(
        `/housekeeping/maintenance/${id}`,
        { status },
      );
      dispatch({ type: MAINT_UPDATE_SUCCESS, payload: data.data.request });
      if (status === "RESOLVED") dispatch(fetchHousekeepingBoard() as any); // room may have flipped to DIRTY
    } catch (error: any) {
      dispatch({
        type: MAINT_UPDATE_FAIL,
        payload: getErrorMessage(error, "Failed to update request"),
      });
    }
  };
