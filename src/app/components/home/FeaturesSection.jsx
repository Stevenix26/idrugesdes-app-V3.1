"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { FaTruck, FaUserMd } from 'react-icons/fa';

const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive healthcare solutions designed for your convenience and peace of mind.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                    >
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                            <MdOutlineHealthAndSafety className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Prescriptions</h3>
                        <p className="text-gray-600 mb-4">Securely manage and track your prescriptions with our advanced digital platform.</p>
                        <Link href="/store" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                            Learn more
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                    >
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                            <FaTruck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Swift Delivery</h3>
                        <p className="text-gray-600 mb-4">Get medications delivered to your doorstep with our reliable delivery service.</p>
                        <Link href="/store" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                            Learn more
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                    >
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                            <FaUserMd className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Guidance</h3>
                        <p className="text-gray-600 mb-4">Access professional healthcare advice from qualified pharmacists anytime.</p>
                        <Link href="/store" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                            Learn more
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection; 