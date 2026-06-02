import Lottie from "lottie-react";

import zzzAnimation from "../../../assets/sleeping-emoji.json";

type TrendDirection = "up" | "down";

type Trend = {
  value: string;
  direction: TrendDirection;
  color: string;
};

type DesktopStatusItem = {
  label: string;
  value: string;
  icon?: string;
  showBigIcon?: boolean;
  width: number;
  trend?: Trend;
};

type MobileStatusItem = {
  label: string;
  value: string;
  icon?: string;
  trend?: Trend;
  width: number;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
};

const FONT_FAMILY = "Instrument Sans, sans-serif";

const COLORS = {
  label: "#4F6175",
  value: "#C9E2FF",
  positive: "#239F2E",
  negative: "#CD2A2A",
  background: "#070D11",
} as const;

const DESKTOP_STATUS_ITEMS: DesktopStatusItem[] = [
  {
    label: "Mood Assessment",
    value: "Not much going on",
    icon: "😴",
    showBigIcon: true,
    width: 484,
  },
  {
    label: "Mood Score",
    value: "-0.31",
    trend: {
      value: "-0.17%",
      direction: "down",
      color: COLORS.negative,
    },
    width: 180,
  },
  {
    label: "Engagement Assessment",
    value: "Not much going on",
    icon: "😴",
    width: 484,
  },
  {
    label: "Engagement Score",
    value: "0.78",
    trend: {
      value: "+6.22%",
      direction: "up",
      color: COLORS.positive,
    },
    width: 180,
  },
];

const MOBILE_STATUS_ROWS: MobileStatusItem[][] = [
  [
    {
      label: "Mood Assessment",
      value: "Not much going on",
      icon: "😴",
      width: 200,
      labelClassName:
        "text-[#4F6175] font-instrument font-normal text-[12px] leading-[22px] mt-[35px] mb-[20px]",
    },
    {
      label: "Mood Score",
      value: "-0.31",
      width: 158,
      trend: {
        value: "-0.17%",
        direction: "down",
        color: COLORS.negative,
      },
      labelClassName:
        "text-[#4F6175] font-normal font-instrument text-[12px] leading-[22px] mt-[35px] mb-[35px]",
    },
  ],
  [
    {
      label: "Engagement Assessment",
      value: "Not much going on",
      icon: "😴",
      width: 200,
      labelClassName:
        "text-[#4F6175] font-normal font-instrument text-[12px] leading-[22px] mb-5",
    },
    {
      label: "Engagement\nScore",
      value: "0.78",
      width: 158,
      trend: {
        value: "+6.22%",
        direction: "up",
        color: COLORS.positive,
      },
      labelClassName:
        "text-[#4F6175] font-normal font-instrument text-[12px] leading-[22px] mb-5",
      labelStyle: {
        whiteSpace: "pre-line",
      },
    },
  ],
];

function TrendTriangle({
  direction,
  color,
}: {
  direction: TrendDirection;
  color: string;
}) {
  const points =
    direction === "up"
      ? "7,2 1,12 13,12"
      : "7,12 1,2 13,2";

  return (
    <svg width={14} height={14} style={{ marginRight: 4 }}>
      <polygon points={points} fill={color} />
    </svg>
  );
}

function TrendValue({
  trend,
  fontSize,
  lineHeight,
  alignItems = "center",
}: {
  trend: Trend;
  fontSize: number;
  lineHeight: string;
  alignItems?: React.CSSProperties["alignItems"];
}) {
  return (
    <span className="flex items-center ml-2" style={{ alignItems }}>
      <TrendTriangle direction={trend.direction} color={trend.color} />

      <span
        style={{
          color: trend.color,
          fontSize,
          fontFamily: FONT_FAMILY,
          lineHeight,
        }}
      >
        {trend.value}
      </span>
    </span>
  );
}

function SleepingIcon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 94,
        transform: "translateY(-17px)",
      }}
    >
      <Lottie
        animationData={zzzAnimation}
        loop
        autoplay
        style={{ width: 94, height: 94, display: "block" }}
      />
    </div>
  );
}

function DesktopStatusCard({
  item,
  index,
}: {
  item: DesktopStatusItem;
  index: number;
}) {
  const isWideCard = item.width === 484;
  const isScoreCard = index === 1 || index === 3;

  return (
    <div
      style={{
        width: item.width,
        minWidth: item.width,
        maxWidth: item.width,
        height: 126,
        background: COLORS.background,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "visible",
      }}
    >
      <span
        style={{
          color: COLORS.label,
          fontFamily: FONT_FAMILY,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "26px",
          marginBottom: 24,
          display: "block",
          letterSpacing: 0,
        }}
      >
        {item.label}
      </span>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: isWideCard ? 434 : "100%",
          marginLeft: isWideCard ? "auto" : undefined,
          marginRight: isWideCard ? "auto" : undefined,
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {item.icon && (
            <span
              style={{
                fontSize: 20,
                marginRight: 8,
                lineHeight: "28px",
              }}
            >
              {item.icon}
            </span>
          )}

          <span
            style={{
              color: COLORS.value,
              fontFamily: FONT_FAMILY,
              fontWeight: 500,
              fontSize: isScoreCard ? 32 : 18,
              lineHeight: "28px",
              verticalAlign: "middle",
            }}
          >
            {item.value}
          </span>

          {item.trend && (
            <TrendValue
              trend={item.trend}
              fontSize={14}
              lineHeight="16px"
            />
          )}
        </div>

        {item.showBigIcon && <SleepingIcon />}
      </div>
    </div>
  );
}

function MobileStatusCard({ item }: { item: MobileStatusItem }) {
  const isScoreCard = Boolean(item.trend);

  return (
    <div
      className="bg-[#070D11] rounded-[16px] flex-1 flex flex-col justify-between p-4"
      style={{ width: item.width, minWidth: 0, height: 130 }}
    >
      <span className={item.labelClassName} style={item.labelStyle}>
        {item.label}
      </span>

      {isScoreCard ? (
        <div className="flex items-end">
          <span
            className="text-[#C9E2FF] font-semibold"
            style={{
              fontSize: 28,
              fontFamily: FONT_FAMILY,
              lineHeight: "24px",
            }}
          >
            {item.value}
          </span>

          {item.trend && (
            <TrendValue
              trend={item.trend}
              fontSize={12}
              lineHeight="14px"
              alignItems="flex-end"
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-start">
          {item.icon && (
            <span
              style={{
                fontSize: 20,
                fontFamily: FONT_FAMILY,
                lineHeight: "20px",
                marginBottom: 0,
              }}
            >
              {item.icon}
            </span>
          )}

          <span
            className="text-[#C9E2FF] font-semibold"
            style={{
              fontSize: 15,
              fontFamily: FONT_FAMILY,
              lineHeight: "20px",
              marginTop: 0,
            }}
          >
            {item.value}
          </span>
        </div>
      )}
    </div>
  );
}

export default function DashboardStatusRow() {
  return (
    <>
      <div
        className="hidden xlm:flex"
        style={{
          width: "1376px",
          flexDirection: "row",
          gap: "0px",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        {DESKTOP_STATUS_ITEMS.map((item, index) => (
          <DesktopStatusCard
            key={item.label}
            item={item}
            index={index}
          />
        ))}
      </div>

      <div
        className="flex flex-col gap-4 xlm:hidden"
        style={{ width: 342, margin: "0 auto", marginTop: 55 }}
      >
        {MOBILE_STATUS_ROWS.map((row) => (
          <div key={row.map((item) => item.label).join("-")} className="flex gap-2">
            {row.map((item) => (
              <MobileStatusCard key={item.label} item={item} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}