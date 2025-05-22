"use client";

import { useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    // Check if there's an attempted sign up
    const attemptVerification = async () => {
      try {
        // Attempt to complete sign up
        if (signUp?.status === "missing_requirements") {
          // If email verification is required, start the verification process
          await signUp.prepareEmailAddressVerification();
        }
      } catch (err) {
        console.error("Error during verification:", err);
      }
    };

    attemptVerification();
  }, [isLoaded, signUp]);

  const handleResendCode = async () => {
    try {
      await signUp?.prepareEmailAddressVerification();
    } catch (err) {
      console.error("Error resending code:", err);
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
          We've sent a verification code to your email address. Please check
          your inbox and enter the code below.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => {
              const code = e.target.value;
              if (code.length === 6) {
                // When 6 digits are entered, attempt verification
                signUp?.attemptEmailAddressVerification({ code });
              }
            }}
          />

          <button
            onClick={handleResendCode}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Didn't receive a code? Click to resend
          </button>
        </div>

        <div className="mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-4">
            You'll be automatically redirected once your email is verified
          </p>
        </div>
      </motion.div>
    </div>
  );
}
