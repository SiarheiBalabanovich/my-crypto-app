import MoodAiElementIcon from "../assets/moodai-element-icon.png";
import CheckboxMood from "../assets/checkbox-mood.svg?react";
import CheckboxPrice from "../assets/checkbox-price.svg?react";
import CheckboxEngagement from "../assets/checkbox-engagement.svg?react";
import type { TooltipProps } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LegendItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { style?: React.CSSProperties }>;
  label: string;
};
const legend: LegendItem[] = [
  { icon: CheckboxMood, label: "Mood" },
  { icon: CheckboxPrice, label: "Price" },
  { icon: CheckboxEngagement, label: "Engagement" },
];

// TODO: Replace on API
const chartData = [
  { name: "-4d", Mood: 11, Price: 62, Engagement: 42 },
  { name: "-3d", Mood: 13, Price: 41, Engagement: 52 },
  { name: "-2d", Mood: 32, Price: 53, Engagement: 34 },
  { name: "-1d", Mood: 62, Price: 13, Engagement: 43 },
  { name: "now", Mood: 41, Price: 43, Engagement: 11 },
];

const xLabels = ["-4d", "-3d", "-2d", "-1d", "now"];

const legendTextStyle: React.CSSProperties = {
  color: "#FFFFFF",
  fontFamily: "Instrument Sans, sans-serif",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "26px",
};

// SVG Gradient Line X Axis
const GradientLineXAxis = ({ width = 648 }: { width: number }) => (
  <svg width={width} height="2" style={{ display: "block" }}>
    <defs>
      <linearGradient id="xAxisLineGradient" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#798899" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#C9E2FF" stopOpacity="1" />
      </linearGradient>
    </defs>
    <line
      x1="0"
      y1="1"
      x2={width}
      y2="1"
      stroke="url(#xAxisLineGradient)"
      strokeWidth="2"
      opacity="0.5"
      style={{ transition: "stroke 0.2s" }}
    />
  </svg>
);

const CustomTooltip: React.FC<TooltipProps<number, string>> = (props) => {
  let arr: Array<{ dataKey: string; value: number }> = [];
  for (const value of Object.values(props)) {
    if (Array.isArray(value) && value.length && value[0] && typeof value[0] === 'object' && 'dataKey' in value[0]) {
      arr = value as Array<{ dataKey: string; value: number }>;
      break;
    }
  }

  if (!props.active || !arr.length) return null;

  const mood = arr.find((item) => item.dataKey === "Mood")?.value;
  const price = arr.find((item) => item.dataKey === "Price")?.value;
  const engagement = arr.find((item) => item.dataKey === "Engagement")?.value;

  return (
    <div
      style={{
        background: "#141F2C",
        borderRadius: 12,
        padding: "24px 28px 18px 28px",
        boxShadow: "0 4px 24px 0 #0006",
        minWidth: 170,
        minHeight: 80,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {engagement !== undefined && (
        <div style={{ color: "#7EFB65", fontWeight: 500, fontSize: 24, marginBottom: 3 }}>
          Engagement : <span style={{ fontWeight: 400 }}>{engagement}</span>
        </div>
      )}
      {mood !== undefined && (
        <div style={{ color: "#41A8FF", fontWeight: 500, fontSize: 22, marginBottom: 3 }}>
          Mood : <span style={{ fontWeight: 400 }}>{mood}</span>
        </div>
      )}
      {price !== undefined && (
        <div style={{ color: "#FF7C2E", fontWeight: 500, fontSize: 22 }}>
          Price : <span style={{ fontWeight: 400 }}>{price}</span>
        </div>
      )}
    </div>
  );
};

const RechartsChart: React.FC<{ height?: number }> = ({ height = 180 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart
      data={chartData}
      margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
    >
      <XAxis hide />
      <YAxis hide />
      <Tooltip
        content={<CustomTooltip />}
      />
      <Line type="monotone" dataKey="Mood" stroke="#41A8FF" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="Price" stroke="#FF7C2E" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="Engagement" stroke="#7EFB65" strokeWidth={3} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const MoodChart: React.FC = () => {
  // TODO: Dynamic values from the backend
  const growthPercent = "+2.68%";
  const growthColor = "#239F2E";

  const desktopLineWidth = 680 - 32;
  const mobileLineWidth = 342 - 32;

  return (
    <>
      {/* DESKTOP/TABLET */}
      <div className="hidden xlm:block w-[680px] h-[400px]">
        <div className="bg-[#070D11] rounded-[8px] p-0 relative min-h-[400px] flex flex-col justify-between h-full">
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 20, marginLeft: 16, marginRight: 24, marginBottom: 24 }}
          >
            <div className="flex items-center">
              <img
                src={MoodAiElementIcon}
                alt="Mood AI Icon"
                width={22}
                height={22}
                style={{ marginRight: 8 }}
              />
              <span
                style={{
                  color: "#4F6175",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: "16px",
                  marginRight: 8,
                }}
              >
                MOOD AI
              </span>
              <svg
                width={12}
                height={12}
                style={{ marginRight: 5, marginBottom: 2 }}
                viewBox="0 0 8 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="4,1 8,6 0,6" fill={growthColor} />
              </svg>
              <span
                style={{
                  color: growthColor,
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: "16px",
                }}
              >
                {growthPercent}
              </span>
            </div>
            <div className="flex items-center">
              {legend.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center"
                    style={{ marginRight: idx !== legend.length - 1 ? 24 : 0 }}
                  >
                    <Icon width={22} height={22} style={{ marginRight: 10 }} />
                    <span style={legendTextStyle}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-full px-4">
            <div style={{ width: "100%", height: 180 }}>
              <RechartsChart height={180} />
            </div>
            <div style={{ marginTop: 40, marginBottom: 8 }}>
              <GradientLineXAxis width={desktopLineWidth} />
            </div>
            <div className="flex justify-between w-full" style={{ marginBottom: 16 }}>
              {xLabels.map((label) => (
                <span
                  key={label}
                  style={{
                    color: "#B6C7DC",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    lineHeight: "24px",
                    opacity: 0.72,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET */}
      <div className="block xlm:hidden w-full">
        <div
          className="bg-[#070D11] rounded-[8px] mx-auto flex flex-col"
          style={{
            maxWidth: 342,
            minHeight: 300,
            margin: "0 auto",
            padding: 0,
          }}
        >
          <div className="flex items-center" style={{ marginTop: 14 }}>
            <img
              src={MoodAiElementIcon}
              alt="Mood AI Icon"
              width={22}
              height={22}
              style={{ marginRight: 8 }}
            />
            <span
              style={{
                color: "#4F6175",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "16px",
                marginRight: 8,
              }}
            >
              MOOD AI
            </span>
            <svg
              width={10}
              height={10}
              style={{ marginRight: 5, marginBottom: 2 }}
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="4,1 8,6 0,6" fill={growthColor} />
            </svg>
            <span
              style={{
                color: growthColor,
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "16px",
              }}
            >
              {growthPercent}
            </span>
          </div>
          <div className="flex items-center w-full" style={{ marginTop: 20 }}>
            {legend.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center"
                  style={{
                    marginRight: idx !== legend.length - 1 ? 24 : 0,
                  }}
                >
                  <Icon width={20} height={20} style={{ marginRight: 10 }} />
                  <span style={legendTextStyle}>{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full px-4">
            <div style={{ width: "100%", height: 90 }}>
              <RechartsChart height={90} />
            </div>
            <div style={{ marginTop: 40, marginBottom: 8 }}>
              <GradientLineXAxis width={mobileLineWidth} />
            </div>
            <div className="flex justify-between w-full" style={{ marginBottom: 16 }}>
              {xLabels.map((label) => (
                <span
                  key={label}
                  style={{
                    color: "#B6C7DC",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    lineHeight: "24px",
                    opacity: 0.72,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodChart;