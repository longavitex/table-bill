import { ADD_DISH_TO_ORDER, UPDATE_DISH_QUANTITY, CLEAR_ORDERS } from "../variables/dishType";

export const addDishToOrder = (userId, tableId, dishId, quantity) => ({
    type: ADD_DISH_TO_ORDER,
    payload: { userId, tableId, dishId, quantity },
});

export const updateDishQuantity = (userId, tableId, dishId, quantity) => ({
    type: UPDATE_DISH_QUANTITY,
    payload: { userId, tableId, dishId, quantity },
});

export const clearOrders = (userId) => ({
    type: CLEAR_ORDERS,
    payload: { userId },
});
