"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Regular Customer',
            image: '/images/doctor1.png',
            content: 'iDrugDes has made managing my prescriptions so much easier. The delivery is always on time and the service is exceptional!',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Chronic Care Patient',
            image: '/images/ladylooking.jpg',
            content: 'As someone who needs regular medication, this service has been a game-changer. The app is user-friendly and the support team is very helpful.',
            rating: 5
        },
        {
            name: 'Emily Rodriguez',
            role: 'Elderly Care',
            image: '/images/ladycot.jpg',
            content: 'I use this service for my elderly mother, and it has made medication management so much more convenient. Highly recommended!',
            rating: 5
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Trusted by thousands of customers nationwide
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                                    <p className="text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection; 