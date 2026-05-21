import { useEffect, useState } from "react";
import SealCheckIcon from '../assets/sealcheck-icon.svg?react';

// TODO: (for backend integration): You can add props for dynamic messages or loading states here.
//Example: { message?: string }

const DASHBOARD_MAX_WIDTH = 1376;
const MOBILE_MAX_WIDTH = 1349;

export default function TokenUnderReviewScreen() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile + Tablet Layout
  if (windowWidth <= MOBILE_MAX_WIDTH) {
    return (
      <div
        className="w-full flex items-center justify-center z-20 pointer-events-auto"
        style={{
          maxWidth: 342,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8 bg-white/10 rounded-[8px]">
          <SealCheckIcon className="mb-4 w-14 h-14 text-[#C9E2FF]" />
          <span className="text-white text-[28px] leading-[32px] font-instrument font-bold tracking-[0.2em] text-center mb-4 mt-0">
            TOKEN IS UNDER REVIEW
          </span>
          <span className="text-[#C9E2FF] text-[16px] leading-[24px] font-normal font-instrument text-center max-w-[400px] mt-0">
            Please check in later
          </span>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div
      className="absolute left-1/2 z-20 pointer-events-auto justify-center items-center flex"
      style={{
        width: "100%",
        maxWidth: DASHBOARD_MAX_WIDTH,
        height: "350px",
        transform: "translateX(-50%)",
        marginTop: "80px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 16,
      }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <SealCheckIcon className="mb-6 w-20 h-20 text-[#C9E2FF]" />
        <span className="text-white text-[36px] leading-[42px] font-instrument font-bold tracking-[0.2em] text-center mb-4 mt-0">
          TOKEN IS UNDER REVIEW
        </span>
        <span className="text-[#C9E2FF] text-[20px] leading-[28px] font-normal font-instrument text-center max-w-[500px] mt-0">
          Please check in later
        </span>
      </div>
    </div>
  );
}