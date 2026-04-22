import LockIcon from "../assets/lock.svg?react";

// TODO: In the future, fetch notification state or user email from API when backend is ready.

const GetNotifiedRow: React.FC = () => {
  return (
    <>
      {/* Desktop / Tablet */}
      <div
        className="hidden xlm:flex flex-col bg-[#070D11] rounded-[8px]"
        style={{ width: 180, height: 400 }}
      >
        <div
          className="text-[#4F6175] text-[14px] font-normal leading-none font-[Instrument Sans]"
          style={{ marginTop: 24, marginLeft: 24, textAlign: "left" }}
        >
          Get Notified
        </div>
        <div className="flex flex-col items-center justify-center" style={{ marginTop: 94 }}>
          <div className="w-12 h-12 rounded-full bg-[#232B35] flex items-center justify-center">
            <LockIcon width={48} height={48} />
          </div>
          <div
            className="text-[#4F6175] text-[16px] font-medium leading-[28px] font-[Instrument Sans]"
            style={{ marginTop: 16 }}
          >
            Coming Soon
          </div>
        </div>
      </div>
      {/* Mobile / Tablet */}
      <div
        className="xlm:hidden flex flex-col bg-[#070D11] rounded-[8px]"
        style={{ width: 299, height: 128, margin: "0 auto", padding: 0 }}
      >
        {/* Title (left) */}
        <div
          className="text-[#4F6175] text-[12px] font-instrument font-normal leading-none"
          style={{ marginTop: 21, marginLeft: 14, textAlign: "left" }}
        >
          Get Notified
        </div>
        {/* Icon + Coming Soon in one line */}
        <div
          className="flex flex-row items-center justify-center"
          style={{
            marginTop: 21,
            marginBottom: 50,
            width: 271,
            height: 86,
            marginLeft: 14,
            marginRight: 14,
          }}
        >
          <div
            className="w-12 h-12 rounded-full bg-[#232B35] flex items-center justify-center"
            style={{ width: 48, height: 48, marginRight: 16 }}
          >
            <LockIcon width={48} height={48} />
          </div>
          <div
            className="text-[#4F6175] text-[14px] font-instrument font-medium leading-[24px]"
            style={{
              marginTop: 0,
              marginLeft: 0,
              textAlign: "left",
            }}
          >
            Coming Soon
          </div>
        </div>
      </div>
    </>
  );
};

export default GetNotifiedRow;