"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the newsletter subscription
        setStatus('Thank you for subscribing!');
        setEmail('');
    };

    const contactInfo = [
        {
            icon: <FaPhone className="w-6 h-6" />,
            title: 'Phone',
            content: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: <FaEnvelope className="w-6 h-6" />,
            title: 'Email',
            content: 'support@idrugdes.com',
            link: 'mailto:support@idrugdes.com'
        },
        {
            icon: <FaMapMarkerAlt className="w-6 h-6" />,
            title: 'Address',
            content: '123 Healthcare Ave, Medical District',
            link: '#'
        }
    ];

    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Stay Updated with Health Tips</h2>
                        <p className="text-gray-300 text-lg mb-8">
                            Subscribe to our newsletter for the latest health insights, medication tips, and exclusive offers.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Subscribe
                                </button>
                            </div>
                            {status && (
                                <p className="text-green-400 mt-2">{status}</p>
                            )}
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                        {contactInfo.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-300"
                            >
                                <div className="p-3 bg-blue-600/20 rounded-lg">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">{item.title}</h4>
                                    <p>{item.content}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection; 