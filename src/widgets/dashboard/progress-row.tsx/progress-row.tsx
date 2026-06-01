import type { CSSProperties } from "react";

type ProgressRowProps = {
  label: string;
  value: string;
  maxValue: number;
};

const DEFAULT_GRADIENT = "linear-gradient(90deg, #070D11 0%, #0082D9 100%)";
const ALL_GRADIENT = "linear-gradient(90deg, #070D11 0%, #00497B 100%)";

const rowTextStyle: CSSProperties = {
  color: "#C9E2FF",
  fontFamily: "Instrument Sans, sans-serif",
  fontWeight: 400,
  fontSize: 10,
  lineHeight: "16px",
};

const parseFormattedNumber = (value: string): number => {
  const numericValue = Number.parseInt(value.replace(/,/g, ""), 10);

  return Number.isNaN(numericValue) ? 0 : numericValue;
};

const getProgressPercent = (value: number, maxValue: number): number => {
  if (maxValue <= 0) {
    return 0;
  }

  const percent = (value / maxValue) * 100;

  return Math.min(Math.max(percent, 0), 100);
};

const getProgressGradient = (label: string): string =>
  label === "All" ? ALL_GRADIENT : DEFAULT_GRADIENT;

export default function ProgressRow({
  label,
  value,
  maxValue,
}: ProgressRowProps) {
  // TODO: Replace static values with backend/API-driven data when available.

  const numericValue = parseFormattedNumber(value);
  const progressPercent = getProgressPercent(numericValue, maxValue);
  const progressGradient = getProgressGradient(label);

  return (
    <div className="flex w-full items-center gap-6" style={{ minHeight: 24 }}>
      <span style={rowTextStyle} className="min-w-[70px] text-left">
        {label}
      </span>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          margin: "0 8px",
          height: 16,
        }}
      >
        <div
          style={{
            height: 16,
            width: `${progressPercent}%`,
            background: progressGradient,
            borderRadius: 8,
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        <span
          style={{
            ...rowTextStyle,
            marginLeft: 8,
            whiteSpace: "nowrap",
            position: "relative",
            left: 0,
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}