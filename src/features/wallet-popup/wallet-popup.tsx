import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import CloseIcon from "../../assets/close-icon.svg?react";
import ErrorIcon from "../../assets/error-icon.svg?react";
import SuccessIcon from "../../assets/successfully-icon.svg?react";

import SpinnerIcon from "../../shared/ui/spinner/spinner-icon";

// TODO: Add backend-driven error messages or wallet metadata if needed.

type WalletPopupStatus = "connecting" | "failed" | "success";

type WalletPopupProps = {
  open: boolean;
  status: WalletPopupStatus;
  walletAddress?: string;
  onClose: () => void;
  onTryAgain?: () => Promise<void>;
};

type PopupSize = {
  width: number;
  height: number;
};

const DEFAULT_WINDOW_WIDTH = 1920;

const BREAKPOINTS = {
  mobile: 639,
  tablet: 991,
  desktop: 1199,
} as const;

const POPUP_SIZES = {
  connecting: { width: 800, height: 282 },
  failed: { width: 800, height: 368 },
  success: { width: 800, height: 412 },

  connectingXlm: { width: 600, height: 260 },
  failedXlm: { width: 600, height: 340 },
  successXlm: { width: 600, height: 385 },

  connectingMd: { width: 470, height: 320 },
  failedMd: { width: 470, height: 408 },
  successMd: { width: 470, height: 450 },

  connectingSm: { width: 342, height: 324 },
  failedSm: { width: 342, height: 410 },
  successSm: { width: 342, height: 454 },
} as const satisfies Record<string, PopupSize>;

const STATUS_CONTENT = {
  connecting: {
    title: "WALLET CONNECTING...",
    description: "Please wait",
  },

  failed: {
    title: (
      <>
        WALLET CONNECTION
        <br />
        FAILED
      </>
    ),

    actionLabel: "TRY AGAIN",
  },

  success: {
    title: (
      <>
        SUCCESSFULLY CONNECTED
        <br />
        WALLET
      </>
    ),

    actionLabel: "DONE",
  },
} as const;

const DEFAULT_WALLET_ADDRESS =
  "0x0000000000000000000000000000000000000000";

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_WINDOW_WIDTH;
    }

    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

export default function WalletPopup({
  open,
  status,
  walletAddress,
  onClose,
  onTryAgain,
}: WalletPopupProps) {
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (open) {
      document.body.classList.add("blur-active");
    } else {
      document.body.classList.remove("blur-active");
    }

    return () => {
      document.body.classList.remove("blur-active");
    };
  }, [open]);

  const isMobile = windowWidth <= BREAKPOINTS.mobile;

  const isTablet =
    windowWidth > BREAKPOINTS.mobile &&
    windowWidth <= BREAKPOINTS.desktop;

  const popupSizeKey = useMemo<keyof typeof POPUP_SIZES>(() => {
    if (windowWidth <= BREAKPOINTS.mobile) {
      return `${status}Sm` as keyof typeof POPUP_SIZES;
    }

    if (windowWidth <= BREAKPOINTS.tablet) {
      return `${status}Md` as keyof typeof POPUP_SIZES;
    }

    if (windowWidth <= BREAKPOINTS.desktop) {
      return `${status}Xlm` as keyof typeof POPUP_SIZES;
    }

    return status;
  }, [status, windowWidth]);

  const { width, height } = POPUP_SIZES[popupSizeKey];

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <div className="fixed inset-0 z-[110] bg-black/30 transition-all" />

      <div
        className="
          fixed left-1/2 top-1/2 z-[120]
          flex items-center justify-center
        "
        style={{
          width,
          height,
          transform: "translate(-50%, -50%)",
          borderRadius: 24,
        }}
      >
        <div
          className="
            relative h-full w-full
            overflow-hidden
            bg-gradient-to-br
            from-[#054A75]
            via-[#012A4A]
            to-black
          "
          style={{
            borderRadius: 24,
            boxShadow: "0 10px 48px 0 #000A, 0 2px 10px 0 #0006",
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="
              absolute right-6 top-6 z-20
              flex items-center justify-center
              bg-transparent
            "
            style={{
              width: 32,
              height: 32,
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <CloseIcon width={32} height={32} />
          </button>

          <div className="flex h-full w-full flex-col items-center justify-center">
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

            <div
              className={`
                mb-2
                text-center
                font-instrument
                font-bold
                uppercase
                text-white
                ${isMobile ? "tracking-[0.12em]" : "tracking-[0.20em]"}
              `}
              style={{
                fontSize: isMobile ? 21 : isTablet ? 30 : 36,
                lineHeight: isMobile
                  ? "30px"
                  : isTablet
                    ? "36px"
                    : "42px",
              }}
            >
              {STATUS_CONTENT[status].title}
            </div>

            {status === "connecting" && (
              <div
                className="
                  mt-[16px]
                  text-center
                  font-instrument
                  text-[26px]
                  font-normal
                  leading-[38px]
                  text-[#C9E2FF]
                  max-[991px]:text-[20px]
                  max-[991px]:leading-[28px]
                "
              >
                {STATUS_CONTENT.connecting.description}
              </div>
            )}

            {status === "failed" && (
              <div className="mt-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={onTryAgain}
                  className="
                    rounded-full
                    border border-blue-300
                    bg-transparent
                    px-8 py-2
                    font-instrument
                    text-[18px]
                    font-medium
                    leading-[28px]
                    tracking-[0.1em]
                    text-[#C9E2FF]
                    transition
                    hover:border-blue-600
                    hover:bg-blue-600
                    max-[991px]:text-[14px]
                    max-[991px]:leading-[24px]
                  "
                >
                  {STATUS_CONTENT.failed.actionLabel}
                </button>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center">
                <span
                  className="
                    mt-4 mb-8
                    block w-full
                    break-all
                    text-center
                    font-instrument
                    font-normal
                    text-[#C9E2FF]
                  "
                  style={{
                    fontSize: isMobile ? 12 : isTablet ? 14 : 20,
                    lineHeight: isMobile
                      ? "18px"
                      : isTablet
                        ? "20px"
                        : "28px",
                  }}
                >
                  {/* TODO: Replace with backend wallet address */}
                  {walletAddress ?? DEFAULT_WALLET_ADDRESS}
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    rounded-full
                    border border-blue-300
                    bg-transparent
                    px-8 py-2
                    font-instrument
                    text-[18px]
                    font-medium
                    leading-[28px]
                    tracking-[0.1em]
                    text-[#C9E2FF]
                    transition
                    hover:border-blue-600
                    hover:bg-blue-600
                    max-[991px]:text-[14px]
                    max-[991px]:leading-[24px]
                  "
                >
                  {STATUS_CONTENT.success.actionLabel}
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