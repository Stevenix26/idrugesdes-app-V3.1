"use client";

import { useEffect, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    // Check the current status
    if (!signUp || signUp.status === "complete") {
      // If sign up is complete, redirect to dashboard
      router.push("/dashboard");
      return;
    }

    // Check if there's an attempted sign up
    const attemptVerification = async () => {
      try {
        if (signUp.status === "missing_requirements") {
          // If email verification is required, start the verification process
          await signUp.prepareEmailAddressVerification();
        }
      } catch (err: any) {
        console.error("Error during verification:", err);
        setVerificationError(err.message || "Failed to send verification code");
      }
    };

    attemptVerification();
  }, [isLoaded, signUp, router]);

  const handleResendCode = async () => {
    if (!signUp) return;

    try {
      setVerificationError("");
      await signUp.prepareEmailAddressVerification();
    } catch (err: any) {
      console.error("Error resending code:", err);
      setVerificationError(err.message || "Failed to resend verification code");
    }
  };

  const handleVerification = async (code: string) => {
    if (!signUp || !setActive) return;

    try {
      setVerificationError("");
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Error verifying code:", err);
      setVerificationError(err.message || "Invalid verification code");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a verification code to your email address. Please
          check your inbox and enter the code below.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => {
              const code = e.target.value;
              if (code.length === 6) {
                handleVerification(code);
              }
            }}
          />

          {verificationError && (
            <p className="text-red-500 text-sm">{verificationError}</p>
          )}

          <button
            onClick={handleResendCode}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Didn&apos;t receive a code? Click to resend
          </button>
        </div>

        <div className="mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-4">
            You&apos;ll be automatically redirected once your email is verified
          </p>
        </div>
      </motion.div>
    </div>
  );
}
