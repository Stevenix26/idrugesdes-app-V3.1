"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  NotificationsContainer,
  NotificationTypes,
} from "@/app/components/Notifications";

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  medication: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  prescriptionFilePath?: string;
  phoneNumber?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  notes?: string;
  declineReason?: string;
  pharmacistId?: string;
  pharmacistName?: string;
}

interface PrescriptionStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  todayCount: number;
}

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
}

interface Filters {
  status: string;
  date: string;
  sortBy: string;
  order: "asc" | "desc";
}

const PharmacistDashboard = (): JSX.Element => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notes, setNotes] = useState("");
  const [filters, setFilters] = useState<Filters>({
    status: "PENDING",
    date: "all",
    sortBy: "date",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { ...notification, id }]);
    },
    []
  );

  const fetchPrescriptions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/prescriptions/pharmacist");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch prescriptions");
      }
      const data = await response.json();
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      addNotification({
        type: NotificationTypes.ERROR,
        title: "Error",
        message: "Failed to load prescriptions",
      });
    } finally {
      setIsLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    if (!isUserLoaded || !user) return;

    const verifyPharmacist = async () => {
      try {
        const response = await fetch("/api/pharmacist/verify", {
          method: "POST",
        });

        if (!response.ok) {
          setIsAuthorized(false);
          router.push("/dashboard");
          return;
        }

        await fetchPrescriptions();
      } catch (error) {
        console.error("Error verifying pharmacist:", error);
        setIsAuthorized(false);
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPharmacist();
  }, [user, isUserLoaded, router, fetchPrescriptions]);

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | undefined;
    if (autoRefresh) {
      refreshInterval = setInterval(fetchPrescriptions, 30000);
    }
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [autoRefresh, fetchPrescriptions]);

  const handlePrescriptionAction = async (
    prescriptionId: string,
    action: "approve" | "reject",
    notes = ""
  ) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/prescriptions/${prescriptionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: action === "approve" ? "APPROVED" : "REJECTED",
          notes: notes.trim(),
          pharmacistId: user?.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update prescription");
      }

      addNotification({
        type: NotificationTypes.SUCCESS,
        title: "Success",
        message: `Prescription ${action === "approve" ? "approved" : "rejected"} successfully`,
      });

      fetchPrescriptions();
      setSelectedPrescription(null);
    } catch (error) {
      console.error("Error updating prescription:", error);
      addNotification({
        type: NotificationTypes.ERROR,
        title: "Error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update prescription",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPrescriptions();
    setIsRefreshing(false);
  };

  const filteredPrescriptions = useMemo(() => {
    return prescriptions
      .filter((prescription) => {
        const matchesStatus =
          filters.status === "all" || prescription.status === filters.status;
        const matchesSearch =
          searchTerm === "" ||
          prescription.patientName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          prescription.doctorName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          prescription.medication
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        let matchesDate = true;
        if (filters.date !== "all") {
          const prescriptionDate = new Date(prescription.createdAt).valueOf();
          const today = new Date().valueOf();
          const daysDiff = Math.floor(
            (today - prescriptionDate) / (1000 * 60 * 60 * 24)
          );

          switch (filters.date) {
            case "today":
              matchesDate = daysDiff === 0;
              break;
            case "week":
              matchesDate = daysDiff <= 7;
              break;
            case "month":
              matchesDate = daysDiff <= 30;
              break;
          }
        }

        return matchesStatus && matchesSearch && matchesDate;
      })
      .sort((a, b) => {
        const dateA = new Date(
          filters.sortBy === "date" ? a.createdAt : a.updatedAt
        ).valueOf();
        const dateB = new Date(
          filters.sortBy === "date" ? b.createdAt : b.updatedAt
        ).valueOf();
        return filters.order === "desc"
          ? Number(dateB - dateA)
          : Number(dateA - dateB);
      });
  }, [
    prescriptions,
    filters.status,
    filters.date,
    filters.sortBy,
    filters.order,
    searchTerm,
  ]);

  const stats = useMemo(() => {
    const total = prescriptions.length;
    const pending = prescriptions.filter((p) => p.status === "PENDING").length;
    const approved = prescriptions.filter(
      (p) => p.status === "APPROVED"
    ).length;
    const rejected = prescriptions.filter(
      (p) => p.status === "REJECTED"
    ).length;
    const todayCount = prescriptions.filter((p) => {
      const prescDate = new Date(p.createdAt);
      const today = new Date();
      return prescDate.toDateString() === today.toDateString();
    }).length;

    return { total, pending, approved, rejected, todayCount };
  }, [prescriptions]);

  const getStatusColor = (status: Prescription["status"]): string => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "APPROVED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    void router.push("/sign-in");
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Redirecting to sign in...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Not authorized. Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Pharmacist Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage and process prescription requests
        </p>
      </div>

      {/* Auto-refresh Toggle */}
      <div className="mb-6 flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRefresh}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 ${isRefreshing ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isRefreshing}
          >
            <ArrowPathIcon
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoRefresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="autoRefresh"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400"
            >
              Auto-refresh
            </label>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDownIcon
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, date: e.target.value }))
              }
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDownIcon
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prescription List */}
      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="px-4 py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                  <div className="ml-4">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPrescriptions.map((prescription) => (
              <li
                key={prescription.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                          {prescription.patientName}
                        </p>
                        {prescription.prescriptionFilePath && (
                          <DocumentMagnifyingGlassIcon className="ml-2 h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Prescribed by {prescription.doctorName}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}
                      >
                        {prescription.status}
                      </span>
                      {prescription.status === "PENDING" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handlePrescriptionAction(
                                prescription.id,
                                "approve"
                              )
                            }
                            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handlePrescriptionAction(
                                prescription.id,
                                "reject"
                              )
                            }
                            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {prescription.medication}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>
                        Submitted{" "}
                        {format(
                          new Date(prescription.createdAt),
                          "MMM d, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <NotificationsContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </div>
  );
};

export default PharmacistDashboard;
