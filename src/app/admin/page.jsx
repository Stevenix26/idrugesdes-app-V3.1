"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, CartesianGrid } from "recharts";
import { ArrowDownTrayIcon, FunnelIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState({
    summaryStats,
    orderData,
    prescriptionData,
    userGrowthData,
    recentActivity
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadData();
    // Set up real-time updates
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [selectedRange]);

  const loadData = async () => {
    try {
      setIsRefreshing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update data based on selected range
      const updatedData = {
        summaryStats: summaryStats.map(stat => ({
          ...stat,
          value: Math.floor(stat.value * (1 + Math.random() * 0.1))
        })),
        orderData: orderData.map(item => ({
          ...item,
          orders: Math.floor(item.orders * (1 + Math.random() * 0.1))
        })),
        prescriptionData: prescriptionData.map(item => ({
          ...item,
          value: Math.floor(item.value * (1 + Math.random() * 0.1))
        })),
        userGrowthData: userGrowthData.map(item => ({
          ...item,
          users: Math.floor(item.users * (1 + Math.random() * 0.1))
        })),
        recentActivity: [
          {
            type: "Order",
            desc: `Order #${Math.floor(Math.random() * 1000)} placed`,
            time: "Just now"
          },
          ...recentActivity.slice(0, 3)
        ]
      };

      setFilteredData(updatedData);
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic here
    const filtered = {
      ...filteredData,
      recentActivity: recentActivity.filter(activity =>
        activity.desc.toLowerCase().includes(query.toLowerCase())
      )
    };
    setFilteredData(filtered);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const exportData = (type) => {
    const data = {
      summaryStats,
      orderData,
      prescriptionData,
      userGrowthData,
      recentActivity
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-dashboard-${type}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-700">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8 mt-6 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-indigo-900">Admin Analytics Dashboard</h1>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={selectedRange}
              onChange={e => setSelectedRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <ArrowPathIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => exportData(selectedRange)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {filteredData.summaryStats.map(stat => (
                <div key={stat.label} className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-md transition-shadow">
                  <span className="text-2xl font-bold text-indigo-700">{stat.value}</span>
                  <span className="text-sm text-gray-600 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Orders Bar Chart */}
              <div className="bg-slate-50 rounded-lg p-4 shadow flex flex-col items-center hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-indigo-800 mb-2">Orders Trend</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={filteredData.orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Prescriptions Pie Chart */}
              <div className="bg-slate-50 rounded-lg p-4 shadow flex flex-col items-center hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-indigo-800 mb-2">Prescriptions Status</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={filteredData.prescriptionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {filteredData.prescriptionData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;