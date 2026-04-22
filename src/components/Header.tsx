import { useState } from "react";
import MoodAiIcon from "../assets/moodai-icon.svg?react";
import WalletPopup from "./WalletPopup";

// TODO: Replace local state mocks with backend data/API when available.
const MENU: { label: [string, string]; href: string }[] = [
  { label: ["WHAT IS", "MOOD AI?"], href: "#what-is-mood-ai" },
  { label: ["HOW IT", "WORKS"], href: "#how-it-works" },
  { label: ["PROGRESS", "OVERVIEW"], href: "#progress-overview" },
  { label: ["GET A FREE", "TRIAL"], href: "#get-a-free-trial" }
];

const Header: React.FC = () => {
  const [popup, setPopup] = useState<null | "connecting" | "failed" | "success">(null);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: Replace this stub with actual wallet provider or backend API integration.
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
      <header className="w-full flex justify-center">
        {/* Desktop */}
        <nav
          className="
            hidden lg:flex
            w-full
            max-w-[1760px]
            items-center
            justify-between
            mx-auto
            rounded-t-3xl
            px-20
            md:px-10
            sm:px-6
            pt-[52px] pb-[132px] h-auto
          "
        >
          <div className="flex items-center min-w-[120px]">
            <MoodAiIcon width={148} height={48} />
          </div>
          <ul
            className={`
              flex
              list-none
              items-center
              gap-[64px]
              max-[1300px]:gap-[24px]
              max-[1200px]:gap-[45px]
              max-[1200px]:justify-center
              max-w-[900px]
            `}
          >
            {MENU.map((item) => (
              <li key={item.label.join("")} className="text-center">
                <a
                  href={item.href}
                  className={`
                    font-instrument font-normal text-[16px] text-menu-link no-underline
                    hover:text-blue-400 transition leading-[24px]
                    max-[1200px]:block
                  `}
                  style={{
                    minWidth: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  <span className="hidden max-[1200px]:inline">
                    {item.label[0]}
                    <br />
                    {item.label[1]}
                  </span>
                  <span className="max-[1201px]:hidden">{item.label.join(" ")}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="min-w-[180px] flex justify-end">
            <button
              className="rounded-full border border-blue-300 px-8 py-2 bg-transparent font-instrument font-medium text-[14px] leading-[24px] tracking-[0.1em] text-[#C9E2FF] hover:bg-blue-600 hover:border-blue-600 transition"
              onClick={connectWallet}
            >
              CONNECT WALLET
            </button>
          </div>
        </nav>

        {/* Mobile/Tablet Header */}
        <nav className="lg:hidden w-full max-w-full flex items-center justify-between px-4 py-9">
          <div className="flex items-center">
            <MoodAiIcon width={120} height={36} />
          </div>
          <button
            className="w-[32px] h-[32px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="32" height="32" viewBox="0 0 32 32">
              <rect y="8" width="32" height="2.5" rx="1" fill="#C9E2FF" />
              <rect y="15" width="32" height="2.5" rx="1" fill="#C9E2FF" />
              <rect y="22" width="32" height="2.5" rx="1" fill="#C9E2FF" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex justify-center items-center">
          <div className="relative w-full max-w-[440px] h-full flex flex-col justify-center items-center mx-auto px-4">
            <button
              className="absolute top-[40px] right-[24px] w-[32px] h-[32px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="32" height="32" viewBox="0 0 32 32">
                <line x1="8" y1="8" x2="24" y2="24" stroke="#C9E2FF" strokeWidth="2" strokeLinecap="round" />
                <line x1="24" y1="8" x2="8" y2="24" stroke="#C9E2FF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <ul className="flex flex-col gap-8 mt-[60px] mb-[24px] w-full items-center">
              {MENU.map((item) => (
                <li key={item.label.join("")}>
                  <a
                    href={item.href}
                    className="font-instrument text-[22px] text-[#C9E2FF] font-normal leading-[32px] hover:text-blue-400 transition text-center block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label[0]}
                    <br />
                    {item.label[1]}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="rounded-full border border-blue-300 px-8 py-2 bg-transparent font-instrument font-medium text-[14px] leading-[24px] tracking-[0.1em] text-[#C9E2FF] hover:bg-blue-600 hover:border-blue-600 transition"
              onClick={() => {
                setIsMenuOpen(false);
                connectWallet();
              }}
            >
              CONNECT WALLET
            </button>
          </div>
        </div>
      )}

      {/* Wallet Popup */}
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

export default Header;