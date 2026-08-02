// src/store/redux/reducers/paymentBookingSearchReducer.ts
export const paymentBookingSearchReducer = (
  state = { results: [] },
  action: any,
) => {
  if (action.type === "PAYMENT_BOOKING_SEARCH_RESULTS") {
    return { ...state, results: action.payload };
  }
  return state;
};
