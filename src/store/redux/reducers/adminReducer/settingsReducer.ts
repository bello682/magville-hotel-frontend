// src/store/redux/reducers/settingsReducer.ts
import { HotelSettings } from "@/app/(admin)/types/settings";

interface SettingsState {
  settings: HotelSettings | null;
  loading: boolean;
  error: string | null;
  saveLoading: boolean;
  saveError: string | null;
}
const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
  saveLoading: false,
  saveError: null,
};

export const settingsReducer = (
  state = initialState,
  action: any,
): SettingsState => {
  switch (action.type) {
    case "SETTINGS_REQUEST":
      return { ...state, loading: true, error: null };
    case "SETTINGS_SUCCESS":
      return { ...state, loading: false, settings: action.payload };
    case "SETTINGS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SETTINGS_SAVE_REQUEST":
      return { ...state, saveLoading: true, saveError: null };
    case "SETTINGS_SAVE_SUCCESS":
      return { ...state, saveLoading: false, settings: action.payload };
    case "SETTINGS_SAVE_FAIL":
      return { ...state, saveLoading: false, saveError: action.payload };
    default:
      return state;
  }
};
