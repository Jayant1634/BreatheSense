"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import HeroLottie as a client component
const HeroLottie = dynamic(() => import("./HeroLottie"), {
  ssr: false,
});

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-[var(--secondary)] to-[var(--background)] w-full overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-16 w-24 h-24 bg-[var(--primary)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-20 w-32 h-32 bg-[var(--accent)] rounded-full blur-3xl"></div>
      </div>
      
      {/* Content Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
        {/* Left Side - Text Content */}
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--primary)] mb-6 leading-tight">
            BreatheSense
          </h1>
          <p className="text-xl md:text-2xl text-[var(--foreground)] font-semibold mb-4 leading-relaxed">
            &ldquo;AI + IoT Powered Early Detection & Monitoring of COPD, Asthma & Emphysema&rdquo;
          </p>
          <p className="text-lg text-[var(--foreground)] max-w-xl mb-8 leading-relaxed opacity-80">
            Improving patient outcomes with real-time respiratory tracking & predictive alerts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#about"
              className="px-8 py-4 rounded-full bg-[var(--primary)] text-white text-lg font-bold shadow-xl hover:bg-[var(--primary-light)] transition-all duration-300 text-center hover:scale-105"
            >
              Learn More
            </a>
            <a
              href="/signup"
              className="px-8 py-4 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] text-lg font-bold shadow-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-300 text-center hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
        
        {/* Right Side - Lottie Animation */}
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-md h-80">
            <HeroLottie src="/lungs.json" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-[var(--primary)] rounded-full flex justify-center">
          <div className="w-1 h-2 bg-[var(--primary)] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
