// pages/help.js

import React from 'react';
import {
    QuestionMarkCircleIcon,
    DocumentTextIcon,
    TruckIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';

const HelpPage = () => {
    const faqs = [
        {
            icon: DocumentTextIcon,
            title: "How to Submit a Prescription",
            content: "To submit a prescription, navigate to the \"Submit Prescription\" section in your dashboard. Upload a clear image of your prescription and fill in the required details. Our pharmacists will review and process your request."
        },
        {
            icon: TruckIcon,
            title: "Tracking Your Orders",
            content: "You can track your orders in the \"My Orders\" section. Each order will show its current status, from processing to delivery. You'll receive notifications at each step."
        },
        {
            icon: PhoneIcon,
            title: "Contact Support",
            content: "Need more help? Our support team is available 24/7. Use the \"Contact Us\" form or email us at support@idrugdes.com."
        }
    ];

    const contactInfo = [
        {
            title: "Email",
            content: "support@idrugdes.com",
            link: "mailto:support@idrugdes.com"
        },
        {
            title: "Phone",
            content: "+234-81-0518-7774",
            link: "tel:+2348105187774"
        },
        {
            title: "Business Hours",
            content: "Monday to Friday, 9 AM to 6 PM (WAT)",
            link: null
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center space-x-4 mb-6">
                        <QuestionMarkCircleIcon className="h-10 w-10 text-indigo-200" />
                        <h1 className="text-3xl md:text-4xl font-bold">Help Center</h1>
                    </div>
                    <p className="text-indigo-100 text-lg max-w-2xl">
                        Find answers to common questions and learn how to make the most of iDrugdes.
                    </p>
                </div>
            </header>

            <main className="container mx-auto max-w-4xl px-4 py-8">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-105"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <faq.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {faq.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {faq.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                        Contact Information
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="text-center">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                        {info.title}
                                    </h3>
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                            {info.content}
                                        </a>
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {info.content}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HelpPage;
