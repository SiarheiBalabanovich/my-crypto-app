import React, { useEffect, useState } from "react";
import WalletIcon from '../assets/connect-wallet-icon.svg?react';

// TODO: Backend – replace text/logic if dynamic values are needed here.

const MOBILE_MAX_WIDTH = 1349;

const ConnectWalletScreen: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth <= MOBILE_MAX_WIDTH) {
    // Mobile + Tablet Layout
    return (
      <div
        className="absolute left-0 right-0 mx-auto mt-4 rounded-[8px] flex items-center justify-center z-20 pointer-events-auto connect-wallet-modal"
        style={{
          maxWidth: 342,
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8 bg-white/10 rounded-[8px] mt-[170px]">
          <WalletIcon className="mb-4 w-14 h-14 text-[#C9E2FF]" />
          <span className="connect-wallet-title text-white text-[28px] leading-[32px] font-instrument font-bold tracking-[0.2em] text-center mb-4 mt-0">
            CONNECT YOUR WALLET <br /> TO CONTINUE
          </span>
          <span className="text-[#C9E2FF] text-[16px] leading-[24px] font-normal font-instrument text-center max-w-[400px] mt-0">
            To subscribe and analyze this token, connect your wallet to verify token ownership and access permissions.
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
        width: '1376px',
        height: '70vh',
        transform: 'translateX(-50%)',
        marginTop: '50px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 16,
      }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <WalletIcon className="mb-8 w-16 h-16 text-[#C9E2FF]" />
        <span className="connect-wallet-title text-white text-[36px] leading-[42px] font-instrument font-bold tracking-[0.2em] text-center mb-4 mt-0">
          CONNECT YOUR WALLET <br /> TO CONTINUE
        </span>
        <span className="text-[#C9E2FF] text-[20px] leading-[28px] font-normal font-instrument text-center max-w-[700px] mt-0">
          To subscribe and analyze this token, connect your wallet to verify token ownership and access permissions.
        </span>
      </div>
    </div>
  );
};

export default ConnectWalletScreen;