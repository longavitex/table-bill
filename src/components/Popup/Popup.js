// Popup.js
import React, { useState } from "react";
import dishData from "../../data/dish.json";

const Popup = ({ tableId, setOpenPopup }) => {
    const [selectedDishes, setSelectedDishes] = useState([]);

    const handleQuantityChange = (dishId, quantity) => {
        const updatedDishes = selectedDishes.map((dish) => {
            if (dish.id === dishId) {
                return { ...dish, quantity };
            }
            return dish;
        });
        setSelectedDishes(updatedDishes);
    };

    const handleAddToOrder = (dishId) => {
        const dishToAdd = dishData.find((dish) => dish.id === dishId);
        if (dishToAdd) {
            setSelectedDishes([...selectedDishes, { ...dishToAdd, quantity: 1 }]);
        }
    };

    const handleRemoveFromOrder = (dishId) => {
        const updatedDishes = selectedDishes.filter((dish) => dish.id !== dishId);
        setSelectedDishes(updatedDishes);
    };

    const handleConfirmOrder = () => {
        // Logic to save selected dishes for the tableId
        setOpenPopup(false);
    };

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
                    {dishData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}.000đ</td>
                            <td>
                                <div className="quantity-block">
                                    <button className="decrease" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                        -
                                    </button>
                                    <span className="quantity" style={{ margin: "0 12px" }}>
                                        {item.quantity}
                                    </span>
                                    <button className="increase" onClick={() => handleQuantityChange(item.id, Number(item.quantity + 1))}>
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>{item.price * item.quantity}.000đ</td>
                            <td>{selectedDishes.some((dish) => dish.id === item.id) ? <button onClick={() => handleRemoveFromOrder(item.id)}>Xóa</button> : <button onClick={() => handleAddToOrder(item.id)}>Thêm</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleConfirmOrder}>Xác nhận</button>
        </div>
    );
};

export default Popup;
