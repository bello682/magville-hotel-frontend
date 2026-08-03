// src/store/redux/actions/adminAction/staffActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { StaffRole } from "@/app/(admin)/types/staff";
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

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || error?.message || fallback;

export const fetchStaff =
  () => async (dispatch: Dispatch<StaffActionTypes>) => {
    dispatch({ type: STAFF_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/staff");
      dispatch({ type: STAFF_LIST_SUCCESS, payload: data.data.staff });
    } catch (error: any) {
      dispatch({
        type: STAFF_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch staff"),
      });
    }
  };

export const updateStaffRoleAdmin =
  (id: string, role: StaffRole) =>
  async (dispatch: Dispatch<StaffActionTypes>) => {
    dispatch({ type: STAFF_ROLE_UPDATE_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(`/staff/${id}/role`, { role });
      dispatch({ type: STAFF_ROLE_UPDATE_SUCCESS, payload: data.data.staff });
    } catch (error: any) {
      dispatch({
        type: STAFF_ROLE_UPDATE_FAIL,
        payload: getErrorMessage(error, "Failed to update staff role"),
      });
    }
  };

export const updateStaffStatusAdmin =
  (id: string, isActive: boolean) =>
  async (dispatch: Dispatch<StaffActionTypes>) => {
    dispatch({ type: STAFF_STATUS_UPDATE_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(`/staff/${id}/status`, {
        isActive,
      });
      dispatch({ type: STAFF_STATUS_UPDATE_SUCCESS, payload: data.data.staff });
    } catch (error: any) {
      dispatch({
        type: STAFF_STATUS_UPDATE_FAIL,
        payload: getErrorMessage(error, "Failed to update staff status"),
      });
    }
  };
