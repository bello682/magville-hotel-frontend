// src/store/redux/reducers/inventoryReducer.ts
import {
  InventoryItem,
  StockMovementItem,
} from "@/app/(admin)/types/inventory";

interface InventoryState {
  items: InventoryItem[];
  lowStockCount: number;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
  movementLoadingId: string | null;
  movementError: string | null;
  movements: StockMovementItem[];
  movementsLoading: boolean;
  deleteLoadingId: string | null;
}
const initialState: InventoryState = {
  items: [],
  lowStockCount: 0,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  movementLoadingId: null,
  movementError: null,
  movements: [],
  movementsLoading: false,
  deleteLoadingId: null,
};

export const inventoryReducer = (
  state = initialState,
  action: any,
): InventoryState => {
  switch (action.type) {
    case "INVENTORY_REQUEST":
      return { ...state, loading: true, error: null };
    case "INVENTORY_SUCCESS":
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        lowStockCount: action.payload.lowStockCount,
      };
    case "INVENTORY_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "INVENTORY_CREATE_REQUEST":
      return { ...state, createLoading: true, createError: null };
    case "INVENTORY_CREATE_SUCCESS":
      return { ...state, createLoading: false };
    case "INVENTORY_CREATE_FAIL":
      return { ...state, createLoading: false, createError: action.payload };

    case "STOCK_MOVEMENT_REQUEST":
      return {
        ...state,
        movementLoadingId: action.payload,
        movementError: null,
      };
    case "STOCK_MOVEMENT_SUCCESS":
      return {
        ...state,
        movementLoadingId: null,
        items: state.items.map((i) =>
          i.id === action.payload.id ? action.payload : i,
        ),
      };
    case "STOCK_MOVEMENT_FAIL":
      return {
        ...state,
        movementLoadingId: null,
        movementError: action.payload,
      };

    case "ITEM_MOVEMENTS_REQUEST":
      return { ...state, movementsLoading: true };
    case "ITEM_MOVEMENTS_SUCCESS":
      return { ...state, movementsLoading: false, movements: action.payload };
    case "ITEM_MOVEMENTS_FAIL":
      return { ...state, movementsLoading: false };

    case "INVENTORY_DELETE_REQUEST":
      return { ...state, deleteLoadingId: action.payload };
    case "INVENTORY_DELETE_SUCCESS":
      return {
        ...state,
        deleteLoadingId: null,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "INVENTORY_DELETE_FAIL":
      return { ...state, deleteLoadingId: null };

    default:
      return state;
  }
};
