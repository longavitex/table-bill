// dishReducers.js
import { ADD_DISH_TO_ORDER, UPDATE_DISH_QUANTITY, CLEAR_ORDERS } from "../variables/dishType";

const initialState = {
    orders: {}, // Danh sách đơn hàng
};

const dishReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DISH_TO_ORDER:
            // Thêm món ăn vào đơn hàng của bàn tương ứng
            return {
                ...state,
                orders: {
                    ...state.orders,
                    [action.payload.tableId]: [...(state.orders[action.payload.tableId] || []), action.payload],
                },
            };
        case UPDATE_DISH_QUANTITY:
            // Cập nhật số lượng món ăn trong đơn hàng của bàn tương ứng
            if (state.orders[action.payload.tableId]) {
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [action.payload.tableId]: state.orders[action.payload.tableId].map((order) => (order.dishId === action.payload.dishId ? { ...order, quantity: action.payload.quantity } : order)),
                    },
                };
            }
            return state; // Trả về trạng thái hiện tại nếu không tìm thấy đơn hàng của bàn
        case CLEAR_ORDERS:
            // Xóa đơn hàng của bàn tương ứng
            const updatedOrders = { ...state.orders };
            delete updatedOrders[action.payload.tableId];
            return {
                ...state,
                orders: updatedOrders,
            };
        default:
            return state;
    }
};

export default dishReducers;
