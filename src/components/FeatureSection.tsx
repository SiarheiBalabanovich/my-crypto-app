import AboutIcon from "../assets/about-icon.svg?react";
import MoodChartIcon from "../assets/mood-chart-icon.svg?react";
import MoodPriceCorrelationIcon from "../assets/mood-price-correlation-icon.svg?react";
import ProblemSolutionIcon from "../assets/problem-solution-icon.svg?react";
import FeatureCard from "./FeatureCard";
import aboutBg from "../assets/background about mood ai.png";

// Type for cards
type FeatureCardData = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

// TODO: Replace static cards array with backend data once API is ready.
const cards: FeatureCardData[] = [
  {
    icon: <ProblemSolutionIcon width={24} height={24} />,
    title: "PROBLEM & SOLUTION",
    text: "Crypto traders lack fast and time-scalable insights into a token’s community mood. MOOD AI solves this by helping you detect sentiment shifts before they reflect in price — giving you a powerful edge in timing entries or exits."
  },
  {
    icon: <AboutIcon width={24} height={24} />,
    title: "ABOUT THE TECH",
    text: "MOOD AI analyzes engagement – messages, stickers, reactions, quotes & more – in a Crypto Token Telegram Community, then uses a neural network to evaluate the mood of the conversation, trained for crypto-related conversations. Noise like bots, spammers, admins are being filtered out."
  },
  {
    icon: <MoodChartIcon width={24} height={24} />,
    title: "MOOD CHART",
    text: "MOOD AI visualizes the current and past community sentiment as the MOOD CHART — where the X-axis is time and the Y-axis is sentiment intensity according to our proprietary algorithms."
  },
  {
    icon: <MoodPriceCorrelationIcon width={24} height={24} />,
    title: "MOOD / PRICE CORRELATION",
    text: "MOOD AI also visualizes the current and past correlation between a token’s price and the corresponding community mood. This feature gives various possibilities of back testing the MOOD CHART."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section id="what-is-mood-ai"
      className="w-full flex flex-col items-center"
      style={{
        background: `url(${aboutBg}) center center / cover no-repeat`
      }}
    >
      {/* DESKTOP */}
      <div className="w-full flex flex-col items-center pt-[195px] pb-[260px] hidden lg:flex">
        <div
          className="uppercase text-center"
          style={{
            color: "#C9E2FF",
            fontFamily: '"Instrument Sans", sans-serif',
            fontWeight: 400,
            fontSize: "20px",
            letterSpacing: "0.1em",
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          WHAT IS MOOD AI?
        </div>
        <h2
          className="font-bold text-center mb-[195px]"
          style={{
            color: "#fff",
            fontFamily: '"Instrument Sans", sans-serif',
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "42px",
            letterSpacing: "0.18em",
          }}
        >
          FEEL THE MARKET BEFORE IT MOVES
        </h2>
        <div
          className="
            flex flex-row gap-[24px] justify-center w-full
            max-w-[1672px]
            px-8
            xl:px-14
            lg:px-24
          "
          style={{
            paddingLeft: "max(24px, 5vw)",
            paddingRight: "max(24px, 5vw)"
          }}
        >
          {cards.map((card, idx) => (
            <FeatureCard key={idx} icon={card.icon} title={card.title} text={card.text} />
          ))}
        </div>
      </div>

      {/* MOBILE + TABLET */}
      <div className="w-full flex flex-col items-center pt-[72px] pb-[72px] px-4 lg:hidden">
        <div
          className="uppercase text-center mb-4"
          style={{
            color: "#C9E2FF",
            fontFamily: '"Instrument Sans", sans-serif',
            fontWeight: 400,
            fontSize: "20px",
            letterSpacing: "0.1em",
            lineHeight: "24px",
          }}
        >
          WHAT IS MOOD AI?
        </div>
        <h2
          className="font-bold text-center"
          style={{
            color: "#fff",
            fontFamily: '"Instrument Sans", sans-serif',
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "42px",
            letterSpacing: "0.18em",
            marginBottom: "50px"
          }}
        >
          FEEL THE MARKET<br />BEFORE IT<br />MOVES
        </h2>
        <div className="flex flex-col items-center w-full">
          {cards.map((card, idx) => (
            <div key={idx} className={`w-full flex justify-center ${idx !== 0 ? "mt-[24px]" : ""}`}>
              <FeatureCard
                icon={card.icon}
                title={card.title}
                text={card.text}
                isMobile
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;