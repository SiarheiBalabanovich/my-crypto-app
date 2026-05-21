// Types of props for component FeatureCard
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
  isMobile?: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text }) => {
  // TODO: Replace props with API-driven data when backend integration is ready.

  return (
    <div
      className="w-[398px] flex flex-col px-8 pt-[24px] pb-7 rounded-[8px]"
      style={{
        background: "#070D11",
        borderRadius: "8px",
      }}
    >
      <div className="flex items-center" style={{ gap: 8, marginBottom: 32 }}>
        {icon}
        <span
          className="
            font-['Instrument_Sans']
            font-normal
            text-[14px]
            leading-[16px]
            tracking-[0.1em]
            text-[#C9E2FF]
          "
        >
          {title}
        </span>
      </div>
      <p
        className="
          font-['Instrument_Sans']
          font-normal
          text-[16px]
          leading-[24px]
          text-[#6D8BAD]
        "
      >
        {text}
      </p>
    </div>
  );
};

export default FeatureCard;