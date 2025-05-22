"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const afterSignUpUrl = searchParams.get("after_sign_up_url");
    const afterSignInUrl = searchParams.get("after_sign_in_url");

    async function handleCallback() {
      try {
        await handleRedirectCallback({
          afterSignInUrl: afterSignInUrl || "/dashboard",
          afterSignUpUrl:
            afterSignUpUrl || "/auth/sign-up/verify-email-address",
        });
      } catch (error) {
        console.error("Error handling SSO callback:", error);
        // Redirect to sign-in page if there's an error
        router.push("/sign-in");
      }
    }

    handleCallback();
  }, [handleRedirectCallback, router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4 text-sm text-gray-500">Processing your sign-in...</p>
      </div>
    </div>
  );
}
