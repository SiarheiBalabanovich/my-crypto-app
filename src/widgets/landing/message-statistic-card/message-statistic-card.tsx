import {
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

type StatisticLabel = "Targeted" | "Botted" | "Spam" | "Admins" | "Other";

type StatisticData = {
  label: StatisticLabel;
  value: number;
  color: string;
  displayValue: string;
};

type NonEmptyStatistics = readonly [
  StatisticData,
  ...StatisticData[],
];

type MessageStatisticCardProps = {
  className?: string;
};

type ChartConfig = {
  size: number;
  stroke: number;
};

type StatisticListVariant = "desktop" | "mobile";

const CARD_TITLE = "Message statistic";
const DEFAULT_SELECTED_LABEL: StatisticLabel = "Spam";
const FONT_FAMILY = "Instrument Sans, sans-serif";

const COLORS = {
  label: "#4F6175",
  value: "#C9E2FF",
  white: "#FFFFFF",
  black: "#000000",
  background: "#070D11",
} as const;

const CHART_CONFIG = {
  desktop: {
    size: 236,
    stroke: 16,
  },
  mobile: {
    size: 139.43,
    stroke: 13,
  },
} as const satisfies Record<StatisticListVariant, ChartConfig>;

const STATISTICS = [
  {
    label: "Targeted",
    value: 70.83,
    color: "#41A23C",
    displayValue: "236,985",
  },
  {
    label: "Botted",
    value: 12.5,
    color: "#C7372F",
    displayValue: "41,825",
  },
  {
    label: "Spam",
    value: 8.33,
    color: "#E8963A",
    displayValue: "29,876",
  },
  {
    label: "Admins",
    value: 5.6,
    color: "#3482D0",
    displayValue: "20,122",
  },
  {
    label: "Other",
    value: 2.74,
    color: "#888888",
    displayValue: "9,231",
  },
] as const satisfies NonEmptyStatistics;

const DEFAULT_STATISTIC = STATISTICS.find(
  (item) => item.label === DEFAULT_SELECTED_LABEL,
) ?? STATISTICS[0];

const titleStyle: CSSProperties = {
  color: COLORS.label,
  fontFamily: FONT_FAMILY,
};

const desktopTitleClassName = "text-[14px] leading-[26px] font-normal mb-6";

const mobileTitleClassName = "text-[14px] leading-[26px] font-normal mb-6";

const getTextColor = (backgroundColor: string): string => {
  const normalizedColor = backgroundColor.toLowerCase();

  return normalizedColor === "#e8963a" || normalizedColor === "#f7931a"
    ? COLORS.black
    : COLORS.white;
};

const findStatisticByLabel = (label: StatisticLabel): StatisticData =>
  STATISTICS.find((item) => item.label === label) ?? DEFAULT_STATISTIC;

const formatPercent = (value: number): string => `${value.toFixed(2)}%`;

const handleKeyboardSelect = (
  event: KeyboardEvent<HTMLDivElement>,
  onSelect: () => void,
): void => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  onSelect();
};

function StatisticColorMarker({ color }: { color: string }) {
  return (
    <span
      className="mr-2 inline-block"
      style={{
        width: 14,
        height: 7,
        borderRadius: 7,
        backgroundColor: color,
      }}
    />
  );
}

function StatisticDesktopItem({
  item,
  activeItem,
  isLast,
  onSelect,
}: {
  item: StatisticData;
  activeItem: StatisticData;
  isLast: boolean;
  onSelect: () => void;
}) {
  const isActive = item.label === activeItem.label;
  const activeTextColor = getTextColor(activeItem.color);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onSelect}
      onKeyDown={(event) => handleKeyboardSelect(event, onSelect)}
      className="flex items-center justify-between font-normal text-[10px] leading-[16px] cursor-pointer outline-none transition-all"
      style={{
        color: isActive ? activeTextColor : COLORS.value,
        fontFamily: FONT_FAMILY,
        background: isActive ? activeItem.color : "transparent",
        borderRadius: isActive ? 80 : 0,
        height: isActive ? 40 : "auto",
        minHeight: 24,
        padding: isActive ? "0 24px" : "0",
        boxShadow: isActive ? `0 2px 8px 0 ${activeItem.color}1A` : "none",
        marginBottom: isLast ? 0 : 8,
      }}
    >
      {isActive ? (
        <div className="flex w-full items-center justify-between">
          <span>{item.label}</span>

          <span style={{ display: "flex", alignItems: "center" }}>
            <span>{item.displayValue}</span>
            <span style={{ width: 6, display: "inline-block" }} />
            <span>{formatPercent(item.value)}</span>
          </span>
        </div>
      ) : (
        <>
          <div className="flex items-center" style={{ gap: 6 }}>
            <StatisticColorMarker color={item.color} />
            <span>{item.label}</span>
          </div>

          <span>{formatPercent(item.value)}</span>
        </>
      )}
    </div>
  );
}

const getMobileActiveWidth = (label: StatisticLabel): number =>
  label === "Targeted" ? 134 : 111.37;

function StatisticMobileItem({
  item,
  activeItem,
  isLast,
  onSelect,
}: {
  item: StatisticData;
  activeItem: StatisticData;
  isLast: boolean;
  onSelect: () => void;
}) {
  const isActive = item.label === activeItem.label;

  if (isActive) {
    return (
      <div
        tabIndex={0}
        role="button"
        onClick={onSelect}
        onKeyDown={(event) => handleKeyboardSelect(event, onSelect)}
        className="flex items-center justify-between cursor-pointer outline-none transition-all"
        style={{
          background: activeItem.color,
          color: getTextColor(activeItem.color),
          borderRadius: "70px",
          width: getMobileActiveWidth(item.label),
          height: 36.05,
          padding: "10px 7px",
          fontFamily: FONT_FAMILY,
          fontSize: 8,
          fontWeight: 400,
          lineHeight: "14px",
          marginBottom: isLast ? 0 : 8,
        }}
      >
        <span style={{ marginRight: 11 }}>{item.label}</span>
        <span style={{ marginRight: 11 }}>{item.displayValue}</span>
        <span>{formatPercent(item.value)}</span>
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onSelect}
      onKeyDown={(event) => handleKeyboardSelect(event, onSelect)}
      className="flex items-center justify-between font-normal text-[10px] leading-[16px] cursor-pointer outline-none transition-all"
      style={{
        color: COLORS.value,
        fontFamily: FONT_FAMILY,
        background: "transparent",
        borderRadius: 0,
        height: 24,
        minHeight: 24,
        marginBottom: isLast ? 0 : 8,
        fontSize: 10,
        lineHeight: "16px",
        padding: 0,
      }}
    >
      <div className="flex items-center" style={{ gap: 6 }}>
        <StatisticColorMarker color={item.color} />
        <span>{item.label}</span>
      </div>

      <span>{formatPercent(item.value)}</span>
    </div>
  );
}

function StatisticList({
  variant,
  activeItem,
  onSelect,
}: {
  variant: StatisticListVariant;
  activeItem: StatisticData;
  onSelect: (label: StatisticLabel) => void;
}) {
  const isDesktop = variant === "desktop";

  return (
    <>
      <h3
        className={isDesktop ? desktopTitleClassName : mobileTitleClassName}
        style={titleStyle}
      >
        {CARD_TITLE}
      </h3>

      {STATISTICS.map((item, index) => {
        const isLast = index === STATISTICS.length - 1;

        if (isDesktop) {
          return (
            <StatisticDesktopItem
              key={item.label}
              item={item}
              activeItem={activeItem}
              isLast={isLast}
              onSelect={() => onSelect(item.label)}
            />
          );
        }

        return (
          <StatisticMobileItem
            key={item.label}
            item={item}
            activeItem={activeItem}
            isLast={isLast}
            onSelect={() => onSelect(item.label)}
          />
        );
      })}
    </>
  );
}

function StatisticChartArcs({
  activeItem,
  config,
}: {
  activeItem: StatisticData;
  config: ChartConfig;
}) {
  const circumference = Math.PI * (config.size - config.stroke);
  let startOffset = 0;

  return (
    <>
      {STATISTICS.map((item) => {
        const arcLength = (item.value / 100) * circumference;
        const isActive = item.label === activeItem.label;

        const arc = (
          <circle
            key={item.label}
            r={(config.size - config.stroke) / 2}
            cx={config.size / 2}
            cy={config.size / 2}
            stroke={item.color}
            strokeWidth={config.stroke}
            fill="none"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeDashoffset={-startOffset}
            style={{
              transition: "stroke-dasharray 0.5s, opacity 0.2s",
              opacity: isActive ? 1 : 0.32,
            }}
          />
        );

        startOffset += arcLength;

        return arc;
      })}
    </>
  );
}

function ChartCenterContent({
  activeItem,
  variant,
}: {
  activeItem: StatisticData;
  variant: StatisticListVariant;
}) {
  const isDesktop = variant === "desktop";

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: isDesktop ? "100%" : 139.43,
        height: isDesktop ? "100%" : 139.43,
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
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: isDesktop ? 32 : 22,
            color: COLORS.white,
            lineHeight: isDesktop ? "48px" : "30px",
          }}
        >
          {activeItem.displayValue}
        </span>

        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: isDesktop ? 14 : 11,
            color: COLORS.white,
            lineHeight: isDesktop ? "16px" : "14px",
            marginLeft: isDesktop ? 8 : 6,
          }}
        >
          {formatPercent(activeItem.value)}
        </span>
      </div>

      <span
        style={{
          color: COLORS.value,
          fontFamily: FONT_FAMILY,
          fontSize: isDesktop ? 14 : 11,
          lineHeight: isDesktop ? "16px" : "14px",
          marginTop: isDesktop ? 12 : 8,
        }}
      >
        {activeItem.label}
      </span>
    </div>
  );
}

function StatisticDonutChart({
  activeItem,
  variant,
}: {
  activeItem: StatisticData;
  variant: StatisticListVariant;
}) {
  const config = CHART_CONFIG[variant];
  const isDesktop = variant === "desktop";

  return (
    <div
      style={{
        width: config.size,
        height: config.size,
        position: "relative",
        display: isDesktop ? "block" : "flex",
        alignItems: isDesktop ? "stretch" : "center",
        justifyContent: isDesktop ? "flex-start" : "center",
        marginTop: isDesktop ? 0 : 21,
      }}
    >
      <svg
        viewBox={`0 0 ${config.size} ${config.size}`}
        style={{
          width: isDesktop ? "100%" : config.size,
          height: isDesktop ? "100%" : config.size,
          transform: "rotate(-90deg)",
        }}
      >
        <StatisticChartArcs activeItem={activeItem} config={config} />
      </svg>

      <ChartCenterContent activeItem={activeItem} variant={variant} />
    </div>
  );
}

function DesktopMessageStatisticCard({
  activeItem,
  onSelect,
  className,
}: {
  activeItem: StatisticData;
  onSelect: (label: StatisticLabel) => void;
  className: string;
}) {
  return (
    <div
      className={`hidden xlm:flex bg-[#070D11] rounded-[8px] w-[484px] h-[284px] flex-row pt-[24px] pr-6 pb-6 box-border ${className}`}
      style={{ marginLeft: -24 }}
    >
      <div className="flex flex-col flex-none w-[180px] min-w-0">
        <StatisticList
          variant="desktop"
          activeItem={activeItem}
          onSelect={onSelect}
        />
      </div>

      <div style={{ width: 48, minWidth: 48, maxWidth: 48 }} />

      <div
        className="flex-1 flex items-center justify-center min-w-0"
        style={{
          minWidth: CHART_CONFIG.desktop.size,
          minHeight: CHART_CONFIG.desktop.size,
        }}
      >
        <StatisticDonutChart activeItem={activeItem} variant="desktop" />
      </div>
    </div>
  );
}

function MobileMessageStatisticCard({
  activeItem,
  onSelect,
  className,
}: {
  activeItem: StatisticData;
  onSelect: (label: StatisticLabel) => void;
  className: string;
}) {
  return (
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
        <StatisticList
          variant="mobile"
          activeItem={activeItem}
          onSelect={onSelect}
        />
      </div>

      <div style={{ width: 21, minWidth: 21, maxWidth: 21 }} />

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
        <StatisticDonutChart activeItem={activeItem} variant="mobile" />
      </div>
    </div>
  );
}

export default function MessageStatisticCard({
  className = "",
}: MessageStatisticCardProps) {
  const [selectedLabel, setSelectedLabel] = useState<StatisticLabel>(
    DEFAULT_SELECTED_LABEL,
  );

  const activeItem = useMemo(
    () => findStatisticByLabel(selectedLabel),
    [selectedLabel],
  );

  return (
    <>
      <DesktopMessageStatisticCard
        activeItem={activeItem}
        onSelect={setSelectedLabel}
        className={className}
      />

      <MobileMessageStatisticCard
        activeItem={activeItem}
        onSelect={setSelectedLabel}
        className={className}
      />
    </>
  );
}