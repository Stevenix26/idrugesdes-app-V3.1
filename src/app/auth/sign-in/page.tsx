"use client";

import { useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FaUser, FaUserMd, FaUserShield } from "react-icons/fa";

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const roleOptions: RoleOption[] = [
  {
    id: "PATIENT",
    title: "Patient",
    description: "Sign in as a patient to access your prescriptions and orders",
    icon: <FaUser className="w-8 h-8" />,
  },
  {
    id: "PHARMACIST",
    title: "Pharmacist",
    description: "Sign in as a pharmacist to manage pharmacy operations",
    icon: <FaUserMd className="w-8 h-8" />,
  },
  {
    id: "ADMIN",
    title: "Administrator",
    description: "Sign in as an administrator to manage the system",
    icon: <FaUserShield className="w-8 h-8" />,
  },
];

export default function SignInPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      {!selectedRole ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Sign In as
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roleOptions.map((role) => (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-500 transition-all duration-200">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-blue-600 mb-4">{role.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{role.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-6">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to role selection
            </button>
          </div>
          <SignIn
            path="/auth/sign-in"
            routing="path"
            signUpUrl="/auth/sign-up"
            redirectUrl={
              selectedRole === "PHARMACIST"
                ? "/pharmacist/dashboard"
                : selectedRole === "ADMIN"
                  ? "/admin/dashboard"
                  : "/dashboard"
            }
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg",
                card: "bg-white shadow-xl rounded-2xl p-8",
                headerTitle: "text-2xl font-bold text-gray-800 text-center",
                headerSubtitle: "text-gray-600 text-center",
                socialButtonsBlockButton:
                  "border border-gray-300 hover:border-gray-400 rounded-lg",
                formFieldInput:
                  "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg",
                footerActionLink: "text-blue-600 hover:text-blue-700",
              },
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
