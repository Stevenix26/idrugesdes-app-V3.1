"use client"
import React, { useState } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const summaryStats = [
  { label: "Total Orders", value: 1240 },
  { label: "Prescriptions", value: 860 },
  { label: "Active Users", value: 320 },
  { label: "Pending Inquiries", value: 17 },
];

const orderData = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 150 },
  { month: "Mar", orders: 200 },
  { month: "Apr", orders: 180 },
  { month: "May", orders: 240 },
  { month: "Jun", orders: 350 },
];

const prescriptionData = [
  { name: "Approved", value: 600 },
  { name: "Pending", value: 180 },
  { name: "Rejected", value: 80 },
];
const COLORS = ["#6366f1", "#fbbf24", "#ef4444"];

const userGrowthData = [
  { month: "Jan", users: 40 },
  { month: "Feb", users: 60 },
  { month: "Mar", users: 90 },
  { month: "Apr", users: 120 },
  { month: "May", users: 180 },
  { month: "Jun", users: 320 },
];

const recentActivity = [
  { type: "Order", desc: "Order #1024 placed", time: "2 min ago" },
  { type: "Prescription", desc: "Prescription #204 approved", time: "10 min ago" },
  { type: "User", desc: "New user registered", time: "30 min ago" },
  { type: "Order", desc: "Order #1023 shipped", time: "1 hr ago" },
];

const timeRanges = ["Last 7 days", "Last 30 days", "This Year"];

const AdminDashboard = () => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]);
  return (
    <>
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8 mt-6 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-indigo-900">Admin Analytics Dashboard</h1>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Time Range:</span>
            <select
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={selectedRange}
              onChange={e => setSelectedRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaryStats.map(stat => (
            <div key={stat.label} className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center shadow">
              <span className="text-2xl font-bold text-indigo-700">{stat.value}</span>
              <span className="text-sm text-gray-600 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Orders Bar Chart */}
          <div className="bg-slate-50 rounded-lg p-4 shadow flex flex-col items-center">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">Orders Trend</h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={orderData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Prescriptions Pie Chart */}
          <div className="bg-slate-50 rounded-lg p-4 shadow flex flex-col items-center">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">Prescriptions Status</h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={prescriptionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                  {prescriptionData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* User Growth Line Chart */}
          <div className="bg-slate-50 rounded-lg p-4 shadow flex flex-col items-center">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">User Growth</h2>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Recent Activity Feed */}
        <div className="bg-slate-50 rounded-lg p-4 shadow mb-8">
          <h2 className="text-lg font-semibold text-indigo-800 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-indigo-100">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="py-2 flex items-center justify-between">
                <span className="text-gray-700">{item.desc}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">Quick Admin Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/orders">
                <div className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 transition rounded-lg p-4 flex flex-col items-center shadow-md">
                  <span className="text-base font-semibold text-indigo-800 mb-1">Orders</span>
                  <span className="text-indigo-500 text-xs">Go to Orders</span>
                </div>
              </Link>
              <Link href="/admin/prescriptionList">
                <div className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 transition rounded-lg p-4 flex flex-col items-center shadow-md">
                  <span className="text-base font-semibold text-indigo-800 mb-1">Prescriptions</span>
                  <span className="text-indigo-500 text-xs">Go to Prescriptions</span>
                </div>
              </Link>
              <Link href="/admin/contacts">
                <div className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 transition rounded-lg p-4 flex flex-col items-center shadow-md">
                  <span className="text-base font-semibold text-indigo-800 mb-1">Users</span>
                  <span className="text-indigo-500 text-xs">Go to Users</span>
                </div>
              </Link>
              <Link href="/admin/inbox">
                <div className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 transition rounded-lg p-4 flex flex-col items-center shadow-md">
                  <span className="text-base font-semibold text-indigo-800 mb-1">Inbox</span>
                  <span className="text-indigo-500 text-xs">Go to Inbox</span>
                </div>
              </Link>
            </div>
          </div>
          {/* Placeholder for future advanced features */}
          <div className="col-span-1 flex flex-col items-center justify-center bg-indigo-50 rounded-lg p-4 shadow-md">
            <span className="text-indigo-700 font-semibold mb-2">Advanced Features Coming Soon</span>
            <span className="text-xs text-gray-500">AI-powered analytics, export tools, and more will be available here.</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );};
export default AdminDashboard;