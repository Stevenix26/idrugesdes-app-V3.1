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
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                    <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">Order Analytics</h1>
                    <div className="flex gap-4">
                        <div className="bg-indigo-100 rounded-xl p-4 flex flex-col items-center shadow-md">
                            <span className="text-2xl font-bold text-indigo-700">{orders.length}</span>
                            <span className="text-indigo-500 text-sm">Total Orders</span>
                        </div>
                        <div className="bg-green-100 rounded-xl p-4 flex flex-col items-center shadow-md">
                            <span className="text-2xl font-bold text-green-700">{orders.filter(o => o.status === 'completed').length}</span>
                            <span className="text-green-500 text-sm">Completed</span>
                        </div>
                        <div className="bg-yellow-100 rounded-xl p-4 flex flex-col items-center shadow-md">
                            <span className="text-2xl font-bold text-yellow-700">{orders.filter(o => o.status === 'pending').length}</span>
                            <span className="text-yellow-500 text-sm">Pending</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white">
                                <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                                <th className="px-4 py-3 text-left font-semibold">Date</th>
                                <th className="px-4 py-3 text-left font-semibold">Status</th>
                                <th className="px-4 py-3 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-indigo-50 cursor-pointer transition">
                                    <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-4 py-3">{new Date(order.orderDate).toLocaleString()}</td>
                                    <td className="px-4 py-3">
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
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{order.status}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 space-x-2">
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
            </div>
        </section>
    );
};

export default OrdersPage;