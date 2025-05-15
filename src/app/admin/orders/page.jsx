"use client"
import React, { useEffect, useState } from "react";

const statusOptions = ["pending", "processing", "completed", "cancelled"];

const fetchOrders = async () => {
    const res = await fetch("/api/storeOrders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
};

const updateOrderStatus = async (orderid, status) => {
    const res = await fetch(`/api/storeOrders/${orderid}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
};

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("");
    const [statusUpdate, setStatusUpdate] = useState({});

    useEffect(() => {
        fetchOrders()
            .then(setOrders)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleStatusChange = async (orderid, newStatus) => {
        setStatusUpdate((prev) => ({ ...prev, [orderid]: true }));
        try {
            await updateOrderStatus(orderid, newStatus);
            setOrders((prev) =>
                prev.map((order) =>
                    order.orderid === orderid ? { ...order, status: newStatus } : order
                )
            );
        } catch (e) {
            alert("Failed to update status: " + e.message);
        } finally {
            setStatusUpdate((prev) => ({ ...prev, [orderid]: false }));
        }
    };

    const filteredOrders = filter
        ? orders.filter(
            (order) =>
                order.patientName?.toLowerCase().includes(filter.toLowerCase()) ||
                order.orderid?.toLowerCase().includes(filter.toLowerCase())
        )
        : orders;

    return (
        <section className="max-w-[100vw] px-6 pb-16 xl:pr-2">
            <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
                <div className="w-full max-w-6xl flex-grow pt-10">
                    <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
                    <div className="mb-4 flex flex-wrap gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Search by patient or order ID..."
                            className="input input-bordered input-sm w-64"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    {loading ? (
                        <div>Loading orders...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <div className="relative mb-10 mt-6 shadow-md overflow-x-auto">
                            <table className="table-xs md:table-sm table-pin-rows table w-full">
                                <thead>
                                    <tr className="bg-base-300 border-b-0 font-bold">
                                        <th>Order ID</th>
                                        <th>Patient Name</th>
                                        <th>Order Items</th>
                                        <th>Status</th>
                                        <th>Order Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4">
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <tr key={order.orderid}>
                                                <td>{order.orderid}</td>
                                                <td>{order.patientName || order.patient?.name || "-"}</td>
                                                <td>
                                                    {order.items
                                                        ? order.items.map((item, idx) => (
                                                            <div key={idx}>{item.name} x{item.quantity}</div>
                                                        ))
                                                        : "-"}
                                                </td>
                                                <td>
                                                    <select
                                                        className="select select-bordered select-xs"
                                                        value={order.status}
                                                        disabled={statusUpdate[order.orderid]}
                                                        onChange={(e) =>
                                                            handleStatusChange(order.orderid, e.target.value)
                                                        }
                                                    >
                                                        {statusOptions.map((opt) => (
                                                            <option key={opt} value={opt}>
                                                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}</td>
                                                <td>
                                                    {/* Additional actions can be added here, e.g., view details */}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}