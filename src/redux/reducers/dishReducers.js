// dishReducers.js
import { ADD_DISH_TO_ORDER, UPDATE_DISH_QUANTITY } from "../variables/dishType";

const initialState = {
    orders: [] // Danh sách đơn hàng
};

const dishReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DISH_TO_ORDER:
            // Thêm món ăn mới vào đơn hàng
            return {
                ...state,
                orders: [...state.orders, action.payload]
            };
        case UPDATE_DISH_QUANTITY:
            // Cập nhật số lượng món ăn trong đơn hàng
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.tableId === action.payload.tableId && order.dishId === action.payload.dishId ?
                        { ...order, quantity: action.payload.quantity } :
                        order
                )
            };
        default:
            return state;
    }
};

export default dishReducers;
