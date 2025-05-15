import React, { useState } from 'react';

const OrderForm = ({ storeId, patientId }) => {
    const [items, setItems] = useState([{ productId: '', quantity: 1 }]);
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('pending');
    const [message, setMessage] = useState('');

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { productId: '', quantity: 1 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            patientId,
            storeId,
            items,
            status,
            orderDate: new Date().toISOString(),
            notes,
        };
        try {
            const res = await fetch('/api/storeOrders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Order placed successfully!');
            } else {
                setMessage(data.error ? data.error[0].message : 'Order failed');
            }
        } catch (err) {
            setMessage('Order failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white shadow">
            <h2 className="text-xl font-bold mb-2">Order from this Store</h2>
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Product ID"
                        value={item.productId}
                        onChange={e => handleItemChange(idx, 'productId', e.target.value)}
                        className="input input-bordered"
                        required
                    />
                    <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
                        className="input input-bordered w-20"
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addItem} className="btn btn-outline btn-sm">Add Item</button>
            <textarea
                placeholder="Notes (optional)"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="textarea textarea-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">Place Order</button>
            {message && <div className="text-green-600 mt-2">{message}</div>}
        </form>
    );
};

export default OrderForm;