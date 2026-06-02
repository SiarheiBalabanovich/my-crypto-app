import type { CSSProperties } from "react";

import LockIcon from "../../../assets/lock.svg?react";

// TODO: Replace static notification state with backend/API-driven data when ready.

type GetNotifiedVariant = "desktop" | "mobile";

type LayoutConfig = {
  containerClassName: string;
  containerStyle: CSSProperties;
  titleClassName: string;
  titleStyle: CSSProperties;
  contentClassName: string;
  contentStyle: CSSProperties;
  statusClassName: string;
  statusStyle: CSSProperties;
  iconWrapperStyle?: CSSProperties;
};

const TITLE = "Get Notified";
const STATUS_TEXT = "Coming Soon";

const LOCK_ICON_SIZE = 48;

const layoutConfig: Record<GetNotifiedVariant, LayoutConfig> = {
  desktop: {
    containerClassName: "hidden flex-col rounded-[8px] bg-[#070D11] xlm:flex",
    containerStyle: {
      width: 180,
      height: 400,
    },
    titleClassName:
      "text-[#4F6175] text-[14px] font-normal leading-none font-[Instrument Sans]",
    titleStyle: {
      marginTop: 24,
      marginLeft: 24,
      textAlign: "left",
    },
    contentClassName: "flex flex-col items-center justify-center",
    contentStyle: {
      marginTop: 94,
    },
    statusClassName:
      "text-[#4F6175] text-[16px] font-medium leading-[28px] font-[Instrument Sans]",
    statusStyle: {
      marginTop: 16,
    },
  },
  mobile: {
    containerClassName: "flex flex-col rounded-[8px] bg-[#070D11] xlm:hidden",
    containerStyle: {
      width: 299,
      height: 128,
      margin: "0 auto",
      padding: 0,
    },
    titleClassName:
      "text-[#4F6175] text-[12px] font-instrument font-normal leading-none",
    titleStyle: {
      marginTop: 21,
      marginLeft: 14,
      textAlign: "left",
    },
    contentClassName: "flex flex-row items-center justify-center",
    contentStyle: {
      marginTop: 21,
      marginBottom: 50,
      width: 271,
      height: 86,
      marginLeft: 14,
      marginRight: 14,
    },
    statusClassName:
      "text-[#4F6175] text-[14px] font-instrument font-medium leading-[24px]",
    statusStyle: {
      marginTop: 0,
      marginLeft: 0,
      textAlign: "left",
    },
    iconWrapperStyle: {
      width: 48,
      height: 48,
      marginRight: 16,
    },
  },
};

function LockBadge({
  style = {},
}: {
  style?: CSSProperties;
}) {
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#232B35]"
      style={style}
    >
      <LockIcon width={LOCK_ICON_SIZE} height={LOCK_ICON_SIZE} />
    </div>
  );
}

function GetNotifiedCard({
  variant,
}: {
  variant: GetNotifiedVariant;
}) {
  const config = layoutConfig[variant];

  return (
    <div className={config.containerClassName} style={config.containerStyle}>
      <div className={config.titleClassName} style={config.titleStyle}>
        {TITLE}
      </div>

      <div className={config.contentClassName} style={config.contentStyle}>
        <LockBadge style={config.iconWrapperStyle ?? {}} />

        <div className={config.statusClassName} style={config.statusStyle}>
          {STATUS_TEXT}
        </div>
      </div>
    </div>
  );
}

export default function GetNotifiedRow() {
  return (
    <>
      <GetNotifiedCard variant="desktop" />
      <GetNotifiedCard variant="mobile" />
    </>
  );
}