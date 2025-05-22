'use client';

import React, { useState } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

const BillingForm = ({ prescription, onClose, onSubmit }) => {
    const [items, setItems] = useState([
        { medicationName: prescription.medication, quantity: 1, unitPrice: 0, total: 0 }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculateTotals = () => {
        const subtotal = items.reduce((sum, item) => sum + item.total, 0);
        const tax = subtotal * 0.1; // 10% tax rate
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };

        // Recalculate total for this item
        if (field === 'quantity' || field === 'unitPrice') {
            newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
        }

        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { medicationName: '', quantity: 1, unitPrice: 0, total: 0 }]);
    };

    const removeItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { subtotal, tax, total } = calculateTotals();
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 30); // Due in 30 days

            const billData = {
                prescriptionId: prescription.id,
                subtotal,
                tax,
                total,
                dueDate: dueDate.toISOString(),
                items: items.map(item => ({
                    medicationName: item.medicationName,
                    quantity: parseInt(item.quantity),
                    unitPrice: parseFloat(item.unitPrice),
                    total: parseFloat(item.total)
                }))
            };

            await onSubmit(billData);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to create bill');
        } finally {
            setLoading(false);
        }
    };

    const { subtotal, tax, total } = calculateTotals();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

                <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 p-6">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Prescription Bill</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Patient Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                                <p className="mt-1 text-gray-900">{prescription.patientName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Prescription ID</label>
                                <p className="mt-1 text-gray-900">{prescription.id}</p>
                            </div>
                        </div>

                        {/* Bill Items */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Bill Items</h3>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Add Item
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={item.medicationName}
                                                        onChange={(e) => handleItemChange(index, 'medicationName', e.target.value)}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                                        className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={item.unitPrice}
                                                        onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                                        className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-900">${item.total.toFixed(2)}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        disabled={items.length === 1}
                                                        className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bill Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <dl className="space-y-2">
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Tax (10%)</dt>
                                    <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-2">
                                    <dt className="text-base font-medium text-gray-900">Total</dt>
                                    <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>

                        {error && (
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Bill'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BillingForm; 