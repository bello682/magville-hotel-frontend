// src/store/redux/actions/adminAction/settingsActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { HotelSettings } from "@/app/(admin)/types/settings";

export const fetchSettings = () => async (dispatch: Dispatch) => {
  dispatch({ type: "SETTINGS_REQUEST" });
  try {
    const { data } = await adminAxios.get("/settings");
    dispatch({ type: "SETTINGS_SUCCESS", payload: data.data.settings });
  } catch (error: any) {
    dispatch({
      type: "SETTINGS_FAIL",
      payload: error?.response?.data?.message || "Failed to load settings",
    });
  }
};

export const saveSettings =
  (updates: Partial<HotelSettings>) => async (dispatch: Dispatch) => {
    dispatch({ type: "SETTINGS_SAVE_REQUEST" });
    try {
      const { data } = await adminAxios.patch("/settings", updates);
      dispatch({ type: "SETTINGS_SAVE_SUCCESS", payload: data.data.settings });
    } catch (error: any) {
      dispatch({
        type: "SETTINGS_SAVE_FAIL",
        payload: error?.response?.data?.message || "Failed to save settings",
      });
    }
  };
