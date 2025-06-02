"use client"
import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatsSection = () => {
    const stats = [
        { number: 50000, suffix: '+', label: 'Happy Customers' },
        { number: 100, suffix: '+', label: 'Partner Pharmacies' },
        { number: 99.9, suffix: '%', label: 'Delivery Success Rate' },
        { number: 24, suffix: '/7', label: 'Customer Support' }
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                <CountUp
                                    end={stat.number}
                                    duration={2.5}
                                    decimals={stat.number % 1 !== 0 ? 1 : 0}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <p className="text-blue-100 text-lg">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection; 