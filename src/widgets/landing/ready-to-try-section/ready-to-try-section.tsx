import { useEffect, useState, type CSSProperties } from "react";
import Lottie from "lottie-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import dashboardBg from "../../../assets/dashboard-get-started.png";
import moneyEmoji from "../../../assets/money-emoji.json";
import rocketIcon from "../../../assets/rocket-icon.svg";
import starEmoji from "../../../assets/star-emoji.json";
import sunglassesEmoji from "../../../assets/sunglasses-emoji.json";

type BreakpointVariant = "desktop" | "tablet" | "mobile";

type ChartPoint = {
  name: string;
  y: number;
};

type GradientStop = {
  offset: string;
  color: string;
};

type RectPosition = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type EmojiPosition = {
  left: number;
  top: number;
};

type ChartOverlayConfig = {
  title: string;
  value: string;
  growth: string;
  data: ChartPoint[];
  gradient: GradientStop[];
  blurColor: string;
  animationData: unknown;
};

type DesktopTabletChartConfig = ChartOverlayConfig & {
  card: RectPosition;
  chart: RectPosition;
  emoji: {
    position: EmojiPosition;
    wrapperSize: number;
    blurSize: number;
    blurAmount: number;
    blurOpacity: number;
    iconSize: number;
    iconOffset: number;
  };
};

type MobileChartConfig = ChartOverlayConfig & {
  cardLeft: number;
  cardTop: number;
  cardWidth: number;
  cardHeight: number;
  chartWidth: number;
  chartHeight: number;
  emojiX: number;
  emojiY: number;
};

type MiniCardProps = {
  title: string;
  value: string;
  growth: string;
  width: number;
  height: number;
};

type SectionCopyConfig = {
  eyebrowClassName: string;
  titleClassName: string;
  titleStyle?: CSSProperties;
  descriptionClassName: string;
  buttonClassName: string;
  rocketSize: number;
  rocketMarginLeft: number;
};

const SECTION_ID = "get-a-free-trial";
const EYEBROW = "READY TO TRY?";
const TITLE_DESKTOP = "GET STARTED NOW AND GET A FREE TRIAL";
const TITLE_MOBILE = "GET STARTED NOW\nAND GET A FREE\nTRIAL";
const DESCRIPTION =
  "MOOD AI measures the community sentiment (“mood”) for any crypto token by analyzing its Telegram Community activity. Why? Because Price lags & Mood leads.";
const CTA_LABEL = "GET STARTED FOR FREE";

const DESKTOP_MIN_WIDTH = 1441;
const TABLET_MIN_WIDTH = 992;

const COLORS = {
  white: "#FFFFFF",
  menuLink: "#C9E2FF",
  titleMuted: "#4F6175",
  green: "#239F2E",
  buttonBorder: "#53B2F1",
  dashboardShadow: "#000C26",
} as const;

const moodData: ChartPoint[] = [
  { name: "-10d", y: 15 },
  { name: "-9d", y: 21 },
  { name: "-8d", y: 10 },
  { name: "-7d", y: 29 },
  { name: "-6d", y: 17 },
  { name: "-5d", y: 42 },
  { name: "-4d", y: 25 },
  { name: "-3d", y: 56 },
  { name: "-2d", y: 34 },
  { name: "-1d", y: 48 },
  { name: "now", y: 97 },
];

const priceData: ChartPoint[] = [
  { name: "-10d", y: 42 },
  { name: "-9d", y: 21 },
  { name: "-8d", y: 66 },
  { name: "-7d", y: 15 },
  { name: "-6d", y: 62 },
  { name: "-5d", y: 18 },
  { name: "-4d", y: 74 },
  { name: "-3d", y: 12 },
  { name: "-2d", y: 90 },
  { name: "-1d", y: 44 },
  { name: "now", y: 75 },
];

const engagementData: ChartPoint[] = [
  { name: "-10d", y: 17 },
  { name: "-9d", y: 53 },
  { name: "-8d", y: 28 },
  { name: "-7d", y: 69 },
  { name: "-6d", y: 20 },
  { name: "-5d", y: 58 },
  { name: "-4d", y: 24 },
  { name: "-3d", y: 79 },
  { name: "-2d", y: 40 },
  { name: "-1d", y: 55 },
  { name: "now", y: 99 },
];

const moodGradient: GradientStop[] = [
  { offset: "0%", color: "#FF5E00" },
  { offset: "60%", color: "#1AFF00" },
  { offset: "100%", color: "#1AFF00" },
];

const priceGradient: GradientStop[] = [
  { offset: "0%", color: "#065500" },
  { offset: "100%", color: "#90EB43" },
];

const engagementGradient: GradientStop[] = [
  { offset: "0%", color: "#0082D9" },
  { offset: "60%", color: "#FF0000" },
  { offset: "100%", color: "#FF0000" },
];

const desktopCharts: DesktopTabletChartConfig[] = [
  {
    title: "Mood Differences",
    value: "2.91",
    growth: "+64.19%",
    data: moodData,
    gradient: moodGradient,
    animationData: starEmoji,
    blurColor: "#01FD72",
    card: { left: 16, top: 260, width: 484, height: 192 },
    chart: { left: 120, top: 218, width: 430, height: 98 },
    emoji: {
      position: { left: 490, top: 194 },
      wrapperSize: 90,
      blurSize: 90,
      blurAmount: 32,
      blurOpacity: 0.65,
      iconSize: 64,
      iconOffset: 13,
    },
  },
  {
    title: "ETH",
    value: "",
    growth: "+19.24%",
    data: priceData,
    gradient: priceGradient,
    animationData: moneyEmoji,
    blurColor: "#3FB639",
    card: { left: 705, top: 450, width: 484, height: 192 },
    chart: { left: 800, top: 458, width: 310, height: 82 },
    emoji: {
      position: { left: 1060, top: 438 },
      wrapperSize: 90,
      blurSize: 90,
      blurAmount: 32,
      blurOpacity: 0.65,
      iconSize: 64,
      iconOffset: 13,
    },
  },
  {
    title: "Engagement Differences",
    value: "1.29",
    growth: "+49.08%",
    data: engagementData,
    gradient: engagementGradient,
    animationData: sunglassesEmoji,
    blurColor: "#FD1E01",
    card: { left: 850, top: 180, width: 484, height: 192 },
    chart: { left: 980, top: 150, width: 320, height: 90 },
    emoji: {
      position: { left: 1250, top: 130 },
      wrapperSize: 90,
      blurSize: 90,
      blurAmount: 32,
      blurOpacity: 0.65,
      iconSize: 64,
      iconOffset: 13,
    },
  },
];

const tabletCharts: DesktopTabletChartConfig[] = [
  {
    title: "Mood Differences",
    value: "2.91",
    growth: "+64.19%",
    data: moodData,
    gradient: moodGradient,
    animationData: starEmoji,
    blurColor: "#01FD72",
    card: { left: 0, top: 120, width: 328, height: 135 },
    chart: { left: 72, top: 84, width: 280, height: 54 },
    emoji: {
      position: { left: 322, top: 70 },
      wrapperSize: 50,
      blurSize: 50,
      blurAmount: 12,
      blurOpacity: 0.5,
      iconSize: 38,
      iconOffset: 4,
    },
  },
  {
    title: "ETH",
    value: "",
    growth: "+19.24%",
    data: priceData,
    gradient: priceGradient,
    animationData: moneyEmoji,
    blurColor: "#3FB639",
    card: { left: 390, top: 210, width: 328, height: 135 },
    chart: { left: 462, top: 174, width: 200, height: 44 },
    emoji: {
      position: { left: 635, top: 160 },
      wrapperSize: 50,
      blurSize: 50,
      blurAmount: 12,
      blurOpacity: 0.5,
      iconSize: 38,
      iconOffset: 4,
    },
  },
  {
    title: "Engagement Differences",
    value: "1.29",
    growth: "+49.08%",
    data: engagementData,
    gradient: engagementGradient,
    animationData: sunglassesEmoji,
    blurColor: "#FD1E01",
    card: { left: 200, top: 340, width: 328, height: 135 },
    chart: { left: 270, top: 300, width: 190, height: 44 },
    emoji: {
      position: { left: 440, top: 280 },
      wrapperSize: 50,
      blurSize: 50,
      blurAmount: 12,
      blurOpacity: 0.5,
      iconSize: 38,
      iconOffset: 4,
    },
  },
];

const mobileCharts: MobileChartConfig[] = [
  {
    title: "Mood Differences",
    value: "2.91",
    growth: "+64.19%",
    data: moodData,
    gradient: moodGradient,
    animationData: starEmoji,
    blurColor: "#01FD72",
    cardLeft: -20,
    cardTop: -25,
    cardWidth: 325,
    cardHeight: 109,
    chartWidth: 300,
    chartHeight: 58,
    emojiX: 270,
    emojiY: -10,
  },
  {
    title: "ETH",
    value: "",
    growth: "+19.24%",
    data: priceData,
    gradient: priceGradient,
    animationData: moneyEmoji,
    blurColor: "#3FB639",
    cardLeft: 20,
    cardTop: 120,
    cardWidth: 285,
    cardHeight: 120,
    chartWidth: 250,
    chartHeight: 48,
    emojiX: 220,
    emojiY: -5,
  },
  {
    title: "Engagement Differences",
    value: "1.29",
    growth: "+49.08%",
    data: engagementData,
    gradient: engagementGradient,
    animationData: sunglassesEmoji,
    blurColor: "#FD1E01",
    cardLeft: -8,
    cardTop: 260,
    cardWidth: 295,
    cardHeight: 109,
    chartWidth: 258,
    chartHeight: 50,
    emojiX: 225,
    emojiY: -10,
  },
];

const sectionCopyConfig: Record<BreakpointVariant, SectionCopyConfig> = {
  desktop: {
    eyebrowClassName:
      "block text-center font-instrument font-normal text-[20px] leading-[24px] tracking-[0.2em] text-menu-link mb-4",
    titleClassName:
      "text-center font-instrument font-bold text-[48px] leading-[58px] tracking-[0.2em] text-white uppercase mb-[64px] whitespace-nowrap w-full",
    descriptionClassName:
      "text-center font-instrument font-normal text-[20px] leading-[28px] text-menu-link mb-[64px] max-w-[800px] mx-auto",
    buttonClassName:
      "flex items-center justify-center min-w-[289px] h-[56px] rounded-full font-instrument font-medium text-white text-[14px] tracking-[0.15em] px-[32px] py-[16px] shadow-none border border-transparent transition-all duration-200",
    rocketSize: 32,
    rocketMarginLeft: 16,
  },
  tablet: {
    eyebrowClassName:
      "block text-center font-instrument font-normal text-[20px] leading-[22px] tracking-[0.17em] text-menu-link mb-3",
    titleClassName:
      "text-center font-instrument font-bold tracking-[0.13em] text-white uppercase mb-[38px] whitespace-pre-line w-full",
    titleStyle: {
      whiteSpace: "pre-line",
      fontSize: 48,
      lineHeight: "58px",
    },
    descriptionClassName:
      "text-center font-instrument font-normal text-[20px] leading-[22px] text-menu-link mb-[32px] max-w-[420px] mx-auto",
    buttonClassName:
      "flex items-center justify-center min-w-[180px] h-[46px] rounded-full font-instrument font-medium text-white text-[14px] tracking-[0.13em] px-[18px] py-[10px] shadow-none border border-transparent transition-all duration-200",
    rocketSize: 24,
    rocketMarginLeft: 10,
  },
  mobile: {
    eyebrowClassName:
      "block text-center font-instrument font-normal tracking-[0.2em] text-menu-link mb-4",
    titleClassName:
      "text-center font-instrument font-bold tracking-[0.2em] text-white uppercase mb-[32px] w-full",
    titleStyle: {
      fontSize: 36,
      lineHeight: "42px",
      whiteSpace: "pre-line",
    },
    descriptionClassName:
      "text-center font-instrument font-normal text-menu-link mx-auto mb-[48px] max-w-[320px]",
    buttonClassName:
      "flex items-center justify-center min-w-[160px] h-[42px] rounded-full font-instrument font-medium text-white tracking-[0.15em] px-[20px] py-[10px] shadow-none border border-transparent transition-all duration-200",
    rocketSize: 18,
    rocketMarginLeft: 8,
  },
};

const ctaButtonStyle: CSSProperties = {
  background: "linear-gradient(180deg, #53B2F1 0%, #006DB6 100%)",
  border: "1px solid #53B2F1",
};

function useWindowWidth(defaultWidth = 1920): number {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window === "undefined") {
      return defaultWidth;
    }

    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

const getBreakpointVariant = (windowWidth: number): BreakpointVariant => {
  if (windowWidth >= DESKTOP_MIN_WIDTH) {
    return "desktop";
  }

  if (windowWidth >= TABLET_MIN_WIDTH) {
    return "tablet";
  }

  return "mobile";
};

function GrowthIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 22 22"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginBottom: 2,
      }}
    >
      <polygon points="11,4 19,18 3,18" fill={COLORS.green} />
    </svg>
  );
}

function MiniCard({ title, value, growth, width, height }: MiniCardProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        background: "linear-gradient(90deg, #031320 0%, #030B12 100%)",
        boxShadow: "0 2px 24px 0 #000a",
        opacity: 0.96,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "18px 24px",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      <div
        style={{
          color: COLORS.titleMuted,
          fontSize: 16,
          fontWeight: 400,
          lineHeight: "22px",
          marginBottom: 6,
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", marginTop: 4 }}>
        {value.length > 0 && (
          <span
            style={{
              fontSize: 28,
              color: COLORS.menuLink,
              fontWeight: 500,
              lineHeight: "28px",
              marginRight: 8,
            }}
          >
            {value}
          </span>
        )}

        <GrowthIcon />

        <span
          style={{
            fontSize: 14,
            color: COLORS.green,
            fontWeight: 400,
            lineHeight: "16px",
            marginLeft: 6,
          }}
        >
          {growth}
        </span>
      </div>
    </div>
  );
}

function SectionCopy({
  variant,
  title,
  descriptionStyle,
}: {
  variant: BreakpointVariant;
  title: string;
  descriptionStyle?: CSSProperties;
}) {
  const config = sectionCopyConfig[variant];

  return (
    <>
      <span className={config.eyebrowClassName}>{EYEBROW}</span>

      <h2 className={config.titleClassName} style={config.titleStyle ?? {}}>
        {title}
      </h2>

      <p
        className={config.descriptionClassName}
        style={descriptionStyle ?? {}}
      >
        {DESCRIPTION}
      </p>

      <button
        type="button"
        className={config.buttonClassName}
        style={ctaButtonStyle}
      >
        {CTA_LABEL}

        <img
          src={rocketIcon}
          alt=""
          width={config.rocketSize}
          height={config.rocketSize}
          style={{
            marginLeft: config.rocketMarginLeft,
            display: "inline-block",
          }}
        />
      </button>
    </>
  );
}

function ChartLine({
  data,
  gradient,
  gradientId,
  strokeWidth,
}: {
  data: ChartPoint[];
  gradient: GradientStop[];
  gradientId: string;
  strokeWidth: number;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="name" hide />
        <YAxis hide />

        <Line
          type="basis"
          dataKey="y"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          dot={false}
          isAnimationActive
        />

        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            {gradient.map((stop) => (
              <stop
                key={`${gradientId}-${stop.offset}-${stop.color}`}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  );
}

function FloatingEmoji({
  animationData,
  blurColor,
  wrapperSize,
  blurSize,
  blurAmount,
  blurOpacity,
  iconSize,
  iconOffset,
}: {
  animationData: unknown;
  blurColor: string;
  wrapperSize: number;
  blurSize: number;
  blurAmount: number;
  blurOpacity: number;
  iconSize: number;
  iconOffset: number;
}) {
  return (
    <div
      style={{
        width: wrapperSize,
        height: wrapperSize,
        position: "relative",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: blurSize,
          height: blurSize,
          borderRadius: "50%",
          background: `radial-gradient(circle at 56% 82%, ${blurColor}FF 0%, transparent 80%)`,
          filter: `blur(${blurAmount}px)`,
          opacity: blurOpacity,
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: iconOffset,
          top: iconOffset,
          width: iconSize,
          height: iconSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: iconSize, height: iconSize }}
        />
      </div>
    </div>
  );
}

function DesktopTabletChartOverlay({
  chart,
  index,
  gradientPrefix,
  strokeWidth,
}: {
  chart: DesktopTabletChartConfig;
  index: number;
  gradientPrefix: string;
  strokeWidth: number;
}) {
  const gradientId = `${gradientPrefix}-${index}`;

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: chart.card.left,
          top: chart.card.top,
          zIndex: 10,
          width: chart.card.width,
          height: chart.card.height,
        }}
      >
        <MiniCard
          title={chart.title}
          value={chart.value}
          growth={chart.growth}
          width={chart.card.width}
          height={chart.card.height}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: chart.chart.left,
          top: chart.chart.top,
          zIndex: 12,
          width: chart.chart.width,
          height: chart.chart.height,
          pointerEvents: "none",
        }}
      >
        <ChartLine
          data={chart.data}
          gradient={chart.gradient}
          gradientId={gradientId}
          strokeWidth={strokeWidth}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: chart.emoji.position.left,
          top: chart.emoji.position.top,
          width: chart.emoji.wrapperSize,
          height: chart.emoji.wrapperSize,
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <FloatingEmoji
          animationData={chart.animationData}
          blurColor={chart.blurColor}
          wrapperSize={chart.emoji.wrapperSize}
          blurSize={chart.emoji.blurSize}
          blurAmount={chart.emoji.blurAmount}
          blurOpacity={chart.emoji.blurOpacity}
          iconSize={chart.emoji.iconSize}
          iconOffset={chart.emoji.iconOffset}
        />
      </div>
    </div>
  );
}

function DesktopTabletDashboardPreview({
  variant,
}: {
  variant: "desktop" | "tablet";
}) {
  const isDesktop = variant === "desktop";
  const charts = isDesktop ? desktopCharts : tabletCharts;

  return (
    <div
      className="relative w-full flex justify-center items-center"
      style={{ minHeight: isDesktop ? 660 : 390 }}
    >
      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: isDesktop ? 1407 : 760,
        }}
      >
        <img
          src={dashboardBg}
          alt="Dashboard"
          className={`w-full h-auto object-cover relative z-0 ${
            isDesktop
              ? "max-w-[1407px] rounded-[16px]"
              : "max-w-[760px] rounded-[14px]"
          }`}
          style={{
            boxShadow: isDesktop
              ? `0 0 64px 0 ${COLORS.dashboardShadow}`
              : `0 0 36px 0 ${COLORS.dashboardShadow}`,
          }}
        />

        {charts.map((chart, index) => (
          <DesktopTabletChartOverlay
            key={`${variant}-${chart.title}-${index}`}
            chart={chart}
            index={index}
            gradientPrefix={isDesktop ? "desktop-line-gradient" : "tablet-line-gradient"}
            strokeWidth={isDesktop ? 5.5 : 4.2}
          />
        ))}
      </div>
    </div>
  );
}

function MobileChartOverlay({
  chart,
  index,
}: {
  chart: MobileChartConfig;
  index: number;
}) {
  const gradientId = `mobile-line-gradient-${index}`;

  return (
    <div
      style={{
        position: "absolute",
        left: chart.cardLeft,
        top: chart.cardTop,
        width: chart.chartWidth,
        height: chart.chartHeight + chart.cardHeight,
        zIndex: 20 + index,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: chart.chartWidth,
          height: chart.chartHeight,
        }}
      >
        <ChartLine
          data={chart.data}
          gradient={chart.gradient}
          gradientId={gradientId}
          strokeWidth={4}
        />

        <div
          style={{
            position: "absolute",
            left: chart.emojiX,
            top: chart.emojiY,
            width: 44,
            height: 44,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <FloatingEmoji
            animationData={chart.animationData}
            blurColor={chart.blurColor}
            wrapperSize={44}
            blurSize={44}
            blurAmount={14}
            blurOpacity={0.7}
            iconSize={38}
            iconOffset={0}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: chart.chartHeight + 2,
          zIndex: 22,
        }}
      >
        <MiniCard
          title={chart.title}
          value={chart.value}
          growth={chart.growth}
          width={chart.cardWidth}
          height={chart.cardHeight}
        />
      </div>
    </div>
  );
}

function MobileDashboardPreview() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        height: 430,
        position: "relative",
        margin: "0 auto",
      }}
    >
      <img
        src={dashboardBg}
        alt="Dashboard"
        width={358}
        height={230}
        style={{
          position: "absolute",
          left: "50%",
          top: 80,
          transform: "translateX(-50%)",
          zIndex: 0,
          width: 358,
          height: 230,
          borderRadius: 10,
          objectFit: "cover",
          boxShadow: `0 0 32px 0 ${COLORS.dashboardShadow}`,
        }}
      />

      {mobileCharts.map((chart, index) => (
        <MobileChartOverlay
          key={`mobile-${chart.title}-${index}`}
          chart={chart}
          index={index}
        />
      ))}
    </div>
  );
}

function DesktopReadyToTrySection() {
  return (
    <section
      id={SECTION_ID}
      className="w-full bg-black flex flex-col items-center justify-center relative"
      style={{ position: "relative" }}
    >
      <div
        className="mx-auto flex flex-col items-center justify-center relative z-10"
        style={{ width: "100%", maxWidth: 1440 }}
      >
        <SectionCopy variant="desktop" title={TITLE_DESKTOP} />

        <div className="h-[110px]" />

        <DesktopTabletDashboardPreview variant="desktop" />
      </div>

      <div className="h-[200px]" />
    </section>
  );
}

function TabletReadyToTrySection() {
  return (
    <section
      id={SECTION_ID}
      className="w-full bg-black flex flex-col items-center justify-center relative"
    >
      <div
        className="mx-auto flex flex-col items-center justify-center relative z-10"
        style={{
          width: "100%",
          maxWidth: 1060,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <SectionCopy variant="tablet" title={TITLE_DESKTOP} />

        <div className="h-[50px]" />

        <DesktopTabletDashboardPreview variant="tablet" />
      </div>

      <div className="h-[90px]" />
    </section>
  );
}

function MobileReadyToTrySection() {
  return (
    <section
      id={SECTION_ID}
      className="w-full bg-black flex flex-col items-center justify-center relative"
      style={{ position: "relative" }}
    >
      <div style={{ height: 72 }} />

      <div className="w-full mx-auto flex flex-col items-center justify-center px-4 relative z-20">
        <SectionCopy
          variant="mobile"
          title={TITLE_MOBILE}
          descriptionStyle={{
            fontSize: 20,
            lineHeight: "28px",
          }}
        />
      </div>

      <div style={{ height: 207 }} />

      <MobileDashboardPreview />

      <div className="h-[38px]" />
    </section>
  );
}

export default function ReadyToTrySection() {
  const windowWidth = useWindowWidth();
  const variant = getBreakpointVariant(windowWidth);

  if (variant === "desktop") {
    return <DesktopReadyToTrySection />;
  }

  if (variant === "tablet") {
    return <TabletReadyToTrySection />;
  }

  return <MobileReadyToTrySection />;
}