"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    // Simple redirect to dashboard
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Redirecting...
        </h1>
        <p className="text-gray-600 mb-4">
          Please wait while we redirect you to the dashboard...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </motion.div>
    </div>
  );
}
