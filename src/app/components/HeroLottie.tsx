"use client";
import React from "react";
import Lottie from "lottie-react";

interface HeroLottieProps {
  src: string;
}

const HeroLottie: React.FC<HeroLottieProps> = ({ src }) => {
  const [animationData, setAnimationData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLottie = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(src);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLottie();
  }, [src]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-[var(--primary)]">Loading...</div>
      </div>
    );
  }

  if (!animationData) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ 
          width: "100%", 
          height: "100%"
        }}
        className="drop-shadow-lg"
      />
    </div>
  );
};

export default HeroLottie;



