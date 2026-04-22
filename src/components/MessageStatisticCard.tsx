import React, { useState } from "react";

type StatisticData = {
  label: string;
  value: number;
  color: string;
};

type ValueMap = Record<string, string>;

type MessageStatisticCardProps = {
  className?: string;
};

// TODO: Mock data, replace with data from backend
const data: StatisticData[] = [
  { label: "Targeted", value: 70.83, color: "#41A23C" },
  { label: "Botted", value: 12.5, color: "#C7372F" },
  { label: "Spam", value: 8.33, color: "#E8963A" },
  { label: "Admins", value: 5.6, color: "#3482D0" },
  { label: "Other", value: 2.74, color: "#888888" },
];

const valueMap: ValueMap = {
  Targeted: "236,985",
  Botted: "41,825",
  Spam: "29,876",
  Admins: "20,122",
  Other: "9,231",
};

// --- Helper function for text background color ---
function getTextColor(bgColor: string): string {
  if (
    bgColor.toLowerCase() === "#e8963a" ||
    bgColor.toLowerCase() === "#f7931a"
  ) {
    return "#000000";
  }
  return "#FFFFFF";
}

const MessageStatisticCard: React.FC<MessageStatisticCardProps> = ({
  className = "",
}) => {
  // TODO: selected state can be moved to a higher level if external control of the condition is required
  const [selected, setSelected] = useState<string>("Spam");

  // TODO: use data from the backend (e.g. via props or context)
  const active = data.find((d) => d.label === selected) || data[0];
  const centerValue = valueMap[active.label] || "29,876";

  const CHART_SIZE_DESKTOP = 236;
  const CHART_STROKE_DESKTOP = 16;
  const CHART_SIZE_MOBILE = 139.43;
  const CHART_STROKE_MOBILE = 13;

  function getArcs(size: number, stroke: number) {
    const CIRCLE = Math.PI * (size - stroke);
    let start = 0;
    return data.map((item) => {
      const length = (item.value / 100) * CIRCLE;
      const isActiveArc = item.label === active.label;
      const arc = (
        <circle
          key={item.label}
          r={(size - stroke) / 2}
          cx={size / 2}
          cy={size / 2}
          stroke={item.color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${length} ${CIRCLE - length}`}
          strokeDashoffset={-start}
          style={{
            transition: "stroke-dasharray 0.5s, opacity 0.2s",
            opacity: isActiveArc ? 1 : 0.32,
          }}
        />
      );
      start += length;
      return arc;
    });
  }

  const activeBgColor = active.color;
  const activeTextColor = getTextColor(activeBgColor);

  const getActiveWidth = (label: string): number => (label === "Targeted" ? 134 : 111.37);

  return (
    <>
      {/* DESKTOP */}
      <div
        className={`hidden xlm:flex bg-[#070D11] rounded-[8px] w-[484px] h-[284px] flex-row pt-[24px] pr-6 pb-6 box-border ${className}`}
        style={{ marginLeft: -24 }}
      >
        <div className="flex flex-col flex-none w-[180px] min-w-0">
          <h3
            className="text-[14px] leading-[26px] font-normal mb-6"
            style={{ color: "#4F6175", fontFamily: "Instrument Sans, sans-serif" }}
          >
            Message statistic
          </h3>
          {data.map((item, i) => {
            const isActive = item.label === selected;
            return (
              <div
                key={item.label}
                tabIndex={0}
                onClick={() => setSelected(item.label)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") setSelected(item.label);
                }}
                className={`flex items-center justify-between font-normal text-[10px] leading-[16px] mb-${i < data.length - 1 ? "[16px]" : "0"} cursor-pointer outline-none transition-all`}
                style={{
                  color: isActive ? activeTextColor : "#C9E2FF",
                  fontFamily: "Instrument Sans, sans-serif",
                  background: isActive ? activeBgColor : "transparent",
                  borderRadius: isActive ? 80 : 0,
                  height: isActive ? 40 : "auto",
                  minHeight: 24,
                  padding: isActive ? "0 24px" : "0",
                  boxShadow: isActive
                    ? `0 2px 8px 0 ${activeBgColor}1A`
                    : "none",
                  marginBottom: i < data.length - 1 ? 8 : 0,
                }}
              >
                {isActive ? (
                  <div className="flex items-center justify-between w-full">
                    <span>{item.label}</span>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <span>{valueMap[item.label]}</span>
                      <span style={{ width: 6, display: "inline-block" }} />
                      <span>{item.value.toFixed(2)}%</span>
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center" style={{ gap: 6 }}>
                      <span
                        className="inline-block mr-2"
                        style={{
                          width: 14,
                          height: 7,
                          borderRadius: 7,
                          backgroundColor: item.color,
                        }}
                      ></span>
                      <span>{item.label}</span>
                    </div>
                    <span>{item.value.toFixed(2)}%</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ width: 48, minWidth: 48, maxWidth: 48 }} />
        {/* SVG diagram */}
        <div className="flex-1 flex items-center justify-center min-w-0" style={{ minWidth: CHART_SIZE_DESKTOP, minHeight: CHART_SIZE_DESKTOP }}>
          <div style={{ width: CHART_SIZE_DESKTOP, height: CHART_SIZE_DESKTOP, position: "relative" }}>
            <svg
              viewBox={`0 0 ${CHART_SIZE_DESKTOP} ${CHART_SIZE_DESKTOP}`}
              style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
            >
              {getArcs(CHART_SIZE_DESKTOP, CHART_STROKE_DESKTOP)}
            </svg>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 32,
                    color: "#FFFFFF",
                    lineHeight: "48px",
                  }}
                >
                  {centerValue}
                </span>
                <span
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#FFFFFF",
                    lineHeight: "16px",
                    marginLeft: 8,
                  }}
                >
                  {active.value.toFixed(2)}%
                </span>
              </div>
              <span
                style={{
                  color: "#C9E2FF",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 14,
                  lineHeight: "16px",
                  marginTop: 12,
                }}
              >
                {active.label}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={`flex xlm:hidden bg-[#070D11] rounded-[8px] w-[299.91px] h-[249.05px] flex-row items-start pt-0 pl-0 pr-0 pb-0 box-border ${className}`}
        style={{ margin: "0 auto" }}
      >
        <div
          className="flex flex-col flex-none"
          style={{
            width: 111.37,
            minWidth: 111.37,
            maxWidth: 111.37,
            height: 196.22,
            minHeight: 196.22,
            maxHeight: 196.22,
          }}
        >
          <h3
            className="text-[14px] leading-[26px] font-normal mb-6"
            style={{ color: "#4F6175", fontFamily: "Instrument Sans, sans-serif" }}
          >
            Message statistic
          </h3>
          {data.map((item, i) => {
            const isActive = item.label === selected;
            if (isActive) {
              return (
                <div
                  key={item.label}
                  tabIndex={0}
                  onClick={() => setSelected(item.label)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") setSelected(item.label);
                  }}
                  className="flex items-center justify-between cursor-pointer outline-none transition-all"
                  style={{
                    background: activeBgColor,
                    color: activeTextColor,
                    borderRadius: "70px",
                    width: getActiveWidth(item.label),
                    height: 36.05,
                    padding: "10px 7px",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontSize: 8,
                    fontWeight: 400,
                    lineHeight: "14px",
                    marginBottom: i < data.length - 1 ? 8 : 0,
                  }}
                >
                  <span style={{ marginRight: 11 }}>{item.label}</span>
                  <span style={{ marginRight: 11 }}>{valueMap[item.label]}</span>
                  <span>{item.value.toFixed(2)}%</span>
                </div>
              );
            }
            return (
              <div
                key={item.label}
                tabIndex={0}
                onClick={() => setSelected(item.label)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") setSelected(item.label);
                }}
                className="flex items-center justify-between font-normal text-[10px] leading-[16px] cursor-pointer outline-none transition-all"
                style={{
                  color: "#C9E2FF",
                  fontFamily: "Instrument Sans, sans-serif",
                  background: "transparent",
                  borderRadius: 0,
                  height: 24,
                  minHeight: 24,
                  marginBottom: i < data.length - 1 ? 8 : 0,
                  fontSize: 10,
                  lineHeight: "16px",
                  padding: 0,
                }}
              >
                <div className="flex items-center" style={{ gap: 6 }}>
                  <span
                    className="inline-block mr-2"
                    style={{
                      width: 14,
                      height: 7,
                      borderRadius: 7,
                      backgroundColor: item.color,
                    }}
                  ></span>
                  <span>{item.label}</span>
                </div>
                <span>{item.value.toFixed(2)}%</span>
              </div>
            );
          })}
        </div>
        <div style={{ width: 21, minWidth: 21, maxWidth: 21 }} />
        {/* SVG diagram */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 139.43,
            minWidth: 139.43,
            maxWidth: 139.43,
            height: 196.22,
            minHeight: 196.22,
            maxHeight: 196.22,
            position: "relative",
            marginTop: 0,
          }}
        >
          <div
            style={{
              width: 139.43,
              height: 139.43,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 21,
            }}
          >
            <svg
              viewBox={`0 0 ${139.43} ${139.43}`}
              style={{ width: 139.43, height: 139.43, transform: "rotate(-90deg)" }}
            >
              {getArcs(CHART_SIZE_MOBILE, CHART_STROKE_MOBILE)}
            </svg>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 139.43,
                height: 139.43,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 22,
                    color: "#FFFFFF",
                    lineHeight: "30px",
                  }}
                >
                  {centerValue}
                </span>
                <span
                  style={{
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 11,
                    color: "#FFFFFF",
                    lineHeight: "14px",
                    marginLeft: 6,
                  }}
                >
                  {active.value.toFixed(2)}%
                </span>
              </div>
              <span
                style={{
                  color: "#C9E2FF",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 11,
                  lineHeight: "14px",
                  marginTop: 8,
                }}
              >
                {active.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageStatisticCard;