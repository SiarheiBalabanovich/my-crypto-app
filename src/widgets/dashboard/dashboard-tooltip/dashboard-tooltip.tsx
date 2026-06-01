import type { CSSProperties, MouseEvent, ReactNode } from "react";

type DashboardTooltipProps = {
  title: string;
  text: string;
  icon?: ReactNode;
  style?: CSSProperties | undefined;
  onClose?: (() => void) | undefined;
};

// TODO: Pass backend-driven tooltip title/text/icon through props when API is ready.

const TOOLTIP_COLOR = "#0082D9";

const DEFAULT_TOOLTIP_STYLE: CSSProperties = {};

function DefaultInfoIcon() {
  return (
    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white">
      i
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <path
        d="M3 3L15 15M15 3L3 15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TooltipTail() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{ bottom: -16 }}
    >
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
        <path d="M14 16L0 0H28L14 16Z" fill={TOOLTIP_COLOR} />
      </svg>
    </div>
  );
}

export default function DashboardTooltip({
  title,
  text,
  icon,
  style = DEFAULT_TOOLTIP_STYLE,
  onClose,
}: DashboardTooltipProps) {
  const handleClose = (): void => {
    onClose?.();
  };

  const handleCloseButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ): void => {
    event.stopPropagation();
    handleClose();
  };

  return (
    <div
      className="
        absolute
        left-1/2
        z-30
        flex
        w-[441px]
        max-w-[90vw]
        -translate-x-1/2
        cursor-pointer
        flex-col
        items-start
        rounded-[16px]
        border
        border-[#0082D9]
        bg-[#0082D9]
        px-4
        pt-4
        pb-4
        shadow-lg
      "
      style={style}
      onClick={handleClose}
      tabIndex={0}
    >
      <div className="relative mt-4 mb-8 flex w-full select-none items-center gap-2">
        {icon ? (
          <span className="flex h-[32px] w-[32px] items-center justify-center [&_svg]:h-[32px] [&_svg]:w-[32px]">
            {icon}
          </span>
        ) : (
          <DefaultInfoIcon />
        )}

        <span
          className="
            font-instrument
            text-[14px]
            font-bold
            leading-[16px]
            tracking-[0.1em]
            text-[#C9E2FF]
            uppercase
          "
        >
          {title}
        </span>

        <button
          type="button"
          onClick={handleCloseButtonClick}
          className="absolute right-0 top-1 flex h-8 w-8 items-center justify-center text-white/80 hover:text-white focus:outline-none"
          tabIndex={0}
          aria-label="Close tooltip"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </button>
      </div>

      <span
        className="
          mb-4
          w-full
          font-instrument
          text-[16px]
          font-normal
          leading-[24px]
          text-white
        "
      >
        {text}
      </span>

      <TooltipTail />
    </div>
  );
}