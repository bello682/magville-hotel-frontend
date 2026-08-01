import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { roomReducer } from "./redux/reducers/roomReducer";
import { reservationReducer } from "./redux/reducers/reservationReducer";
import { dashboardReducer } from "./redux/reducers/adminReducer/dashboardReducer";
import { bookingReducer } from "./redux/reducers/adminReducer/bookingReducer";
import { roomLookupReducer } from "./redux/reducers/adminReducer/roomLookupReducer";

const rootReducer = combineReducers({
  public: roomReducer,
  reservation: reservationReducer,
  dashboard: dashboardReducer,
  adminBookings: bookingReducer,
  roomLookup: roomLookupReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
