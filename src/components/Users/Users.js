import React, { useState } from "react";
import DishOfUser from "../DishOfUser/DishOfUser";
import userData from "../../data/user.json";

const Users = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDishOfUser, setOpenDishOfUser] = useState(false);

    const handleUser = (userId) => {
        setSelectedUser(userId);
        setOpenDishOfUser(true);
    };

    return (
        <div>
            <h2>Danh sách nhân viên</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handleUser(item.id)}>
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openDishOfUser ? <DishOfUser userId={selectedUser} setOpenDishOfUser={setOpenDishOfUser} /> : <></>}
        </div>
    );
};

export default Users;
