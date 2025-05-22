"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="iDrugdes Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your iDrugdes Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our digital pharmacy platform
          </p>
        </div>
        <div className="mt-8">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                card: "bg-white shadow-xl border-0",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton:
                  "border-2 border-gray-200 hover:bg-gray-50",
                formFieldInput:
                  "border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500",
                footerActionLink: "text-blue-600 hover:text-blue-700",
              },
            }}
            routing="path"
            path="/auth/sign-up"
            redirectUrl="/dashboard"
            signInUrl="/auth/sign-in"
          />
        </div>
      </div>
    </div>
  );
}
