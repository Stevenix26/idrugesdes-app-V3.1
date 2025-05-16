'use client'
import React, { useEffect, useState } from "react";

const fetchOrders = async () => {
    // Replace with actual API endpoint or data fetching logic
    const response = await fetch("/api/orders");
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
};

const OrderStatusBadge = ({ status }) => {
    let color = "bg-gray-300";
    if (status === "pending") color = "bg-yellow-200 text-yellow-800";
    else if (status === "completed") color = "bg-green-200 text-green-800";
    else if (status === "cancelled") color = "bg-red-200 text-red-800";
    return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{status}</span>;
};

const createOrder = async (orderData) => {
    const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to create order");
    return response.json();
};

const OrderForm = ({ onOrderCreated }) => {
    const [drugs, setDrugs] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState("pending");
    const [orderid, setOrderid] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setTotalAmount(quantity * price);
    }, [quantity, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const orderData = {
                drugs,
                quantity: parseFloat(quantity),
                price: parseFloat(price),
                orderid: orderid || Math.random().toString(36).substring(2, 10),
                totalAmount: parseFloat(totalAmount),
                status,
            };
            await createOrder(orderData);
            setSuccess("Order placed successfully!");
            setDrugs("");
            setQuantity(1);
            setPrice(0);
            setOrderid("");
            setStatus("pending");
            setTotalAmount(0);
            if (onOrderCreated) onOrderCreated();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="bg-white rounded shadow p-6 mb-8" onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Place a New Order</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Drug Name</label>
                <input type="text" className="w-full border rounded px-3 py-2" value={drugs} onChange={e => setDrugs(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Quantity</label>
                <input type="number" className="w-full border rounded px-3 py-2" value={quantity} min={1} onChange={e => setQuantity(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Price per Unit</label>
                <input type="number" className="w-full border rounded px-3 py-2" value={price} min={0} step={0.01} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Order ID (optional)</label>
                <input type="text" className="w-full border rounded px-3 py-2" value={orderid} onChange={e => setOrderid(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Status</label>
                <select className="w-full border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Total Amount</label>
                <input type="number" className="w-full border rounded px-3 py-2 bg-gray-100" value={totalAmount} readOnly />
            </div>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-600 mb-2">{success}</div>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Placing..." : "Place Order"}</button>
        </form>
    );
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const fetchAndSetOrders = () => {
        setLoading(true);
        fetchOrders()
            .then(setOrders)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        fetchAndSetOrders();
    }, []);

    const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(orders.length / pageSize);

    if (loading) return <div className="p-8 text-center">Loading orders...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <OrderForm onOrderCreated={fetchAndSetOrders} />
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            <div className="overflow-x-auto rounded shadow bg-white">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Order ID</th>
                            <th className="px-4 py-2 text-left">Drugs</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Total</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Order Date</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-gray-500">No orders found.</td>
                            </tr>
                        ) : (
                            paginatedOrders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{order.orderid}</td>
                                    <td className="px-4 py-2">{order.drugs}</td>
                                    <td className="px-4 py-2">{order.quantity}</td>
                                    <td className="px-4 py-2">${order.price.toFixed(2)}</td>
                                    <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                                    <td className="px-4 py-2"><OrderStatusBadge status={order.status} /></td>
                                    <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span className="px-2 py-1">Page {page} of {totalPages}</span>
                    <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setSelectedOrder(null)}
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-2">Order Details</h2>
                        <div className="mb-2"><b>Order ID:</b> {selectedOrder.orderid}</div>
                        <div className="mb-2"><b>Drugs:</b> {selectedOrder.drugs}</div>
                        <div className="mb-2"><b>Quantity:</b> {selectedOrder.quantity}</div>
                        <div className="mb-2"><b>Price:</b> ${selectedOrder.price.toFixed(2)}</div>
                        <div className="mb-2"><b>Total:</b> ${selectedOrder.totalAmount.toFixed(2)}</div>
                        <div className="mb-2"><b>Status:</b> <OrderStatusBadge status={selectedOrder.status} /></div>
                        <div className="mb-2"><b>Order Date:</b> {new Date(selectedOrder.orderDate).toLocaleString()}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;