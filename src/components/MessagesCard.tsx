import ProgressRow from "./ProgressRow";

type MessagesCardProps = {
  className?: string;
};

type MessagesStats = {
  label: string;
  value: number;
  displayValue: string;
  maxValue: number;
};

const titleStyle: React.CSSProperties = {
  color: "#4F6175",
  fontFamily: "Instrument Sans, sans-serif",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "26px",
};

const MessagesCard: React.FC<MessagesCardProps> = ({ className = "" }) => {
  // TODO: Replace these static values with backend data in production
  const messagesStats: MessagesStats = {
    label: "Messages",
    value: 557261,
    displayValue: "557,261",
    maxValue: 1000000,
  };

  return (
    <div
      className={`
        bg-[#070D11]
        rounded-[8px]
        w-[876px]
        flex flex-col
        p-6
        pl-6
        max-[639px]:pl-0
        ${className}
      `}
      style={{ minHeight: 114 }}
    >
      <h3 style={titleStyle}>Total messages analysis</h3>
      <div className="flex flex-col" style={{ marginTop: 24, gap: 24 }}>
        {/* TODO: Pass backend values here when available */}
        <ProgressRow
          label={messagesStats.label}
          value={messagesStats.displayValue}
          maxValue={messagesStats.maxValue}
        />
      </div>
    </div>
  );
};

export default MessagesCard;