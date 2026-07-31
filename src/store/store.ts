import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { roomReducer } from "./redux/reducers/roomReducer";
import { reservationReducer } from "./redux/reducers/reservationReducer";

const rootReducer = combineReducers({
  public: roomReducer,
  reservation: reservationReducer,
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
