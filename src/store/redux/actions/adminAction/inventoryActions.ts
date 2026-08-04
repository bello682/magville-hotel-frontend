// src/store/redux/actions/adminAction/inventoryActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";

export const fetchInventory = () => async (dispatch: Dispatch) => {
  dispatch({ type: "INVENTORY_REQUEST" });
  try {
    const { data } = await adminAxios.get("/inventory");
    dispatch({
      type: "INVENTORY_SUCCESS",
      payload: {
        items: data.data.items,
        lowStockCount: data.data.lowStockCount,
      },
    });
  } catch (error: any) {
    dispatch({
      type: "INVENTORY_FAIL",
      payload: error?.response?.data?.message || "Failed to fetch inventory",
    });
  }
};

export const createInventoryItemAdmin =
  (values: {
    name: string;
    category: string;
    currentStock: string;
    minThreshold: string;
    unit: string;
  }) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: "INVENTORY_CREATE_REQUEST" });
    try {
      await adminAxios.post("/inventory", values);
      dispatch({ type: "INVENTORY_CREATE_SUCCESS" });
      dispatch(fetchInventory() as any);
    } catch (error: any) {
      dispatch({
        type: "INVENTORY_CREATE_FAIL",
        payload: error?.response?.data?.message || "Failed to create item",
      });
    }
  };

export const recordStockMovementAdmin =
  (itemId: string, quantity: number, reason?: string) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: "STOCK_MOVEMENT_REQUEST", payload: itemId });
    try {
      const { data } = await adminAxios.post(`/inventory/${itemId}/movement`, {
        quantity,
        reason,
      });
      dispatch({ type: "STOCK_MOVEMENT_SUCCESS", payload: data.data.item });
    } catch (error: any) {
      dispatch({
        type: "STOCK_MOVEMENT_FAIL",
        payload: error?.response?.data?.message || "Failed to update stock",
      });
    }
  };

export const fetchItemMovements =
  (itemId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: "ITEM_MOVEMENTS_REQUEST" });
    try {
      const { data } = await adminAxios.get(`/inventory/${itemId}/movements`);
      dispatch({
        type: "ITEM_MOVEMENTS_SUCCESS",
        payload: data.data.movements,
      });
    } catch (error: any) {
      dispatch({
        type: "ITEM_MOVEMENTS_FAIL",
        payload:
          error?.response?.data?.message || "Failed to fetch movement history",
      });
    }
  };

export const deleteInventoryItemAdmin =
  (id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: "INVENTORY_DELETE_REQUEST", payload: id });
    try {
      await adminAxios.delete(`/inventory/${id}`);
      dispatch({ type: "INVENTORY_DELETE_SUCCESS", payload: id });
    } catch (error: any) {
      dispatch({
        type: "INVENTORY_DELETE_FAIL",
        payload: error?.response?.data?.message || "Failed to delete item",
      });
    }
  };
