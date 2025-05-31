"use client"
import React from 'react';
import HeroSection from './components/home/HeroSection';
import FeaturesSection from './components/home/FeaturesSection';

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default Page;
