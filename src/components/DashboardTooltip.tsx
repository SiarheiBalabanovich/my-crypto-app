import { motion } from "framer-motion";

// --- Tooltip props type ---
// TODO Udoop: If you need to render title/text/icon from API, just pass props with dynamic values from backend here.
interface DashboardTooltipProps {
  title: string;
  text: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onClose?: () => void;
}

const DashboardTooltip: React.FC<DashboardTooltipProps> = ({
  title,
  text,
  icon,
  style,
  onClose,
}) => (
  <motion.div
    className="
      absolute
      left-1/2
      -translate-x-1/2
      z-30
      flex
      flex-col
      items-start
      w-[441px] max-w-[90vw]
      px-4 pt-4 pb-4
      rounded-[16px]
      bg-[#0082D9]
      shadow-lg
      border
      border-[#0082D9]
      cursor-pointer
    "
    style={style}
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 32 }}
    transition={{ duration: 1.4, ease: "easeOut" }}
    onClick={() => onClose?.()}
    tabIndex={0}
  >
    <div className="flex items-center gap-2 mb-8 mt-4 w-full relative select-none">
      {icon ? (
        <span className="w-[32px] h-[32px] flex items-center justify-center [&_svg]:w-[32px] [&_svg]:h-[32px]">
          {icon}
        </span>
      ) : (
        <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white/20 text-white text-xl font-bold">
          i
        </span>
      )}
      <span
        className="
          font-instrument
          font-bold
          text-[14px]
          text-[#C9E2FF]
          uppercase
          tracking-[0.1em]
          leading-[16px]
        "
      >
        {title}
      </span>
      {/* Close (X) button */}
      <button
        onClick={e => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute right-0 top-1 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white focus:outline-none"
        tabIndex={0}
        aria-label="Close tooltip"
        type="button"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
          <path d="M3 3L15 15M15 3L3 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
    <span
      className="
        font-instrument
        font-normal
        text-[16px]
        text-white
        leading-[24px]
        w-full
        mb-4
      "
    >
      {text}
    </span>
    {/* Tooltip tail */}
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{ bottom: -16 }}
    >
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
        <path d="M14 16L0 0H28L14 16Z" fill="#0082D9" />
      </svg>
    </div>
  </motion.div>
);

export default DashboardTooltip;