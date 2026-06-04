import { useCallback, useState } from "react";

import MoodAiIcon from "../../../assets/moodai-icon.svg?react";
import { WalletPopup } from "../../../features/wallet-popup";

type WalletStatus = "connecting" | "failed" | "success";

type MenuItem = {
  label: readonly [string, string];
  href: string;
};

const MENU_ITEMS = [
  {
    label: ["WHAT IS", "MOOD AI?"],
    href: "#what-is-mood-ai",
  },
  {
    label: ["HOW IT", "WORKS"],
    href: "#how-it-works",
  },
  {
    label: ["PROGRESS", "OVERVIEW"],
    href: "#progress-overview",
  },
  {
    label: ["GET A FREE", "TRIAL"],
    href: "#get-a-free-trial",
  },
] as const satisfies readonly MenuItem[];

const MOCK_WALLET_ADDRESS = "0x00000000000000000000000000000";

const CONNECT_WALLET_LABEL = "CONNECT WALLET";

const desktopNavClassName = `
  hidden
  w-full
  max-w-[1760px]
  items-center
  justify-between
  mx-auto
  rounded-t-3xl
  px-20
  md:px-10
  sm:px-6
  pt-[52px]
  pb-[132px]
  h-auto
  lg:flex
`;

const desktopMenuClassName = `
  flex
  list-none
  items-center
  gap-[64px]
  max-[1300px]:gap-[24px]
  max-[1200px]:gap-[45px]
  max-[1200px]:justify-center
  max-w-[900px]
`;

const desktopMenuLinkClassName = `
  font-instrument
  font-normal
  text-[16px]
  text-menu-link
  no-underline
  hover:text-blue-400
  transition
  leading-[24px]
  max-[1200px]:block
`;

const mobileMenuLinkClassName = `
  block
  text-center
  font-instrument
  text-[22px]
  text-[#C9E2FF]
  font-normal
  leading-[32px]
  hover:text-blue-400
  transition
`;

const connectWalletButtonClassName = `
  rounded-full
  border
  border-blue-300
  bg-transparent
  px-8
  py-2
  font-instrument
  text-[14px]
  font-medium
  leading-[24px]
  tracking-[0.1em]
  text-[#C9E2FF]
  transition
  hover:border-blue-600
  hover:bg-blue-600
`;

function MenuLabel({ item }: { item: MenuItem }) {
  return (
    <>
      <span className="hidden max-[1200px]:inline">
        {item.label[0]}
        <br />
        {item.label[1]}
      </span>

      <span className="max-[1201px]:hidden">{item.label.join(" ")}</span>
    </>
  );
}

function BurgerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect y="8" width="32" height="2.5" rx="1" fill="#C9E2FF" />
      <rect y="15" width="32" height="2.5" rx="1" fill="#C9E2FF" />
      <rect y="22" width="32" height="2.5" rx="1" fill="#C9E2FF" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <line
        x1="8"
        y1="8"
        x2="24"
        y2="24"
        stroke="#C9E2FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="8"
        x2="8"
        y2="24"
        stroke="#C9E2FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ConnectWalletButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={connectWalletButtonClassName}
      onClick={onClick}
    >
      {CONNECT_WALLET_LABEL}
    </button>
  );
}

function DesktopMenu() {
  return (
    <ul className={desktopMenuClassName}>
      {MENU_ITEMS.map((item) => (
        <li key={item.href} className="text-center">
          <a
            href={item.href}
            className={desktopMenuLinkClassName}
            style={{
              minWidth: 0,
              whiteSpace: "pre-line",
            }}
          >
            <MenuLabel item={item} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function DesktopHeader({
  onConnectWallet,
}: {
  onConnectWallet: () => void;
}) {
  return (
    <nav className={desktopNavClassName}>
      <div className="flex min-w-[120px] items-center">
        <MoodAiIcon width={148} height={48} />
      </div>

      <DesktopMenu />

      <div className="flex min-w-[180px] justify-end">
        <ConnectWalletButton onClick={onConnectWallet} />
      </div>
    </nav>
  );
}

function MobileHeader({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  return (
    <nav className="flex w-full max-w-full items-center justify-between px-4 py-9 lg:hidden">
      <div className="flex items-center">
        <MoodAiIcon width={120} height={36} />
      </div>

      <button
        type="button"
        className="flex h-[32px] w-[32px] items-center justify-center"
        onClick={onOpenMenu}
        aria-label="Open menu"
      >
        <BurgerIcon />
      </button>
    </nav>
  );
}

function MobileMenuOverlay({
  onClose,
  onConnectWallet,
}: {
  onClose: () => void;
  onConnectWallet: () => void;
}) {
  const handleConnectWallet = (): void => {
    onClose();
    onConnectWallet();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      <div className="relative mx-auto flex h-full w-full max-w-[440px] flex-col items-center justify-center px-4">
        <button
          type="button"
          className="absolute top-[40px] right-[24px] flex h-[32px] w-[32px] items-center justify-center"
          onClick={onClose}
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>

        <ul className="mt-[60px] mb-[24px] flex w-full flex-col items-center gap-8">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={mobileMenuLinkClassName}
                onClick={onClose}
              >
                {item.label[0]}
                <br />
                {item.label[1]}
              </a>
            </li>
          ))}
        </ul>

        <ConnectWalletButton onClick={handleConnectWallet} />
      </div>
    </div>
  );
}

export default function Header() {
  const [walletStatus, setWalletStatus] = useState<WalletStatus | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: Replace this mock with real wallet provider/backend API integration.
  const connectWallet = useCallback(async (): Promise<void> => {
    setWalletStatus("connecting");
    setWalletAddress(undefined);

    window.setTimeout(() => {
      const isConnected = Math.random() > 0.5;

      if (isConnected) {
        setWalletAddress(MOCK_WALLET_ADDRESS);
        setWalletStatus("success");
        return;
      }

      setWalletStatus("failed");
    }, 2_000);
  }, []);

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
  }, []);

  const openMenu = useCallback((): void => {
    setIsMenuOpen(true);
  }, []);

  const closeWalletPopup = useCallback((): void => {
    setWalletStatus(null);
  }, []);

  return (
    <>
      <header className="flex w-full justify-center">
        <DesktopHeader onConnectWallet={connectWallet} />
        <MobileHeader onOpenMenu={openMenu} />
      </header>

      {isMenuOpen && (
        <MobileMenuOverlay
          onClose={closeMenu}
          onConnectWallet={connectWallet}
        />
      )}

      {walletStatus && (
        <WalletPopup
          open
          status={walletStatus}
          onClose={closeWalletPopup}
          {...(walletAddress ? { walletAddress } : {})}
          {...(walletStatus === "failed" ? { onTryAgain: connectWallet } : {})}
        />
      )}
    </>
  );
}