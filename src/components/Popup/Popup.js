import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dataDish from "../../data/dish.json"
import { addDishToOrder, updateDishQuantity } from "../../redux/actions/dishActions";

const Popup = ({ tableId, setOpenPopup }) => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.dish.orders);
    const [totalValue, setTotalValue] = useState(0);

    const handleIncreaseQuantity = (dishId, quantity) => {
        // Nếu món ăn đã có trong đơn hàng, tăng số lượng lên
        if (orders.some(dish => dish.dishId === dishId)) {
            dispatch(updateDishQuantity(tableId, dishId, quantity + 1));
        } else {
            // Nếu món ăn chưa có trong đơn hàng, thêm món ăn vào đơn hàng với số lượng là 1
            dispatch(addDishToOrder(tableId, dishId, 1));
        }
        calculateTotal()
    };

    const handleDecreaseQuantity = (dishId, quantity) => {
        if (quantity > 0) {
            // Dispatch action để cập nhật số lượng món ăn
            dispatch(updateDishQuantity(tableId, dishId, quantity - 1));
        }
        calculateTotal()
    };

    const calculateTotal = () => {
        const total = orders.reduce((total, order) => {
            const dish = dataDish.find(item => item.id === order.dishId);
            return total + (dish ? dish.price * order.quantity : 0);
        }, 0);
        setTotalValue(total);
    };

    console.log(orders);

    return (
        <div className="popup">
            <h2 style={{ color: "white" }}>Danh sách món</h2>
            <span className="close-btn" onClick={() => setOpenPopup(false)}>
                X
            </span>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên món</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {dataDish.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}.000đ</td>
                            <td>
                                <div className="quantity-block">
                                    <button
                                        className="decrease"
                                        onClick={() => handleDecreaseQuantity(item.id, orders.find(dish => dish.dishId === item.id)?.quantity || 1)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity" style={{ margin: "0 12px" }}>
                                        {orders.find(dish => dish.dishId === item.id)?.quantity || 0}
                                    </span>
                                    <button
                                        className="increase"
                                        onClick={() => handleIncreaseQuantity(item.id, orders.find(dish => dish.dishId === item.id)?.quantity || 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>{item.price * orders.find(dish => dish.dishId === item.id)?.quantity || item.quantity}.000đ</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4} style={{ textAlign: "right" }}>Tổng thanh toán</td>
                        <td>{totalValue}.000đ</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Popup;
