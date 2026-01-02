// components/LocomotiveScrollContainer.tsx
"use client";

import React, { useEffect } from "react";
// Ensure you have the CSS file imported globally

const LocomotiveScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let scroll: any; // Type can be improved if you install @types/locomotive-scroll
    
    // Dynamically import the library client-side
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]") as HTMLElement,
        smooth: true,
        // Add other options as needed
      });
    });

    // Cleanup function to destroy the scroll instance on component unmount
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="main" data-scroll-container>
      {children}
    </div>
  );
};

export default LocomotiveScroll;
