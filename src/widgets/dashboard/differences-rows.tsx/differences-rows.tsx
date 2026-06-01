import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import DashboardTooltip from "../dashboard-tooltip/dashboard-tooltip";

type DifferenceType = "mood" | "engagement";
type DifferenceTitle = "Mood Differences" | "Engagement Differences";

type Difference = {
  label: string;
  percent: string;
  time: string;
};

type DifferenceConfig = {
  type: DifferenceType;
  title: DifferenceTitle;
  mobileTitle: ReactNode;
  differences: Difference[];
  tooltipText: string;
};

type TooltipState = Record<DifferenceType, boolean>;

const TABLET_MIN_WIDTH = 640;

const COLORS = {
  background: "#070D11",
  title: "#4F6175",
  value: "#C9E2FF",
  positive: "#239F2E",
  info: "#90EB43",
} as const;

const FONT_FAMILY = "Instrument Sans, sans-serif";

const DIFFERENCES: Difference[] = [
  { label: "+10", percent: "+0.13%", time: "1 hour" },
  { label: "+20", percent: "+0.13%", time: "1 day" },
  { label: "+30", percent: "+0.13%", time: "1 week" },
];

const DIFFERENCE_CONFIGS: DifferenceConfig[] = [
  {
    type: "mood",
    title: "Mood Differences",
    mobileTitle: (
      <>
        Mood
        <br />
        Differences
      </>
    ),
    differences: DIFFERENCES,
    tooltipText:
      "Mood Differences show how the overall sentiment in the token’s Telegram group has changed over time.",
  },
  {
    type: "engagement",
    title: "Engagement Differences",
    mobileTitle: "Engagement Differences",
    differences: DIFFERENCES,
    tooltipText:
      "Engagement Differences reflect how actively people are interacting in the group — messages, reactions, and overall activity.",
  },
];

const desktopStyles = {
  header: {
    color: COLORS.title,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "26px",
  },
  number: {
    color: COLORS.value,
    fontFamily: FONT_FAMILY,
    fontWeight: 500,
    fontSize: 32,
    lineHeight: "28px",
  },
  percent: {
    color: COLORS.positive,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "16px",
  },
  time: {
    color: COLORS.title,
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "26px",
  },
  tooltip: {
    position: "absolute",
    top: 40,
    left: -60,
    zIndex: 99,
    minWidth: 240,
    maxWidth: 340,
    cursor: "pointer",
  },
} as const satisfies Record<string, CSSProperties>;

const mobileStyles = {
  tooltip: {
    position: "absolute",
    top: 34,
    left: 24,
    zIndex: 99,
    minWidth: 180,
    maxWidth: 260,
    cursor: "pointer",
  },
  disabledInfo: {
    pointerEvents: "none",
    opacity: 0.65,
  },
} as const satisfies Record<string, CSSProperties>;

const mobileClassNames = {
  title: "text-[12px] font-instrument text-[#4F6175] font-normal",
  number: "text-[28px] font-instrument font-medium text-[#C9E2FF]",
  percent: "text-[12px] font-instrument text-[#239F2E] font-normal",
  time: "text-[12px] font-instrument text-[#4F6175] font-normal mt-1",
} as const;

const createInitialTooltipState = (): TooltipState => ({
  mood: false,
  engagement: false,
});

const useWindowWidth = (defaultWidth = 1200): number => {
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
};

function GrowthTriangle({
  className = "",
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={8}
      height={6}
      className={className}
      style={style}
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="4,1 8,6 0,6" fill={COLORS.positive} />
    </svg>
  );
}

function InfoButton({
  disabled = false,
  onClick,
}: {
  disabled?: boolean;
  onClick: () => void;
}) {
  const handleClick = (): void => {
    if (disabled) {
      return;
    }

    onClick();
  };

  return (
    <span
      className="text-[#90EB43] text-[14px] w-[14px] h-[14px] inline-flex items-center justify-center leading-[14px] cursor-pointer select-none xlm:text-xl xlm:w-auto xlm:h-auto"
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label="Show info"
      style={disabled ? mobileStyles.disabledInfo : {}}
    >
      ⓘ
    </span>
  );
}

function TooltipWrapper({
  title,
  text,
  style,
  onClose,
}: {
  title: DifferenceTitle;
  text: string;
  style: CSSProperties;
  onClose: () => void;
}) {
  return (
    <div
      style={style}
      onClick={onClose}
      tabIndex={0}
      role="button"
      aria-label="Close tooltip"
    >
      <DashboardTooltip title={title} text={text} icon={null} onClose={onClose} />
    </div>
  );
}

function DifferenceValueList({
  differences,
  variant,
}: {
  differences: Difference[];
  variant: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";

  return (
    <>
      {differences.map((difference) => (
        <div
          key={`${difference.label}-${difference.time}`}
          className={
            isDesktop
              ? "flex flex-col items-start"
              : "flex flex-col items-start mb-2"
          }
          style={isDesktop ? { minWidth: 100 } : {}}
        >
          <div className="flex items-center">
            <span
              className={isDesktop ? "" : mobileClassNames.number}
              style={isDesktop ? desktopStyles.number : {}}
            >
              {difference.label}
            </span>

            <GrowthTriangle
              className={isDesktop ? "" : "mx-1"}
              style={
                isDesktop
                  ? {
                      marginLeft: 6,
                      marginRight: 4,
                      display: "inline-block",
                    }
                  : {}
              }
            />

            <span
              className={isDesktop ? "" : mobileClassNames.percent}
              style={isDesktop ? desktopStyles.percent : {}}
            >
              {difference.percent}
            </span>
          </div>

          <span
            className={
              isDesktop
                ? "mt-[10px] block text-left w-full"
                : mobileClassNames.time
            }
            style={isDesktop ? desktopStyles.time : {}}
          >
            {difference.time}
          </span>
        </div>
      ))}
    </>
  );
}

function DesktopDifferencesCard({
  config,
}: {
  config: DifferenceConfig;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const closeTooltip = (): void => {
    setShowTooltip(false);
  };

  const toggleTooltip = (): void => {
    setShowTooltip((currentValue) => !currentValue);
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
        <span style={desktopStyles.header}>{config.title}</span>

        <div className="relative">
          <InfoButton onClick={toggleTooltip} />

          {showTooltip && (
            <TooltipWrapper
              title={config.title}
              text={config.tooltipText}
              style={desktopStyles.tooltip}
              onClose={closeTooltip}
            />
          )}
        </div>
      </div>

      <div className="flex justify-between w-full mt-2">
        <DifferenceValueList differences={config.differences} variant="desktop" />
      </div>
    </div>
  );
}

function MobileDifferencesCard({
  config,
  canShowTooltip,
  showTooltip,
  onToggleTooltip,
  onCloseTooltip,
}: {
  config: DifferenceConfig;
  canShowTooltip: boolean;
  showTooltip: boolean;
  onToggleTooltip: () => void;
  onCloseTooltip: () => void;
}) {
  return (
    <div className="flex-1 bg-[#070D11] rounded-[8px] py-2 px-1 flex flex-col relative">
      <div className="flex items-center justify-between mb-2 relative">
        <span className={mobileClassNames.title}>{config.mobileTitle}</span>

        <InfoButton disabled={!canShowTooltip} onClick={onToggleTooltip} />

        {showTooltip && canShowTooltip && (
          <TooltipWrapper
            title={config.title}
            text={config.tooltipText}
            style={mobileStyles.tooltip}
            onClose={onCloseTooltip}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <DifferenceValueList differences={config.differences} variant="mobile" />
      </div>
    </div>
  );
}

function DifferencesMobile() {
  const windowWidth = useWindowWidth();
  const canShowTooltip = windowWidth >= TABLET_MIN_WIDTH;

  const [tooltipState, setTooltipState] = useState<TooltipState>(
    createInitialTooltipState,
  );

  const toggleTooltip = (type: DifferenceType): void => {
    if (!canShowTooltip) {
      return;
    }

    setTooltipState((currentState) => ({
      ...currentState,
      [type]: !currentState[type],
    }));
  };

  const closeTooltip = (type: DifferenceType): void => {
    setTooltipState((currentState) => ({
      ...currentState,
      [type]: false,
    }));
  };

  return (
    <div className="flex w-full gap-8 relative">
      {DIFFERENCE_CONFIGS.map((config) => (
        <MobileDifferencesCard
          key={config.type}
          config={config}
          canShowTooltip={canShowTooltip}
          showTooltip={tooltipState[config.type]}
          onToggleTooltip={() => toggleTooltip(config.type)}
          onCloseTooltip={() => closeTooltip(config.type)}
        />
      ))}
    </div>
  );
}

export default function DifferencesRows() {
  return (
    <>
      <div className="hidden xlm:flex flex-col gap-4">
        {DIFFERENCE_CONFIGS.map((config) => (
          <DesktopDifferencesCard key={config.type} config={config} />
        ))}
      </div>

      <div className="flex xlm:hidden w-full">
        <DifferencesMobile />
      </div>
    </>
  );
}