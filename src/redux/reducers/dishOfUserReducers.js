// dishOfUserReducers.js
import { ADD_DISH_TO_USERS_ORDER, UPDATE_DISH_OF_USER_QUANTITY, CLEAR_USERS_ORDERS } from "../variables/dishOfUserType";

const initialState = {
    orders: {}, // Danh sách đơn hàng
};

const dishOfUserReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DISH_TO_USERS_ORDER:
            // Thêm món ăn vào đơn hàng của nhân viên tương ứng
            return {
                ...state,
                orders: {
                    ...state.orders,
                    [action.payload.userId]: [...(state.orders[action.payload.userId] || []), action.payload],
                },
            };
        case UPDATE_DISH_OF_USER_QUANTITY:
            // Cập nhật số lượng món ăn trong đơn hàng của nhân viên tương ứng
            if (state.orders[action.payload.userId]) {
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [action.payload.userId]: state.orders[action.payload.userId].map((order) => (order.dishOfUserId === action.payload.dishOfUserId ? { ...order, quantity: action.payload.quantity } : order)),
                    },
                };
            }
            return state; // Trả về trạng thái hiện tại nếu không tìm thấy đơn hàng của nhân viên
        case CLEAR_USERS_ORDERS:
            // Xóa đơn hàng của nhân viên tương ứng
            const updatedOrders = { ...state.orders };
            delete updatedOrders[action.payload.userId];
            return {
                ...state,
                orders: updatedOrders,
            };
        default:
            return state;
    }
};

export default dishOfUserReducers;
