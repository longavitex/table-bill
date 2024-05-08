import { ADD_DISH_TO_ORDER, UPDATE_DISH_QUANTITY, CLEAR_ORDERS } from "../variables/dishType";

export const addDishToOrder = (tableId, dishId, quantity) => ({
    type: ADD_DISH_TO_ORDER,
    payload: { tableId, dishId, quantity },
});

export const updateDishQuantity = (tableId, dishId, quantity) => ({
    type: UPDATE_DISH_QUANTITY,
    payload: { tableId, dishId, quantity },
});

export const clearOrders = (tableId) => ({
    type: CLEAR_ORDERS,
    payload: { tableId },
});
