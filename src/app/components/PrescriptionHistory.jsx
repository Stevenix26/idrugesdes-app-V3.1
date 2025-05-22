'use client';

import React from 'react';
import { format } from 'date-fns';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
    </div>
);

const PrescriptionHistory = ({ auditLogs, isLoading = false }) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!auditLogs?.length) {
        return (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No history available
            </div>
        );
    }

    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {auditLogs.map((log, logIdx) => (
                    <li key={log.id}>
                        <div className="relative pb-8">
                            {logIdx !== auditLogs.length - 1 ? (
                                <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                                    aria-hidden="true"
                                />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900 ${log.action.includes('APPROVED')
                                        ? 'bg-green-500'
                                        : log.action.includes('REJECTED')
                                            ? 'bg-red-500'
                                            : 'bg-gray-500'
                                        }`}>
                                        {log.action.includes('Status') ? (
                                            <ClockIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                        ) : (
                                            <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                        )}
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-800 dark:text-gray-200">
                                            {log.action}
                                            {log.details && (
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    : {log.details}
                                                </span>
                                            )}
                                            {log.user && (
                                                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    by {log.user}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                        <time dateTime={log.timestamp}>
                                            {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrescriptionHistory; 