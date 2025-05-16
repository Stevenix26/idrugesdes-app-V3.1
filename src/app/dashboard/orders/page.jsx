'use client'
import React, { useState, useEffect } from 'react';

const fetchMedications = async () => {
  const res = await fetch('/api/medications');
  if (!res.ok) throw new Error('Failed to fetch medications');
  const data = await res.json();
  return data.medications;
};

const createOrder = async (orderData) => {
  const res = await fetch('/api/admin/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create order');
  }
  return res.json();
};

export default function OrdersPage() {
  const [medications, setMedications] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhoneNumber, setClientPhoneNumber] = useState('');
  const [status, setStatus] = useState('pending');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedications()
      .then(setMedications)
      .catch(() => setMedications([]));
  }, []);

  useEffect(() => {
    if (selectedDrug) {
      const med = medications.find(m => m.id === selectedDrug);
      setPrice(med ? med.price : 0);
    }
  }, [selectedDrug, medications]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const med = medications.find(m => m.id === selectedDrug);
      if (!med) throw new Error('Please select a drug.');
      const orderData = {
        drugs: med.name,
        quantity: Number(quantity),
        price: Number(price),
        totalAmount: Number(price) * Number(quantity),
        status,
        clientEmail,
        clientPhoneNumber,
      };
      await createOrder(orderData);
      setSuccess('Order placed successfully!');
      setSelectedDrug('');
      setQuantity(1);
      setPrice(0);
      setClientEmail('');
      setClientPhoneNumber('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-2xl font-bold text-indigo-900 mb-6">Order Medication</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Drug</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedDrug}
              onChange={e => setSelectedDrug(e.target.value)}
              required
            >
              <option value="">Select a drug</option>
              {medications.map(med => (
                <option key={med.id} value={med.id}>{med.name} ({med.strength})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={quantity}
              min={1}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price per unit</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={price}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Total Amount</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={Number(price) * Number(quantity)}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              value={clientPhoneNumber}
              onChange={e => setClientPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Placing...' : 'Place Order'}
          </button>
          {success && <div className="text-green-600 mt-2">{success}</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </section>
  );
}
