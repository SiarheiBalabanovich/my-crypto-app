import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";

import backgroundImage from "../../../assets/background-how-it-works.png";
import AboutCryptoIcon from "../../../assets/about-the-crypto-icon.svg?react";
import GroupInfoPanelIcon from "../../../assets/group-info-panel-icon.svg?react";
import MoodEngagePanelIcon from "../../../assets/mood-engagement-panel-icon.svg?react";
import MoodChartIcon from "../../../assets/mood-chart-icon.svg?react";

import DashboardHeaderBar from "../dashboard-header-bar/dashboard-header-bar";
import DashboardMetricsRow from "./dashboard-metrics-row";
import DashboardStatusRow from "./dashboard-status-row";
import MoodChart from "../mood-chart/mood-chart";
import GetNotifiedRow from "../../landing/get-notified-row/get-notified-row";
import DifferencesRows from "./differences-rows";
import GroupInfoRow from "./group-info-row";
import DashboardTooltip from "../dashboard-tooltip/dashboard-tooltip";

type DashboardSectionProps = {
  locked?: boolean;
  overlay?: ReactNode;
};

type DashboardRowKey = "metrics" | "status" | "chart" | "group";

type TooltipConfig = {
  key: DashboardRowKey;
  title: string;
  text: string;
  icon: ReactNode;
  position: CSSProperties;
};

const DASHBOARD_MAX_WIDTH = 1376;
const MOBILE_MAX_WIDTH = 342;
const DASHBOARD_RADIUS = 24;
const MOBILE_TABLET_BREAKPOINT = 1350;

const ROW_ANIMATION_DELAY_MS = {
  status: 1_000,
  chart: 2_000,
  group: 2_000,
} as const;

const ROW_ANIMATION_PROPS = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: "easeOut" },
} as const;

const TOOLTIP_BASE_STYLE: CSSProperties = {
  position: "absolute",
  zIndex: 30,
};

const TOOLTIP_CONFIGS: TooltipConfig[] = [
  {
    key: "metrics",
    title: "ABOUT THE CRYPTO",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nulla fringilla, tincidunt quam at, porta felis.",
    icon: <AboutCryptoIcon width={20} height={20} />,
    position: { top: -50, left: "23%", transform: "translateX(-50%)" },
  },
  {
    key: "status",
    title: "MOOD / ENGAGEMENT PANEL",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nulla fringilla, tincidunt quam at, porta felis.",
    icon: <MoodEngagePanelIcon width={20} height={20} />,
    position: { top: 130, left: "60%", transform: "translateX(-50%)" },
  },
  {
    key: "chart",
    title: "MOOD CHART",
    text: "MOOD AI visualizes the current and past community sentiment as the MOOD CHART — where the X-axis is time and the Y-axis is sentiment intensity according to our proprietary algorithms.",
    icon: <MoodChartIcon width={20} height={20} />,
    position: { top: 340, left: "56%", transform: "translateX(-50%)" },
  },
  {
    key: "group",
    title: "GROUP INFO PANEL",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nulla fringilla, tincidunt quam at, porta felis.",
    icon: <GroupInfoPanelIcon width={20} height={20} />,
    position: { top: 870, left: "30%", transform: "translateX(-50%)" },
  },
];

const useIsMobileOrTablet = (
  breakpoint: number = MOBILE_TABLET_BREAKPOINT,
): boolean => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobileOrTablet(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobileOrTablet;
};

const useDashboardRowsVisibility = () => {
  const [visibleRows, setVisibleRows] = useState<Record<DashboardRowKey, boolean>>({
    metrics: false,
    status: false,
    chart: false,
    group: false,
  });

  useEffect(() => {
    setVisibleRows((currentRows) => ({
      ...currentRows,
      metrics: true,
    }));

    const statusTimer = window.setTimeout(() => {
      setVisibleRows((currentRows) => ({
        ...currentRows,
        status: true,
      }));
    }, ROW_ANIMATION_DELAY_MS.status);

    const chartTimer = window.setTimeout(() => {
      setVisibleRows((currentRows) => ({
        ...currentRows,
        chart: true,
      }));
    }, ROW_ANIMATION_DELAY_MS.chart);

    const groupTimer = window.setTimeout(() => {
      setVisibleRows((currentRows) => ({
        ...currentRows,
        group: true,
      }));
    }, ROW_ANIMATION_DELAY_MS.group);

    return () => {
      window.clearTimeout(statusTimer);
      window.clearTimeout(chartTimer);
      window.clearTimeout(groupTimer);
    };
  }, []);

  return visibleRows;
};

const DashboardHeader = () => (
  <div
    className="w-full flex flex-col items-center px-6 lg:px-0"
    style={{ maxWidth: "100%", margin: "0 auto" }}
  >
    <h2
      className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[20px] tracking-[0.13em] text-center mb-4 lg:text-[20px] lg:leading-[24px] lg:tracking-[0.13em]"
      style={{ letterSpacing: "0.13em" }}
    >
      HOW IT WORKS
    </h2>

    <div
      className="text-white font-bold font-instrument text-[36px] leading-[38px] text-center tracking-[0.06em] lg:text-[48px] lg:leading-[42px] lg:tracking-[0.06em] w-full max-w-[680px] lg:max-w-[900px] mx-auto"
      style={{ minHeight: 62 }}
    >
      INSIDE THE MOOD DASHBOARD
    </div>
  </div>
);

export default function DashboardSection({
  locked = false,
  overlay,
}: DashboardSectionProps) {
  const isMobileOrTablet = useIsMobileOrTablet();
  const visibleRows = useDashboardRowsVisibility();

  const [openedTooltips, setOpenedTooltips] = useState<Record<DashboardRowKey, boolean>>({
    metrics: true,
    status: true,
    chart: true,
    group: true,
  });

  const containerStyle = useMemo<CSSProperties>(
    () => ({
      width: "100%",
      maxWidth: isMobileOrTablet ? MOBILE_MAX_WIDTH : DASHBOARD_MAX_WIDTH,
      margin: "0 auto",
      background: "#070D11",
      borderRadius: isMobileOrTablet ? 18 : DASHBOARD_RADIUS,
      boxShadow: isMobileOrTablet
        ? "0 0 48px 0 #00122066"
        : "0 0 120px 0 #001220aa",
      boxSizing: "border-box",
      position: "relative",
      zIndex: 2,
      padding: isMobileOrTablet ? "0 21px" : "0 24px",
      minHeight: undefined,
    }),
    [isMobileOrTablet],
  );

  const closeTooltip = (key: DashboardRowKey): void => {
    setOpenedTooltips((currentTooltips) => ({
      ...currentTooltips,
      [key]: false,
    }));
  };

  const reopenTooltip = (key: DashboardRowKey): void => {
    setOpenedTooltips((currentTooltips) => ({
      ...currentTooltips,
      [key]: true,
    }));
  };

  return (
    <section
      id="how-it-works"
      className="w-full flex flex-col items-center justify-start relative overflow-hidden"
      style={{
        background: locked
          ? "#070D11"
          : `url(${backgroundImage}) center top / cover no-repeat`,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {isMobileOrTablet && <div style={{ height: 72 }} />}

      {!locked && (
        <>
          <DashboardHeader />
          <div className={isMobileOrTablet ? "h-[24px]" : "h-[120px]"} />
        </>
      )}

      <div
        className="w-full flex flex-col items-center justify-start relative"
        style={{ minHeight: undefined }}
      >
        <div style={containerStyle} tabIndex={0}>
          <DashboardHeaderBar />

          {!locked && !isMobileOrTablet && (
            <>
              {TOOLTIP_CONFIGS.map((tooltip) => {
                const isVisible =
                  visibleRows[tooltip.key] && openedTooltips[tooltip.key];

                if (!isVisible) {
                  return null;
                }

                return (
                  <DashboardTooltip
                    key={tooltip.key}
                    title={tooltip.title}
                    text={tooltip.text}
                    icon={tooltip.icon}
                    style={{
                      ...tooltip.position,
                      ...TOOLTIP_BASE_STYLE,
                    }}
                    onClose={() => closeTooltip(tooltip.key)}
                  />
                );
              })}
            </>
          )}

          {visibleRows.metrics && (
            <motion.div
              className="w-full flex justify-center mt-0 px-0"
              style={{ maxWidth: "100%", cursor: "pointer" }}
              {...ROW_ANIMATION_PROPS}
              onClick={() => reopenTooltip("metrics")}
            >
              <DashboardMetricsRow />
            </motion.div>
          )}

          {locked ? (
            <>{overlay}</>
          ) : (
            <>
              {visibleRows.status && (
                <motion.div
                  className="w-full flex justify-center mt-4 px-0"
                  style={{ maxWidth: "100%", cursor: "pointer" }}
                  {...ROW_ANIMATION_PROPS}
                  onClick={() => reopenTooltip("status")}
                >
                  <DashboardStatusRow />
                </motion.div>
              )}

              {visibleRows.chart && (
                <motion.div
                  className={
                    isMobileOrTablet
                      ? "w-full flex flex-col gap-4 mt-4"
                      : "w-full flex mx-auto gap-[16px] mt-[40px]"
                  }
                  style={{ maxWidth: "100%", cursor: "pointer" }}
                  {...ROW_ANIMATION_PROPS}
                  onClick={() => reopenTooltip("chart")}
                >
                  <MoodChart />
                  <GetNotifiedRow />
                  <DifferencesRows />
                </motion.div>
              )}

              {visibleRows.group && (
                <motion.div
                  className={
                    isMobileOrTablet
                      ? "w-full flex flex-col gap-4 mt-4"
                      : "w-full flex mx-auto gap-[16px] mt-[40px]"
                  }
                  style={{ maxWidth: "100%", cursor: "pointer" }}
                  {...ROW_ANIMATION_PROPS}
                  onClick={() => reopenTooltip("group")}
                >
                  <GroupInfoRow />
                </motion.div>
              )}
            </>
          )}

          {!locked && overlay && (
            <div
              className={
                isMobileOrTablet
                  ? "absolute left-0 right-0 mx-auto mt-4 rounded-[8px] flex items-center justify-center z-20 pointer-events-auto"
                  : "absolute left-0 right-0 mx-auto mt-[16px] w-[1312px] h-[746px] rounded-[8px] flex items-center justify-center z-20 pointer-events-auto"
              }
              style={
                isMobileOrTablet
                  ? { top: 120 }
                  : { top: 120 + 56 + 16 }
              }
            >
              {overlay}
            </div>
          )}
        </div>
      </div>

      <div style={{ height: isMobileOrTablet ? 40 : 200 }} />
    </section>
  );
}