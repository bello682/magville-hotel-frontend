// src/store/redux/reducers/roomLookupReducer.ts
interface RoomLookupState {
  rooms: any[];
  loading: boolean;
  error: string | null;
}
const initialState: RoomLookupState = {
  rooms: [],
  loading: false,
  error: null,
};

export const roomLookupReducer = (
  state = initialState,
  action: any,
): RoomLookupState => {
  switch (action.type) {
    case "ADMIN_ROOMS_LOOKUP_SUCCESS":
      return { ...state, rooms: action.payload, loading: false };
    case "ADMIN_ROOMS_LOOKUP_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
