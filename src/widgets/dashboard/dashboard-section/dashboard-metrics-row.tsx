import MoodAiElementIcon from "../assets/moodai-element-icon.png";

export default function DashboardMetricsRow() {
  // TODO: Example. Replace these values below with real API state.
  const metrics = {
    price: "$0.005",
    priceChange: -0.17,
    priceChangePositive: false,
    marketCap: "$500k",
    marketCapChange: -0.17,
    marketCapPositive: false,
    volume: "$50k",
    volumeChange: 6.22,
    volumePositive: true,
    fdv: "$400k",
    totalSupply: "100M",
  };

  return (
    <div
      className="w-full flex justify-center items-start bg-[#070D11] px-0 lg:py-5 xlm:py-0"
      style={{ minHeight: 142, margin: 0 }}
    >
      <div
        className="w-full max-w-[1376px] h-[126px] bg-[#070D11] rounded-b-[24px] flex flex-row items-stretch box-border px-0"
        style={{ margin: "0 auto", position: "relative" }}
      >
        {/* DESKTOP */}
        <div className="hidden xlm:flex flex-row w-full h-full items-center">
          <div
            className="flex flex-col justify-center items-start px-10 py-0"
            style={{ minWidth: 210, maxWidth: 280 }}
          >
            <div
              className="flex items-center mb-6"
              style={{ color: "#4F6175", fontSize: 14, fontWeight: 400 }}
            >
              <img
                src={MoodAiElementIcon}
                alt="Mood AI Icon"
                width={22}
                height={22}
                style={{ marginRight: 8 }}
              />
              MOOD AI
            </div>
            <div className="flex items-center" style={{ height: 56 }}>
              <span
                style={{
                  color: "#C9E2FF",
                  fontWeight: 500,
                  fontSize: 48,
                  lineHeight: "56px",
                  fontFamily: "Instrument Sans, sans-serif",
                }}
              >
                {metrics.price}
              </span>
              <span className="flex items-center ml-2" style={{ alignItems: "center" }}>
                <svg width={14} height={14} style={{ marginLeft: 6, marginRight: 4 }}>
                  <polygon
                    points="7,12 1,3 13,3"
                    fill={metrics.priceChangePositive ? "#239F2E" : "#CD2A2A"}
                  />
                </svg>
                <span
                  style={{
                    color: metrics.priceChangePositive ? "#239F2E" : "#CD2A2A",
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {metrics.priceChange > 0
                    ? `+${metrics.priceChange}%`
                    : `${metrics.priceChange}%`}
                </span>
              </span>
            </div>
          </div>

          {/* --- Divider --- */}
          <div style={{ width: 24 }} />
          <div style={{ width: 1, height: 56, background: "#232F39" }} />
          <div style={{ width: 24 }} />

          {/* Market cap */}
          <div className="flex flex-col justify-center items-start">
            <div
              style={{
                color: "#4F6175",
                fontSize: 14,
                fontWeight: 400,
                marginBottom: 12,
              }}
            >
              Market cap
            </div>
            <div className="flex items-center">
              <span
                style={{
                  color: "#C9E2FF",
                  fontSize: 32,
                  fontWeight: 500,
                  fontFamily: "Instrument Sans, sans-serif",
                }}
              >
                {metrics.marketCap}
              </span>
              <span
                className="flex items-center"
                style={{ alignItems: "center", marginLeft: 8 }}
              >
                <svg width={14} height={14} style={{ marginLeft: 0, marginRight: 4 }}>
                  <polygon
                    points="7,12 1,3 13,3"
                    fill={metrics.marketCapPositive ? "#239F2E" : "#CD2A2A"}
                  />
                </svg>
                <span
                  style={{
                    color: metrics.marketCapPositive ? "#239F2E" : "#CD2A2A",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {metrics.marketCapChange > 0
                    ? `+${metrics.marketCapChange}%`
                    : `${metrics.marketCapChange}%`}
                </span>
              </span>
            </div>
          </div>

          {/* --- Divider --- */}
          <div style={{ width: 24 }} />
          <div style={{ width: 1, height: 56, background: "#232F39" }} />
          <div style={{ width: 24 }} />

          {/* Volume (24h) */}
          <div className="flex flex-col justify-center items-start">
            <div
              style={{
                color: "#4F6175",
                fontSize: 14,
                fontWeight: 400,
                marginBottom: 12,
              }}
            >
              Volume (24h)
            </div>
            <div className="flex items-center">
              <span
                style={{
                  color: "#C9E2FF",
                  fontSize: 32,
                  fontWeight: 500,
                  fontFamily: "Instrument Sans, sans-serif",
                }}
              >
                {metrics.volume}
              </span>
              <span
                className="flex items-center"
                style={{ alignItems: "center", marginLeft: 8 }}
              >
                <svg width={14} height={14} style={{ marginLeft: 0, marginRight: 4 }}>
                  <polygon
                    points="7,2 1,11 13,11"
                    fill={metrics.volumePositive ? "#239F2E" : "#CD2A2A"}
                  />
                </svg>
                <span
                  style={{
                    color: metrics.volumePositive ? "#239F2E" : "#CD2A2A",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {metrics.volumeChange > 0
                    ? `+${metrics.volumeChange}%`
                    : `${metrics.volumeChange}%`}
                </span>
              </span>
            </div>
          </div>

          {/* --- Divider --- */}
          <div style={{ width: 24 }} />
          <div style={{ width: 1, height: 56, background: "#232F39" }} />
          <div style={{ width: 24 }} />

          {/* FDV */}
          <div className="flex flex-col justify-center items-start">
            <div
              style={{
                color: "#4F6175",
                fontSize: 14,
                fontWeight: 400,
                marginBottom: 12,
              }}
            >
              FDV
            </div>
            <div className="flex items-center">
              <span
                style={{
                  color: "#C9E2FF",
                  fontSize: 32,
                  fontWeight: 500,
                  fontFamily: "Instrument Sans, sans-serif",
                }}
              >
                {metrics.fdv}
              </span>
            </div>
          </div>

          {/* --- Divider --- */}
          <div style={{ width: 110 }} />
          <div style={{ width: 1, height: 56, background: "#232F39" }} />
          <div style={{ width: 24 }} />

          {/* Total supply */}
          <div className="flex flex-col justify-center items-start">
            <div
              style={{
                color: "#4F6175",
                fontSize: 14,
                fontWeight: 400,
                marginBottom: 12,
              }}
            >
              Total supply
            </div>
            <div className="flex items-center">
              <span
                style={{
                  color: "#C9E2FF",
                  fontSize: 32,
                  fontWeight: 500,
                  fontFamily: "Instrument Sans, sans-serif",
                }}
              >
                {metrics.totalSupply}
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET */}
        <div className="flex xlm:hidden flex-col w-full px-0 py-0">
          <div className="flex items-center mb-5">
            <img
              src={MoodAiElementIcon}
              alt="Mood AI Icon"
              width={22}
              height={22}
              style={{ marginRight: 8 }}
            />
            <span
              style={{
                color: "#4F6175",
                fontSize: 12,
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 400,
              }}
            >
              MOOD AI
            </span>
          </div>
          <div className="flex items-baseline justify-start mb-5">
            <span
              style={{
                color: "#C9E2FF",
                fontWeight: 500,
                fontSize: 28,
                lineHeight: "24px",
                fontFamily: "Instrument Sans, sans-serif",
              }}
            >
              {metrics.price}
            </span>
            <span className="flex items-center ml-2">
              <svg width={12} height={12} style={{ marginRight: 2 }}>
                <polygon
                  points="6,10 1,2 11,2"
                  fill={metrics.priceChangePositive ? "#239F2E" : "#CD2A2A"}
                />
              </svg>
              <span
                style={{
                  color: metrics.priceChangePositive ? "#239F2E" : "#CD2A2A",
                  fontSize: 12,
                  fontFamily: "Instrument Sans, sans-serif",
                }}
              >
                {metrics.priceChange > 0
                  ? `+${metrics.priceChange}%`
                  : `${metrics.priceChange}%`}
              </span>
            </span>
          </div>
          <div
            className="flex flex-row w-full mt-2"
            style={{
              columnGap: "2rem",
            }}
          >
            <div className="flex flex-col bg-transparent justify-between rounded-[12px] p-0 min-w-0 w-1/2">
              <div>
                <div
                  style={{
                    color: "#4F6175",
                    fontSize: 12,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    marginBottom: 12,
                  }}
                >
                  Market cap
                </div>
                <div className="flex items-center mb-[21px]">
                  <span
                    style={{
                      color: "#C9E2FF",
                      fontSize: 18,
                      fontFamily: "Instrument Sans, sans-serif",
                      fontWeight: 500,
                      marginRight: 6,
                    }}
                  >
                    {metrics.marketCap}
                  </span>
                  <svg width={12} height={12} style={{ marginRight: 2 }}>
                    <polygon
                      points="6,10 1,2 11,2"
                      fill={metrics.marketCapPositive ? "#239F2E" : "#CD2A2A"}
                    />
                  </svg>
                  <span
                    style={{
                      color: metrics.marketCapPositive ? "#239F2E" : "#CD2A2A",
                      fontSize: 12,
                      fontFamily: "Instrument Sans, sans-serif",
                    }}
                  >
                    {metrics.marketCapChange > 0
                      ? `+${metrics.marketCapChange}%`
                      : `${metrics.marketCapChange}%`}
                  </span>
                </div>
              </div>
              <div className="mt-[-12px]">
                <div
                  style={{
                    color: "#4F6175",
                    fontSize: 12,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    marginBottom: 12,
                  }}
                >
                  FDV
                </div>
                <span
                  style={{
                    color: "#C9E2FF",
                    fontSize: 18,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {metrics.fdv}
                </span>
              </div>
            </div>
            <div className="flex flex-col bg-transparent justify-between rounded-[12px] p-0 min-w-0 w-1/2">
              <div>
                <div
                  style={{
                    color: "#4F6175",
                    fontSize: 12,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    marginBottom: 12,
                  }}
                >
                  Volume (24h)
                </div>
                <div className="flex items-center mb-[21px]">
                  <span
                    style={{
                      color: "#C9E2FF",
                      fontSize: 18,
                      fontFamily: "Instrument Sans, sans-serif",
                      fontWeight: 500,
                      marginRight: 6,
                    }}
                  >
                    {metrics.volume}
                  </span>
                  <svg width={12} height={12} style={{ marginRight: 2 }}>
                    <polygon
                      points="6,2 1,10 11,10"
                      fill={metrics.volumePositive ? "#239F2E" : "#CD2A2A"}
                    />
                  </svg>
                  <span
                    style={{
                      color: metrics.volumePositive ? "#239F2E" : "#CD2A2A",
                      fontSize: 12,
                      fontFamily: "Instrument Sans, sans-serif",
                    }}
                  >
                    {metrics.volumeChange > 0
                      ? `+${metrics.volumeChange}%`
                      : `${metrics.volumeChange}%`}
                  </span>
                </div>
              </div>
              <div className="mt-[-12px]">
                <div
                  style={{
                    color: "#4F6175",
                    fontSize: 12,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 400,
                    marginBottom: 12,
                  }}
                >
                  Total supply
                </div>
                <span
                  style={{
                    color: "#C9E2FF",
                    fontSize: 18,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {metrics.totalSupply}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}