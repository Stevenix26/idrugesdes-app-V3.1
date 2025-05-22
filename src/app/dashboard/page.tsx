"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    async function redirectBasedOnRole() {
      if (!isLoaded || !user) return;

      try {
        // Fetch user data from our database
        const response = await fetch(
          `/api/users?email=${user.primaryEmailAddress?.emailAddress}`
        );
        const userData = await response.json();

        if (!userData || !userData.role) {
          router.push("/auth/sign-up/verify-email-address");
          return;
        }

        // Redirect based on role
        switch (userData.role.toUpperCase()) {
          case "PATIENT":
            router.push("/dashboard/patient");
            break;
          case "PHARMACIST":
            router.push("/dashboard/pharmacist");
            break;
          case "ADMIN":
            router.push("/dashboard/admin");
            break;
          default:
            router.push("/auth/sign-up/verify-email-address");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        router.push("/auth/sign-up/verify-email-address");
      }
    }

    redirectBasedOnRole();
  }, [user, isLoaded, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4 text-sm text-gray-500">Loading your dashboard...</p>
      </div>
    </div>
  );
}
