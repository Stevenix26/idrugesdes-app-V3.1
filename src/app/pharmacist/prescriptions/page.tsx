"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ClipboardDocumentIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  DocumentMagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import Link from "next/link";

interface Prescription {
  id: string;
  patientName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctorName: string;
  phoneNumber: string;
  prescriptionFilePath?: string;
  declineReason?: string;
}

export default function PrescriptionsPage() {
  const searchParams = useSearchParams();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const filter = searchParams.get("filter") || "all";

  const fetchPrescriptions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `/api/pharmacist/prescriptions?filter=${filter}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch prescriptions");
      }

      const data = await response.json();
      setPrescriptions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load prescriptions"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [filter]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPrescriptions();
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <ClockIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
        );
      case "approved":
        return (
          <CheckCircleIcon
            className="h-5 w-5 text-green-500"
            aria-hidden="true"
          />
        );
      case "rejected":
        return (
          <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        );
      default:
        return (
          <ClipboardDocumentIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
      case "approved":
        return "bg-green-50 text-green-800 ring-green-600/20";
      case "rejected":
        return "bg-red-50 text-red-800 ring-red-600/20";
      default:
        return "bg-gray-50 text-gray-800 ring-gray-600/20";
    }
  };

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.medication
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading prescriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-800">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and review patient prescriptions
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isRefreshing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isRefreshing}
            >
              <ArrowPathIcon
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {filteredPrescriptions.map((prescription) => (
              <li key={prescription.id}>
                <Link
                  href={`/pharmacist/prescriptions/${prescription.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {prescription.patientName}
                          </p>
                          {prescription.prescriptionFilePath && (
                            <DocumentMagnifyingGlassIcon className="ml-2 h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="truncate">
                              {prescription.medication}
                              {prescription.dosage &&
                                ` - ${prescription.dosage}`}
                              {prescription.frequency &&
                                ` - ${prescription.frequency}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0 flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            prescription.status
                          )}`}
                        >
                          {getStatusIcon(prescription.status)}
                          <span className="ml-1 capitalize">
                            {prescription.status}
                          </span>
                        </span>
                        <span className="text-sm text-gray-500">
                          {format(
                            new Date(prescription.createdAt),
                            "MMM d, yyyy"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
