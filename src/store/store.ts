import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { roomReducer } from "./redux/reducers/roomReducer";
import { reservationReducer } from "./redux/reducers/reservationReducer";
import { dashboardReducer } from "./redux/reducers/adminReducer/dashboardReducer";
import { bookingReducer } from "./redux/reducers/adminReducer/bookingReducer";
import { roomAdminReducer } from "./redux/reducers/adminReducer/roomAdminReducer";
import { paymentReducer } from "./redux/reducers/adminReducer/paymentReducer";
import { paymentBookingSearchReducer } from "./redux/reducers/adminReducer/paymentBookingSearchReducer";
import { marketingReducer } from "./redux/reducers/adminReducer/marketingReducer";
import { staffReducer } from "./redux/reducers/adminReducer/staffReducer";
import { guestReducer } from "./redux/reducers/adminReducer/guestReducer";
import { settingsReducer } from "./redux/reducers/adminReducer/settingsReducer";

const rootReducer = combineReducers({
  public: roomReducer,
  reservation: reservationReducer,
  dashboard: dashboardReducer,
  adminBookings: bookingReducer,
  roomAdmin: roomAdminReducer,
  payments: paymentReducer,
  paymentBookingSearch: paymentBookingSearchReducer,
  marketing: marketingReducer,
  staff: staffReducer,
  guests: guestReducer,
  settings: settingsReducer,
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
