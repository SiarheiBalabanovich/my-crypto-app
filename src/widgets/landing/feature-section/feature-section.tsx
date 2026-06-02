import type { ReactNode } from "react";

import aboutBg from "../../../assets/background about mood ai.png";
import AboutIcon from "../../../assets/about-icon.svg?react";
import MoodChartIcon from "../../../assets/mood-chart-icon.svg?react";
import MoodPriceCorrelationIcon from "../../../assets/mood-price-correlation-icon.svg?react";
import ProblemSolutionIcon from "../../../assets/problem-solution-icon.svg?react";
import { FeatureCard } from "../feature-card";

type FeatureCardData = {
  icon: ReactNode;
  title: string;
  text: string;
};

const SECTION_ID = "what-is-mood-ai";

const SECTION_SUBTITLE = "WHAT IS MOOD AI?";

const DESKTOP_TITLE = "FEEL THE MARKET BEFORE IT MOVES";

const MOBILE_TITLE = (
  <>
    FEEL THE MARKET
    <br />
    BEFORE IT
    <br />
    MOVES
  </>
);

const FEATURE_CARDS: FeatureCardData[] = [
  {
    icon: <ProblemSolutionIcon width={24} height={24} />,
    title: "PROBLEM & SOLUTION",
    text: "Crypto traders lack fast and time-scalable insights into a token’s community mood. MOOD AI solves this by helping you detect sentiment shifts before they reflect in price — giving you a powerful edge in timing entries or exits.",
  },
  {
    icon: <AboutIcon width={24} height={24} />,
    title: "ABOUT THE TECH",
    text: "MOOD AI analyzes engagement – messages, stickers, reactions, quotes & more – in a Crypto Token Telegram Community, then uses a neural network to evaluate the mood of the conversation, trained for crypto-related conversations. Noise like bots, spammers, admins are being filtered out.",
  },
  {
    icon: <MoodChartIcon width={24} height={24} />,
    title: "MOOD CHART",
    text: "MOOD AI visualizes the current and past community sentiment as the MOOD CHART — where the X-axis is time and the Y-axis is sentiment intensity according to our proprietary algorithms.",
  },
  {
    icon: <MoodPriceCorrelationIcon width={24} height={24} />,
    title: "MOOD / PRICE CORRELATION",
    text: "MOOD AI also visualizes the current and past correlation between a token’s price and the corresponding community mood. This feature gives various possibilities of back testing the MOOD CHART.",
  },
];

const sectionStyle = {
  background: `url(${aboutBg}) center center / cover no-repeat`,
} as const;

const subtitleStyle = {
  color: "#C9E2FF",
  fontFamily: '"Instrument Sans", sans-serif',
  fontWeight: 400,
  fontSize: "20px",
  letterSpacing: "0.1em",
  lineHeight: "24px",
} as const;

const desktopTitleStyle = {
  color: "#fff",
  fontFamily: '"Instrument Sans", sans-serif',
  fontWeight: 700,
  fontSize: "48px",
  lineHeight: "42px",
  letterSpacing: "0.18em",
} as const;

const mobileTitleStyle = {
  color: "#fff",
  fontFamily: '"Instrument Sans", sans-serif',
  fontWeight: 700,
  fontSize: "36px",
  lineHeight: "42px",
  letterSpacing: "0.18em",
  marginBottom: "50px",
} as const;

const desktopCardsWrapperStyle = {
  paddingLeft: "max(24px, 5vw)",
  paddingRight: "max(24px, 5vw)",
} as const;

function DesktopFeatureSection() {
  return (
    <div className="hidden w-full flex-col items-center pt-[195px] pb-[260px] lg:flex">
      <div className="text-center uppercase" style={{ ...subtitleStyle, marginBottom: "16px" }}>
        {SECTION_SUBTITLE}
      </div>

      <h2 className="mb-[195px] text-center font-bold" style={desktopTitleStyle}>
        {DESKTOP_TITLE}
      </h2>

      <div
        className="
          flex w-full max-w-[1672px] flex-row justify-center
          gap-[24px]
          px-8
          lg:px-24
          xl:px-14
        "
        style={desktopCardsWrapperStyle}
      >
        {FEATURE_CARDS.map((card) => (
          <FeatureCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
    </div>
  );
}

function MobileFeatureSection() {
  return (
    <div className="flex w-full flex-col items-center px-4 pt-[72px] pb-[72px] lg:hidden">
      <div className="mb-4 text-center uppercase" style={subtitleStyle}>
        {SECTION_SUBTITLE}
      </div>

      <h2 className="text-center font-bold" style={mobileTitleStyle}>
        {MOBILE_TITLE}
      </h2>

      <div className="flex w-full flex-col items-center">
        {FEATURE_CARDS.map((card, index) => (
          <div
            key={card.title}
            className={`flex w-full justify-center ${index !== 0 ? "mt-[24px]" : ""}`}
          >
            <FeatureCard
              icon={card.icon}
              title={card.title}
              text={card.text}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureSection() {
  return (
    <section
      id={SECTION_ID}
      className="flex w-full flex-col items-center"
      style={sectionStyle}
    >
      <DesktopFeatureSection />
      <MobileFeatureSection />
    </section>
  );
}