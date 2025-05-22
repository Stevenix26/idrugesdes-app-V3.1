"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";

export default function PatientDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");

  const patientStats = [
    {
      title: "Active Prescriptions",
      value: "3",
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
      desc: "Current medications",
    },
    {
      title: "Pending Requests",
      value: "2",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      desc: "Awaiting approval",
    },
    {
      title: "Completed Orders",
      value: "15",
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
      desc: "Historical orders",
    },
  ];

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 gap-6 p-6 rounded-lg bg-base-100 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Patient Dashboard</h1>
              <Link
                href="/dashboard/prescription/new"
                className="btn btn-primary"
              >
                New Prescription
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
                My Prescriptions
              </a>
              <a
                className={`tab ${activeTab === "orders" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                My Orders
              </a>
            </div>

            <div className="stats shadow-lg bg-base-200">
              {patientStats.map((stat, index) => (
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
                        href="/dashboard/prescription/new"
                        className="btn btn-outline"
                      >
                        Submit Prescription
                      </Link>
                      <Link
                        href="/dashboard/orders/refill"
                        className="btn btn-outline"
                      >
                        Order Refill
                      </Link>
                      <Link
                        href="/dashboard/messages"
                        className="btn btn-outline"
                      >
                        Contact Pharmacy
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
                            <td>Prescription request approved</td>
                            <td>1 hour ago</td>
                          </tr>
                          <tr>
                            <td>Medication ready for pickup</td>
                            <td>3 hours ago</td>
                          </tr>
                          <tr>
                            <td>New prescription submitted</td>
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
