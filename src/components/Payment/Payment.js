import React from "react";
import dishData from "../../data/dish.json";

const Payment = ({ tableId, orders, totalValue, onClose }) => {
    return (
        <div className="popup payment">
            <h2 style={{ color: "white" }}>Thanh toán cho bàn {tableId}</h2>
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
                    {orders.map((item, index) => (
                        <tr key={index}>
                            <td>{item.dishId}</td>
                            <td>{dishData.find((dish) => dish.id === item.dishId)?.name}</td>
                            <td>{dishData.find((dish) => dish.id === item.dishId)?.price}.000đ</td>
                            <td>{item.quantity}</td>
                            <td>{(dishData.find((dish) => dish.id === item.dishId)?.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000đ</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p style={{ color: "white" }}>Tổng giá trị đơn hàng: {totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000đ</p>
            <button onClick={onClose}>Đóng</button>
        </div>
    );
};

export default Payment;
