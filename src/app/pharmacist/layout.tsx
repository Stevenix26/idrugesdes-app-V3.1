"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/hooks/useAuth";
import PharmacistSidebar from '@/app/components/PharmacistSidebar';

export default function PharmacistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isPharmacist, isLoadingDbUser } = useAuth();

  React.useEffect(() => {
    if (!isLoadingDbUser && !isPharmacist) {
      router.push('/dashboard');
    }
  }, [isPharmacist, isLoadingDbUser, router]);

  if (isLoadingDbUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isPharmacist) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="flex-none">
        <PharmacistSidebar stats={{}} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </div>
  );
} 