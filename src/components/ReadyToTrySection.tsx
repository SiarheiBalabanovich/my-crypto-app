import type { FC } from "react";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import rocketIcon from "../assets/rocket-icon.svg";
import dashboardBg from "../assets/dashboard-get-started.png";
import starEmoji from "../assets/star-emoji.json";
import moneyEmoji from "../assets/money-emoji.json";
import sunglassesEmoji from "../assets/sunglasses-emoji.json";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

// ====== Demo data ======
const moodData = [
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
const priceData = [
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
const engagementData = [
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

// ====== MiniCard ======
type MiniCardProps = {
  title: string;
  value?: string;
  growth: string;
  width: number;
  height: number;
};
const MiniCard: FC<MiniCardProps> = ({ title, value, growth, width, height }) => (
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
      fontFamily: "'Instrument Sans', sans-serif"
    }}
  >
    <div style={{
      color: "#4F6175",
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "22px",
      marginBottom: 6,
    }}>
      {title}
    </div>
    <div style={{ display: "flex", alignItems: "flex-end", marginTop: 4 }}>
      {value && (
        <span
          style={{
            fontSize: 28,
            color: "#C9E2FF",
            fontWeight: 500,
            lineHeight: "28px",
            marginRight: 8,
          }}
        >
          {value}
        </span>
      )}
      <svg width="14" height="14" viewBox="0 0 22 22" style={{ display: "inline-block", verticalAlign: "middle", marginBottom: 2 }}>
        <polygon points="11,4 19,18 3,18" fill="#239F2E"/>
      </svg>
      <span style={{
        fontSize: 14,
        color: "#239F2E",
        fontWeight: 400,
        lineHeight: "16px",
        marginLeft: 6,
      }}>
        {growth}
      </span>
    </div>
  </div>
);

const desktopCharts = [
  {
    title: "Mood Differences",
    value: "2.91",
    growth: "+64.19%",
    data: moodData,
    gradient: [
      { offset: "0%", color: "#FF5E00" },
      { offset: "60%", color: "#1AFF00" },
      { offset: "100%", color: "#1AFF00" },
    ],
    card: { left: 16, top: 260, width: 484, height: 192 },
    chart: { left: 120, top: 218, width: 430, height: 98 },
    emoji: <Lottie animationData={starEmoji} loop autoplay style={{ width: 64, height: 64 }} />,
    blurColor: "#01FD72",
    emojiPos: { left: 490, top: 194 },
  },
  {
    title: "ETH",
    value: "",
    growth: "+19.24%",
    data: priceData,
    gradient: [
      { offset: "0%", color: "#065500" },
      { offset: "100%", color: "#90EB43" },
    ],
    card: { left: 705, top: 450, width: 484, height: 192 },
    chart: { left: 800, top: 458, width: 310, height: 82 },
    emoji: <Lottie animationData={moneyEmoji} loop autoplay style={{ width: 64, height: 64 }} />,
    blurColor: "#3FB639",
    emojiPos: { left: 1060, top: 438 },
  },
  {
    title: "Engagement Differences",
    value: "1.29",
    growth: "+49.08%",
    data: engagementData,
    gradient: [
      { offset: "0%", color: "#0082D9" },
      { offset: "60%", color: "#FF0000" },
      { offset: "100%", color: "#FF0000" },
    ],
    card: { left: 850, top: 180, width: 484, height: 192 },
    chart: { left: 980, top: 150, width: 320, height: 90 },
    emoji: <Lottie animationData={sunglassesEmoji} loop autoplay style={{ width: 64, height: 64 }} />,
    blurColor: "#FD1E01",
    emojiPos: { left: 1250, top: 130 },
  },
];

const tabletCharts = [
  {
    title: "Mood Differences",
    value: "2.91",
    growth: "+64.19%",
    data: moodData,
    gradient: [
      { offset: "0%", color: "#FF5E00" },
      { offset: "60%", color: "#1AFF00" },
      { offset: "100%", color: "#1AFF00" },
    ],
    card: { left: 0, top: 120, width: 328, height: 135 },
    chart: { left: 72, top: 84, width: 280, height: 54 },
    emoji: <Lottie animationData={starEmoji} loop autoplay style={{ width: 42, height: 42 }} />,
    blurColor: "#01FD72",
    emojiPos: { left: 322, top: 70 },
  },
  {
    title: "ETH",
    value: "",
    growth: "+19.24%",
    data: priceData,
    gradient: [
      { offset: "0%", color: "#065500" },
      { offset: "100%", color: "#90EB43" },
    ],
    card: { left: 390, top: 210, width: 328, height: 135 },
    chart: { left: 462, top: 174, width: 200, height: 44 },
    emoji: <Lottie animationData={moneyEmoji} loop autoplay style={{ width: 38, height: 38 }} />,
    blurColor: "#3FB639",
    emojiPos: { left: 635, top: 160 },
  },
  {
    title: "Engagement Differences",
    value: "1.29",
    growth: "+49.08%",
    data: engagementData,
    gradient: [
      { offset: "0%", color: "#0082D9" },
      { offset: "60%", color: "#FF0000" },
      { offset: "100%", color: "#FF0000" },
    ],
    card: { left: 200, top: 340, width: 328, height: 135 },
    chart: { left: 270, top: 300, width: 190, height: 44 },
    emoji: <Lottie animationData={sunglassesEmoji} loop autoplay style={{ width: 38, height: 38 }} />,
    blurColor: "#FD1E01",
    emojiPos: { left: 440, top: 280 },
  },
];

const mobileCharts = [
  {
    title: "Mood Differences",
    value: "2.91",
    growth: "+64.19%",
    data: moodData,
    gradient: [
      { offset: "0%", color: "#FF5E00" },
      { offset: "60%", color: "#1AFF00" },
      { offset: "100%", color: "#1AFF00" },
    ],
    cardLeft: -20,
    cardTop: -25,
    cardWidth: 325,
    cardHeight: 109,
    chartWidth: 300,
    chartHeight: 58,
    emoji: <Lottie animationData={starEmoji} loop autoplay style={{ width: 38, height: 38 }} />,
    blurColor: "#01FD72",
    emojiX: 270,
    emojiY: -10,
  },
  {
    title: "ETH",
    value: "",
    growth: "+19.24%",
    data: priceData,
    gradient: [
      { offset: "0%", color: "#065500" },
      { offset: "100%", color: "#90EB43" },
    ],
    cardLeft: 20,
    cardTop: 120,
    cardWidth: 285,
    cardHeight: 120,
    chartWidth: 250,
    chartHeight: 48,
    emoji: <Lottie animationData={moneyEmoji} loop autoplay style={{ width: 36, height: 36 }} />,
    blurColor: "#3FB639",
    emojiX: 220,
    emojiY: -5,
  },
  {
    title: "Engagement Differences",
    value: "1.29",
    growth: "+49.08%",
    data: engagementData,
    gradient: [
      { offset: "0%", color: "#0082D9" },
      { offset: "60%", color: "#FF0000" },
      { offset: "100%", color: "#FF0000" },
    ],
    cardLeft: -8,
    cardTop: 260,
    cardWidth: 295,
    cardHeight: 109,
    chartWidth: 258,
    chartHeight: 50,
    emoji: <Lottie animationData={sunglassesEmoji} loop autoplay style={{ width: 38, height: 38 }} />,
    blurColor: "#FD1E01",
    emojiX: 225,
    emojiY: -10,
  }
];

const ReadyToTrySection: FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== DESKTOP =====
  if (windowWidth > 1440) {
    return (
      <section id="get-a-free-trial" className="w-full bg-black flex flex-col items-center justify-center relative" style={{ position: "relative" }}>
        <div className="mx-auto flex flex-col items-center justify-center relative z-10" style={{ width: "100%", maxWidth: 1440 }}>
          <span className="block text-center font-instrument font-normal text-[20px] leading-[24px] tracking-[0.2em] text-menu-link mb-4">
            READY TO TRY?
          </span>
          <h2 className="text-center font-instrument font-bold text-[48px] leading-[58px] tracking-[0.2em] text-white uppercase mb-[64px] whitespace-nowrap w-full">
            GET STARTED NOW AND GET A FREE TRIAL
          </h2>
          <p className="text-center font-instrument font-normal text-[20px] leading-[28px] text-menu-link mb-[64px] max-w-[800px] mx-auto">
            MOOD AI measures the community sentiment (“mood”) for any crypto token by analyzing its Telegram Community activity. Why? Because Price lags & Mood leads.
          </p>
          <button type="button"
            className="flex items-center justify-center min-w-[289px] h-[56px] rounded-full font-instrument font-medium text-white text-[14px] tracking-[0.15em] px-[32px] py-[16px] shadow-none border border-transparent transition-all duration-200"
            style={{
              background: "linear-gradient(180deg, #53B2F1 0%, #006DB6 100%)",
              border: "1px solid #53B2F1",
            }}>
            GET STARTED FOR FREE
            <img src={rocketIcon} alt="" width={32} height={32} style={{ marginLeft: 16, display: "inline-block" }} />
          </button>
          <div className="h-[110px]" />
          {/* DASHBOARD */}
          <div className="relative w-full flex justify-center items-center" style={{ minHeight: 660 }}>
            <div className="relative" style={{ width: "100%", maxWidth: 1407 }}>
              <img src={dashboardBg} alt="Dashboard" className="w-full max-w-[1407px] h-auto rounded-[16px] object-cover relative z-0" style={{ boxShadow: "0 0 64px 0 #000C26" }} />
              {desktopCharts.map((c, idx) => (
                <div key={idx}>
                  <div style={{
                    position: "absolute", left: c.card.left, top: c.card.top, zIndex: 10,
                    width: c.card.width, height: c.card.height
                  }}>
                    <MiniCard title={c.title} value={c.value} growth={c.growth} width={c.card.width} height={c.card.height}/>
                  </div>
                  <div style={{
                    position: "absolute", left: c.chart.left, top: c.chart.top, zIndex: 12,
                    width: c.chart.width, height: c.chart.height, pointerEvents: "none"
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={c.data}>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Line
                          type="basis"
                          dataKey="y"
                          stroke={`url(#line-gradient-${idx})`}
                          strokeWidth={5.5}
                          dot={false}
                          isAnimationActive
                        />
                        <defs>
                          <linearGradient id={`line-gradient-${idx}`} x1="0" y1="0" x2="1" y2="0">
                            {c.gradient.map((g, i) => (
                              <stop key={i} offset={g.offset} stopColor={g.color} />
                            ))}
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{
                    position: "absolute", left: c.emojiPos.left, top: c.emojiPos.top, width: 90, height: 90,
                    pointerEvents: "none", zIndex: 20,
                  }}>
                    <div style={{
                      width: 90, height: 90, borderRadius: "50%",
                      background: `radial-gradient(circle at 56% 82%, ${c.blurColor}FF 0%, transparent 80%)`,
                      filter: `blur(32px)`, opacity: 0.65, position: "absolute", left: 0, top: 0, pointerEvents: "none",
                    }}/>
                    <div style={{
                      position: "absolute", left: 13, top: 13, width: 64, height: 64, display: "flex",
                      alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1,
                    }}>{c.emoji}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[200px]" />
      </section>
    );
  }

  // ===== TABLET =====
  if (windowWidth > 991 && windowWidth <= 1440) {
    return (
      <section id="get-a-free-trial" className="w-full bg-black flex flex-col items-center justify-center relative">
        <div className="mx-auto flex flex-col items-center justify-center relative z-10" style={{ width: "100%", maxWidth: 1060, paddingLeft: 24, paddingRight: 24 }}>
          <span className="block text-center font-instrument font-normal text-[20px] leading-[22px] tracking-[0.17em] text-menu-link mb-3">
            READY TO TRY?
          </span>
          <h2
            className="text-center font-instrument font-bold tracking-[0.13em] text-white uppercase mb-[38px] whitespace-pre-line w-full"
            style={{
              whiteSpace: "pre-line",
              fontSize: windowWidth <= 1000 ? 36 : 48,
              lineHeight: windowWidth <= 1000 ? "42px" : "58px",
            }}
          >
            {windowWidth <= 990
              ? "GET STARTED NOW\nAND GET A FREE\nTRIAL"
              : "GET STARTED NOW AND GET A FREE TRIAL"}
          </h2>
          <p className="text-center font-instrument font-normal text-[20px] leading-[22px] text-menu-link mb-[32px] max-w-[420px] mx-auto">
            MOOD AI measures the community sentiment (“mood”) for any crypto token by analyzing its Telegram Community activity. Why? Because Price lags & Mood leads.
          </p>
          <button
            type="button"
            className="flex items-center justify-center min-w-[180px] h-[46px] rounded-full font-instrument font-medium text-white text-[14px] tracking-[0.13em] px-[18px] py-[10px] shadow-none border border-transparent transition-all duration-200"
            style={{
              background: "linear-gradient(180deg, #53B2F1 0%, #006DB6 100%)",
              border: "1px solid #53B2F1",
            }}>
            GET STARTED FOR FREE
            <img src={rocketIcon} alt="" width={24} height={24} style={{ marginLeft: 10, display: "inline-block" }} />
          </button>
          <div className="h-[50px]" />
          {/* DASHBOARD */}
          <div className="relative w-full flex justify-center items-center" style={{ minHeight: 390 }}>
            <div className="relative" style={{ width: "100%", maxWidth: 760 }}>
              <img src={dashboardBg} alt="Dashboard" className="w-full max-w-[760px] h-auto rounded-[14px] object-cover relative z-0" style={{ boxShadow: "0 0 36px 0 #000C26" }} />
              {tabletCharts.map((c, idx) => (
                <div key={idx}>
                  <div style={{
                    position: "absolute", left: c.card.left, top: c.card.top, zIndex: 10,
                    width: c.card.width, height: c.card.height
                  }}>
                    <MiniCard title={c.title} value={c.value} growth={c.growth} width={c.card.width} height={c.card.height}/>
                  </div>
                  <div style={{
                    position: "absolute", left: c.chart.left, top: c.chart.top, zIndex: 12,
                    width: c.chart.width, height: c.chart.height, pointerEvents: "none"
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={c.data}>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Line
                          type="basis"
                          dataKey="y"
                          stroke={`url(#tabletline-gradient-${idx})`}
                          strokeWidth={4.2}
                          dot={false}
                          isAnimationActive
                        />
                        <defs>
                          <linearGradient id={`tabletline-gradient-${idx}`} x1="0" y1="0" x2="1" y2="0">
                            {c.gradient.map((g, i) => (
                              <stop key={i} offset={g.offset} stopColor={g.color} />
                            ))}
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{
                    position: "absolute", left: c.emojiPos.left, top: c.emojiPos.top, width: 50, height: 50,
                    pointerEvents: "none", zIndex: 20,
                  }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "50%",
                      background: `radial-gradient(circle at 56% 82%, ${c.blurColor}FF 0%, transparent 80%)`,
                      filter: `blur(12px)`, opacity: 0.5, position: "absolute", left: 0, top: 0, pointerEvents: "none",
                    }}/>
                    <div style={{
                      position: "absolute", left: 4, top: 4, width: 38, height: 38, display: "flex",
                      alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1,
                    }}>{c.emoji}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[90px]" />
      </section>
    );
  }

  // ===== MOBILE =====
  return (
    <section id="get-a-free-trial" className="w-full bg-black flex flex-col items-center justify-center relative" style={{ position: "relative" }}>
      <div style={{ height: 72 }} />
      <div className="w-full mx-auto flex flex-col items-center justify-center px-4 relative z-20">
        <span className="block text-center font-instrument font-normal tracking-[0.2em] text-menu-link mb-4" style={{ fontSize: 20, lineHeight: "24px" }}>
          READY TO TRY?
        </span>
        <h2 className="text-center font-instrument font-bold tracking-[0.2em] text-white uppercase mb-[32px] w-full" style={{ fontSize: 36, lineHeight: "42px", whiteSpace: "pre-line" }}>
          GET STARTED NOW
          {"\n"}AND GET A FREE
          {"\n"}TRIAL
        </h2>
        <p className="text-center font-instrument font-normal text-menu-link mx-auto mb-[48px] max-w-[320px]" style={{ fontSize: 20, lineHeight: "28px" }}>
          MOOD AI measures the community sentiment (“mood”) for any crypto token by analyzing its Telegram Community activity. Why? Because Price lags & Mood leads.
        </p>
        <button
          type="button"
          className="flex items-center justify-center min-w-[160px] h-[42px] rounded-full font-instrument font-medium text-white tracking-[0.15em] px-[20px] py-[10px] shadow-none border border-transparent transition-all duration-200"
          style={{
            fontSize: 14, lineHeight: "24px",
            background: "linear-gradient(180deg, #53B2F1 0%, #006DB6 100%)",
            border: "1px solid #53B2F1",
          }}>
          GET STARTED FOR FREE
          <img src={rocketIcon} alt="" width={18} height={18} style={{ marginLeft: 8, display: "inline-block" }} />
        </button>
      </div>
      <div style={{ height: 207 }} />
      <div style={{ width: "100%", maxWidth: 420, height: 430, position: "relative", margin: "0 auto" }}>
        <img src={dashboardBg} alt="Dashboard" width={358} height={230}
          style={{
            position: "absolute",
            left: "50%", top: 80, transform: "translateX(-50%)",
            zIndex: 0, width: 358, height: 230, borderRadius: 10,
            objectFit: "cover", boxShadow: "0 0 32px 0 #000C26"
          }}
        />
        {mobileCharts.map((c, idx) => (
          <div key={idx} style={{
            position: "absolute", left: c.cardLeft, top: c.cardTop,
            width: c.chartWidth, height: c.chartHeight + c.cardHeight, zIndex: 20 + idx,
          }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: c.chartWidth, height: c.chartHeight }}>
              <ResponsiveContainer width="100%" height={c.chartHeight}>
                <LineChart data={c.data}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Line
                    type="basis"
                    dataKey="y"
                    stroke={`url(#mobileline-gradient-${idx})`}
                    strokeWidth={4}
                    dot={false}
                    isAnimationActive
                  />
                  <defs>
                    <linearGradient id={`mobileline-gradient-${idx}`} x1="0" y1="0" x2="1" y2="0">
                      {c.gradient.map((g, i) => (
                        <stop key={i} offset={g.offset} stopColor={g.color} />
                      ))}
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
              {/* Blur and emoji */}
              <div style={{
                position: "absolute", left: c.emojiX, top: c.emojiY, width: 44, height: 44,
                pointerEvents: "none", zIndex: 20,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `radial-gradient(circle at 52% 73%, ${c.blurColor}FF 0%, transparent 80%)`,
                  filter: `blur(14px)`, opacity: 0.7, position: "absolute", left: 0, top: 0, pointerEvents: "none",
                }}/>
                <div style={{
                  position: "absolute", left: 0, top: 0, width: 38, height: 38, display: "flex",
                  alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 21,
                }}>{c.emoji}</div>
              </div>
            </div>
            {/* MiniCard */}
            <div style={{ position: "absolute", left: 0, top: c.chartHeight + 2, zIndex: 22 }}>
              <MiniCard title={c.title} value={c.value} growth={c.growth} width={c.cardWidth} height={c.cardHeight}/>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[38px]" />
    </section>
  );
};

export default ReadyToTrySection;