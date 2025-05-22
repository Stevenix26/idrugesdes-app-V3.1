"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";

export default function PharmacistDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");

  const pharmacistStats = [
    {
      title: "Pending Prescriptions",
      value: "12",
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
      ),
      desc: "Awaiting review",
    },
    {
      title: "Inventory Items",
      value: "486",
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          ></path>
        </svg>
      ),
      desc: "In stock",
    },
    {
      title: "Daily Orders",
      value: "31",
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          ></path>
        </svg>
      ),
      desc: "Last 24 hours",
    },
  ];

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 gap-6 p-6 rounded-lg bg-base-100 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Pharmacist Dashboard</h1>
              <Link
                href="/dashboard/inventory/manage"
                className="btn btn-primary"
              >
                Manage Inventory
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
                className={`tab ${activeTab === "prescriptions" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("prescriptions")}
              >
                Prescription Queue
              </a>
              <a
                className={`tab ${activeTab === "inventory" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("inventory")}
              >
                Inventory
              </a>
            </div>

            <div className="stats shadow-lg bg-base-200">
              {pharmacistStats.map((stat, index) => (
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
                        href="/dashboard/prescriptions/review"
                        className="btn btn-outline"
                      >
                        Review Prescriptions
                      </Link>
                      <Link
                        href="/dashboard/inventory/update"
                        className="btn btn-outline"
                      >
                        Update Inventory
                      </Link>
                      <Link
                        href="/dashboard/messages"
                        className="btn btn-outline"
                      >
                        Message Patients
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
                            <td>New prescription request from John Doe</td>
                            <td>2 hours ago</td>
                          </tr>
                          <tr>
                            <td>Updated inventory - Added new medications</td>
                            <td>5 hours ago</td>
                          </tr>
                          <tr>
                            <td>Prescription approved for Jane Smith</td>
                            <td>Yesterday</td>
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
