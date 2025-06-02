"use client"
import React from 'react';
import HeroSection from './components/home/HeroSection';
import FeaturesSection from './components/home/FeaturesSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import HowItWorksSection from './components/home/HowItWorksSection';
import StatsSection from './components/home/StatsSection';
import NewsletterSection from './components/home/NewsletterSection';

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Page;
