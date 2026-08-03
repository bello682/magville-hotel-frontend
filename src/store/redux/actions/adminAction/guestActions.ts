// src/store/redux/actions/adminAction/guestActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { GuestTag } from "@/app/(admin)/types/guest";
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

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || error?.message || fallback;

export const fetchGuests =
  (search?: string) => async (dispatch: Dispatch<GuestActionTypes>) => {
    dispatch({ type: GUESTS_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/guests", {
        params: search ? { search } : undefined,
      });
      dispatch({ type: GUESTS_LIST_SUCCESS, payload: data.data.guests });
    } catch (error: any) {
      dispatch({
        type: GUESTS_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch guests"),
      });
    }
  };

export const fetchGuestById =
  (id: string) => async (dispatch: Dispatch<GuestActionTypes>) => {
    dispatch({ type: GUEST_DETAIL_REQUEST });
    try {
      const { data } = await adminAxios.get(`/guests/${id}`);
      dispatch({ type: GUEST_DETAIL_SUCCESS, payload: data.data.guest });
    } catch (error: any) {
      dispatch({
        type: GUEST_DETAIL_FAIL,
        payload: getErrorMessage(error, "Failed to fetch guest"),
      });
    }
  };

export const clearGuestDetail = () => ({ type: GUEST_DETAIL_CLEAR });

export const updateGuestAdmin =
  (id: string, updates: { tag?: GuestTag; notes?: string }) =>
  async (dispatch: Dispatch<GuestActionTypes>) => {
    dispatch({ type: GUEST_UPDATE_REQUEST, payload: id });
    try {
      const { data } = await adminAxios.patch(`/guests/${id}`, updates);
      dispatch({ type: GUEST_UPDATE_SUCCESS, payload: data.data.guest });
    } catch (error: any) {
      dispatch({
        type: GUEST_UPDATE_FAIL,
        payload: getErrorMessage(error, "Failed to update guest"),
      });
    }
  };
