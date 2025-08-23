"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define image URLs for each section from open source collections
const featureImages = [
  "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",  // Medical monitoring device
  "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=800&auto=format&fit=crop",  // AI visualization
  "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop", // Early detection visual
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"   // Personalized care - medical consultation
];

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
}) => {
  const [activeContent, setActiveContent] = useState(0);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  
  // Calculate scroll progress and update active content
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyContainerRef.current) return;
      
      const { top, height } = stickyContainerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
      
      // Calculate which content should be active based on scroll progress
      const contentIndex = Math.min(
        content.length - 1,
        Math.floor(scrollProgress * content.length)
      );
      
      setActiveContent(contentIndex);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content.length]);
  
  // Calculate the container height to allow enough scrolling for all items
  const containerHeight = content.length * 100; // Each content item takes 100vh

  return (
    <div 
      className="relative w-full"
      style={{ height: `${containerHeight}vh` }}
      ref={stickyContainerRef}
    >
      {/* Sticky container that remains fixed while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Main content container */}
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Content section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side - Text Content */}
            <div className="w-full md:w-2/5 z-10 relative min-h-[300px]">
              {content.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{
                    opacity: activeContent === i ? 1 : 0,
                    y: activeContent === i ? 0 : 100,
                    display: activeContent === i ? "block" : "none"
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                    {item.title}
                  </h2>
                  <p className="text-lg text-[var(--foreground)]/80 mb-6">
                    {item.description}
                  </p>
                  <div className="h-1 w-16 bg-[var(--primary)] rounded-full mb-8" />
                  
                  <motion.div
                    className="hidden md:block mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-opacity-90 transition-all">
                      Learn more
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Image Content */}
            <div className="w-full md:w-3/5 h-[50vh] md:h-[60vh]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--foreground)]/10">
                {/* Images for each section */}
                {content.map((item, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeContent === i ? 1 : 0,
                      display: activeContent === i ? "block" : "none"
                    }}
                    transition={{ duration: 0.7 }}
                  >
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${i % 2 === 0 ? 
                      'from-[var(--primary)]/40' : 'from-[var(--accent)]/40'} to-transparent z-10`}></div>
                    
                    {/* Image */}
                    <Image 
                      src={featureImages[i % featureImages.length]} 
                      alt={item.title}
                      fill
                      className="object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      quality={90}
                      onError={() => {
                        // Fallback to a default image if loading fails
                        const imgElement = document.getElementById(`feature-img-${i}`) as HTMLImageElement;
                        if (imgElement) {
                          imgElement.src = "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop";
                        }
                      }}
                      id={`feature-img-${i}`}
                    />
                    
                    {/* Content overlay if needed */}
                    {item.content && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                        {item.content}
                      </div>
                    )}
                    
                    {/* Feature number badge */}
                    <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <span className="text-[var(--primary)] font-bold">{i + 1}</span>
                    </div>
                  </motion.div>
                ))}
                
                {/* Section progress indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                  {content.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-8 rounded-full bg-white/50"
                      animate={{
                        backgroundColor: activeContent === i ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)"
                      }}
                    ></motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};