import React, { useState } from "react";
import MoodAiLogo from "../assets/moodai-icon.svg?react";
import WalletPopup from "./WalletPopup";

// TODO: Implement real wallet connection logic here, replace this mockup with actual API call or wallet provider integration.

type WalletStatus = null | "connecting" | "failed" | "success";

const DashboardHeaderBar: React.FC = () => {
  const [popup, setPopup] = useState<WalletStatus>(null);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  const connectWallet = async () => {
    setPopup("connecting");
    setWalletAddress(undefined);
    setTimeout(() => {
      const ok = Math.random() > 0.5;
      if (ok) {
        setWalletAddress("0x00000000000000000000000000000");
        setPopup("success");
      } else {
        setPopup("failed");
      }
    }, 2000);
  };
  const handleTryAgain = () => connectWallet();

  return (
    <>
      {/* DESKTOP */}
      <div
        className="w-full hidden xlm:flex justify-center bg-[#070D11]"
        style={{ minHeight: 88, padding: 0 }}
      >
        <div
          className="flex flex-row items-center justify-between w-full"
          style={{
            maxWidth: 1376,
            width: "100%",
            paddingLeft: 32,
            paddingRight: 32,
            minHeight: 88,
          }}
        >
          {/* Logo */}
          <div className="flex items-center" style={{ minWidth: 160 }}>
            <MoodAiLogo width={138} height={48} />
          </div>
          {/* Right side: Tiers + Button */}
          <div className="flex items-center ml-auto gap-[48px]">
            <span
              className="text-[#C9E2FF]"
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "24px",
                letterSpacing: 0,
                userSelect: "none",
              }}
            >
              Tiers
            </span>
            <button
              style={{
                position: "relative",
                border: "none",
                padding: 0,
                background: "none",
                borderRadius: 80,
                overflow: "hidden",
                minWidth: 160,
                height: 40,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={connectWallet}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  borderRadius: 80,
                  padding: 2,
                  background: "linear-gradient(180deg, #53B2F1 0%, #006DB6 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  pointerEvents: "none",
                  boxSizing: "border-box",
                }}
              />
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#C9E2FF",
                  letterSpacing: "0.1em",
                  height: 36,
                  padding: "0 24px",
                  borderRadius: 80,
                  background: "transparent",
                }}
              >
                CONNECT WALLET
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE/TABLET */}
      <div
        className="w-full flex xlm:hidden justify-center bg-[#070D11]"
        style={{
          minHeight: 78.12,
          padding: 0,
        }}
      >
        <div
          className="flex flex-row items-center justify-between w-full"
          style={{
            maxWidth: 342,
            width: "100%",
            minHeight: 78.12,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          {/* Logo */}
          <div className="flex items-center" style={{ minWidth: 88, maxWidth: 88 }}>
            <MoodAiLogo width={87.69} height={14.12} />
          </div>
          {/* Right block: Tiers + Button */}
          <div
            className="flex flex-row items-center justify-between"
            style={{
              minWidth: 186.09,
              maxWidth: 186.09,
              height: 36.03,
            }}
          >
            <span
              className="text-[#C9E2FF]"
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "21px",
                userSelect: "none",
                marginRight: 10,
              }}
            >
              Tiers
            </span>
            <button
              style={{
                border: "1.5px solid #53B2F1",
                borderRadius: 80,
                background: "transparent",
                height: 36.03,
                minWidth: 0,
                padding: "7px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 500,
                fontSize: 10,
                lineHeight: "21px",
                letterSpacing: "0.1em",
                color: "#C9E2FF",
                cursor: "pointer",
              }}
              onClick={connectWallet}
            >
              CONNECT WALLET
            </button>
          </div>
        </div>
      </div>
      {/* WalletPopup */}
      {popup && (
        <WalletPopup
          open={true}
          status={popup}
          walletAddress={walletAddress}
          onClose={() => setPopup(null)}
          onTryAgain={popup === "failed" ? handleTryAgain : undefined}
        />
      )}
    </>
  );
};

export default DashboardHeaderBar;