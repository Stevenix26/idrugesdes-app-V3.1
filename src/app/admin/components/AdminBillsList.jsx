'use client';

import { useState } from 'react';
import { ReceiptPercentIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const AdminBillsList = ({ bills }) => {
    const [expandedBill, setExpandedBill] = useState(null);

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    const getBillStatusColor = (status) => {
        const colors = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            PAID: 'bg-green-100 text-green-800',
            OVERDUE: 'bg-red-100 text-red-800',
            CANCELLED: 'bg-gray-100 text-gray-800'
        };
        return colors[status] || colors.PENDING;
    };

    if (!bills || bills.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No bills found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h2 className="text-2xl font-bold text-gray-900">All Bills</h2>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all bills created for prescriptions.
                    </p>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {bills.map((bill) => (
                        <li key={bill.id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <ReceiptPercentIcon className="h-6 w-6 text-gray-400" />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-indigo-600 truncate">
                                                Bill #{bill.id.slice(0, 8)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {bill.prescription?.patientName || 'Patient Name N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBillStatusColor(bill.status)}`}>
                                            {bill.status || 'PENDING'}
                                        </span>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {formatCurrency(bill.total)}
                                        </p>
                                        <button
                                            onClick={() => setExpandedBill(expandedBill === bill.id ? null : bill.id)}
                                            className="text-gray-400 hover:text-gray-500"
                                        >
                                            {expandedBill === bill.id ? (
                                                <ChevronUpIcon className="h-5 w-5" />
                                            ) : (
                                                <ChevronDownIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {expandedBill === bill.id && (
                                    <div className="mt-4 border-t border-gray-200 pt-4">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Prescription ID</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{bill.prescriptionId || 'N/A'}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{bill.prescription?.doctorName || 'N/A'}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{formatDate(bill.dueDate)}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Created Date</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{formatDate(bill.createdAt)}</dd>
                                            </div>
                                        </dl>

                                        <div className="mt-6">
                                            <h4 className="text-sm font-medium text-gray-900">Items</h4>
                                            <div className="mt-2 overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Medication
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Quantity
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Unit Price
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Total
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {(bill.items || []).map((item) => (
                                                            <tr key={item.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {item.medicationName || 'N/A'}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {item.quantity || 0}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {formatCurrency(item.unitPrice)}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {formatCurrency(item.total)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <dl className="mt-4 space-y-2">
                                                <div className="flex justify-between">
                                                    <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                                                    <dd className="text-sm text-gray-900">{formatCurrency(bill.subtotal)}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="text-sm font-medium text-gray-500">Tax</dt>
                                                    <dd className="text-sm text-gray-900">{formatCurrency(bill.tax)}</dd>
                                                </div>
                                                <div className="flex justify-between border-t border-gray-200 pt-2">
                                                    <dt className="text-base font-medium text-gray-900">Total</dt>
                                                    <dd className="text-base font-medium text-gray-900">{formatCurrency(bill.total)}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminBillsList; 