'use client'
import React, { useEffect, useState } from "react";

const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return data.users;
};

const updateUser = async (id, role, deactivate) => {
    const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role, deactivate }),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
};

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [editRole, setEditRole] = useState("");
    const [deactivateId, setDeactivateId] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleEdit = (user) => {
        setEditId(user.id);
        setEditRole(user.role);
    };

    const handleSave = async () => {
        try {
            await updateUser(editId, editRole, undefined);
            setUsers((prev) => prev.map((u) => (u.id === editId ? { ...u, role: editRole } : u)));
            setEditId(null);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await updateUser(id, undefined, true);
            setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: "PATIENT" } : u)));
            setDeactivateId(null);
        } catch (e) {
            setError(e.message);
        }
    };

    if (loading) return <div className="p-8">Loading users...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;

    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                    <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">User Analytics</h1>
                    <div className="flex gap-4">
                        <div className="bg-indigo-100 rounded-xl p-4 flex flex-col items-center shadow-md">
                            <span className="text-2xl font-bold text-indigo-700">{users.length}</span>
                            <span className="text-indigo-500 text-sm">Total Users</span>
                        </div>
                        <div className="bg-green-100 rounded-xl p-4 flex flex-col items-center shadow-md">
                            <span className="text-2xl font-bold text-green-700">{users.filter(u => u.role === 'PHARMACIST').length}</span>
                            <span className="text-green-500 text-sm">Pharmacists</span>
                        </div>
                        <div className="bg-yellow-100 rounded-xl p-4 flex flex-col items-center shadow-md">
                            <span className="text-2xl font-bold text-yellow-700">{users.filter(u => u.role === 'PATIENT').length}</span>
                            <span className="text-yellow-500 text-sm">Patients</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white">
                                <th className="px-4 py-3 text-left font-semibold">Name</th>
                                <th className="px-4 py-3 text-left font-semibold">Email</th>
                                <th className="px-4 py-3 text-left font-semibold">Role</th>
                                <th className="px-4 py-3 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-indigo-50 cursor-pointer transition">
                                    <td className="px-4 py-3 font-medium text-gray-900">{user.fname} {user.lname}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">
                                        {editId === user.id ? (
                                            <select
                                                value={editRole}
                                                onChange={(e) => setEditRole(e.target.value)}
                                                className="border rounded px-2 py-1"
                                            >
                                                <option value="PATIENT">PATIENT</option>
                                                <option value="PHARMACIST">PHARMACIST</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        ) : (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : user.role === 'PHARMACIST' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{user.role}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 space-x-2">
                                        {editId === user.id ? (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditId(null)}
                                                    className="bg-gray-300 px-3 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeactivate(user.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Deactivate
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default UsersPage;