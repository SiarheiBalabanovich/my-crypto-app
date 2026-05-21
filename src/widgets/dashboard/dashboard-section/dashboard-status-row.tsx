import Lottie from "lottie-react";
import zzzAnimation from "../assets/sleeping-emoji.json";

// --- TYPE DEFINITIONS ---
type TriangleProps = {
  up: boolean;
  color: string;
};

type StatusItem = {
  label: string;
  value: string;
  icon?: string;
  bigIcon?: boolean;
  valueClass?: string;
  width: number;
  sub?: string;
  subUp?: boolean;
  subColor?: string;
};

// TODO: Replace this array with API data fetched from backend.
const status: StatusItem[] = [
  {
    label: "Mood Assessment",
    value: "Not much going on",
    icon: "😴",
    bigIcon: true,
    valueClass: "#C9E2FF",
    width: 484,
  },
  {
    label: "Mood Score",
    value: "-0.31",
    sub: "-0.17%",
    subUp: false,
    subColor: "#CD2A2A",
    width: 180,
  },
  {
    label: "Engagement Assessment",
    value: "Not much going on",
    icon: "😴",
    bigIcon: false,
    valueClass: "#C9E2FF",
    width: 484,
  },
  {
    label: "Engagement Score",
    value: "0.78",
    sub: "+6.22%",
    subUp: true,
    subColor: "#239F2E",
    width: 180,
  }
];

function Triangle({ up, color }: TriangleProps) {
  return up ? (
    <svg width="14" height="14" style={{ marginRight: 4 }}>
      <polygon points="7,2 1,12 13,12" fill={color} />
    </svg>
  ) : (
    <svg width="14" height="14" style={{ marginRight: 4 }}>
      <polygon points="7,12 1,2 13,2" fill={color} />
    </svg>
  );
}

const DashboardStatusRow: React.FC = () => {
  return (
    <>
      {/* Desktop */}
      <div
        className="hidden xlm:flex"
        style={{
          width: "1376px",
          flexDirection: "row",
          gap: "0px",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        {status.map((item, idx) => (
          <div
            key={item.label}
            style={{
              width: item.width,
              minWidth: item.width,
              maxWidth: item.width,
              height: 126,
              background: "#070D11",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              boxSizing: "border-box",
              position: "relative",
              overflow: "visible"
            }}
          >
            <span
              style={{
                color: "#4F6175",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "26px",
                marginBottom: 24,
                display: "block",
                letterSpacing: 0,
              }}
            >
              {item.label}
            </span>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: item.width === 484 ? 434 : "100%",
                marginLeft: item.width === 484 ? "auto" : undefined,
                marginRight: item.width === 484 ? "auto" : undefined,
                minHeight: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.icon && (
                  <span style={{ fontSize: 20, marginRight: 8, lineHeight: "28px" }}>
                    {item.icon}
                  </span>
                )}
                <span
                  style={{
                    color: "#C9E2FF",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: (idx === 1 || idx === 3) ? 32 : 18,
                    lineHeight: "28px",
                    verticalAlign: "middle",
                  }}
                >
                  {item.value}
                </span>
                {item.sub && (
                  <span style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 8,
                  }}>
                    <Triangle up={!!item.subUp} color={item.subColor || "#CD2A2A"} />
                    <span
                      style={{
                        color: item.subColor || "#CD2A2A",
                        fontFamily: "Instrument Sans, sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: "16px",
                        letterSpacing: 0,
                      }}
                    >
                      {item.sub}
                    </span>
                  </span>
                )}
              </div>
              {item.bigIcon && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 94,
                    transform: "translateY(-17px)",
                  }}
                >
                  <Lottie
                    animationData={zzzAnimation}
                    loop
                    autoplay
                    style={{ width: 94, height: 94, display: "block" }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile & Tablet */}
      <div className="flex flex-col gap-4 xlm:hidden" style={{ width: 342, margin: "0 auto", marginTop: 55 }}>
        <div className="flex gap-2">
          <div
            className="bg-[#070D11] rounded-[16px] flex-1 flex flex-col justify-between p-4"
            style={{ width: 200, minWidth: 0, height: 130 }}
          >
            <span className="text-[#4F6175] font-instrument font-normal text-[12px] leading-[22px] mt-[35px] mb-[20px]">
              Mood Assessment
            </span>
            <div className="flex flex-col items-start">
              <span style={{ fontSize: 20, fontFamily: "Instrument Sans, sans-serif", lineHeight: "20px", marginBottom: 0 }}>😴</span>
              <span
                className="text-[#C9E2FF] font-semibold"
                style={{ fontSize: 15, fontFamily: "Instrument Sans, sans-serif", lineHeight: "20px", marginTop: 0 }}
              >
                Not much going on
              </span>
            </div>
          </div>
          <div
            className="bg-[#070D11] rounded-[16px] flex-1 flex flex-col justify-between p-4"
            style={{ width: 158, minWidth: 0, height: 130 }}
          >
            <span className="text-[#4F6175] font-normal font-instrument text-[12px] leading-[22px] mt-[35px] mb-[35px]">
              Mood Score
            </span>
            <div className="flex items-end">
              <span
                className="text-[#C9E2FF] font-semibold"
                style={{ fontSize: 28, fontFamily: "Instrument Sans, sans-serif", lineHeight: "24px" }}
              >
                -0.31
              </span>
              <span className="flex items-center ml-2" style={{ alignItems: "flex-end" }}>
                <svg width={14} height={14} style={{ marginRight: 4 }}>
                  <polygon points="7,12 1,2 13,2" fill="#CD2A2A" />
                </svg>
                <span
                  className="text-[#CD2A2A]"
                  style={{ fontSize: 12, fontFamily: "Instrument Sans, sans-serif", lineHeight: "14px" }}
                >
                  -0.17%
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className="bg-[#070D11] rounded-[16px] flex-1 flex flex-col justify-between p-4"
            style={{ width: 200, minWidth: 0, height: 130 }}
          >
            <span className="text-[#4F6175] font-normal font-instrument text-[12px] leading-[22px] mb-5">
              Engagement Assessment
            </span>
            <div className="flex flex-col items-start">
              <span style={{ fontSize: 20, fontFamily: "Instrument Sans, sans-serif", lineHeight: "20px", marginBottom: 0 }}>😴</span>
              <span
                className="text-[#C9E2FF] font-semibold"
                style={{ fontSize: 15, fontFamily: "Instrument Sans, sans-serif", lineHeight: "20px", marginTop: 0 }}
              >
                Not much going on
              </span>
            </div>
          </div>
          <div
            className="bg-[#070D11] rounded-[16px] flex-1 flex flex-col justify-between p-4"
            style={{ width: 158, minWidth: 0, height: 130 }}
          >
            <span
              className="text-[#4F6175] font-normal font-instrument text-[12px] leading-[22px] mb-5"
              style={{ whiteSpace: "pre-line" }}
            >
              Engagement{"\n"}Score
            </span>
            <div className="flex items-end">
              <span
                className="text-[#C9E2FF] font-semibold"
                style={{ fontSize: 28, fontFamily: "Instrument Sans, sans-serif", lineHeight: "24px" }}
              >
                0.78
              </span>
              <span className="flex items-center ml-2" style={{ alignItems: "flex-end" }}>
                <svg width={14} height={14} style={{ marginRight: 4 }}>
                  <polygon points="7,2 1,12 13,12" fill="#239F2E" />
                </svg>
                <span
                  className="text-[#239F2E]"
                  style={{ fontSize: 12, fontFamily: "Instrument Sans, sans-serif", lineHeight: "14px" }}
                >
                  +6.22%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStatusRow;