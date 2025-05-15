"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
    name: "",
    description: "",
    address: "",
    phone: "",
    pcn: "",
    image: null,
};

const SellerStore = () => {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const validate = () => {
        if (!form.name || !form.description || !form.address || !form.phone || !form.pcn || !form.image) {
            setError("All fields are required, including a store image.");
            return false;
        }
        if (!/^\d{10,}$/.test(form.phone)) {
            setError("Phone number must be at least 10 digits.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const res = await fetch("/api/stores", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error("Failed to register store");
            setSuccess("Store registered successfully!");
            setForm(initialForm);
            setTimeout(() => router.push("/store"), 1500);
        } catch (err) {
            setError(err.message || "An error occurred");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center py-8 px-2">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">Register Your Store</h1>
                <p className="text-center text-gray-600 mb-6">Fill in your store details to become a seller.</p>
                <form className="space-y-5" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" name="address" value={form.address} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">PCN License Number</label>
                        <input type="text" name="pcn" value={form.pcn} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Photo</label>
                        <input type="file" name="image" accept="image/*" onChange={handleChange} required className="mt-1 block w-full text-gray-700" />
                    </div>
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? "Registering..." : "Register Store"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SellerStore;