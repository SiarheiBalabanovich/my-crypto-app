import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import CryptoCard from "./CryptoCard";
import bgHeroSection from "../assets/bg-hero-section.webp";
import guruImage from '../assets/GURU.png';
import dgbImage from '../assets/DGB.png';
import evaImage from '../assets/eVa.png';
import moodImage from '../assets/MOOD.png';
import mood2Image from '../assets/MOOD-2.png';
import oscaImage from '../assets/OSCA.png';
import GetSignalsIcon from '../assets/get-signals-icon.svg?react';
import TrustedIcon from '../assets/trusted-icon.svg?react';
import ReactToTrendsIcon from '../assets/react-to-trends-instantly-icon.svg?react';

// Type for map data
type CardData = {
  image: string;
  name: string;
  changePercent: number;
  changeColor: string;
};

// TODO: Replace with backend/API call for dynamic card data
const cardsData: CardData[] = [
  { image: guruImage, name: "GURU", changePercent: 1.24, changeColor: "text-green-400" },
  { image: oscaImage, name: "OSCA", changePercent: 2.68, changeColor: "text-green-400" },
  { image: evaImage, name: "eVa", changePercent: -0.17, changeColor: "text-red-400" },
  { image: moodImage, name: "MOOD", changePercent: -3.86, changeColor: "text-red-400" },
  { image: dgbImage, name: "DGB", changePercent: 0.0, changeColor: "text-blue-400" },
  { image: mood2Image, name: "MOOD-2", changePercent: 0.0, changeColor: "text-blue-400" },
];

const HeroSection: React.FC = () => {
  // TODO: Replace static SearchBar input with controlled state, and connect with backend API for search results

  // ---- MOBILE SEARCH STATE ----
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    const token = searchValue.replace(/^\$/, '').trim();
    if (token) {
      navigate(`/dashboard/${token}`);
    }
  };
  // ---- END MOBILE SEARCH STATE ----

  return (
    <section
      className="w-full flex flex-col items-center justify-start relative"
      style={{
        background: `url(${bgHeroSection}) center top / cover no-repeat`,
        minHeight: 1200,
        height: 1200,
        paddingBottom: 0,
      }}
    >
      <Header />

      {/* DESKTOP */}
      <div className="w-full mx-auto flex flex-col items-center justify-center px-4 hidden lg:flex">
        <h1 className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center">
          TRACK CRYPTO SENTIMENT <br />
          <span className="block text-6xl mb-[64px] mt-4 text-white font-instrument font-bold text-[48px] leading-[56px] tracking-[0.2em]">
            BEFORE THE MARKET MOVES
          </span>
        </h1>
        <p className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center mb-[64px] max-w-[800px]">
          MOOD AI measures the community sentiment (“mood”) for any crypto token by
          analyzing its Telegram Community activity. Why? Because Price lags & Mood leads.
        </p>
        <SearchBar />
        <div className="relative w-full mb-[80px] overflow-x-hidden overflow-y-hidden">
          <div className="flex gap-[16px] animate-scroll whitespace-nowrap">
            {cardsData.concat(cardsData).map((card, index) => (
              <div
                key={index}
                className={`w-[337px] h-[230px] flex-shrink-0 ${index % 2 === 1 ? "translate-y-[15px]" : ""}`}
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
        {/* Icons block */}
        <div className="flex flex-row items-center justify-center gap-[48px] mt-0 mb-0">
          <div className="flex flex-row items-center gap-[8px]">
            <GetSignalsIcon className="w-6 h-6" />
            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              Get Signals Before Price Moves
            </span>
          </div>
          <div className="flex flex-row items-center gap-[8px]">
            <TrustedIcon className="w-6 h-6" />
            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              Trusted, Real Insights
            </span>
          </div>
          <div className="flex flex-row items-center gap-[8px]">
            <ReactToTrendsIcon className="w-6 h-6" />
            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              React to Trends Instantly
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE + TABLET */}
      <div className="w-full flex flex-col items-center justify-center px-6 lg:hidden">
        <h1 className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center mt-[57px]">
          TRACK CRYPTO SENTIMENT
        </h1>
        <div className="text-white font-instrument font-bold text-[36px] leading-[42px] tracking-[0.2em] text-center mt-4 mb-[32px] break-words">
          BEFORE THE <br />MARKET<br />MOVES
        </div>
        <p className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[24px] tracking-[0.2em] text-center mb-[32px] max-w-[342px]">
          MOOD AI measures the community sentiment (“mood”) for any crypto token by
          analyzing its Telegram Community activity. Why? Because Price lags & Mood leads.
        </p>
        {/* Search bar (MOBILE version) */}
        <form
          className="w-full flex justify-center mb-0"
          onSubmit={handleMobileSearch}
        >
          <div className="bg-[#111C22] rounded-[32px] flex items-center w-[342px] h-[72px] pr-3 pl-6">
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-[16px] font-instrument placeholder-[#C9E2FF]"
              placeholder="Search any token (e.g. $MOOD...)"
            />
            <button
              className="ml-2 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#0082D9]"
              type="submit"
            >
              {/* Search Icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="15" cy="15" r="10" stroke="#C9E2FF" strokeWidth="2" />
                <path d="M22 22L28 28" stroke="#C9E2FF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </form>

        {/* Endless feed of cards (MOBILE+TABLET) */}
        <div className="relative w-full overflow-x-hidden overflow-y-hidden mt-[55px] mb-[64px]">
          <div className="flex animate-scroll whitespace-nowrap">
            {cardsData.concat(cardsData).map((card, index) => (
              <div
                key={index}
                className={`w-[260px] h-[210px] flex-shrink-0 ${index === 0 ? "ml-[24px]" : ""} ${index % 2 === 1 ? "translate-y-[15px]" : ""}`}
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
        {/* Icons block */}
        <div className="flex flex-col items-start justify-center w-full max-w-[390px] mx-auto">
          <div className="flex flex-row items-center gap-[8px] mb-[38px]">
            <GetSignalsIcon className="w-6 h-6" />
            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              Get Signals Before Price Moves
            </span>
          </div>
          <div className="flex flex-row items-center gap-[8px] mb-[38px]">
            <TrustedIcon className="w-6 h-6" />
            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              Trusted, Real Insights
            </span>
          </div>
          <div className="flex flex-row items-center gap-[8px] mb-[72px]">
            <ReactToTrendsIcon className="w-6 h-6" />
            <span className="font-instrument font-normal text-[18px] leading-[24px] text-[#C9E2FF]">
              React to Trends Instantly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;