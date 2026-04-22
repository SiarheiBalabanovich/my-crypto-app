import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { progressSteps } from "../data/progressSteps";
import { circleStyles } from "../data/progressCircles";
import bgImage from "../assets/bg-progress-overview.png";

// ===== TYPES =====
type BezierPoint = { x: number; y: number };
type Bead = { x: number; y: number; r: number; fill: string; opacity: number };

// ===== CONSTANTS =====
const P0: BezierPoint = { x: 120, y: 140 };
const P1: BezierPoint = { x: 900, y: 480 };
const P2: BezierPoint = { x: 1680, y: 140 };
const DIST_BETWEEN_EDGES = 48;

// ===== HELPERS =====
function getBezierXY(t: number): BezierPoint {
  const x = (1 - t) * (1 - t) * P0.x + 2 * (1 - t) * t * P1.x + t * t * P2.x;
  const y = (1 - t) * (1 - t) * P0.y + 2 * (1 - t) * t * P1.y + t * t * P2.y;
  return { x, y };
}
function getNextTByEdge(prevT: number, prevR: number, nextR: number): number {
  const steps = 150;
  const prevPt = getBezierXY(prevT);
  const distGoal = prevR + nextR + DIST_BETWEEN_EDGES;
  for (let i = 1; i <= steps; ++i) {
    const t = prevT + (1 - prevT) * (i / steps);
    const pt = getBezierXY(t);
    const len = Math.hypot(pt.x - prevPt.x, pt.y - prevPt.y);
    if (len >= distGoal) return t;
  }
  return 1;
}

// ===== MOBILE/TABLET DETECTION =====
function useIsMobileOrTablet(breakpoint: number = 1024): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

// ===== MAIN COMPONENT =====
export default function ProgressSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lastClicked, setLastClicked] = useState<"prev" | "next" | null>(null);

  // TODO: If progressSteps/circleStyles will come from backend, replace with useQuery/useSWR/etc.
  const total = progressSteps.length;
  const beadCount = circleStyles.length - 1;
  const tCenter = 0.5;
  const isMobileOrTablet = useIsMobileOrTablet();

  // ===== DESKTOP BEADS =====
  const rightBeads: Bead[] = [];
  let tPrev: number = tCenter;
  let prevR: number = circleStyles[0].r;
  for (let i = 1; i <= Math.min(beadCount, total - activeIdx - 1); ++i) {
    const { r: currR, fill, opacity } = circleStyles[i];
    const t: number = getNextTByEdge(tPrev, prevR, currR);
    const { x, y } = getBezierXY(t);
    rightBeads.push({ x, y, r: currR, fill, opacity });
    tPrev = t;
    prevR = currR;
  }
  const leftBeads: Bead[] = [];
  let tPrevL: number = tCenter;
  let prevRL: number = circleStyles[0].r;
  for (let i = 1; i <= Math.min(beadCount, activeIdx); ++i) {
    const { r: currR, fill, opacity } = circleStyles[i];
    let t: number = tPrevL;
    const steps: number = 150;
    for (let j = 1; j <= steps; ++j) {
      const tt: number = tPrevL - tPrevL * (j / steps);
      const ptPrev = getBezierXY(tPrevL);
      const pt = getBezierXY(tt);
      const len = Math.hypot(pt.x - ptPrev.x, pt.y - ptPrev.y);
      if (len >= prevRL + currR + DIST_BETWEEN_EDGES) {
        t = tt;
        break;
      }
    }
    const { x, y } = getBezierXY(t);
    leftBeads.unshift({ x, y, r: currR, fill, opacity });
    tPrevL = t;
    prevRL = currR;
  }

  // ===== CENTRAL BEAD =====
  const { r: centerR, fill: centerFill, opacity: centerOp } = circleStyles[0];
  const { x: cx, y: cy } = getBezierXY(tCenter);

  // ===== HANDLERS =====
  const handlePrev = (): void => {
    if (activeIdx > 0) {
      setActiveIdx(idx => Math.max(0, idx - 1));
      setLastClicked("prev");
    }
  };
  const handleNext = (): void => {
    if (activeIdx < total - 1) {
      setActiveIdx(idx => Math.min(total - 1, idx + 1));
      setLastClicked("next");
    }
  };

  // ===== ANIMATION VARS =====
  const beadAnim = {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
    exit: { opacity: 0, scale: 1.07, transition: { duration: 0.3 } }
  };

  // ===== MOBILE / TABLET RENDER =====
  if (isMobileOrTablet) {
    const EDGE_OFFSET = 13;
    const leftStep = activeIdx > 0 ? progressSteps[activeIdx - 1] : null;
    const rightStep = activeIdx < total - 1 ? progressSteps[activeIdx + 1] : null;
    const BEAD_COLOR = "rgba(0,130,217,0.9)";
    const leftStyle = leftStep ? { fill: BEAD_COLOR, opacity: 1 } : null;
    const rightStyle = rightStep ? { fill: BEAD_COLOR, opacity: 1 } : null;

    return (
      <section id="progress-overview"
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: `url(${bgImage}) center center / cover no-repeat`,
          paddingLeft: EDGE_OFFSET,
          paddingRight: EDGE_OFFSET,
          margin: "0 auto",
        }}
      >
        <div style={{ height: 72 }} />
        <div className="flex flex-col items-center mb-6">
          <span
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 400,
              fontSize: 20,
              color: "#C9E2FF",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              marginBottom: 16,
              textAlign: "center",
              display: "block",
            }}
          >
            MOOD AI PROGRESS OVERVIEW
          </span>
          <h2
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 500,
              fontSize: 36,
              lineHeight: "42px",
              letterSpacing: "0.2em",
              color: "#FFFFFF",
              marginBottom: 48,
              textAlign: "center",
            }}
          >
            THE JOURNEY HAS BEGUN
          </h2>
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 122,
            position: "relative",
          }}
        >
          <svg
            width="100%"
            height={56}
            viewBox="0 0 390 56"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <path
              d="M 0 28 Q 195 56 390 28"
              stroke="#2196F3"
              strokeWidth="1.3"
              opacity={0.22}
              fill="none"
            />
          </svg>
          <AnimatePresence mode="wait">
            {leftStep && leftStyle && (
              <motion.div
                key={`mobile-left-bead-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.93, x: -28 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.08, x: -28 }}
                transition={{ duration: 0.46, ease: [0.44, 0, 0.56, 1] }}
                style={{
                  zIndex: 2,
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  minHeight: 48,
                  borderRadius: "50%",
                  background: leftStyle.fill,
                  opacity: leftStyle.opacity,
                  boxShadow: "0 0 24px #13A1F766",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: DIST_BETWEEN_EDGES,
                  position: "relative",
                }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-center-bead-${activeIdx}`}
              initial={{ opacity: 0, scale: 0.94, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -30 }}
              transition={{ duration: 0.64, ease: [0.44, 0, 0.56, 1] }}
              style={{
                zIndex: 3,
                width: 170,
                height: 122,
                minWidth: 170,
                minHeight: 170,
                borderRadius: "50%",
                background: centerFill,
                opacity: centerOp,
                boxShadow: "0 0 64px #13A1F7BB",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s cubic-bezier(.5,2.4,.3,1)",
                marginRight: rightStep ? DIST_BETWEEN_EDGES : 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#C9E2FF",
                  marginBottom: 10,
                  letterSpacing: "0.1em",
                  textAlign: "center",
                }}
              >
                {progressSteps[activeIdx].planet}
              </div>
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 500,
                  fontSize: 20,
                  color: "#FFF",
                  textAlign: "center",
                }}
              >
                {progressSteps[activeIdx].date}
              </div>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {rightStep && rightStyle && (
              <motion.div
                key={`mobile-right-bead-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.93, x: 28 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.08, x: 28 }}
                transition={{ duration: 0.46, ease: [0.44, 0, 0.56, 1] }}
                style={{
                  zIndex: 2,
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  minHeight: 48,
                  borderRadius: "50%",
                  background: rightStyle.fill,
                  opacity: rightStyle.opacity,
                  boxShadow: "0 0 24px #13A1F7BB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              />
            )}
          </AnimatePresence>
        </div>
        <div style={{ marginBottom: 78 }} />
        <h3
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 500,
            fontSize: 32,
            color: "#FFFFFF",
            marginBottom: 24,
            textAlign: "center",
            minHeight: 100,
          }}
        >
          {progressSteps[activeIdx].title}
        </h3>
        <p
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: "#C9E2FF",
            marginBottom: 0,
            textAlign: "center",
            minHeight: 90,
          }}
        >
          {progressSteps[activeIdx].description}
        </p>
        <div className="flex items-center justify-center mt-8 mb-8" style={{ gap: isMobileOrTablet ? 16 : 32 }}>
          <button
            className="z-10 flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              background: 'rgba(0,0,0,0.2)',
              border: activeIdx > 0 && lastClicked === 'prev' ? '2px solid #0082D9' : '2px solid transparent',
              boxShadow: activeIdx > 0 && lastClicked === 'prev' ? '0 0 16px #0082D9cc' : 'none',
              borderColor: activeIdx > 0 && lastClicked === 'prev' ? '#0082D9' : 'transparent',
              transition: 'all 0.23s',
              outline: 'none',
              cursor: activeIdx === 0 ? 'default' : 'pointer',
            }}
            onClick={handlePrev}
            disabled={activeIdx === 0}
            aria-label="Previous"
          >
            <svg width={12} height={24} viewBox="0 0 12 24" fill="none">
              <path
                d="M10 2L2 12L10 22"
                stroke={activeIdx > 0 && lastClicked === 'prev' ? "#0082D9" : "#C9E2FF"}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="z-10 flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              background: 'rgba(0,0,0,0.2)',
              border: activeIdx < total - 1 && lastClicked === 'next' ? '2px solid #0082D9' : '2px solid transparent',
              boxShadow: activeIdx < total - 1 && lastClicked === 'next' ? '0 0 16px #0082D9cc' : 'none',
              borderColor: activeIdx < total - 1 && lastClicked === 'next' ? '#0082D9' : 'transparent',
              transition: 'all 0.23s',
              outline: 'none',
              cursor: activeIdx === total - 1 ? 'default' : 'pointer',
            }}
            onClick={handleNext}
            disabled={activeIdx === total - 1}
            aria-label="Next"
          >
            <svg width={12} height={24} viewBox="0 0 12 24" fill="none">
              <path
                d="M2 2L10 12L2 22"
                stroke={activeIdx < total - 1 && lastClicked === 'next' ? "#0082D9" : "#C9E2FF"}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div style={{ height: 32 }} />
      </section>
    );
  }

  // ======= DESKTOP RENDER =======
  return (
    <section id="progress-overview"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: `url(${bgImage}) center center / cover no-repeat` }}
    >
      <div className="flex flex-col items-center mb-6">
        <span
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 400,
            fontSize: 20,
            color: "#C9E2FF",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          MOOD AI PROGRESS OVERVIEW
        </span>
        <h2
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 500,
            fontSize: 48,
            color: "#FFFFFF",
            letterSpacing: "0em",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          THE JOURNEY HAS BEGUN
        </h2>
      </div>
      <div className="relative flex items-center justify-center w-full mx-auto" style={{ height: 400 }}>
        <svg className="w-full h-full" viewBox="0 0 1800 500" fill="none">
          <path
            d={`M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
            stroke="#2196F3"
            strokeWidth="1.3"
            opacity={0.22}
            fill="none"
          />
          <AnimatePresence>
            {leftBeads.map((bead, idx) => (
              <motion.circle
                key={"L" + idx + activeIdx}
                cx={bead.x}
                cy={bead.y}
                r={bead.r}
                fill={bead.fill}
                opacity={bead.opacity}
                {...beadAnim}
              />
            ))}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.g
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.90 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.44, 0, 0.56, 1] } }}
              exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.36, ease: [0.44, 0, 0.56, 1] } }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={centerR}
                fill={centerFill}
                opacity={centerOp}
                style={{
                  filter: "drop-shadow(0 0 64px #13A1F7BB)",
                  transition: "all 0.33s cubic-bezier(.5,2.4,.3,1)"
                }}
              />
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 400,
                  fontSize: 28,
                  letterSpacing: "0.10em",
                  fill: "#C9E2FF",
                  textAlign: "center"
                }}
              >
                {progressSteps[activeIdx].planet}
              </text>
              <text
                x={cx}
                y={cy + 26}
                textAnchor="middle"
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 500,
                  fontSize: 18,
                  letterSpacing: "0em",
                  fill: "#C9E2FF",
                  textAlign: "center"
                }}
              >
                {progressSteps[activeIdx].date}
              </text>
            </motion.g>
          </AnimatePresence>
          <AnimatePresence>
            {rightBeads.map((bead, idx) => (
              <motion.circle
                key={"R" + idx + activeIdx}
                cx={bead.x}
                cy={bead.y}
                r={bead.r}
                fill={bead.fill}
                opacity={bead.opacity}
                {...beadAnim}
              />
            ))}
          </AnimatePresence>
        </svg>
      </div>
      <div className="flex items-center justify-center mt-8 mb-8">
        <button
          className="z-10 flex items-center justify-center rounded-full"
          style={{
            width: 64,
            height: 64,
            background: 'rgba(0,0,0,0.2)',
            border: activeIdx > 0 && lastClicked === 'prev' ? '2px solid #0082D9' : '2px solid transparent',
            boxShadow: activeIdx > 0 && lastClicked === 'prev' ? '0 0 16px #0082D9cc' : 'none',
            borderColor: activeIdx > 0 && lastClicked === 'prev' ? '#0082D9' : 'transparent',
            transition: 'all 0.23s',
            outline: 'none',
            cursor: activeIdx === 0 ? 'default' : 'pointer',
          }}
          onClick={handlePrev}
          disabled={activeIdx === 0}
          aria-label="Previous"
        >
          <svg width={32} height={32} fill="none">
            <circle cx={16} cy={16} r={16} fill="transparent" />
            <path d="M20 8l-8 8 8 8" stroke={activeIdx > 0 && lastClicked === 'prev' ? "#0082D9" : "#C9E2FF"} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ width: 32, minWidth: 32, pointerEvents: "none" }} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
            className="flex flex-col items-center justify-center mx-auto"
            style={{ width: 750 }}
          >
            <h3
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 500,
                fontSize: 32,
                color: "#FFFFFF",
                marginBottom: 24,
                textAlign: "center"
              }}
            >
              {progressSteps[activeIdx].title}
            </h3>
            <p
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 400,
                fontSize: 18,
                color: "#C9E2FF",
                marginBottom: 0,
                textAlign: "center"
              }}
            >
              {progressSteps[activeIdx].description}
            </p>
          </motion.div>
        </AnimatePresence>
        <div style={{ width: 32, minWidth: 32, pointerEvents: "none" }} />
        <button
          className="z-10 flex items-center justify-center rounded-full"
          style={{
            width: 64,
            height: 64,
            background: 'rgba(0,0,0,0.2)',
            border: activeIdx < total - 1 && lastClicked === 'next' ? '2px solid #0082D9' : '2px solid transparent',
            boxShadow: activeIdx < total - 1 && lastClicked === 'next' ? '0 0 16px #0082D9cc' : 'none',
            borderColor: activeIdx < total - 1 && lastClicked === 'next' ? '#0082D9' : 'transparent',
            transition: 'all 0.23s',
            outline: 'none',
            cursor: activeIdx === total - 1 ? 'default' : 'pointer',
          }}
          onClick={handleNext}
          disabled={activeIdx === total - 1}
          aria-label="Next"
        >
          <svg width={32} height={32} fill="none">
            <circle cx={16} cy={16} r={16} fill="transparent" />
            <path d="M12 8l8 8-8 8" stroke={activeIdx < total - 1 && lastClicked === 'next' ? "#0082D9" : "#C9E2FF"} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div style={{ height: 400 }} />
    </section>
  );
}