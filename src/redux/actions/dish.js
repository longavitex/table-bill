// actions/dish.js
export const addDishToTable = (tableId, dishId, quantity) => {
    return {
        type: 'ADD_DISH_TO_TABLE',
        payload: {
            tableId,
            dishId,
            quantity
        }
    };
};