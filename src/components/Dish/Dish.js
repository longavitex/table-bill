import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dataDish from "../../data/dish.json";
import { addDishToOrder, updateDishQuantity, clearOrders } from "../../redux/actions/dishActions";
import Payment from "../Payment/Payment";

const Dish = ({ tableId, setOpenDish }) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.dish.orders[tableId] || []);
    const allOrders = Object.values(useSelector((state) => state).dish.orders);
    const [totalValue, setTotalValue] = useState(0);
    const [showPayment, setShowPayment] = useState(false);

    const handleIncreaseQuantity = (dishId, quantity) => {
        // Nếu món ăn đã có trong đơn hàng, tăng số lượng lên
        if (orders.some((dish) => dish.dishId === dishId)) {
            dispatch(updateDishQuantity(tableId, dishId, quantity + 1));
        } else {
            // Nếu món ăn chưa có trong đơn hàng, thêm món ăn vào đơn hàng với số lượng là 1
            dispatch(addDishToOrder(tableId, dishId, 1));
        }
        calculateTotal();
    };

    const handleDecreaseQuantity = (dishId, quantity) => {
        if (quantity > 0) {
            // Dispatch action để cập nhật số lượng món ăn
            dispatch(updateDishQuantity(tableId, dishId, quantity - 1));
        }
        calculateTotal();
    };

    useEffect(() => {
        calculateTotal();
    }, [orders]); // Gọi calculateTotal mỗi khi orders thay đổi

    const calculateTotal = () => {
        const total = orders.reduce((total, order) => {
            const dish = dataDish.find((item) => item.id === order.dishId);
            return total + (dish ? dish.price * order.quantity : 0);
        }, 0);
        setTotalValue(total);
    };

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
        console.log(tableId);
        // Đóng component thanh toán
        setShowPayment(false);
    };

    return (
        <div className="popup">
            <h2 style={{ color: "white" }}>Danh sách món</h2>
            <span className="close-btn" onClick={() => setOpenDish(false)}>
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
                                    <button className="decrease" onClick={() => handleDecreaseQuantity(item.id, orders.find((dish) => dish.dishId === item.id)?.quantity || 1)}>
                                        -
                                    </button>
                                    <span className="quantity" style={{ margin: "0 12px" }}>
                                        {orders.find((dish) => dish.dishId === item.id)?.quantity || 0}
                                    </span>
                                    <button className="increase" onClick={() => handleIncreaseQuantity(item.id, orders.find((dish) => dish.dishId === item.id)?.quantity || 1)}>
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
            <button onClick={handleCheckout}>Thanh toán</button>

            {showPayment && (
                <Payment
                    tableId={tableId}
                    orders={orders}
                    totalValue={totalValue}
                    onClose={handleClosePayment}
                />
            )}
        </div>
    );
};

export default Dish;
