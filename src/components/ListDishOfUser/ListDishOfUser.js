import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dataDrink from "../../data/drink.json";
import { addDishToOrder, updateDishQuantity, clearOrders } from "../../redux/actions/userActions";
import Payment from "../Payment/Payment";

const ListDishOfUser = ({ tableId, userId, setOpenDishOfUser }) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.dish.orders[userId] || []);
    const allOrders = Object.values(useSelector((state) => state).dish.orders);
    const [totalValue, setTotalValue] = useState(0);
    const [showPayment, setShowPayment] = useState(false);

    const handleIncreaseQuantity = (userId, tableId, dishId, quantity) => {
        // Nếu món ăn đã có trong đơn hàng, tăng số lượng lên
        if (orders.some((item) => item.userId === userId && item.tableId === tableId && item.dishId === dishId)) {
            dispatch(updateDishQuantity(userId, tableId, dishId, quantity + 1));
        } else {
            // Nếu món ăn chưa có trong đơn hàng, thêm món ăn vào đơn hàng với số lượng là 1
            dispatch(addDishToOrder(userId, tableId, dishId, 1));
        }
        calculateTotal();
    };

    const handleDecreaseQuantity = (dishId, quantity) => {
        if (quantity > 0) {
            // Dispatch action để cập nhật số lượng món ăn
            dispatch(updateDishQuantity(userId, tableId, dishId, quantity - 1));
        }
        calculateTotal();
    };

    const calculateTotal = useCallback(() => {
        const total = orders.reduce((total, order) => {
            const dish = dataDrink.find((item) => item.id === order.dishId);
            return total + (dish ? dish.price * order.quantity : 0);
        }, 0);
        setTotalValue(total);
    }, [orders]);

    useEffect(() => {
        calculateTotal();
    }, [orders, calculateTotal]);

    console.log("allOrders: ", allOrders);
    console.log('current order: ', orders);


    const handleCheckout = () => {
        // Tính tổng giá trị đơn hàng
        calculateTotal();
        // Hiển thị thông tin thanh toán
        setShowPayment(true);
    };

    const handleClosePayment = () => {
        // Xóa đơn hàng của bàn
        dispatch(clearOrders(tableId));
        // Đóng component thanh toán
        setShowPayment(false);
    };

    return (
        <div className="popup">
            <h2 style={{ color: "white" }}>Danh sách món</h2>
            <span className="close-btn" onClick={() => setOpenDishOfUser(false)}>
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
                    {dataDrink.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}.000đ</td>
                            <td>
                                <div className="quantity-block">
                                    <button className="decrease" onClick={() => handleDecreaseQuantity(item.id, orders.some(order => order.userId === userId && order.tableId === tableId) ? orders.find((order) => order.dishId === item.id)?.quantity : 1)}>
                                        -
                                    </button>
                                    <span className="quantity" style={{ margin: "0 12px" }}>
                                        {orders.some(order => order.userId === userId && order.tableId === tableId && order.dishId === item.id) ? orders.find((order) => order.dishId === item.id)?.quantity : 0}
                                    </span>
                                    <button className="increase" onClick={() => handleIncreaseQuantity(userId, tableId, item.id, orders.some(order => order.userId === userId && order.tableId === tableId) ? orders.find((order) => order.dishId === item.id)?.quantity : 1)}>
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>{(item.price * orders.find((dish) => dish.dishId === item.id)?.quantity || item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000đ</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4} style={{ textAlign: "right" }}>
                            Tổng thanh toán
                        </td>
                        <td>{totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000đ</td>
                    </tr>
                </tbody>
            </table>

            {/* {showPayment && (
                <Payment
                    tableId={tableId}
                    orders={orders}
                    totalValue={totalValue}
                    onClose={handleClosePayment}
                />
            )} */}
        </div>
    )
}

export default ListDishOfUser
