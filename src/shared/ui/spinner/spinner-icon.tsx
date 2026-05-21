type SpinnerIconProps = {
  size?: number;
};

export default function SpinnerIcon({ size = 56 }: SpinnerIconProps) {
  // TODO: If you want to show spinner only during backend loading,

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      className="animate-spin"
      style={{ display: "block" }}
      aria-label="Loading"
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