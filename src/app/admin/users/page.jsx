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
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
                <h1 className="text-2xl font-bold text-indigo-900 mb-6">User Management</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2">{user.fname} {user.lname}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
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
                                        user.role
                                    )}
                                </td>
                                <td className="px-4 py-2 space-x-2">
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
        </section>
    );
};

export default UsersPage;