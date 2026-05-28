import { useState } from "react";

import MoodAiLogo from "../../../assets/moodai-icon.svg?react";
import { WalletPopup } from "../../../features/wallet-popup";

// TODO: Replace mock wallet connection with real wallet provider / backend integration.

type WalletStatus = "connecting" | "failed" | "success";
type PopupStatus = WalletStatus | null;

const MOCK_WALLET_ADDRESS = "0x00000000000000000000000000000";
const MOCK_CONNECT_DELAY_MS = 2_000;

const LAYOUT_WIDTH = {
  desktop: 1376,
  mobile: 342,
} as const;

const MOBILE_RIGHT_BLOCK_WIDTH = 186.09;

const simulateWalletConnection = (): Promise<boolean> =>
  new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(Math.random() > 0.5);
    }, MOCK_CONNECT_DELAY_MS);
  });

export default function DashboardHeaderBar() {
  const [popupStatus, setPopupStatus] = useState<PopupStatus>(null);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  const connectWallet = async (): Promise<void> => {
    setPopupStatus("connecting");
    setWalletAddress(undefined);

    const isConnected = await simulateWalletConnection();

    if (isConnected) {
      setWalletAddress(MOCK_WALLET_ADDRESS);
      setPopupStatus("success");
      return;
    }

    setPopupStatus("failed");
  };

  const closePopup = (): void => {
    setPopupStatus(null);
  };

  const handleTryAgain = async (): Promise<void> => {
    await connectWallet();
  };

  return (
    <>
      <div
        className="hidden w-full justify-center bg-[#070D11] xlm:flex"
        style={{ minHeight: 88, padding: 0 }}
      >
        <div
          className="flex w-full flex-row items-center justify-between"
          style={{
            maxWidth: LAYOUT_WIDTH.desktop,
            width: "100%",
            paddingLeft: 32,
            paddingRight: 32,
            minHeight: 88,
          }}
        >
          <div className="flex items-center" style={{ minWidth: 160 }}>
            <MoodAiLogo width={138} height={48} />
          </div>

          <div className="ml-auto flex items-center gap-[48px]">
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
              type="button"
              onClick={connectWallet}
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

      <div
        className="flex w-full justify-center bg-[#070D11] xlm:hidden"
        style={{
          minHeight: 78.12,
          padding: 0,
        }}
      >
        <div
          className="flex w-full flex-row items-center justify-between"
          style={{
            maxWidth: LAYOUT_WIDTH.mobile,
            width: "100%",
            minHeight: 78.12,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <div className="flex items-center" style={{ minWidth: 88, maxWidth: 88 }}>
            <MoodAiLogo width={87.69} height={14.12} />
          </div>

          <div
            className="flex flex-row items-center justify-between"
            style={{
              minWidth: MOBILE_RIGHT_BLOCK_WIDTH,
              maxWidth: MOBILE_RIGHT_BLOCK_WIDTH,
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
              type="button"
              onClick={connectWallet}
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
            >
              CONNECT WALLET
            </button>
          </div>
        </div>
      </div>

      {popupStatus && (
        <WalletPopup
          open
          status={popupStatus}
          walletAddress={walletAddress}
          onClose={closePopup}
          onTryAgain={popupStatus === "failed" ? handleTryAgain : undefined}
        />
      )}
    </>
  );
}