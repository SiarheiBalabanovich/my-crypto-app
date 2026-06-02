import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

import bgImage from "../../../assets/bg-progress-overview.png";
import { circleStyles } from "../../../shared/constants/progress-circles";
import { progressSteps, type ProgressStep } from "./progress-steps";

type NavigationDirection = "prev" | "next";

type BezierPoint = {
  x: number;
  y: number;
};

type CircleStyle = {
  r: number;
  fill: string;
  opacity: number;
};

type Bead = BezierPoint & CircleStyle;

type ArrowDirection = "left" | "right";

const SECTION_ID = "progress-overview";

const FONT_FAMILY = "Instrument Sans, sans-serif";

const COLORS = {
  textPrimary: "#FFFFFF",
  textSecondary: "#C9E2FF",
  accent: "#0082D9",
  curve: "#2196F3",
  mobileBead: "rgba(0,130,217,0.9)",
  buttonBackground: "rgba(0,0,0,0.2)",
} as const;

const DESKTOP_CURVE = {
  p0: { x: 120, y: 140 },
  p1: { x: 900, y: 480 },
  p2: { x: 1680, y: 140 },
} as const;

const MOBILE_CURVE_PATH = "M 0 28 Q 195 56 390 28";

const DIST_BETWEEN_EDGES = 48;
const DESKTOP_CENTER_T = 0.5;
const MOBILE_TABLET_BREAKPOINT = 1024;
const EDGE_OFFSET = 13;

const DEFAULT_CIRCLE_STYLE: CircleStyle = {
  r: 85,
  fill: "rgba(0,130,217,1)",
  opacity: 1,
};

const EMPTY_PROGRESS_STEP: ProgressStep = {
  planet: "",
  date: "",
  title: "",
  description: "",
};

const sectionBackgroundStyle: CSSProperties = {
  background: `url(${bgImage}) center center / cover no-repeat`,
};

const subtitleStyle: CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: 400,
  fontSize: 20,
  color: COLORS.textSecondary,
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  marginBottom: 16,
  textAlign: "center",
  display: "block",
};

const beadAnimation = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45 },
  },
  exit: {
    opacity: 0,
    scale: 1.07,
    transition: { duration: 0.3 },
  },
} as const;

const mobileSideBeadAnimation = {
  left: {
    initial: { opacity: 0, scale: 0.93, x: -28 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 1.08, x: -28 },
    transition: { duration: 0.46, ease: [0.44, 0, 0.56, 1] },
  },
  right: {
    initial: { opacity: 0, scale: 0.93, x: 28 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 1.08, x: 28 },
    transition: { duration: 0.46, ease: [0.44, 0, 0.56, 1] },
  },
} as const;

const mobileCenterBeadAnimation = {
  initial: { opacity: 0, scale: 0.94, y: 32 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.03, y: -30 },
  transition: { duration: 0.64, ease: [0.44, 0, 0.56, 1] },
} as const;

const desktopCenterAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.44, 0, 0.56, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: { duration: 0.36, ease: [0.44, 0, 0.56, 1] },
  },
} as const;

const desktopContentAnimation = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.02, y: -10 },
  transition: { duration: 0.4, ease: [0.44, 0, 0.56, 1] },
} as const;

const getCircleStyle = (index: number): CircleStyle =>
  circleStyles[index] ?? DEFAULT_CIRCLE_STYLE;

const getProgressStep = (index: number): ProgressStep =>
  progressSteps[index] ?? progressSteps[0] ?? EMPTY_PROGRESS_STEP;

const getBezierXY = (t: number): BezierPoint => {
  const { p0, p1, p2 } = DESKTOP_CURVE;
  const invertedT = 1 - t;

  return {
    x: invertedT * invertedT * p0.x + 2 * invertedT * t * p1.x + t * t * p2.x,
    y: invertedT * invertedT * p0.y + 2 * invertedT * t * p1.y + t * t * p2.y,
  };
};

const getNextTByEdge = (
  previousT: number,
  previousRadius: number,
  nextRadius: number,
): number => {
  const steps = 150;
  const previousPoint = getBezierXY(previousT);
  const targetDistance = previousRadius + nextRadius + DIST_BETWEEN_EDGES;

  for (let index = 1; index <= steps; index += 1) {
    const t = previousT + (1 - previousT) * (index / steps);
    const point = getBezierXY(t);
    const distance = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);

    if (distance >= targetDistance) {
      return t;
    }
  }

  return 1;
};

const getPreviousTByEdge = (
  previousT: number,
  previousRadius: number,
  nextRadius: number,
): number => {
  const steps = 150;
  const previousPoint = getBezierXY(previousT);
  const targetDistance = previousRadius + nextRadius + DIST_BETWEEN_EDGES;

  for (let index = 1; index <= steps; index += 1) {
    const t = previousT - previousT * (index / steps);
    const point = getBezierXY(t);
    const distance = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);

    if (distance >= targetDistance) {
      return t;
    }
  }

  return 0;
};

function useIsMobileOrTablet(breakpoint = MOBILE_TABLET_BREAKPOINT): boolean {
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
}

const createRightBeads = (
  activeIndex: number,
  total: number,
): Bead[] => {
  const beadCount = circleStyles.length - 1;
  const beads: Bead[] = [];

  let previousT = DESKTOP_CENTER_T;
  let previousRadius = getCircleStyle(0).r;

  const visibleCount = Math.min(beadCount, total - activeIndex - 1);

  for (let index = 1; index <= visibleCount; index += 1) {
    const circleStyle = getCircleStyle(index);
    const t = getNextTByEdge(previousT, previousRadius, circleStyle.r);
    const point = getBezierXY(t);

    beads.push({
      ...point,
      ...circleStyle,
    });

    previousT = t;
    previousRadius = circleStyle.r;
  }

  return beads;
};

const createLeftBeads = (activeIndex: number): Bead[] => {
  const beadCount = circleStyles.length - 1;
  const beads: Bead[] = [];

  let previousT = DESKTOP_CENTER_T;
  let previousRadius = getCircleStyle(0).r;

  const visibleCount = Math.min(beadCount, activeIndex);

  for (let index = 1; index <= visibleCount; index += 1) {
    const circleStyle = getCircleStyle(index);
    const t = getPreviousTByEdge(previousT, previousRadius, circleStyle.r);
    const point = getBezierXY(t);

    beads.unshift({
      ...point,
      ...circleStyle,
    });

    previousT = t;
    previousRadius = circleStyle.r;
  }

  return beads;
};

function SectionTitle({ variant }: { variant: "desktop" | "mobile" }) {
  const isMobile = variant === "mobile";

  return (
    <div className="flex flex-col items-center mb-6">
      <span style={subtitleStyle}>MOOD AI PROGRESS OVERVIEW</span>

      <h2
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 500,
          fontSize: isMobile ? 36 : 48,
          lineHeight: isMobile ? "42px" : undefined,
          letterSpacing: isMobile ? "0.2em" : "0em",
          color: COLORS.textPrimary,
          marginBottom: isMobile ? 48 : 24,
          textAlign: "center",
        }}
      >
        THE JOURNEY HAS BEGUN
      </h2>
    </div>
  );
}

function NavigationArrow({
  direction,
  active,
  size,
}: {
  direction: ArrowDirection;
  active: boolean;
  size: "desktop" | "mobile";
}) {
  const stroke = active ? COLORS.accent : COLORS.textSecondary;

  if (size === "mobile") {
    return (
      <svg width={12} height={24} viewBox="0 0 12 24" fill="none">
        <path
          d={direction === "left" ? "M10 2L2 12L10 22" : "M2 2L10 12L2 22"}
          stroke={stroke}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width={32} height={32} fill="none">
      <circle cx={16} cy={16} r={16} fill="transparent" />
      <path
        d={direction === "left" ? "M20 8l-8 8 8 8" : "M12 8l8 8-8 8"}
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavigationButton({
  direction,
  disabled,
  isHighlighted,
  size,
  onClick,
}: {
  direction: ArrowDirection;
  disabled: boolean;
  isHighlighted: boolean;
  size: "desktop" | "mobile";
  onClick: () => void;
}) {
  return (
    <button
      className="z-10 flex items-center justify-center rounded-full"
      style={{
        width: 64,
        height: 64,
        background: COLORS.buttonBackground,
        border: isHighlighted ? `2px solid ${COLORS.accent}` : "2px solid transparent",
        boxShadow: isHighlighted ? `0 0 16px ${COLORS.accent}cc` : "none",
        borderColor: isHighlighted ? COLORS.accent : "transparent",
        transition: "all 0.23s",
        outline: "none",
        cursor: disabled ? "default" : "pointer",
      }}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      type="button"
    >
      <NavigationArrow direction={direction} active={isHighlighted} size={size} />
    </button>
  );
}

function MobileSideBead({
  side,
  visible,
}: {
  side: "left" | "right";
  visible: boolean;
}) {
  if (!visible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`mobile-${side}-bead`}
        {...mobileSideBeadAnimation[side]}
        style={{
          zIndex: 2,
          width: 48,
          height: 48,
          minWidth: 48,
          minHeight: 48,
          borderRadius: "50%",
          background: COLORS.mobileBead,
          opacity: 1,
          boxShadow: side === "left" ? "0 0 24px #13A1F766" : "0 0 24px #13A1F7BB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: side === "left" ? DIST_BETWEEN_EDGES : 0,
          position: "relative",
        }}
      />
    </AnimatePresence>
  );
}

function MobileCenterBead({
  step,
  hasRightStep,
  centerStyle,
  activeIndex,
}: {
  step: ProgressStep;
  hasRightStep: boolean;
  centerStyle: CircleStyle;
  activeIndex: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`mobile-center-bead-${activeIndex}`}
        {...mobileCenterBeadAnimation}
        style={{
          zIndex: 3,
          width: 170,
          height: 122,
          minWidth: 170,
          minHeight: 170,
          borderRadius: "50%",
          background: centerStyle.fill,
          opacity: centerStyle.opacity,
          boxShadow: "0 0 64px #13A1F7BB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(.5,2.4,.3,1)",
          marginRight: hasRightStep ? DIST_BETWEEN_EDGES : 0,
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: 20,
            color: COLORS.textSecondary,
            marginBottom: 10,
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          {step.planet}
        </div>

        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 500,
            fontSize: 20,
            color: COLORS.textPrimary,
            textAlign: "center",
          }}
        >
          {step.date}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function MobileProgressCurve() {
  return (
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
        d={MOBILE_CURVE_PATH}
        stroke={COLORS.curve}
        strokeWidth="1.3"
        opacity={0.22}
        fill="none"
      />
    </svg>
  );
}

function MobileProgressContent({
  step,
}: {
  step: ProgressStep;
}) {
  return (
    <>
      <div style={{ marginBottom: 78 }} />

      <h3
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 500,
          fontSize: 32,
          color: COLORS.textPrimary,
          marginBottom: 24,
          textAlign: "center",
          minHeight: 100,
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 400,
          fontSize: 18,
          color: COLORS.textSecondary,
          marginBottom: 0,
          textAlign: "center",
          minHeight: 90,
        }}
      >
        {step.description}
      </p>
    </>
  );
}

function DesktopBeads({
  side,
  beads,
  activeIndex,
}: {
  side: "left" | "right";
  beads: Bead[];
  activeIndex: number;
}) {
  return (
    <AnimatePresence>
      {beads.map((bead, index) => (
        <motion.circle
          key={`${side}-${index}-${activeIndex}`}
          cx={bead.x}
          cy={bead.y}
          r={bead.r}
          fill={bead.fill}
          opacity={bead.opacity}
          {...beadAnimation}
        />
      ))}
    </AnimatePresence>
  );
}

function DesktopCenterBead({
  step,
  activeIndex,
  centerPoint,
  centerStyle,
}: {
  step: ProgressStep;
  activeIndex: number;
  centerPoint: BezierPoint;
  centerStyle: CircleStyle;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.g key={activeIndex} {...desktopCenterAnimation}>
        <circle
          cx={centerPoint.x}
          cy={centerPoint.y}
          r={centerStyle.r}
          fill={centerStyle.fill}
          opacity={centerStyle.opacity}
          style={{
            filter: "drop-shadow(0 0 64px #13A1F7BB)",
            transition: "all 0.33s cubic-bezier(.5,2.4,.3,1)",
          }}
        />

        <text
          x={centerPoint.x}
          y={centerPoint.y - 8}
          textAnchor="middle"
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: 28,
            letterSpacing: "0.10em",
            fill: COLORS.textSecondary,
            textAlign: "center",
          }}
        >
          {step.planet}
        </text>

        <text
          x={centerPoint.x}
          y={centerPoint.y + 26}
          textAnchor="middle"
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: "0em",
            fill: COLORS.textSecondary,
            textAlign: "center",
          }}
        >
          {step.date}
        </text>
      </motion.g>
    </AnimatePresence>
  );
}

function DesktopProgressContent({
  step,
  activeIndex,
}: {
  step: ProgressStep;
  activeIndex: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        {...desktopContentAnimation}
        className="flex flex-col items-center justify-center mx-auto"
        style={{ width: 750 }}
      >
        <h3
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 500,
            fontSize: 32,
            color: COLORS.textPrimary,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: 18,
            color: COLORS.textSecondary,
            marginBottom: 0,
            textAlign: "center",
          }}
        >
          {step.description}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

function ProgressNavigation({
  activeIndex,
  total,
  lastClicked,
  variant,
  onPrev,
  onNext,
}: {
  activeIndex: number;
  total: number;
  lastClicked: NavigationDirection | null;
  variant: "desktop" | "mobile";
  onPrev: () => void;
  onNext: () => void;
}) {
  const isMobile = variant === "mobile";

  const isPrevHighlighted = activeIndex > 0 && lastClicked === "prev";
  const isNextHighlighted = activeIndex < total - 1 && lastClicked === "next";

  if (isMobile) {
    return (
      <div className="flex items-center justify-center mt-8 mb-8" style={{ gap: 16 }}>
        <NavigationButton
          direction="left"
          disabled={activeIndex === 0}
          isHighlighted={isPrevHighlighted}
          size="mobile"
          onClick={onPrev}
        />

        <NavigationButton
          direction="right"
          disabled={activeIndex === total - 1}
          isHighlighted={isNextHighlighted}
          size="mobile"
          onClick={onNext}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-8 mb-8">
      <NavigationButton
        direction="left"
        disabled={activeIndex === 0}
        isHighlighted={isPrevHighlighted}
        size="desktop"
        onClick={onPrev}
      />

      <div style={{ width: 32, minWidth: 32, pointerEvents: "none" }} />

      <DesktopProgressContent step={getProgressStep(activeIndex)} activeIndex={activeIndex} />

      <div style={{ width: 32, minWidth: 32, pointerEvents: "none" }} />

      <NavigationButton
        direction="right"
        disabled={activeIndex === total - 1}
        isHighlighted={isNextHighlighted}
        size="desktop"
        onClick={onNext}
      />
    </div>
  );
}

function MobileProgressSection({
  activeIndex,
  total,
  lastClicked,
  onPrev,
  onNext,
}: {
  activeIndex: number;
  total: number;
  lastClicked: NavigationDirection | null;
  onPrev: () => void;
  onNext: () => void;
}) {
  const activeStep = getProgressStep(activeIndex);
  const centerStyle = getCircleStyle(0);

  const hasLeftStep = activeIndex > 0;
  const hasRightStep = activeIndex < total - 1;

  return (
    <section
      id={SECTION_ID}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        ...sectionBackgroundStyle,
        paddingLeft: EDGE_OFFSET,
        paddingRight: EDGE_OFFSET,
        margin: "0 auto",
      }}
    >
      <div style={{ height: 72 }} />

      <SectionTitle variant="mobile" />

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
        <MobileProgressCurve />

        <MobileSideBead side="left" visible={hasLeftStep} />

        <MobileCenterBead
          step={activeStep}
          hasRightStep={hasRightStep}
          centerStyle={centerStyle}
          activeIndex={activeIndex}
        />

        <MobileSideBead side="right" visible={hasRightStep} />
      </div>

      <MobileProgressContent step={activeStep} />

      <ProgressNavigation
        activeIndex={activeIndex}
        total={total}
        lastClicked={lastClicked}
        variant="mobile"
        onPrev={onPrev}
        onNext={onNext}
      />

      <div style={{ height: 32 }} />
    </section>
  );
}

function DesktopProgressSection({
  activeIndex,
  total,
  lastClicked,
  leftBeads,
  rightBeads,
  centerPoint,
  centerStyle,
  onPrev,
  onNext,
}: {
  activeIndex: number;
  total: number;
  lastClicked: NavigationDirection | null;
  leftBeads: Bead[];
  rightBeads: Bead[];
  centerPoint: BezierPoint;
  centerStyle: CircleStyle;
  onPrev: () => void;
  onNext: () => void;
}) {
  const activeStep = getProgressStep(activeIndex);

  return (
    <section
      id={SECTION_ID}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={sectionBackgroundStyle}
    >
      <SectionTitle variant="desktop" />

      <div
        className="relative flex items-center justify-center w-full mx-auto"
        style={{ height: 400 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1800 500" fill="none">
          <path
            d={`M ${DESKTOP_CURVE.p0.x} ${DESKTOP_CURVE.p0.y} Q ${DESKTOP_CURVE.p1.x} ${DESKTOP_CURVE.p1.y} ${DESKTOP_CURVE.p2.x} ${DESKTOP_CURVE.p2.y}`}
            stroke={COLORS.curve}
            strokeWidth="1.3"
            opacity={0.22}
            fill="none"
          />

          <DesktopBeads side="left" beads={leftBeads} activeIndex={activeIndex} />

          <DesktopCenterBead
            step={activeStep}
            activeIndex={activeIndex}
            centerPoint={centerPoint}
            centerStyle={centerStyle}
          />

          <DesktopBeads side="right" beads={rightBeads} activeIndex={activeIndex} />
        </svg>
      </div>

      <ProgressNavigation
        activeIndex={activeIndex}
        total={total}
        lastClicked={lastClicked}
        variant="desktop"
        onPrev={onPrev}
        onNext={onNext}
      />

      <div style={{ height: 400 }} />
    </section>
  );
}

export default function ProgressSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastClicked, setLastClicked] = useState<NavigationDirection | null>(null);

  const isMobileOrTablet = useIsMobileOrTablet();
  const total = progressSteps.length;

  const centerPoint = useMemo(() => getBezierXY(DESKTOP_CENTER_T), []);
  const centerStyle = getCircleStyle(0);

  const leftBeads = useMemo(
    () => createLeftBeads(activeIndex),
    [activeIndex],
  );

  const rightBeads = useMemo(
    () => createRightBeads(activeIndex, total),
    [activeIndex, total],
  );

  const handlePrev = (): void => {
    if (activeIndex === 0) {
      return;
    }

    setActiveIndex((currentIndex) => Math.max(0, currentIndex - 1));
    setLastClicked("prev");
  };

  const handleNext = (): void => {
    if (activeIndex === total - 1) {
      return;
    }

    setActiveIndex((currentIndex) => Math.min(total - 1, currentIndex + 1));
    setLastClicked("next");
  };

  if (isMobileOrTablet) {
    return (
      <MobileProgressSection
        activeIndex={activeIndex}
        total={total}
        lastClicked={lastClicked}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    );
  }

  return (
    <DesktopProgressSection
      activeIndex={activeIndex}
      total={total}
      lastClicked={lastClicked}
      leftBeads={leftBeads}
      rightBeads={rightBeads}
      centerPoint={centerPoint}
      centerStyle={centerStyle}
      onPrev={handlePrev}
      onNext={handleNext}
    />
  );
}