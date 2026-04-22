import React, { useState, useEffect } from "react";
import DashboardTooltip from "./DashboardTooltip";

// --- Types for (Differences) ---
// TODO Udoop: Replace with API response when backend is ready
type Difference = {
  label: string;
  percent: string;
  time: string;
};

const moodDifferences: Difference[] = [
  { label: "+10", percent: "+0.13%", time: "1 hour" },
  { label: "+20", percent: "+0.13%", time: "1 day" },
  { label: "+30", percent: "+0.13%", time: "1 week" },
];

const engagementDifferences: Difference[] = [
  { label: "+10", percent: "+0.13%", time: "1 hour" },
  { label: "+20", percent: "+0.13%", time: "1 day" },
  { label: "+30", percent: "+0.13%", time: "1 week" },
];

// --- Tooltip descriptions ---
// TODO Udoop: Can be replaced with backend data
const tooltipData: Record<string, { text: string }> = {
  "Mood Differences": {
    text: "Mood Differences show how the overall sentiment in the token’s Telegram group has changed over time.",
  },
  "Engagement Differences": {
    text: "Engagement Differences reflect how actively people are interacting in the group — messages, reactions, and overall activity.",
  },
};

// --- Desktop card for differences ---
interface DifferencesCardProps {
  title: "Mood Differences" | "Engagement Differences";
}

const DifferencesCard: React.FC<DifferencesCardProps> = ({ title }) => {
  const differences = title === "Mood Differences" ? moodDifferences : engagementDifferences;
  const [showTooltip, setShowTooltip] = useState(false);

  const headerStyle: React.CSSProperties = {
    color: "#4F6175",
    fontFamily: "Instrument Sans, sans-serif",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "26px",
  };
  const numberStyle: React.CSSProperties = {
    color: "#C9E2FF",
    fontFamily: "Instrument Sans, sans-serif",
    fontWeight: 500,
    fontSize: 32,
    lineHeight: "28px",
  };
  const percentStyle: React.CSSProperties = {
    color: "#239F2E",
    fontFamily: "Instrument Sans, sans-serif",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "16px",
  };
  const timeStyle: React.CSSProperties = {
    color: "#4F6175",
    fontFamily: "Instrument Sans, sans-serif",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "26px",
  };

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    top: 40,
    left: -60,
    zIndex: 99,
    minWidth: 240,
    maxWidth: 340,
    cursor: "pointer",
  };

  return (
    <div
      className="w-[484px] h-[192px] bg-[#070D11] rounded-[8px] flex flex-col justify-between relative"
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span style={headerStyle}>{title}</span>
        <>
          <span
            className="text-[#90EB43] text-xl cursor-pointer select-none"
            onClick={() => setShowTooltip((v) => !v)}
            tabIndex={0}
            role="button"
            aria-label="Show info"
          >
            ⓘ
          </span>
          {showTooltip && (
            <div
              style={tooltipStyle}
              onClick={() => setShowTooltip(false)}
              tabIndex={0}
              role="button"
              aria-label="Close tooltip"
            >
              <DashboardTooltip
                title={title}
                text={tooltipData[title].text}
                icon={null}
                onClose={() => setShowTooltip(false)}
              />
            </div>
          )}
        </>
      </div>
      <div className="flex justify-between w-full mt-2">
        {differences.map((diff) => (
          <div
            key={diff.label}
            className="flex flex-col items-start"
            style={{ minWidth: 100 }}
          >
            <div className="flex items-center">
              <span style={numberStyle}>{diff.label}</span>
              <svg
                width={8}
                height={6}
                style={{ marginLeft: 6, marginRight: 4, display: "inline-block" }}
                viewBox="0 0 8 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="4,1 8,6 0,6" fill="#239F2E" />
              </svg>
              <span style={percentStyle}>{diff.percent}</span>
            </div>
            <span
              style={timeStyle}
              className="mt-[10px] block text-left w-full"
            >
              {diff.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Mobile/tablet --- //
const DifferencesMobile: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [showTooltipMood, setShowTooltipMood] = useState(false);
  const [showTooltipEng, setShowTooltipEng] = useState(false);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const canShowTooltip = windowWidth >= 640;

  const cardTitleStyle =
    "text-[12px] font-instrument text-[#4F6175] font-normal";
  const numberStyle =
    "text-[28px] font-instrument font-medium text-[#C9E2FF]";
  const percentStyle =
    "text-[12px] font-instrument text-[#239F2E] font-normal";
  const timeStyle =
    "text-[12px] font-instrument text-[#4F6175] font-normal mt-1";

  // Tooltip coordinates
  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    top: 34,
    left: 24,
    zIndex: 99,
    minWidth: 180,
    maxWidth: 260,
    cursor: "pointer",
  };

  return (
    <div className="flex w-full gap-8 relative">
      {/* Mood Differences */}
      <div className="flex-1 bg-[#070D11] rounded-[8px] py-2 px-1 flex flex-col relative">
        <div className="flex items-center justify-between mb-2 relative">
          <span className={cardTitleStyle}>
            Mood
            <br />
            Differences
          </span>
          <span
            className="text-[#90EB43] text-[14px] w-[14px] h-[14px] inline-flex items-center justify-center leading-[14px] cursor-pointer select-none"
            onClick={() => canShowTooltip && setShowTooltipMood(v => !v)}
            tabIndex={canShowTooltip ? 0 : -1}
            role="button"
            aria-label="Show info"
            style={canShowTooltip ? {} : { pointerEvents: "none", opacity: 0.65 }}
          >
            ⓘ
          </span>
          {showTooltipMood && canShowTooltip && (
            <div
              style={tooltipStyle}
              onClick={() => setShowTooltipMood(false)}
              tabIndex={0}
              role="button"
              aria-label="Close tooltip"
            >
              <DashboardTooltip
                title="Mood Differences"
                text={tooltipData["Mood Differences"].text}
                icon={null}
                onClose={() => setShowTooltipMood(false)}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {moodDifferences.map((diff) => (
            <div key={diff.label} className="flex flex-col items-start mb-2">
              <div className="flex items-center">
                <span className={numberStyle}>{diff.label}</span>
                <svg width={8} height={6} className="mx-1" viewBox="0 0 8 6" fill="none">
                  <polygon points="4,1 8,6 0,6" fill="#239F2E" />
                </svg>
                <span className={percentStyle}>{diff.percent}</span>
              </div>
              <span className={timeStyle}>{diff.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Engagement Differences */}
      <div className="flex-1 bg-[#070D11] rounded-[8px] py-2 px-1 flex flex-col relative">
        <div className="flex items-center justify-between mb-2 relative">
          <span className={cardTitleStyle}>Engagement Differences</span>
          <span
            className="text-[#90EB43] text-[14px] w-[14px] h-[14px] inline-flex items-center justify-center leading-[14px] cursor-pointer select-none"
            onClick={() => canShowTooltip && setShowTooltipEng(v => !v)}
            tabIndex={canShowTooltip ? 0 : -1}
            role="button"
            aria-label="Show info"
            style={canShowTooltip ? {} : { pointerEvents: "none", opacity: 0.65 }}
          >
            ⓘ
          </span>
          {showTooltipEng && canShowTooltip && (
            <div
              style={tooltipStyle}
              onClick={() => setShowTooltipEng(false)}
              tabIndex={0}
              role="button"
              aria-label="Close tooltip"
            >
              <DashboardTooltip
                title="Engagement Differences"
                text={tooltipData["Engagement Differences"].text}
                icon={null}
                onClose={() => setShowTooltipEng(false)}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {engagementDifferences.map((diff) => (
            <div key={diff.label} className="flex flex-col items-start mb-2">
              <div className="flex items-center">
                <span className={numberStyle}>{diff.label}</span>
                <svg width={8} height={6} className="mx-1" viewBox="0 0 8 6" fill="none">
                  <polygon points="4,1 8,6 0,6" fill="#239F2E" />
                </svg>
                <span className={percentStyle}>{diff.percent}</span>
              </div>
              <span className={timeStyle}>{diff.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DifferencesRows: React.FC = () => {
  return (
    <>
      {/* Desktop/tablet */}
      <div className="hidden xlm:flex flex-col gap-4">
        <DifferencesCard title="Mood Differences" />
        <DifferencesCard title="Engagement Differences" />
      </div>
      {/* Mobile */}
      <div className="flex xlm:hidden w-full">
        <DifferencesMobile />
      </div>
    </>
  );
};

export default DifferencesRows;