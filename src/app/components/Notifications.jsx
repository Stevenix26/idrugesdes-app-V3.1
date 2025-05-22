'use client';

import React from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const NotificationTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
};

const NotificationIcons = {
    [NotificationTypes.SUCCESS]: CheckCircleIcon,
    [NotificationTypes.ERROR]: ExclamationCircleIcon,
    [NotificationTypes.INFO]: InformationCircleIcon,
    [NotificationTypes.WARNING]: ExclamationCircleIcon,
};

const NotificationColors = {
    [NotificationTypes.SUCCESS]: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100',
    [NotificationTypes.ERROR]: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100',
    [NotificationTypes.INFO]: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    [NotificationTypes.WARNING]: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
};

const IconColors = {
    [NotificationTypes.SUCCESS]: 'text-green-400 dark:text-green-300',
    [NotificationTypes.ERROR]: 'text-red-400 dark:text-red-300',
    [NotificationTypes.INFO]: 'text-blue-400 dark:text-blue-300',
    [NotificationTypes.WARNING]: 'text-yellow-400 dark:text-yellow-300',
};

const Notification = ({ type = NotificationTypes.INFO, title, message, onClose, autoClose = true }) => {
    const Icon = NotificationIcons[type];

    React.useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [autoClose, onClose]);

    return (
        <div className={`rounded-md p-4 ${NotificationColors[type]}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <Icon className={`h-5 w-5 ${IconColors[type]}`} aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1">
                    {title && (
                        <h3 className="text-sm font-medium">
                            {title}
                        </h3>
                    )}
                    {message && (
                        <div className="mt-2 text-sm">
                            {message}
                        </div>
                    )}
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button
                        type="button"
                        className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${type === NotificationTypes.SUCCESS ? 'focus:ring-green-500' :
                            type === NotificationTypes.ERROR ? 'focus:ring-red-500' :
                                type === NotificationTypes.INFO ? 'focus:ring-blue-500' :
                                    'focus:ring-yellow-500'
                            }`}
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const NotificationsContainer = ({ notifications, onClose }) => {
    if (!notifications.length) return null;

    return (
        <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 max-w-sm w-full">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    {...notification}
                    onClose={() => onClose(notification.id)}
                />
            ))}
        </div>
    );
};

export { NotificationsContainer, NotificationTypes }; 