"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Loader2, AlertCircle } from "lucide-react";

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    async function redirectBasedOnRole() {
      if (!isLoaded || !user) return;

      try {
        // First ensure user is synced with our database
        const syncResponse = await fetch("/api/test/sync-user");
        if (!syncResponse.ok) {
          console.error("Failed to sync user");
          throw new Error("Failed to sync user");
        }

        // Then fetch the user data
        const testResponse = await fetch("/api/test/users");
        if (!testResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const { currentUser } = await testResponse.json();

        if (!currentUser || !currentUser.role) {
          console.error("No role found for user");
          router.push("/role-selection"); // Redirect to role selection instead
          return;
        }

        // Redirect based on role
        switch (currentUser.role.toUpperCase()) {
          case "PATIENT":
            router.push("/dashboard/patient");
            break;
          case "PHARMACIST":
            router.push("/pharmacist");
            break;
          case "ADMIN":
            router.push("/admin");
            break;
          default:
            // If role exists but is not one of the expected values
            router.push("/role-selection");
        }
      } catch (error) {
        console.error("Error in dashboard redirect:", error);
        // Show error page instead of defaulting to patient
        router.push(
          "/error?message=Failed to load your dashboard. Please try again."
        );
      }
    }

    redirectBasedOnRole();
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4 p-8 rounded-lg bg-white shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <div>
            <p className="text-xl font-semibold text-gray-900">
              Setting up your dashboard
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please wait while we prepare everything for you...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4 p-8 rounded-lg bg-white shadow-lg">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto" />
          <div>
            <p className="text-xl font-semibold text-gray-900">
              Authentication Required
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please sign in to access your dashboard.
            </p>
            <button
              onClick={() => router.push("/sign-in")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
      <div className="text-center space-y-4 p-8 rounded-lg bg-white shadow-lg">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
        <div>
          <p className="text-xl font-semibold text-gray-900">
            Loading your profile
          </p>
          <p className="mt-2 text-sm text-gray-500">
            We &apos; re getting everything ready for you...
          </p>
        </div>
      </div>
    </div>
  );
}
