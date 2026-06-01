import MoodAiElementIcon from "../../../assets/moodai-element-icon.png";

// TODO: Replace mock metrics with real API state when backend is ready.

type MetricTrend = {
  value: number;
  positive: boolean;
};

type DashboardMetrics = {
  price: string;
  priceChange: MetricTrend;
  marketCap: string;
  marketCapChange: MetricTrend;
  volume: string;
  volumeChange: MetricTrend;
  fdv: string;
  totalSupply: string;
};

type TrendArrowDirection = "up" | "down";

const METRICS: DashboardMetrics = {
  price: "$0.005",
  priceChange: {
    value: -0.17,
    positive: false,
  },
  marketCap: "$500k",
  marketCapChange: {
    value: -0.17,
    positive: false,
  },
  volume: "$50k",
  volumeChange: {
    value: 6.22,
    positive: true,
  },
  fdv: "$400k",
  totalSupply: "100M",
};

const COLORS = {
  label: "#4F6175",
  value: "#C9E2FF",
  positive: "#239F2E",
  negative: "#CD2A2A",
  divider: "#232F39",
} as const;

const FONT_FAMILY = "Instrument Sans, sans-serif";

const formatPercent = (value: number): string =>
  value > 0 ? `+${value}%` : `${value}%`;

const getTrendColor = (positive: boolean): string =>
  positive ? COLORS.positive : COLORS.negative;

function TrendArrow({
  positive,
  direction = "down",
  size = 14,
  style,
}: {
  positive: boolean;
  direction?: TrendArrowDirection;
  size?: number;
  style?: React.CSSProperties;
}) {
  const points =
    direction === "up"
      ? `${size / 2},2 1,${size - 3} ${size - 1},${size - 3}`
      : `${size / 2},${size - 2} 1,3 ${size - 1},3`;

  return (
    <svg width={size} height={size} style={style}>
      <polygon points={points} fill={getTrendColor(positive)} />
    </svg>
  );
}

function MetricLabel({
  children,
  fontSize = 14,
  marginBottom = 12,
}: {
  children: React.ReactNode;
  fontSize?: number;
  marginBottom?: number;
}) {
  return (
    <div
      style={{
        color: COLORS.label,
        fontSize,
        fontWeight: 400,
        marginBottom,
        fontFamily: FONT_FAMILY,
      }}
    >
      {children}
    </div>
  );
}

function MetricValue({
  children,
  fontSize = 32,
}: {
  children: React.ReactNode;
  fontSize?: number;
}) {
  return (
    <span
      style={{
        color: COLORS.value,
        fontSize,
        fontWeight: 500,
        fontFamily: FONT_FAMILY,
      }}
    >
      {children}
    </span>
  );
}

function MetricTrendValue({
  trend,
  arrowDirection = "down",
  fontSize = 14,
  arrowSize = 14,
  arrowStyle,
}: {
  trend: MetricTrend;
  arrowDirection?: TrendArrowDirection;
  fontSize?: number;
  arrowSize?: number;
  arrowStyle?: React.CSSProperties;
}) {
  return (
    <span className="flex items-center" style={{ alignItems: "center", marginLeft: 8 }}>
      <TrendArrow
        positive={trend.positive}
        direction={arrowDirection}
        size={arrowSize}
        style={arrowStyle ?? { marginLeft: 0, marginRight: 4 }}
      />

      <span
        style={{
          color: getTrendColor(trend.positive),
          fontSize,
          display: "flex",
          alignItems: "center",
          fontFamily: FONT_FAMILY,
        }}
      >
        {formatPercent(trend.value)}
      </span>
    </span>
  );
}

function DesktopDivider({ width = 24 }: { width?: number }) {
  return (
    <>
      <div style={{ width }} />
      <div style={{ width: 1, height: 56, background: COLORS.divider }} />
      <div style={{ width: 24 }} />
    </>
  );
}

function MoodAiLabel({ fontSize = 14 }: { fontSize?: number }) {
  return (
    <div
      className="flex items-center"
      style={{
        color: COLORS.label,
        fontSize,
        fontWeight: 400,
        fontFamily: FONT_FAMILY,
      }}
    >
      <img
        src={MoodAiElementIcon}
        alt="Mood AI Icon"
        width={22}
        height={22}
        style={{ marginRight: 8 }}
      />
      MOOD AI
    </div>
  );
}

function DesktopMetric({
  label,
  value,
  trend,
  arrowDirection = "down",
}: {
  label: string;
  value: string;
  trend?: MetricTrend;
  arrowDirection?: TrendArrowDirection;
}) {
  return (
    <div className="flex flex-col items-start justify-center">
      <MetricLabel>{label}</MetricLabel>

      <div className="flex items-center">
        <MetricValue>{value}</MetricValue>

        {trend && (
          <MetricTrendValue
            trend={trend}
            arrowDirection={arrowDirection}
          />
        )}
      </div>
    </div>
  );
}

function MobileMetric({
  label,
  value,
  trend,
  arrowDirection = "down",
  withNegativeTopMargin = false,
}: {
  label: string;
  value: string;
  trend?: MetricTrend;
  arrowDirection?: TrendArrowDirection;
  withNegativeTopMargin?: boolean;
}) {
  return (
    <div className={withNegativeTopMargin ? "mt-[-12px]" : undefined}>
      <MetricLabel fontSize={12}>{label}</MetricLabel>

      <div className="flex items-center mb-[21px]">
        <MetricValue fontSize={18}>{value}</MetricValue>

        {trend && (
          <>
            <TrendArrow
              positive={trend.positive}
              direction={arrowDirection}
              size={12}
              style={{ marginRight: 2 }}
            />

            <span
              style={{
                color: getTrendColor(trend.positive),
                fontSize: 12,
                fontFamily: FONT_FAMILY,
              }}
            >
              {formatPercent(trend.value)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function DashboardMetricsRow() {
  return (
    <div
      className="w-full flex justify-center items-start bg-[#070D11] px-0 lg:py-5 xlm:py-0"
      style={{ minHeight: 142, margin: 0 }}
    >
      <div
        className="w-full max-w-[1376px] h-[126px] bg-[#070D11] rounded-b-[24px] flex flex-row items-stretch box-border px-0"
        style={{ margin: "0 auto", position: "relative" }}
      >
        <div className="hidden xlm:flex flex-row w-full h-full items-center">
          <div
            className="flex flex-col justify-center items-start px-10 py-0"
            style={{ minWidth: 210, maxWidth: 280 }}
          >
            <div className="mb-6">
              <MoodAiLabel />
            </div>

            <div className="flex items-center" style={{ height: 56 }}>
              <span
                style={{
                  color: COLORS.value,
                  fontWeight: 500,
                  fontSize: 48,
                  lineHeight: "56px",
                  fontFamily: FONT_FAMILY,
                }}
              >
                {METRICS.price}
              </span>

              <span className="flex items-center ml-2" style={{ alignItems: "center" }}>
                <TrendArrow
                  positive={METRICS.priceChange.positive}
                  direction="down"
                  size={14}
                  style={{ marginLeft: 6, marginRight: 4 }}
                />

                <span
                  style={{
                    color: getTrendColor(METRICS.priceChange.positive),
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {formatPercent(METRICS.priceChange.value)}
                </span>
              </span>
            </div>
          </div>

          <DesktopDivider />

          <DesktopMetric
            label="Market cap"
            value={METRICS.marketCap}
            trend={METRICS.marketCapChange}
          />

          <DesktopDivider />

          <DesktopMetric
            label="Volume (24h)"
            value={METRICS.volume}
            trend={METRICS.volumeChange}
            arrowDirection="up"
          />

          <DesktopDivider />

          <DesktopMetric label="FDV" value={METRICS.fdv} />

          <DesktopDivider width={110} />

          <DesktopMetric label="Total supply" value={METRICS.totalSupply} />
        </div>

        <div className="flex xlm:hidden flex-col w-full px-0 py-0">
          <div className="mb-5">
            <MoodAiLabel fontSize={12} />
          </div>

          <div className="flex items-baseline justify-start mb-5">
            <span
              style={{
                color: COLORS.value,
                fontWeight: 500,
                fontSize: 28,
                lineHeight: "24px",
                fontFamily: FONT_FAMILY,
              }}
            >
              {METRICS.price}
            </span>

            <span className="flex items-center ml-2">
              <TrendArrow
                positive={METRICS.priceChange.positive}
                direction="down"
                size={12}
                style={{ marginRight: 2 }}
              />

              <span
                style={{
                  color: getTrendColor(METRICS.priceChange.positive),
                  fontSize: 12,
                  fontFamily: FONT_FAMILY,
                }}
              >
                {formatPercent(METRICS.priceChange.value)}
              </span>
            </span>
          </div>

          <div
            className="flex flex-row w-full mt-2"
            style={{ columnGap: "2rem" }}
          >
            <div className="flex flex-col bg-transparent justify-between rounded-[12px] p-0 min-w-0 w-1/2">
              <MobileMetric
                label="Market cap"
                value={METRICS.marketCap}
                trend={METRICS.marketCapChange}
              />

              <MobileMetric
                label="FDV"
                value={METRICS.fdv}
                withNegativeTopMargin
              />
            </div>

            <div className="flex flex-col bg-transparent justify-between rounded-[12px] p-0 min-w-0 w-1/2">
              <MobileMetric
                label="Volume (24h)"
                value={METRICS.volume}
                trend={METRICS.volumeChange}
                arrowDirection="up"
              />

              <MobileMetric
                label="Total supply"
                value={METRICS.totalSupply}
                withNegativeTopMargin
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}