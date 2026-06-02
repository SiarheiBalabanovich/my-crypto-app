import type { CSSProperties, ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

const cardStyle: CSSProperties = {
  background: "#070D11",
  borderRadius: "8px",
};

const cardClassName =
  "w-[398px] flex flex-col px-8 pt-[24px] pb-7 rounded-[8px]";

const headerStyle: CSSProperties = {
  gap: 8,
  marginBottom: 32,
};

const titleClassName = `
  font-['Instrument_Sans']
  font-normal
  text-[14px]
  leading-[16px]
  tracking-[0.1em]
  text-[#C9E2FF]
`;

const textClassName = `
  font-['Instrument_Sans']
  font-normal
  text-[16px]
  leading-[24px]
  text-[#6D8BAD]
`;

// TODO: Replace static props with API-driven feature card data when backend integration is ready.

export default function FeatureCard({
  icon,
  title,
  text,
}: FeatureCardProps) {
  return (
    <div className={cardClassName} style={cardStyle}>
      <div className="flex items-center" style={headerStyle}>
        {icon}

        <span className={titleClassName}>{title}</span>
      </div>

      <p className={textClassName}>{text}</p>
    </div>
  );
}