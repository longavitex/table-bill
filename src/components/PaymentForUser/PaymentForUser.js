import React from "react";
import dishOfUserData from "../../data/dishOfUser.json";
import userData from "../../data/user.json";

const PaymentForUser = ({ userId, orders, totalValue, onClose }) => {
    return (
        <div className="popup payment">
            <h2 style={{ color: "white" }}>Thanh toán cho {userData.find((user) => user.id === userId)?.name}</h2>
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
                            <td>{item.dishOfUserId}</td>
                            <td>{dishOfUserData.find((dish) => dish.id === item.dishOfUserId)?.name}</td>
                            <td>{dishOfUserData.find((dish) => dish.id === item.dishOfUserId)?.price}.000đ</td>
                            <td>{item.quantity}</td>
                            <td>{(dishOfUserData.find((dish) => dish.id === item.dishOfUserId)?.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000đ</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p style={{ color: "white" }}>Tổng giá trị thanh toán cho nhân viên: {totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000đ</p>
            <button onClick={onClose}>Đóng</button>
        </div>
    );
};

export default PaymentForUser;
