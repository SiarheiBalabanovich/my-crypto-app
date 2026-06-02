import { useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import { useNavigate } from "react-router-dom";

import bgHeroSection from "../../../assets/bg-hero-section.webp";
import dgbImage from "../../../assets/DGB.png";
import evaImage from "../../../assets/eVa.png";
import GetSignalsIcon from "../../../assets/get-signals-icon.svg?react";
import guruImage from "../../../assets/GURU.png";
import moodImage from "../../../assets/MOOD.png";
import mood2Image from "../../../assets/MOOD-2.png";
import oscaImage from "../../../assets/OSCA.png";
import ReactToTrendsIcon from "../../../assets/react-to-trends-instantly-icon.svg?react";
import TrustedIcon from "../../../assets/trusted-icon.svg?react";

import { CryptoCard } from "../../../entities/crypto/ui/crypto-card";
import { SearchBar } from "../../../features/search-crypto";
import { Header } from "../../layout/header";

type CryptoCardData = {
  image: string;
  name: string;
  changePercent: number;
  changeColor: string;
};

type BenefitItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
};

const HERO_SECTION_STYLE = {
  background: `url(${bgHeroSection}) center top / cover no-repeat`,
  minHeight: 1200,
  height: 1200,
  paddingBottom: 0,
} as const;

const CRYPTO_CARDS: CryptoCardData[] = [
  {
    image: guruImage,
    name: "GURU",
    changePercent: 1.24,
    changeColor: "text-green-400",
  },
  {
    image: oscaImage,
    name: "OSCA",
    changePercent: 2.68,
    changeColor: "text-green-400",
  },
  {
    image: evaImage,
    name: "eVa",
    changePercent: -0.17,
    changeColor: "text-red-400",
  },
  {
    image: moodImage,
    name: "MOOD",
    changePercent: -3.86,
    changeColor: "text-red-400",
  },
  {
    image: dgbImage,
    name: "DGB",
    changePercent: 0,
    changeColor: "text-blue-400",
  },
  {
    image: mood2Image,
    name: "MOOD-2",
    changePercent: 0,
    changeColor: "text-blue-400",
  },
];

const BENEFITS: BenefitItem[] = [
  {
    icon: GetSignalsIcon,
    text: "Get Signals Before Price Moves",
  },
  {
    icon: TrustedIcon,
    text: "Trusted, Real Insights",
  },
  {
    icon: ReactToTrendsIcon,
    text: "React to Trends Instantly",
  },
];

const HERO_DESCRIPTION =
  "MOOD AI measures the community sentiment (“mood”) for any crypto token by analyzing its Telegram Community activity. Why? Because Price lags & Mood leads.";

const normalizeToken = (value: string): string => value.trim().replace(/^\$/, "");

const getDuplicatedCards = (): CryptoCardData[] => [
  ...CRYPTO_CARDS,
  ...CRYPTO_CARDS,
];

function SearchIcon() {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <circle cx="15" cy="15" r="10" stroke="#C9E2FF" strokeWidth="2" />
      <path
        d="M22 22L28 28"
        stroke="#C9E2FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CryptoCardsFeed({
  variant,
}: {
  variant: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";

  return (
    <div
      className={
        isDesktop
          ? "relative w-full mb-[80px] overflow-x-hidden overflow-y-hidden"
          : "relative w-full overflow-x-hidden overflow-y-hidden mt-[55px] mb-[64px]"
      }
    >
      <div
        className={
          isDesktop
            ? "flex gap-[16px] animate-scroll whitespace-nowrap"
            : "flex animate-scroll whitespace-nowrap"
        }
      >
        {getDuplicatedCards().map((card, index) => (
          <div
            key={`${card.name}-${index}`}
            className={
              isDesktop
                ? `w-[337px] h-[230px] flex-shrink-0 ${
                    index % 2 === 1 ? "translate-y-[15px]" : ""
                  }`
                : `w-[260px] h-[210px] flex-shrink-0 ${
                    index === 0 ? "ml-[24px]" : ""
                  } ${index % 2 === 1 ? "translate-y-[15px]" : ""}`
            }
          >
            <CryptoCard
              image={card.image}
              name={card.name}
              changePercent={card.changePercent}
              changeColor={card.changeColor}
              showName={false}
              showChange={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopBenefits() {
  return (
    <div className="flex flex-row items-center justify-center gap-[48px] mt-0 mb-0">
      {BENEFITS.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <div key={benefit.text} className="flex flex-row items-center gap-[8px]">
            <Icon className="w-6 h-6" />

            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              {benefit.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MobileBenefits() {
  return (
    <div className="flex flex-col items-start justify-center w-full max-w-[390px] mx-auto">
      {BENEFITS.map((benefit, index) => {
        const Icon = benefit.icon;
        const isLast = index === BENEFITS.length - 1;

        return (
          <div
            key={benefit.text}
            className={`flex flex-row items-center gap-[8px] ${
              isLast ? "mb-[72px]" : "mb-[38px]"
            }`}
          >
            <Icon className="w-6 h-6" />

            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              {benefit.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MobileSearchForm() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const token = normalizeToken(searchValue);

    if (!token) {
      return;
    }

    navigate(`/dashboard/${encodeURIComponent(token)}`);
  };

  return (
    <form className="w-full flex justify-center mb-0" onSubmit={handleSubmit}>
      <div className="bg-[#111C22] rounded-[32px] flex items-center w-[342px] h-[72px] pr-3 pl-6">
        <input
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white text-[16px] font-instrument placeholder-[#C9E2FF]"
          placeholder="Search any token (e.g. $MOOD...)"
        />

        <button
          className="ml-2 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#0082D9]"
          type="submit"
          aria-label="Search token"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}

function DesktopHeroContent() {
  return (
    <div className="hidden w-full mx-auto flex-col items-center justify-center px-4 lg:flex">
      <h1 className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center">
        TRACK CRYPTO SENTIMENT <br />

        <span className="block text-6xl mb-[64px] mt-4 text-white font-instrument font-bold text-[48px] leading-[56px] tracking-[0.2em]">
          BEFORE THE MARKET MOVES
        </span>
      </h1>

      <p className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center mb-[64px] max-w-[800px]">
        {HERO_DESCRIPTION}
      </p>

      <SearchBar />

      <CryptoCardsFeed variant="desktop" />

      <DesktopBenefits />
    </div>
  );
}

function MobileHeroContent() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-6 lg:hidden">
      <h1 className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center mt-[57px]">
        TRACK CRYPTO SENTIMENT
      </h1>

      <div className="text-white font-instrument font-bold text-[36px] leading-[42px] tracking-[0.2em] text-center mt-4 mb-[32px] break-words">
        BEFORE THE <br />
        MARKET
        <br />
        MOVES
      </div>

      <p className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center mb-[32px] max-w-[342px]">
        {HERO_DESCRIPTION}
      </p>

      <MobileSearchForm />

      <CryptoCardsFeed variant="mobile" />

      <MobileBenefits />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="w-full flex flex-col items-center justify-start relative"
      style={HERO_SECTION_STYLE}
    >
      <Header />

      <DesktopHeroContent />
      <MobileHeroContent />
    </section>
  );
}