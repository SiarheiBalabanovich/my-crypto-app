type SpinnerIconProps = {
  size?: number;
  title?: string;
  className?: string;
};

const DEFAULT_SPINNER_SIZE = 56;
const VIEW_BOX_SIZE = 56;

export default function SpinnerIcon({
  size = DEFAULT_SPINNER_SIZE,
  title = "Loading",
  className = "",
}: SpinnerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      fill="none"
      className={`animate-spin ${className}`}
      style={{ display: "block" }}
      role="status"
      aria-label={title}
    >
      <circle
        cx="28"
        cy="28"
        r="22"
        stroke="#C9E2FF33"
        strokeWidth={7}
        fill="none"
      />

      <g stroke="#C9E2FF" strokeWidth={4} strokeLinecap="round">
        <line x1="28" y1="6" x2="28" y2="15" />
        <line x1="28" y1="41" x2="28" y2="50" />
        <line x1="6" y1="28" x2="15" y2="28" />
        <line x1="41" y1="28" x2="50" y2="28" />
        <line x1="13.8" y1="13.8" x2="20.4" y2="20.4" />
        <line x1="35.6" y1="35.6" x2="42.2" y2="42.2" />
        <line x1="13.8" y1="42.2" x2="20.4" y2="35.6" />
        <line x1="35.6" y1="20.4" x2="42.2" y2="13.8" />
      </g>
    </svg>
  );
}