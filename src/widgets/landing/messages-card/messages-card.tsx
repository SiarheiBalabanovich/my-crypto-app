import type { CSSProperties } from "react";

import { ProgressRow } from "../../dashboard/progress-row";

type MessagesCardProps = {
  className?: string;
};

type MessagesStats = {
  label: string;
  value: number;
  displayValue: string;
  maxValue: number;
};

const CARD_TITLE = "Total messages analysis";

const MESSAGE_STATS = {
  label: "Messages",
  value: 557_261,
  displayValue: "557,261",
  maxValue: 1_000_000,
} as const satisfies MessagesStats;

const titleStyle: CSSProperties = {
  color: "#4F6175",
  fontFamily: "Instrument Sans, sans-serif",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "26px",
};

const cardBaseClassName = `
  bg-[#070D11]
  rounded-[8px]
  w-[876px]
  flex
  flex-col
  p-6
  pl-6
  max-[639px]:pl-0
`;

const statsListStyle: CSSProperties = {
  marginTop: 24,
  gap: 24,
};

// TODO: Replace static message stats with backend/API-driven data when available.

export default function MessagesCard({
  className = "",
}: MessagesCardProps) {
  return (
    <div
      className={`${cardBaseClassName} ${className}`}
      style={{ minHeight: 114 }}
    >
      <h3 style={titleStyle}>{CARD_TITLE}</h3>

      <div className="flex flex-col" style={statsListStyle}>
        <ProgressRow
          label={MESSAGE_STATS.label}
          value={MESSAGE_STATS.displayValue}
          maxValue={MESSAGE_STATS.maxValue}
        />
      </div>
    </div>
  );
}