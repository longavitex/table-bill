import { ADD_DISH_TO_USERS_ORDER, UPDATE_DISH_OF_USER_QUANTITY, CLEAR_USERS_ORDERS } from "../variables/dishOfUserType";

export const addDishOfUserToOrder = (userId, dishOfUserId, quantity) => ({
    type: ADD_DISH_TO_USERS_ORDER,
    payload: { userId, dishOfUserId, quantity },
});

export const updateDishOfUserQuantity = (userId, dishOfUserId, quantity) => ({
    type: UPDATE_DISH_OF_USER_QUANTITY,
    payload: { userId, dishOfUserId, quantity },
});

export const clearUsersOrders = (userId) => ({
    type: CLEAR_USERS_ORDERS,
    payload: { userId },
});
