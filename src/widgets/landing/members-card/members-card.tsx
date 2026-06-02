import type { CSSProperties } from "react";

import { ProgressRow } from "../../dashboard/progress-row";

type MembersCardProps = {
  className?: string;
};

type MemberStat = {
  label: string;
  value: number;
  displayValue: string;
};

const MEMBERS_CARD_TITLE = "Members";

const MEMBER_STATS = {
  all: {
    label: "All",
    value: 98_647,
    displayValue: "98,647",
  },
  active: {
    label: "Active",
    value: 67_148,
    displayValue: "67,148",
  },
} as const satisfies Record<string, MemberStat>;

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

// TODO: Replace static member stats with backend/API-driven data when available.

export default function MembersCard({
  className = "",
}: MembersCardProps) {
  return (
    <div
      className={`${cardBaseClassName} ${className}`}
      style={{ minHeight: 154 }}
    >
      <h3 style={titleStyle}>{MEMBERS_CARD_TITLE}</h3>

      <div className="flex flex-col" style={statsListStyle}>
        <ProgressRow
          label={MEMBER_STATS.all.label}
          value={MEMBER_STATS.all.displayValue}
          maxValue={MEMBER_STATS.all.value}
        />

        <ProgressRow
          label={MEMBER_STATS.active.label}
          value={MEMBER_STATS.active.displayValue}
          maxValue={MEMBER_STATS.all.value}
        />
      </div>
    </div>
  );
}