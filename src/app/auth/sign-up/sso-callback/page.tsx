"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import SSOCallbackContent from "./SSOCallbackContent";

export default function SSOCallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense
        fallback={
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="mt-4 text-sm text-gray-500">
              Processing your sign-in...
            </p>
          </div>
        }
      >
        <SSOCallbackContent />
      </Suspense>
    </div>
  );
}
