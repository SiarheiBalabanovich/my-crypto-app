import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import backgroundImage from "../assets/background-how-it-works.png";
import DashboardHeaderBar from "./DashboardHeaderBar";
import DashboardMetricsRow from "./DashboardMetricsRow";
import DashboardStatusRow from "./DashboardStatusRow";
import MoodChart from "./MoodChart";
import GetNotifiedRow from "./GetNotifiedRow";
import DifferencesRows from "./DifferencesRows";
import GroupInfoRow from "./GroupInfoRow";
import DashboardTooltip from "./DashboardTooltip";
import AboutCryptoIcon from "../assets/about-the-crypto-icon.svg?react";
import GroupInfoPanelIcon from "../assets/group-info-panel-icon.svg?react";
import MoodEngagePanelIcon from "../assets/mood-engagement-panel-icon.svg?react";
import MoodChartIcon from "../assets/mood-chart-icon.svg?react";

const DASHBOARD_MAX_WIDTH = 1376;
const MOBILE_MAX_WIDTH = 342;
const DASHBOARD_RADIUS = 24;

const DashboardHeader = () => (
  <div className="w-full flex flex-col items-center px-6 lg:px-0" style={{ maxWidth: "100%", margin: "0 auto" }}>
    <h2 className="text-[#C9E2FF] font-normal font-instrument text-[20px] leading-[20px] tracking-[0.13em] text-center mb-4 lg:text-[20px] lg:leading-[24px] lg:tracking-[0.13em]" style={{ letterSpacing: "0.13em" }}>
      HOW IT WORKS
    </h2>
    <div className="text-white font-bold font-instrument text-[36px] leading-[38px] text-center tracking-[0.06em] lg:text-[48px] lg:leading-[42px] lg:tracking-[0.06em] w-full max-w-[680px] lg:max-w-[900px] mx-auto" style={{ minHeight: 62 }}>
      INSIDE THE MOOD DASHBOARD
    </div>
  </div>
);

type DashboardSectionProps = {
  locked?: boolean;
  overlay?: React.ReactNode;
};

const useIsMobileOrTablet = (breakpoint: number = 1350): boolean => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
};

const DashboardSection: React.FC<DashboardSectionProps> = ({
  locked,
  overlay,
}) => {
  const isMobileOrTablet = useIsMobileOrTablet(1350);

  const [showRow1, setShowRow1] = useState(false);
  const [showRow2, setShowRow2] = useState(false);
  const [showRow3, setShowRow3] = useState(false);
  const [showRow4, setShowRow4] = useState(false);

  // --- tooltip open/close states ---
  const [showTooltip1, setShowTooltip1] = useState(true);
  const [showTooltip2, setShowTooltip2] = useState(true);
  const [showTooltip3, setShowTooltip3] = useState(true);
  const [showTooltip4, setShowTooltip4] = useState(true);

  useEffect(() => {
    setShowRow1(true);
    const t2 = setTimeout(() => setShowRow2(true), 1000);
    const t3 = setTimeout(() => setShowRow3(true), 2000);
    const t4 = setTimeout(() => setShowRow4(true), 2000);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const TOOLTIP_POSITIONS = [
    { top: -50, left: "23%", transform: "translateX(-50%)" },
    { top: 130, left: "60%", transform: "translateX(-50%)" },
    { top: 340, left: "56%", transform: "translateX(-50%)" },
    { top: 870, left: "30%", transform: "translateX(-50%)" },
  ] as const;

  const containerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: isMobileOrTablet ? MOBILE_MAX_WIDTH : DASHBOARD_MAX_WIDTH,
    margin: "0 auto",
    background: "#070D11",
    borderRadius: isMobileOrTablet ? 18 : DASHBOARD_RADIUS,
    boxShadow: isMobileOrTablet ? "0 0 48px 0 #00122066" : "0 0 120px 0 #001220aa",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
    padding: isMobileOrTablet ? "0 21px" : "0 24px",
    minHeight: isMobileOrTablet ? undefined : undefined,
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
        style={{ minHeight: isMobileOrTablet ? undefined : undefined }}
      >
        <div style={containerStyle} tabIndex={0}>
          <DashboardHeaderBar />

          {/* Tooltips (desktop only) */}
          {!locked && !isMobileOrTablet && (
            <>
              {showRow1 && showTooltip1 && (
                <DashboardTooltip
                  title="ABOUT THE CRYPTO"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nulla fringilla, tincidunt quam at, porta felis."
                  icon={<AboutCryptoIcon width={20} height={20} />}
                  style={{
                    ...TOOLTIP_POSITIONS[0],
                    position: "absolute",
                    zIndex: 30,
                  }}
                  onClose={() => setShowTooltip1(false)}
                />
              )}
              {showRow2 && showTooltip2 && (
                <DashboardTooltip
                  title="MOOD / ENGAGEMENT PANEL"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nulla fringilla, tincidunt quam at, porta felis."
                  icon={<MoodEngagePanelIcon width={20} height={20} />}
                  style={{
                    ...TOOLTIP_POSITIONS[1],
                    position: "absolute",
                    zIndex: 30,
                  }}
                  onClose={() => setShowTooltip2(false)}
                />
              )}
              {showRow3 && showTooltip3 && (
                <DashboardTooltip
                  title="MOOD CHART"
                  text="MOOD AI visualizes the current and past community sentiment as the MOOD CHART — where the X-axis is time and the Y-axis is sentiment intensity according to our proprietary algorithms."
                  icon={<MoodChartIcon width={20} height={20} />}
                  style={{
                    ...TOOLTIP_POSITIONS[2],
                    position: "absolute",
                    zIndex: 30,
                  }}
                  onClose={() => setShowTooltip3(false)}
                />
              )}
              {showRow4 && showTooltip4 && (
                <DashboardTooltip
                  title="GROUP INFO PANEL"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nulla fringilla, tincidunt quam at, porta felis."
                  icon={<GroupInfoPanelIcon width={20} height={20} />}
                  style={{
                    ...TOOLTIP_POSITIONS[3],
                    position: "absolute",
                    zIndex: 30,
                  }}
                  onClose={() => setShowTooltip4(false)}
                />
              )}
            </>
          )}

          {showRow1 && (
            <motion.div
              className="w-full flex justify-center mt-0 px-0"
              style={{ maxWidth: "100%", cursor: "pointer" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              onClick={() => !showTooltip1 && setShowTooltip1(true)}
            >
              <DashboardMetricsRow />
            </motion.div>
          )}

          {locked ? (
            <>
              {overlay}
            </>
          ) : (
            <>
              {showRow2 && (
                <motion.div
                  className="w-full flex justify-center mt-4 px-0"
                  style={{ maxWidth: "100%", cursor: "pointer" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  onClick={() => !showTooltip2 && setShowTooltip2(true)}
                >
                  <DashboardStatusRow />
                </motion.div>
              )}
              {showRow3 && (
                <motion.div
                  className={isMobileOrTablet
                    ? "w-full flex flex-col gap-4 mt-4"
                    : "w-full flex mx-auto gap-[16px] mt-[40px]"}
                  style={{ maxWidth: "100%", cursor: "pointer" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  onClick={() => !showTooltip3 && setShowTooltip3(true)}
                >
                  <MoodChart />
                  <GetNotifiedRow />
                  <DifferencesRows />
                </motion.div>
              )}
              {showRow4 && (
                <motion.div
                  className={isMobileOrTablet
                    ? "w-full flex flex-col gap-4 mt-4"
                    : "w-full flex mx-auto gap-[16px] mt-[40px]"}
                  style={{ maxWidth: "100%", cursor: "pointer" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  onClick={() => !showTooltip4 && setShowTooltip4(true)}
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
};

export default DashboardSection;

/*
  TODO Backend: If you need to render tooltips or text/icon from API, just pass props with dynamic values from backend here.
*/