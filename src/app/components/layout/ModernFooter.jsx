'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';

const ModernFooter = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 text-white relative">
            {/* Wave SVG Divider */}
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-20 -mb-1 transform transition-transform duration-700 hover:scale-y-110">
                    <path
                        fill="#f3f4f6"
                        fillOpacity="1"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                    </path>
                </svg>
            </div>

            {/* Scroll to top button */}
            <button
                onClick={scrollToTop}
                className="absolute right-6 -top-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 z-10"
                aria-label="Scroll to top"
            >
                <FaArrowUp />
            </button>

            <div className="container mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-6 sm:pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Company Info */}
                    <div className="mb-8">
                        <div className="flex items-center mb-5">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 shadow-lg transform transition-transform hover:scale-110 duration-300">
                                <span className="text-white font-bold text-xl">ID</span>
                            </div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Idrugdes</h3>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Your trusted digital healthcare companion for secure prescription management and medication delivery. We connect patients with pharmacies for a seamless healthcare experience.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125" aria-label="Facebook">
                                <FaFacebook size={22} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125" aria-label="Twitter">
                                <FaTwitter size={22} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125" aria-label="Instagram">
                                <FaInstagram size={22} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125" aria-label="LinkedIn">
                                <FaLinkedin size={22} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-5 border-b border-gray-700 pb-2 inline-block text-blue-300">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group">
                                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/store" className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group">
                                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">Store</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group">
                                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/sellerstore" className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group">
                                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">Become a Seller</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-5 border-b border-gray-700 pb-2 inline-block text-blue-300">Our Services</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group cursor-pointer">
                                <span className="transform group-hover:translate-x-2 transition-transform duration-300">Digital Prescriptions</span>
                            </li>
                            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group cursor-pointer">
                                <span className="transform group-hover:translate-x-2 transition-transform duration-300">Medication Delivery</span>
                            </li>
                            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group cursor-pointer">
                                <span className="transform group-hover:translate-x-2 transition-transform duration-300">Healthcare Consultation</span>
                            </li>
                            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group cursor-pointer">
                                <span className="transform group-hover:translate-x-2 transition-transform duration-300">Pharmacy Network</span>
                            </li>
                            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group cursor-pointer">
                                <span className="transform group-hover:translate-x-2 transition-transform duration-300">Health Tracking</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-5 border-b border-gray-700 pb-2 inline-block text-blue-300">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start group">
                                <FaMapMarkerAlt className="text-blue-400 mr-3 mt-1 group-hover:text-indigo-300 transition-colors duration-300" size={18} />
                                <span className="text-gray-300 group-hover:text-blue-200 transition-colors duration-300">123 Healthcare Avenue, Medical District, NG</span>
                            </li>
                            <li className="flex items-center group">
                                <FaPhone className="text-blue-400 mr-3 group-hover:text-indigo-300 transition-colors duration-300" size={18} />
                                <a href="tel:+2341234567890" className="text-gray-300 group-hover:text-blue-200 transition-colors duration-300">+234 123 456 7890</a>
                            </li>
                            <li className="flex items-center group">
                                <FaEnvelope className="text-blue-400 mr-3 group-hover:text-indigo-300 transition-colors duration-300" size={18} />
                                <a href="mailto:contact@idrugdes.com" className="text-gray-300 group-hover:text-blue-200 transition-colors duration-300">contact@idrugdes.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-6 mb-10">
                    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-300">Subscribe to Our Newsletter</h3>
                        <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">Stay updated with our latest health tips, medication information, and exclusive offers.</p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white border border-gray-600"
                                aria-label="Email address"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-md"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-4 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center col-span-1 md:col-span-2 lg:col-span-4">
                    <p className="text-sm text-gray-400 mb-4 md:mb-0">
                        &copy; {currentYear} Idrugdes. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-center">
                        <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="/faq" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 hover:underline">
                            FAQ
                        </Link>
                        <Link href="/sitemap" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 hover:underline">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ModernFooter;