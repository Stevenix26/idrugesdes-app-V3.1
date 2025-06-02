"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaPrescription, FaTruck, FaCheckCircle } from 'react-icons/fa';

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <FaUserPlus className="w-8 h-8" />,
            title: 'Create Account',
            description: 'Sign up and complete your profile with basic health information.'
        },
        {
            icon: <FaPrescription className="w-8 h-8" />,
            title: 'Upload Prescription',
            description: 'Securely upload your prescription through our digital platform.'
        },
        {
            icon: <FaTruck className="w-8 h-8" />,
            title: 'Confirm Delivery',
            description: 'Choose your delivery preferences and confirm your order.'
        },
        {
            icon: <FaCheckCircle className="w-8 h-8" />,
            title: 'Receive Medications',
            description: 'Get your medications delivered safely to your doorstep.'
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Get your medications in four simple steps
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative z-10">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-blue-200"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection; 