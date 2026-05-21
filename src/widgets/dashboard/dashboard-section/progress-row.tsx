type ProgressRowProps = {
  label: string;
  value: string;
  maxValue: number;
};

const rowTextStyle: React.CSSProperties = {
  color: "#C9E2FF",
  fontFamily: "Instrument Sans, sans-serif",
  fontWeight: 400,
  fontSize: 10,
  lineHeight: "16px",
};

const ProgressRow: React.FC<ProgressRowProps> = ({ label, value, maxValue }) => {
  // Parse formatted value string into a number
  const numericValue = parseInt(value.replace(/,/g, ""), 10);
  // Calculate progress percent
  const percent = maxValue > 0 ? (numericValue / maxValue) * 100 : 0;

  // Set gradient style based on label
  let gradient = "linear-gradient(90deg, #070D11 0%, #0082D9 100%)";
  if (label === "All") gradient = "linear-gradient(90deg, #070D11 0%, #00497B 100%)";

  // TODO: Make 'value' and 'maxValue' dynamic, fetched from backend/API

  return (
    <div className="flex items-center w-full gap-6" style={{ minHeight: 24 }}>
      <span style={rowTextStyle} className="min-w-[70px] text-left">{label}</span>
      <div style={{ flex: 1, display: "flex", alignItems: "center", margin: "0 8px", height: 16 }}>
        <div
          style={{
            height: 16,
            width: `${percent}%`,
            background: gradient,
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
};

export default ProgressRow;