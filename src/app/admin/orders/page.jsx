'use client'
import React, { useEffect, useState } from "react";

const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    return data.orders;
};

const updateOrderStatus = async (id, status) => {
    const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
    });
    if (!res.ok) throw new Error("Failed to update order");
    return res.json();
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [editStatus, setEditStatus] = useState("");

    useEffect(() => {
        fetchOrders()
            .then(setOrders)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleEdit = (order) => {
        setEditId(order.id);
        setEditStatus(order.status);
    };

    const handleSave = async () => {
        try {
            await updateOrderStatus(editId, editStatus);
            setOrders((prev) => prev.map((o) => (o.id === editId ? { ...o, status: editStatus } : o)));
            setEditId(null);
        } catch (e) {
            setError(e.message);
        }
    };

    if (loading) return <div className="p-8">Loading orders...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;

    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
                <h1 className="text-2xl font-bold text-indigo-900 mb-6">Order Management</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b">
                                <td className="px-4 py-2">{order.id}</td>
                                <td className="px-4 py-2">{new Date(order.orderDate).toLocaleString()}</td>
                                <td className="px-4 py-2">
                                    {editId === order.id ? (
                                        <select
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="pending">pending</option>
                                            <option value="processing">processing</option>
                                            <option value="completed">completed</option>
                                            <option value="cancelled">cancelled</option>
                                        </select>
                                    ) : (
                                        order.status
                                    )}
                                </td>
                                <td className="px-4 py-2 space-x-2">
                                    {editId === order.id ? (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditId(null)}
                                                className="bg-gray-300 px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(order)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default OrdersPage;