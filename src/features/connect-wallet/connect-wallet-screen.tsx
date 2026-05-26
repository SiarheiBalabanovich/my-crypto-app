import { useEffect, useState } from "react";

import WalletIcon from "../../assets/connect-wallet-icon.svg?react";

// TODO: Replace static content and logic with backend-driven data if needed.

const MOBILE_MAX_WIDTH = 1349;

const CONNECT_WALLET_TITLE = (
  <>
    CONNECT YOUR WALLET <br /> TO CONTINUE
  </>
);

const CONNECT_WALLET_DESCRIPTION =
  "To subscribe and analyze this token, connect your wallet to verify token ownership and access permissions.";

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

export default function ConnectWalletScreen() {
  const isMobile = useIsMobile(MOBILE_MAX_WIDTH);

  if (isMobile) {
    return (
      <div
        className="
          connect-wallet-modal
          absolute left-0 right-0 z-20 mx-auto mt-4
          flex items-center justify-center
          rounded-[8px]
          pointer-events-auto
        "
        style={{
          maxWidth: 342,
        }}
      >
        <div
          className="
            mt-[170px] flex h-full w-full flex-col
            items-center justify-center
            rounded-[8px] bg-white/10
            px-4 py-8
          "
        >
          <WalletIcon className="mb-4 h-14 w-14 text-[#C9E2FF]" />

          <span
            className="
              connect-wallet-title
              mt-0 mb-4 text-center
              font-instrument text-[28px]
              font-bold leading-[32px]
              tracking-[0.2em]
              text-white
            "
          >
            {CONNECT_WALLET_TITLE}
          </span>

          <span
            className="
              mt-0 max-w-[400px]
              text-center font-instrument
              text-[16px] font-normal
              leading-[24px]
              text-[#C9E2FF]
            "
          >
            {CONNECT_WALLET_DESCRIPTION}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        absolute left-1/2 z-20
        flex items-center justify-center
        pointer-events-auto
      "
      style={{
        width: "1376px",
        height: "70vh",
        transform: "translateX(-50%)",
        marginTop: "50px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 16,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <WalletIcon className="mb-8 h-16 w-16 text-[#C9E2FF]" />

        <span
          className="
            connect-wallet-title
            mt-0 mb-4 text-center
            font-instrument text-[36px]
            font-bold leading-[42px]
            tracking-[0.2em]
            text-white
          "
        >
          {CONNECT_WALLET_TITLE}
        </span>

        <span
          className="
            mt-0 max-w-[700px]
            text-center font-instrument
            text-[20px] font-normal
            leading-[28px]
            text-[#C9E2FF]
          "
        >
          {CONNECT_WALLET_DESCRIPTION}
        </span>
      </div>
    </div>
  );
}