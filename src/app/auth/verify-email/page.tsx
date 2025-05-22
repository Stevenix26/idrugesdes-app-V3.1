"use client";

import { useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get("token");

    if (!token) {
      console.error("No verification token found");
      return;
    }

    async function verifyToken() {
      try {
        const completeSignIn = await signIn?.attemptEmailAddressVerification({
          code: token,
        });

        // Redirect to dashboard after successful verification
        router.push("/dashboard");
      } catch (err) {
        console.error("Error verifying email:", err);
      }
    }

    verifyToken();
  }, [signIn, router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Verifying Your Email
        </h1>
        <p className="text-gray-600 mb-4">
          Please wait while we verify your email address...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </motion.div>
    </div>
  );
}
