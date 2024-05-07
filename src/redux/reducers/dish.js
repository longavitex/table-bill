// reducers/dish.js
const initialState = {
    tables: []
};

const dishReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_DISH_TO_TABLE':
            const { tableId, dishId, quantity } = action.payload;
            // Tìm bàn trong state
            const table = state.tables.find(table => table.id === tableId);
            if (table) {
                // Kiểm tra xem món đã tồn tại trong danh sách của bàn chưa
                const existingDish = table.dishes.find(dish => dish.id === dishId);
                if (existingDish) {
                    // Nếu đã tồn tại, cập nhật số lượng
                    existingDish.quantity += quantity;
                } else {
                    // Nếu chưa tồn tại, thêm món mới vào danh sách của bàn
                    table.dishes.push({ id: dishId, quantity });
                }
            }
            return { ...state };

        default:
            return state;
    }
};

export default dishReducer;