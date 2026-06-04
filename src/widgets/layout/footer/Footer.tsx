import type { ComponentType, SVGProps } from "react";

import FacebookIcon from "../../../assets/facebook-icon.svg?react";
import LinkedinIcon from "../../../assets/linkedin-icon.svg?react";
import MoodAiIcon from "../../../assets/moodai-icon.svg?react";
import TelegramIcon from "../../../assets/telegram-icon.svg?react";
import TwitterIcon from "../../../assets/twitter-icon.svg?react";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

type SocialLink = {
  name: string;
  url: string;
  icon: SvgIcon;
};

type PolicyLink = {
  label: string;
  href: string;
};

const CURRENT_YEAR = 2025;
const BRAND_NAME = "Mood AI";

const COLORS = {
  link: "#0082D9",
  muted: "#32414B",
  social: "#C9E2FF",
} as const;

const COPYRIGHT_TEXT = `© ${CURRENT_YEAR} ${BRAND_NAME}. All rights reserved.`;

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Telegram",
    url: "https://t.me/",
    icon: TelegramIcon,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/",
    icon: FacebookIcon,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: TwitterIcon,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/",
    icon: LinkedinIcon,
  },
];

const MOBILE_SOCIAL_COLUMNS: SocialLink[][] = [
  [
    {
      name: "Telegram",
      url: "https://t.me/",
      icon: TelegramIcon,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/",
      icon: TwitterIcon,
    },
  ],
  [
    {
      name: "Facebook",
      url: "https://facebook.com/",
      icon: FacebookIcon,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/",
      icon: LinkedinIcon,
    },
  ],
];

const POLICY_LINKS: {
  privacy: PolicyLink;
  terms: PolicyLink;
} = {
  privacy: {
    label: "privacy policy",
    href: "/privacy-policy",
  },
  terms: {
    label: "terms of service.",
    href: "/terms-of-service",
  },
};

const footerLinkClassName =
  "font-instrument text-[16px] leading-[24px] not-italic";

const policyTextClassName =
  "font-instrument text-[14px] leading-[24px] not-italic";

const policyLinkClassName = `
  border-b
  border-transparent
  transition-[border-color]
  duration-200
  hover:border-[#0082D9]
`;

function FooterLogo({
  className,
}: {
  className: string;
}) {
  return (
    <div className={className}>
      <MoodAiIcon className="h-full w-full" />
    </div>
  );
}

function CopyrightText({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`${policyTextClassName} ${className}`}
      style={{ color: COLORS.muted }}
    >
      {COPYRIGHT_TEXT}
    </span>
  );
}

function PolicyLinkItem({ link }: { link: PolicyLink }) {
  return (
    <a
      href={link.href}
      className={policyLinkClassName}
      style={{
        color: COLORS.link,
        textDecoration: "none",
      }}
    >
      {link.label}
    </a>
  );
}

function PolicyText({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`${policyTextClassName} ${className}`}
      style={{ color: COLORS.muted }}
    >
      Read our <PolicyLinkItem link={POLICY_LINKS.privacy} /> and{" "}
      <PolicyLinkItem link={POLICY_LINKS.terms} />
    </span>
  );
}

function SocialLinkItem({ link }: { link: SocialLink }) {
  const Icon = link.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-[24px] w-[24px]" />

      <a
        href={link.url}
        className={footerLinkClassName}
        style={{
          color: COLORS.social,
          textDecoration: "none",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.name}
      </a>
    </div>
  );
}

function SocialSeparator() {
  return <div className="mx-[24px] h-[24px] w-[6px] rounded-[1px] bg-[#1B242D]" />;
}

function DesktopSocialLinks() {
  return (
    <div className="flex flex-row items-center">
      {SOCIAL_LINKS.map((link, index) => {
        const hasSeparator = index < SOCIAL_LINKS.length - 1;

        return (
          <div key={link.name} className="flex flex-row items-center">
            <SocialLinkItem link={link} />
            {hasSeparator && <SocialSeparator />}
          </div>
        );
      })}
    </div>
  );
}

function MobileSocialLinks() {
  return (
    <div className="mr-[24px] ml-[24px] flex flex-row">
      {MOBILE_SOCIAL_COLUMNS.map((column, columnIndex) => (
        <div
          key={`social-column-${columnIndex}`}
          className={`flex flex-1 flex-col gap-[24px] ${
            columnIndex > 0 ? "ml-[24px]" : ""
          }`}
        >
          {column.map((link) => (
            <SocialLinkItem key={link.name} link={link} />
          ))}
        </div>
      ))}
    </div>
  );
}

function DesktopFooter() {
  return (
    <div className="hidden w-full justify-center lg:flex">
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1760px]
          items-start
          justify-between
          px-[60px]
          transition-all
          max-[1600px]:px-[40px]
          max-[1400px]:px-[28px]
          max-[1200px]:px-[16px]
          max-[1100px]:px-[8px]
        "
      >
        <div className="flex flex-col items-start">
          <FooterLogo className="h-[24px] w-[194px]" />

          <div className="mt-[64px]">
            <CopyrightText />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex h-[24px] flex-row items-center">
            <span
              className="mr-[24px] font-instrument text-[16px] leading-[24px] not-italic"
              style={{ color: COLORS.social }}
            >
              Follow Us:
            </span>

            <DesktopSocialLinks />
          </div>

          <div className="mt-[64px] flex flex-row justify-end">
            <PolicyText />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFooter() {
  return (
    <div className="block w-full lg:hidden">
      <div className="mx-auto flex w-full max-w-[390px] flex-col">
        <FooterLogo className="mt-[36px] ml-[24px] h-[32px] w-[146px]" />

        <div
          className="mt-[48px] mb-[24px] ml-[24px] font-instrument text-[16px] leading-[24px]"
          style={{ color: COLORS.social }}
        >
          Follow Us:
        </div>

        <MobileSocialLinks />

        <div className="mt-[64px] ml-[24px]">
          <PolicyText />
        </div>

        <div className="mt-[24px] ml-[24px]">
          <CopyrightText />
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center bg-black pt-[64px] pb-[16px] lg:pb-[36px]">
      <DesktopFooter />
      <MobileFooter />
    </footer>
  );
}