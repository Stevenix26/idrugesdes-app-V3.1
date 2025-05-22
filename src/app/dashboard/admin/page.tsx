"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");

  const adminStats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-8 h-8 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
      desc: "Active accounts",
    },
    {
      title: "Pending Verifications",
      value: "23",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-8 h-8 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      desc: "Awaiting review",
    },
    {
      title: "System Health",
      value: "98%",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-8 h-8 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
      desc: "System uptime",
    },
  ];

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 gap-6 p-6 rounded-lg bg-base-100 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <Link
                href="/dashboard/admin/settings"
                className="btn btn-primary"
              >
                System Settings
              </Link>
            </div>

            <div className="tabs tabs-boxed">
              <a
                className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </a>
              <a
                className={`tab ${activeTab === "users" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                User Management
              </a>
              <a
                className={`tab ${activeTab === "verifications" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("verifications")}
              >
                Verifications
              </a>
              <a
                className={`tab ${activeTab === "logs" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("logs")}
              >
                System Logs
              </a>
            </div>

            <div className="stats shadow-lg bg-base-200">
              {adminStats.map((stat, index) => (
                <div key={index} className="stat">
                  <div className="stat-figure text-primary">{stat.icon}</div>
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-value text-primary">{stat.value}</div>
                  <div className="stat-desc">{stat.desc}</div>
                </div>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h2 className="card-title">Quick Actions</h2>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/dashboard/admin/users"
                        className="btn btn-outline"
                      >
                        Manage Users
                      </Link>
                      <Link
                        href="/dashboard/admin/verifications"
                        className="btn btn-outline"
                      >
                        Review Verifications
                      </Link>
                      <Link
                        href="/dashboard/admin/reports"
                        className="btn btn-outline"
                      >
                        View Reports
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h2 className="card-title">Recent Activity</h2>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <tbody>
                          <tr>
                            <td>New pharmacist verification request</td>
                            <td>30 mins ago</td>
                          </tr>
                          <tr>
                            <td>System backup completed</td>
                            <td>2 hours ago</td>
                          </tr>
                          <tr>
                            <td>User role updated</td>
                            <td>4 hours ago</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
