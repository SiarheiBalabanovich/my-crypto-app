import ProgressRow from "./ProgressRow";

// Props type
type MembersCardProps = {
  className?: string;
};

// TODO: Data type for ProgressRow, if backend integration is needed
type MemberStats = {
  label: string;
  value: number;
  displayValue: string;
};

const titleStyle: React.CSSProperties = {
  color: "#4F6175",
  fontFamily: "Instrument Sans, sans-serif",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "26px",
};

const MembersCard: React.FC<MembersCardProps> = ({ className = "" }) => {
  // TODO: Replace these values with backend data once available
  const allMembers: MemberStats = {
    label: "All",
    value: 98647,
    displayValue: "98,647",
  };
  const activeMembers: MemberStats = {
    label: "Active",
    value: 67148,
    displayValue: "67,148",
  };

  return (
    <div
      className={`
        bg-[#070D11]
        rounded-[8px]
        flex flex-col
        p-6
        pl-6
        max-[639px]:pl-0
        ${className}
      `}
      style={{ minHeight: 154 }}
    >
      <h3 style={titleStyle}>Members</h3>
      <div className="flex flex-col" style={{ marginTop: 24, gap: 24 }}>
        {/* TODO: Pass backend values for real stats */}
        <ProgressRow label={allMembers.label} value={allMembers.displayValue} maxValue={allMembers.value} />
        <ProgressRow label={activeMembers.label} value={activeMembers.displayValue} maxValue={allMembers.value} />
      </div>
    </div>
  );
};

export default MembersCard;