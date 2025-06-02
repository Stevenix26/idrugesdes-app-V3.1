"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaClock, FaHospitalUser } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden min-h-[90vh]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/doctor1.png"
                    alt="Healthcare Hero"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                    quality={100}
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/75 via-indigo-500/65 to-blue-900/55"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40 flex flex-col items-center justify-center text-center min-h-[90vh]">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    Your Digital <span className="text-blue-400">Healthcare</span> Companion
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Experience the future of healthcare with secure prescription management and doorstep medication delivery.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <Link
                        href="/store"
                        className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto text-center"
                    >
                        Find a Pharmacy
                    </Link>
                    <Link
                        href="#features"
                        className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center backdrop-blur-sm"
                    >
                        Learn More
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="flex items-center justify-center gap-3 text-gray-200 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg"
                    >
                        <FaShieldAlt className="w-5 h-5 text-blue-400" />
                        <span>Secure & Encrypted</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.6 }}
                        className="flex items-center justify-center gap-3 text-gray-200 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg"
                    >
                        <FaClock className="w-5 h-5 text-blue-400" />
                        <span>24/7 Service</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="flex items-center justify-center gap-3 text-gray-200 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg"
                    >
                        <FaHospitalUser className="w-5 h-5 text-blue-400" />
                        <span>Licensed Partners</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection; 