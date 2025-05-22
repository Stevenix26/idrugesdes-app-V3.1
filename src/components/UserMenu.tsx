"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function UserMenu() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "bg-white shadow-xl border-0",
                userButtonPopoverActionButton: "hover:bg-gray-50",
                userButtonPopoverActionButtonText: "font-medium",
                userButtonPopoverFooter: "hidden",
              },
            }}
          />
        </>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/auth/sign-in"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}