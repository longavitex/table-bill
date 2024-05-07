import React, { useState } from "react";
import Popup from "../Popup/Popup";
import tableData from "../../data/table.json"

const Tables = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const handlePayment = (tableId) => {
        setSelectedTable(tableId);
        setOpenPopup(true);
    };

    return (
        <div>
            <h2>Danh sách bàn</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Bàn</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handlePayment(item.id)}>Thêm món</button>
                                <button style={{ marginLeft: "12px" }}>Thanh toán</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openPopup ? (<Popup tableId={selectedTable} setOpenPopup={setOpenPopup} />) : (<></>)}
        </div>
    );
};

export default Tables;