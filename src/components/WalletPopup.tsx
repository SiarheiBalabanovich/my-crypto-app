import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../assets/close-icon.svg?react";
import ErrorIcon from "../assets/error-icon.svg?react";
import SuccessIcon from "../assets/successfully-icon.svg?react";
import SpinnerIcon from "./SpinnerIcon";

type WalletPopupStatus = "connecting" | "failed" | "success";

type WalletPopupProps = {
  open: boolean;
  status: WalletPopupStatus;
  walletAddress?: string;
  onClose: () => void;
  onTryAgain?: () => void;
  // TODO: You can add props for backend error codes/messages if needed.
};

const POPUP_SIZES = {
  connecting:   { width: 800, height: 282 },
  failed:       { width: 800, height: 368 },
  success:      { width: 800, height: 412 },
  connectingXlm: { width: 600, height: 260 },
  failedXlm:     { width: 600, height: 340 },
  successXlm:    { width: 600, height: 385 },
  connectingMd: { width: 470, height: 320 },
  failedMd:     { width: 470, height: 408 },
  successMd:    { width: 470, height: 450 },
  connectingSm: { width: 342, height: 324 },
  failedSm:     { width: 342, height: 410 },
  successSm:    { width: 342, height: 454 },
} as const;

export default function WalletPopup({
  open,
  status,
  walletAddress,
  onClose,
  onTryAgain,
}: WalletPopupProps) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    if (open) document.body.classList.add("blur-active");
    else document.body.classList.remove("blur-active");
    return () => {
      document.body.classList.remove("blur-active");
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!open) return null;

  // Responsive size logic
  let key: keyof typeof POPUP_SIZES = status;
  if (windowWidth <= 639) {
    key = `${status}Sm` as keyof typeof POPUP_SIZES;
  } else if (windowWidth <= 991) {
    key = `${status}Md` as keyof typeof POPUP_SIZES;
  } else if (windowWidth <= 1199) {
    key = `${status}Xlm` as keyof typeof POPUP_SIZES;
  }

  const { width, height } = POPUP_SIZES[key];

  // const isTabletCustomFont =
  //   windowWidth <= 1023 && windowWidth >= 640;
  const isMobile = windowWidth <= 639;
  const isTablet = windowWidth >= 640 && windowWidth <= 1023;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[110] bg-black/30 transition-all" />
      <div
        className="fixed z-[120] left-1/2 top-1/2 flex items-center justify-center"
        style={{
          width,
          height,
          transform: "translate(-50%, -50%)",
          borderRadius: 24,
        }}
      >
        <div
          className="relative w-full h-full bg-gradient-to-br from-[#054A75] via-[#012A4A] to-black"
          style={{
            borderRadius: 24,
            boxShadow: "0 10px 48px 0 #000A, 0 2px 10px 0 #0006",
            overflow: "hidden",
          }}
        >
          {/* Close button */}
          <button
            className="absolute z-20"
            aria-label="Close"
            onClick={onClose}
            tabIndex={0}
            style={{
              top: 24,
              right: 24,
              width: 32,
              height: 32,
              padding: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon width={32} height={32} />
          </button>
          <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Icons */}
            {status === "success" && (
              <span className="mb-4">
                <SuccessIcon width={56} height={56} />
              </span>
            )}
            {status === "failed" && (
              <span className="mb-4">
                <ErrorIcon width={56} height={56} />
              </span>
            )}
            {status === "connecting" && (
              <span className="mb-4">
                <SpinnerIcon size={56} />
              </span>
            )}
            {/* Title */}
            {/* <div
              className="
                text-white 
                font-instrument 
                font-bold 
                tracking-[0.20em] 
                uppercase 
                text-center 
                mb-2
              "
              style={{
                fontSize: isTabletCustomFont ? 30 : 36,
                lineHeight: isTabletCustomFont ? "36px" : "42px",
              }}
            >
              {status === "connecting" && "WALLET CONNECTING..."}
              {status === "failed" && (
                <>
                  WALLET CONNECTION
                  <br />
                  FAILED
                </>
              )}
              {status === "success" && (
                <>
                  SUCCESSFULLY CONNECTED
                  <br />
                  WALLET
                </>
              )}
            </div> */}
            <div
            className={`
            text-white
            font-instrument
            font-bold
            uppercase
            text-center
            mb-2
            ${isMobile ? "tracking-[0.12em]" : "tracking-[0.20em]"}
            `}
            style={{
            fontSize: isMobile ? 21 : isTablet ? 30 : 36,
            lineHeight: isMobile ? "30px" : isTablet ? "36px" : "42px",
            }}
            >
            {status === "connecting" && "WALLET CONNECTING..."}
            {status === "failed" && (
            <>
            WALLET CONNECTION
            <br />
            FAILED
            </>
            )}
              {status === "success" && (
              <>
                SUCCESSFULLY CONNECTED
              <br />
                WALLET
              </>
              )}
              </div>
            {/* Text/Buttons */}
            {status === "connecting" && (
              <div className="text-[#C9E2FF] font-instrument font-normal text-[26px] leading-[38px] mt-[16px] text-center
                max-[991px]:text-[20px] max-[991px]:leading-[28px]">
                Please wait
              </div>
            )}
            {status === "failed" && (
              <div className="flex flex-col items-center mt-10">
                <button
                  className="rounded-full border border-blue-300 px-8 py-2 font-instrument font-medium text-[18px] leading-[28px] tracking-[0.1em] text-[#C9E2FF] bg-transparent hover:bg-blue-600 hover:border-blue-600 transition
                  max-[991px]:text-[14px] max-[991px]:leading-[24px]"
                  onClick={onTryAgain}
                >
                  TRY AGAIN
                </button>
              </div>
            )}
            {status === "success" && (
              <div className="flex flex-col items-center">
                <span
                  className="
                    text-[#C9E2FF]
                    font-normal
                    text-center
                    break-all
                    font-instrument
                    block
                    w-full
                    mt-4
                    mb-8
                  "
                  // style={{
                  //   fontSize: isTabletCustomFont ? 14 : 20,
                  //   lineHeight: isTabletCustomFont ? "20px" : "28px",
                  // }}
                  style={{
                  fontSize: isMobile ? 12 : isTablet ? 14 : 20,
                  lineHeight: isMobile ? "18px" : isTablet ? "20px" : "28px",
                  }}
                >
                  {/* TODO: Show actual wallet address from backend after successful connection */}
                  {walletAddress || "0x0000000000000000000000000000000000000000"}
                </span>
                <button
                  className="rounded-full border border-blue-300 px-8 py-2 font-instrument font-medium text-[18px] leading-[28px] tracking-[0.1em] text-[#C9E2FF] bg-transparent hover:bg-blue-600 hover:border-blue-600 transition
                  max-[991px]:text-[14px] max-[991px]:leading-[24px]"
                  onClick={onClose}
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")!
  );
}