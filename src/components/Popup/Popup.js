import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDishToTable } from "../../redux/actions/dish";
import dataDish from "../../data/dish.json"

const Popup = ({ tableId, setOpenPopup }) => {
    const dispatch = useDispatch();
    const initialDishes = useSelector((state) => state.dish.tables.find((table) => table.id === tableId)?.dishes) || dataDish;
    const [selectedDishes, setSelectedDishes] = useState(initialDishes);

    const handleAddToOrder = (dishId, quantity) => {
        dispatch(addDishToTable(tableId, dishId, quantity));
        console.log(selectedDishes);
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
                    {selectedDishes.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}.000đ</td>
                            <td>
                                <div className="quantity-block">
                                    <button
                                        className="decrease"
                                        onClick={() => handleAddToOrder(item.id, item.quantity >= 1 ? item.quantity - 1 : 0)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity" style={{ margin: "0 12px" }}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="increase"
                                        onClick={() => handleAddToOrder(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>{item.price * item.quantity}.000đ</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Popup;
