import React, { useState } from "react";
import Dish from "../Dish/Dish";
import tableData from "../../data/table.json";

const Tables = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [openDish, setOpenDish] = useState(false);

    const handleTable = (tableId) => {
        setSelectedTable(tableId);
        setOpenDish(true);
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
                    {tableData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handleTable(item.id)}>
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openDish ? <Dish tableId={selectedTable} setOpenDish={setOpenDish} /> : <></>}
        </div>
    );
};

export default Tables;
