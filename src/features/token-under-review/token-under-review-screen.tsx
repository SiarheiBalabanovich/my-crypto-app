import { useEffect, useState } from "react";

import SealCheckIcon from "../../assets/sealcheck-icon.svg?react";

// TODO: Add backend-driven props or review status integration if needed.
// Example:
// type TokenUnderReviewScreenProps = {
//   message?: string;
// };

const DASHBOARD_MAX_WIDTH = 1376;
const MOBILE_MAX_WIDTH = 1349;

const REVIEW_TITLE = "TOKEN IS UNDER REVIEW";
const REVIEW_DESCRIPTION = "Please check in later";

const useIsMobile = (breakpoint: number): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default function TokenUnderReviewScreen() {
  const isMobile = useIsMobile(MOBILE_MAX_WIDTH);

  if (isMobile) {
    return (
      <div
        className="
          pointer-events-auto
          z-20
          flex w-full items-center justify-center
        "
        style={{
          maxWidth: 342,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
        }}
      >
        <div
          className="
            flex h-full w-full flex-col
            items-center justify-center
            rounded-[8px]
            bg-white/10
            px-4 py-8
          "
        >
          <SealCheckIcon className="mb-4 h-14 w-14 text-[#C9E2FF]" />

          <span
            className="
              mt-0 mb-4
              text-center
              font-instrument
              text-[28px]
              font-bold
              leading-[32px]
              tracking-[0.2em]
              text-white
            "
          >
            {REVIEW_TITLE}
          </span>

          <span
            className="
              mt-0 max-w-[400px]
              text-center
              font-instrument
              text-[16px]
              font-normal
              leading-[24px]
              text-[#C9E2FF]
            "
          >
            {REVIEW_DESCRIPTION}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        pointer-events-auto
        absolute left-1/2 z-20
        flex items-center justify-center
      "
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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SealCheckIcon className="mb-6 h-20 w-20 text-[#C9E2FF]" />

        <span
          className="
            mt-0 mb-4
            text-center
            font-instrument
            text-[36px]
            font-bold
            leading-[42px]
            tracking-[0.2em]
            text-white
          "
        >
          {REVIEW_TITLE}
        </span>

        <span
          className="
            mt-0 max-w-[500px]
            text-center
            font-instrument
            text-[20px]
            font-normal
            leading-[28px]
            text-[#C9E2FF]
          "
        >
          {REVIEW_DESCRIPTION}
        </span>
      </div>
    </div>
  );
}