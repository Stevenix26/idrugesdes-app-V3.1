// pages/help.js

import React from 'react';

const HelpPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-3">
            <header className="bg-primary text-white p-8">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold">Prescription Help Center</h1>
                    <p className="mt-2">Welcome to our Prescription Help Center. Find answers to common questions about prescriptions and our services below.</p>
                </div>
            </header>

            <div className="container mx-auto mt-8 p-4">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">How do I upload a prescription?</h3>
                        <p>To upload your prescription, log in to your account and navigate to the "Prescriptions" section. Click on the "Upload Prescription" button, choose the file from your device, and submit it. Our team will review and process your prescription.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">What medications are available through your pharmacy?</h3>
                        <p>We offer a wide range of prescription medications for various health conditions. You can browse our online catalog or search for specific medications. If you can't find a particular medication, feel free to contact our support team for assistance.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">How can I track the status of my prescription order?</h3>
                        <p>Once your prescription order is placed, you can track its status by logging into your account and checking the "Order History" section. We provide real-time updates on the processing and shipping status of your prescription. You will also receive email notifications for important updates.</p>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

                    <div className="mb-6">
                        <p>If you have additional questions or need personalized assistance, our support team is here to help.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Email:</h3>
                        <p>Contact our support team via email at <a href="mailto:support@pharmacyexample.com">support@pharmacyexample.com</a></p>
                    </div>
                    
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Phone:</h3>
                        <p>Reach us by phone at <a href="tel:+11234567890">+1 (123) 456-7890</a></p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Business Hours:</h3>
                        <p>Our customer support team is available during our business hours from Monday to Friday, 9 AM to 6 PM (EST).</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpPage;
