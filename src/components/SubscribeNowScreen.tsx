import { useEffect, useState } from "react";
import UpgradeUnlockIcon from "../assets/upgrade-unlock-access-icon.svg?react";

// TODO: You can add props type when you integrate with backend
// type SubscribeNowScreenProps = {
//   onSubscribe?: () => void;
//   isLoading?: boolean;
// };

const DASHBOARD_MAX_WIDTH = 1376;
const MOBILE_MAX_WIDTH = 1349;

export default function SubscribeNowScreen() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubscribe = () => {
    // TODO: Here is the logic for the backend, payment, displaying the modal, etc.
  };

  if (windowWidth <= MOBILE_MAX_WIDTH) {
    // Mobile + Tablet Layout
    return (
      <div
        className="w-full flex items-center justify-center mt-4 z-20 pointer-events-auto"
        style={{
          maxWidth: 342,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8 bg-white/10 rounded-[8px]">
          <UpgradeUnlockIcon className="mb-4 w-14 h-14 text-[#C9E2FF]" />
          <span className="text-white text-[28px] leading-[32px] font-instrument font-bold tracking-[0.2em] text-center mb-4 mt-0">
            SUBSCRIBE NOW
          </span>
          <span className="text-[#C9E2FF] text-[16px] leading-[24px] font-normal font-instrument text-center max-w-[400px] mt-0">
            This token isn't in our database yet. Subscribe now to start tracking its sentiment. Premium access required.
          </span>
          <button
            className="mt-8 rounded-full border border-blue-300 px-8 py-2 font-instrument font-medium text-[14px] leading-[24px] tracking-[0.1em] text-[#C9E2FF] bg-transparent hover:bg-blue-600 hover:border-blue-600 transition"
            onClick={handleSubscribe}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div
      className="absolute left-1/2 z-20 pointer-events-auto flex justify-center items-center"
      style={{
        width: "100%",
        maxWidth: DASHBOARD_MAX_WIDTH,
        height: "460px",
        transform: "translateX(-50%)",
        marginTop: "80px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 16,
      }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <UpgradeUnlockIcon className="mb-6 w-20 h-20 text-[#C9E2FF]" />
        <span className="text-white text-[36px] leading-[42px] font-instrument font-bold tracking-[0.2em] text-center mb-4 mt-0">
          SUBSCRIBE NOW
        </span>
        <span className="text-[#C9E2FF] text-[20px] leading-[28px] font-normal font-instrument text-center max-w-[700px] mt-0">
          This token isn't in our database yet. Subscribe now to start tracking its sentiment. Premium access required.
        </span>
        <button
          className="mt-8 rounded-full border border-blue-300 px-8 py-2 font-instrument font-medium text-[16px] leading-[24px] tracking-[0.1em] text-[#C9E2FF] bg-transparent hover:bg-blue-600 hover:border-blue-600 transition"
          onClick={handleSubscribe}
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
}