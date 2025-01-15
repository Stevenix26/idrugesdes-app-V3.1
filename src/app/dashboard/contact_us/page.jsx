// pages/contact_us.js

import React from 'react';
import Image from 'next/image';
import ContactImage from '../../../../public/images/contact us.png'; // Replace with your actual image
// Replace with your actual image

const ContactUsPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-white p-8">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="mt-2">We are here to assist you. Feel free to reach out to us using the information below or by filling out the contact form.</p>
                </div>
            </header>

            <div className="container mx-auto mt-8 p-7">
                <section className=" grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <p className="text-gray-700 mb-4">
                            Have a question or need assistance? Contact us using the information below:
                        </p>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Email:</h3>
                            <p><a href="mailto:info@pharmacyexample.com">info@pharmacyexample.com</a></p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Phone:</h3>
                            <p><a href="tel:+11234567890">+1 (123) 456-7890</a></p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Address:</h3>
                            <p>123 Pharmacy Street, Cityville, Country</p>
                        </div>
                    </div>

                    <div className="relative">
                        <Image
                            src={ContactImage}
                            alt="Contact Us"
                            className="rounded-lg shadow-md"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
                    <p className="text-gray-700 mb-4">
                        Fill out the form below, and we'll get back to you as soon as possible.
                    </p>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name:</label>
                            <input type="text" id="name" name="name" className="input input-primary w-full border" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold mb-2">Your Email:</label>
                            <input type="email" id="email" name="email" className="input input-primary w-full border" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-semibold mb-2">Your Message:</label>
                            <textarea id="message" name="message" rows="4" className="textarea textarea-primary w-full border"></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ContactUsPage;
