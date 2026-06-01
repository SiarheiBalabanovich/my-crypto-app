import type { ComponentType, CSSProperties, SVGProps } from "react";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CheckboxEngagement from "../../../assets/checkbox-engagement.svg?react";
import CheckboxMood from "../../../assets/checkbox-mood.svg?react";
import CheckboxPrice from "../../../assets/checkbox-price.svg?react";
import MoodAiElementIcon from "../../../assets/moodai-element-icon.png";

type ChartSeriesKey = "Mood" | "Price" | "Engagement";

type ChartDataPoint = {
  name: string;
} & Record<ChartSeriesKey, number>;

type LegendItem = {
  icon: ComponentType<SVGProps<SVGSVGElement> & { style?: CSSProperties }>;
  label: ChartSeriesKey;
};

type MoodChartVariant = "desktop" | "mobile";

type MoodChartLayoutConfig = {
  containerClassName: string;
  cardClassName: string;
  cardStyle: CSSProperties;
  headerStyle: CSSProperties;
  titleFontSize: number;
  growthIconSize: number;
  legendIconSize: number;
  chartHeight: number;
  axisWidth: number;
};

type CustomTooltipPayloadItem = {
  dataKey?: unknown;
  value?: unknown;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: CustomTooltipPayloadItem[];
};

type TooltipValues = Partial<Record<ChartSeriesKey, number>>;

const FONT_FAMILY = "Instrument Sans, sans-serif";

const COLORS = {
  label: "#4F6175",
  axisLabel: "#B6C7DC",
  mood: "#41A8FF",
  price: "#FF7C2E",
  engagement: "#7EFB65",
  growth: "#239F2E",
  tooltipBackground: "#141F2C",
} as const;

const GROWTH_PERCENT = "+2.68%";

const DESKTOP_CARD_WIDTH = 680;
const MOBILE_CARD_WIDTH = 342;
const CARD_HORIZONTAL_PADDING = 32;

const CHART_DATA: ChartDataPoint[] = [
  { name: "-4d", Mood: 11, Price: 62, Engagement: 42 },
  { name: "-3d", Mood: 13, Price: 41, Engagement: 52 },
  { name: "-2d", Mood: 32, Price: 53, Engagement: 34 },
  { name: "-1d", Mood: 62, Price: 13, Engagement: 43 },
  { name: "now", Mood: 41, Price: 43, Engagement: 11 },
];

const X_AXIS_LABELS = ["-4d", "-3d", "-2d", "-1d", "now"] as const;

const LEGEND_ITEMS: LegendItem[] = [
  { icon: CheckboxMood, label: "Mood" },
  { icon: CheckboxPrice, label: "Price" },
  { icon: CheckboxEngagement, label: "Engagement" },
];

const SERIES_STYLES: Record<
  ChartSeriesKey,
  {
    stroke: string;
    tooltipFontSize: number;
  }
> = {
  Mood: {
    stroke: COLORS.mood,
    tooltipFontSize: 22,
  },
  Price: {
    stroke: COLORS.price,
    tooltipFontSize: 22,
  },
  Engagement: {
    stroke: COLORS.engagement,
    tooltipFontSize: 24,
  },
};

const TOOLTIP_SERIES_ORDER = ["Engagement", "Mood", "Price"] as const;

const legendTextStyle: CSSProperties = {
  color: "#FFFFFF",
  fontFamily: FONT_FAMILY,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "26px",
};

const axisLabelStyle: CSSProperties = {
  color: COLORS.axisLabel,
  fontFamily: FONT_FAMILY,
  fontWeight: 400,
  fontSize: 17,
  lineHeight: "24px",
  opacity: 0.72,
};

const layoutConfig: Record<MoodChartVariant, MoodChartLayoutConfig> = {
  desktop: {
    containerClassName: "hidden xlm:block w-[680px] h-[400px]",
    cardClassName:
      "bg-[#070D11] rounded-[8px] p-0 relative min-h-[400px] flex flex-col justify-between h-full",
    cardStyle: {},
    headerStyle: {
      marginTop: 20,
      marginLeft: 16,
      marginRight: 24,
      marginBottom: 24,
    },
    titleFontSize: 18,
    growthIconSize: 12,
    legendIconSize: 22,
    chartHeight: 180,
    axisWidth: DESKTOP_CARD_WIDTH - CARD_HORIZONTAL_PADDING,
  },
  mobile: {
    containerClassName: "block xlm:hidden w-full",
    cardClassName: "bg-[#070D11] rounded-[8px] mx-auto flex flex-col",
    cardStyle: {
      maxWidth: MOBILE_CARD_WIDTH,
      minHeight: 300,
      margin: "0 auto",
      padding: 0,
    },
    headerStyle: {
      marginTop: 14,
    },
    titleFontSize: 16,
    growthIconSize: 10,
    legendIconSize: 20,
    chartHeight: 90,
    axisWidth: MOBILE_CARD_WIDTH - CARD_HORIZONTAL_PADDING,
  },
};

const isChartSeriesKey = (value: unknown): value is ChartSeriesKey =>
  value === "Mood" || value === "Price" || value === "Engagement";

const getTooltipValues = (
  payload: CustomTooltipPayloadItem[] | undefined,
): TooltipValues => {
  if (!Array.isArray(payload)) {
    return {};
  }

  const values: TooltipValues = {};

  for (const item of payload) {
    const { dataKey, value } = item;

    if (isChartSeriesKey(dataKey) && typeof value === "number") {
      values[dataKey] = value;
    }
  }

  return values;
};

function GrowthTriangle({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ marginRight: 5, marginBottom: 2 }}
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="4,1 8,6 0,6" fill={color} />
    </svg>
  );
}

function GradientLineXAxis({ width }: { width: number }) {
  return (
    <svg width={width} height="2" style={{ display: "block" }}>
      <defs>
        <linearGradient
          id="xAxisLineGradient"
          x1="0"
          y1="0"
          x2={width}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#798899" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C9E2FF" stopOpacity="1" />
        </linearGradient>
      </defs>

      <line
        x1="0"
        y1="1"
        x2={width}
        y2="1"
        stroke="url(#xAxisLineGradient)"
        strokeWidth="2"
        opacity="0.5"
        style={{ transition: "stroke 0.2s" }}
      />
    </svg>
  );
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active) {
    return null;
  }

  const valuesByKey = getTooltipValues(payload);

  if (Object.keys(valuesByKey).length === 0) {
    return null;
  }

  return (
    <div
      style={{
        background: COLORS.tooltipBackground,
        borderRadius: 12,
        padding: "24px 28px 18px 28px",
        boxShadow: "0 4px 24px 0 #0006",
        minWidth: 170,
        minHeight: 80,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {TOOLTIP_SERIES_ORDER.map((key) => {
        const value = valuesByKey[key];

        if (value === undefined) {
          return null;
        }

        return (
          <div
            key={key}
            style={{
              color: SERIES_STYLES[key].stroke,
              fontWeight: 500,
              fontSize: SERIES_STYLES[key].tooltipFontSize,
              marginBottom: key === "Price" ? 0 : 3,
            }}
          >
            {key} : <span style={{ fontWeight: 400 }}>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

function RechartsChart({ height }: { height: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={CHART_DATA}
        margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
      >
        <XAxis hide />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />

        {LEGEND_ITEMS.map((item) => (
          <Line
            key={item.label}
            type="monotone"
            dataKey={item.label}
            stroke={SERIES_STYLES[item.label].stroke}
            strokeWidth={3}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function MoodChartHeader({ variant }: { variant: MoodChartVariant }) {
  const config = layoutConfig[variant];

  return (
    <div
      className={
        variant === "desktop"
          ? "flex items-center justify-between"
          : "flex items-center"
      }
      style={config.headerStyle}
    >
      <div className="flex items-center">
        <img
          src={MoodAiElementIcon}
          alt="Mood AI Icon"
          width={22}
          height={22}
          style={{ marginRight: 8 }}
        />

        <span
          style={{
            color: COLORS.label,
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: config.titleFontSize,
            lineHeight: "16px",
            marginRight: 8,
          }}
        >
          MOOD AI
        </span>

        <GrowthTriangle size={config.growthIconSize} color={COLORS.growth} />

        <span
          style={{
            color: COLORS.growth,
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: config.titleFontSize,
            lineHeight: "16px",
          }}
        >
          {GROWTH_PERCENT}
        </span>
      </div>

      {variant === "desktop" && <MoodChartLegend variant={variant} />}
    </div>
  );
}

function MoodChartLegend({ variant }: { variant: MoodChartVariant }) {
  const config = layoutConfig[variant];

  return (
    <div className="flex items-center">
      {LEGEND_ITEMS.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex items-center"
            style={{
              marginRight: index !== LEGEND_ITEMS.length - 1 ? 24 : 0,
            }}
          >
            <Icon
              width={config.legendIconSize}
              height={config.legendIconSize}
              style={{ marginRight: 10 }}
            />

            <span style={legendTextStyle}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function XAxisLabels() {
  return (
    <div className="flex justify-between w-full" style={{ marginBottom: 16 }}>
      {X_AXIS_LABELS.map((label) => (
        <span key={label} style={axisLabelStyle}>
          {label}
        </span>
      ))}
    </div>
  );
}

function ChartBody({ variant }: { variant: MoodChartVariant }) {
  const config = layoutConfig[variant];

  return (
    <div className="flex flex-col w-full px-4">
      <div style={{ width: "100%", height: config.chartHeight }}>
        <RechartsChart height={config.chartHeight} />
      </div>

      <div style={{ marginTop: 40, marginBottom: 8 }}>
        <GradientLineXAxis width={config.axisWidth} />
      </div>

      <XAxisLabels />
    </div>
  );
}

function MoodChartCard({ variant }: { variant: MoodChartVariant }) {
  const config = layoutConfig[variant];

  return (
    <div className={config.containerClassName}>
      <div className={config.cardClassName} style={config.cardStyle}>
        <MoodChartHeader variant={variant} />

        {variant === "mobile" && (
          <div className="flex items-center w-full" style={{ marginTop: 20 }}>
            <MoodChartLegend variant={variant} />
          </div>
        )}

        <ChartBody variant={variant} />
      </div>
    </div>
  );
}

export default function MoodChart() {
  return (
    <>
      <MoodChartCard variant="desktop" />
      <MoodChartCard variant="mobile" />
    </>
  );
}