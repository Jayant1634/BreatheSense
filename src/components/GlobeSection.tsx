"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { World } from "./ui/globe";
import ErrorBoundary from "./ErrorBoundary";

// Sample data for the globe connections with brighter colors
const globeData = [
  {
    order: 0,
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.3,
    color: "#1976d2", // Primary blue
  },
  {
    order: 1,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.2,
    color: "#42a5f5", // Light blue
  },
  {
    order: 2,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.25,
    color: "#64b5f6", // Medium blue
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.3,
    color: "#90caf9", // Lighter blue
  },
  {
    order: 4,
    startLat: 19.4326,
    startLng: -99.1332,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.4,
    color: "#2196f3", // Bright blue
  },
  {
    order: 5,
    startLat: 55.7558,
    startLng: 37.6173,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.3,
    color: "#5c6bc0", // Indigo blue
  },
  // Additional connections for more density
  {
    order: 6,
    startLat: 52.5200,
    startLng: 13.4050,
    endLat: 59.3293,
    endLng: 18.0686,
    arcAlt: 0.2,
    color: "#1976d2", // Primary blue
  },
  {
    order: 7,
    startLat: 31.2304,
    startLng: 121.4737,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: "#42a5f5", // Light blue
  },
];

// Globe configuration with improved visibility
const globeConfig = {
  pointSize: 2.5,
  globeColor: "rgba(235, 41, 16, 0.95)", // deep navy base
  showAtmosphere: true,
  atmosphereColor: "rgba(0, 128, 255, 0.35)", // subtle blue glow
  atmosphereAltitude: 0.18, // slightly higher glow
  emissive: "rgba(254, 228, 189, 0.94)", // deep blue emissive
  emissiveIntensity: 0.35, // stronger than before for glow
  shininess: 0.9, // sharper highlights
  polygonColor: "rgba(51, 128, 236, 0.9)", // very dark blue for countries
  ambientLight: "rgba(30, 60, 120, 0.45)", // soft blue ambient
  directionalLeftLight: "rgba(60, 130, 255, 0.8)", // cool bright blue
  directionalTopLight: "rgba(0, 180, 255, 0.85)", // cyan top light
  pointLight: "rgba(230, 232, 235, 0.9)", // vibrant blue for dots
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 1
};


export default function GlobeSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (hasError) {
    return (
      <section className="w-full bg-[var(--foreground)] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Global Respiratory Monitoring Network</h2>
            <p className="text-lg text-white opacity-80 max-w-2xl mx-auto">
              BreatheSense connects patients worldwide with real-time monitoring and data analysis
            </p>
          </div>
          <div className="w-full h-[60vh] rounded-2xl overflow-hidden bg-[#0a0118] shadow-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-xl font-semibold mb-2">Interactive Globe</p>
              <p className="text-sm opacity-80">Global connectivity visualization</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[var(--foreground)] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Global Respiratory Monitoring Network</h2>
          <p className="text-lg text-white opacity-80 max-w-2xl mx-auto">
            BreatheSense connects patients worldwide with real-time monitoring and data analysis
          </p>
        </motion.div>
        
        {/* Main content - Globe on right, info cards on left */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">
          {/* Left side - Info Cards */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {[
                {
                  title: "Real-time Global Monitoring",
                  description: "Track respiratory health patterns across different regions and populations",
                  icon: "🌐",
                  color: "bg-gradient-to-br from-blue-500/80 to-blue-700/80"
                },
                {
                  title: "Data-Driven Insights",
                  description: "Analyze global trends to improve detection and treatment strategies",
                  icon: "📊",
                  color: "bg-gradient-to-br from-purple-500/80 to-purple-700/80"
                },
                {
                  title: "Connected Healthcare",
                  description: "Link patients, doctors, and researchers in a unified ecosystem",
                  icon: "🔗",
                  color: "bg-gradient-to-br from-teal-500/80 to-teal-700/80"
                },
                {
                  title: "Early Detection",
                  description: "Identify respiratory issues before symptoms become severe",
                  icon: "🔍",
                  color: "bg-gradient-to-br from-red-500/80 to-red-700/80"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className={`${item.color} rounded-xl p-6 shadow-lg border border-white/10`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/90">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right side - Globe */}
          <motion.div 
            className="w-full lg:w-1/2 h-[60vh] rounded-2xl overflow-hidden bg-[#0a0118] shadow-2xl border border-blue-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {isMounted && (
              <div className="w-full h-full">
                <ErrorBoundary onError={() => setHasError(true)}>
                  <World globeConfig={globeConfig} data={globeData} />
                </ErrorBoundary>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Additional statistics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Connected Devices", value: "120K+", icon: "📱" },
            { label: "Countries", value: "48+", icon: "🌎" },
            { label: "Hospitals", value: "850+", icon: "🏥" },
            { label: "Patients Helped", value: "200K+", icon: "👥" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-xl p-4 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <span className="text-2xl mb-2">{stat.icon}</span>
              <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
              <p className="text-sm text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
