"use client";

import React, { useState, useEffect } from "react";
import {
  ChartBarIcon,
  ClipboardDocumentIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface DashboardStats {
  pending: number;
  approved: number;
  rejected: number;
  todayCount: number;
  totalPatients: number;
  totalPrescriptions: number;
}

export default function PharmacistDashboard() {
  const router = useRouter();
  const { isPharmacist, isLoadingDbUser } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    pending: 0,
    approved: 0,
    rejected: 0,
    todayCount: 0,
    totalPatients: 0,
    totalPrescriptions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoadingDbUser) {
      if (!isPharmacist) {
        router.push("/dashboard");
        return;
      }

      const fetchStats = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetch("/api/pharmacist/stats");

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch stats");
          }

          const data = await response.json();
          setStats(data);
        } catch (error) {
          console.error("Error fetching stats:", error);
          setError(
            error instanceof Error ? error.message : "Failed to fetch stats"
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchStats();
    }
  }, [isPharmacist, isLoadingDbUser, router]);

  if (isLoadingDbUser || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <ArrowPathIcon className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
          <ExclamationTriangleIcon className="w-6 h-6" />
          <p>{error}</p>
        </div>
        {error.includes("verification") ? (
          <Link
            href="/auth/pharmacist-verification"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Complete Verification
          </Link>
        ) : (
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pharmacist Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your pharmacy operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <ClipboardDocumentIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Reviews
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Today's Queue
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.todayCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Patients
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.totalPatients}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
              <ClipboardDocumentIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Prescriptions
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.totalPrescriptions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Review Prescriptions",
              href: "/pharmacist/prescriptions?filter=pending",
              icon: ClipboardDocumentIcon,
              count: stats.pending,
              color: "text-yellow-600",
            },
            {
              name: "Manage Store",
              href: "/pharmacist/store",
              icon: BuildingStorefrontIcon,
              color: "text-blue-600",
            },
            {
              name: "Patient Records",
              href: "/pharmacist/patients",
              icon: UserGroupIcon,
              count: stats.totalPatients,
              color: "text-green-600",
            },
          ].map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                  <action.icon
                    className={`h-6 w-6 ${action.color} dark:${action.color}`}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.name}
                  </p>
                  {action.count !== undefined && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.count} items
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
