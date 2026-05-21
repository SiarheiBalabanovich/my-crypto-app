import React from "react";
import Logo from "../assets/moodai-icon.svg?react";
import TelegramIcon from "../assets/telegram-icon.svg?react";
import FacebookIcon from "../assets/facebook-icon.svg?react";
import TwitterIcon from "../assets/twitter-icon.svg?react";
import LinkedinIcon from "../assets/linkedin-icon.svg?react";

// Social link data type for possible backend expansion
type SocialLink = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

const COLOR_LINK = "#0082D9";
const COLOR_GRAY = "#32414B";
const COLOR_SOCIAL = "#C9E2FF";

// TODO: Replace static socialLinks array with backend data if needed in future
const socialLinks: SocialLink[] = [
  {
    name: "Telegram",
    url: "https://t.me/",
    icon: <TelegramIcon className="w-[24px] h-[24px]" />,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/",
    icon: <FacebookIcon className="w-[24px] h-[24px]" />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: <TwitterIcon className="w-[24px] h-[24px]" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/",
    icon: <LinkedinIcon className="w-[24px] h-[24px]" />,
  },
];

const Footer: React.FC = () => (
  <footer className="w-full bg-black flex flex-col items-center pt-[64px] pb-[16px] lg:pb-[36px]">
    {/* DESKTOP + TABLET */}
    <div className="hidden lg:flex w-full justify-center">
      <div
        className="
          w-full
          max-w-[1760px]
          flex
          justify-between
          items-start
          px-[60px]
          max-[1600px]:px-[40px]
          max-[1400px]:px-[28px]
          max-[1200px]:px-[16px]
          max-[1100px]:px-[8px]
          transition-all
          mx-auto
        "
      >
        {/* Left side */}
        <div className="flex flex-col items-start">
          <div className="w-[194px] h-[24px]">
            <Logo className="w-full h-full" />
          </div>
          <div className="mt-[64px]">
            <span
              className="font-instrument text-[14px] leading-[24px] not-italic"
              style={{ color: COLOR_GRAY }}
            >
              © 2025 Mood AI. All rights reserved.
            </span>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col items-end">
          <div className="flex flex-row items-center h-[24px]">
            <span
              className="font-instrument text-[16px] leading-[24px] mr-[24px] not-italic"
              style={{ color: COLOR_SOCIAL }}
            >
              Follow Us:
            </span>
            <div className="flex flex-row items-center">
              {/* Socials */}
              {socialLinks.map((link, idx) => (
                <React.Fragment key={link.name}>
                  <div className="flex items-center gap-2">
                    {link.icon}
                    <a
                      href={link.url}
                      className="font-instrument text-[16px] leading-[24px] not-italic"
                      style={{ color: COLOR_SOCIAL, textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </div>
                  {idx < socialLinks.length - 1 && (
                    <div className="mx-[24px] w-[6px] h-[24px] rounded-[1px] bg-[#1B242D]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Policy links */}
          <div className="flex flex-row justify-end mt-[64px]">
            <span
              className="font-instrument text-[14px] leading-[24px] not-italic"
              style={{ color: COLOR_GRAY }}
            >
              Read our{" "}
              <a
                href="/privacy-policy"
                className="hover:underline"
                style={{
                  color: COLOR_LINK,
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "border 0.2s",
                }}
                onMouseOver={e =>
                  ((e.target as HTMLElement).style.borderBottom = `1px solid ${COLOR_LINK}`)
                }
                onMouseOut={e =>
                  ((e.target as HTMLElement).style.borderBottom = "1px solid transparent")
                }
              >
                privacy policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-of-service"
                className="hover:underline"
                style={{
                  color: COLOR_LINK,
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "border 0.2s",
                }}
                onMouseOver={e =>
                  ((e.target as HTMLElement).style.borderBottom = `1px solid ${COLOR_LINK}`)
                }
                onMouseOut={e =>
                  ((e.target as HTMLElement).style.borderBottom = "1px solid transparent")
                }
              >
                terms of service.
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* MOBILE + TABLET */}
    <div className="block lg:hidden w-full">
      <div className="flex flex-col w-full max-w-[390px] mx-auto">
        {/* Logo */}
        <div className="mt-[36px] ml-[24px] w-[146px] h-[32px]">
          <Logo className="w-full h-full" />
        </div>
        {/* Follow Us */}
        <div className="mt-[48px] mb-[24px] ml-[24px] font-instrument text-[16px] leading-[24px]" style={{ color: COLOR_SOCIAL }}>
          Follow Us:
        </div>
        {/* Social grid */}
        <div className="flex flex-row ml-[24px] mr-[24px]">
          {/* Column 1 */}
          <div className="flex flex-col gap-[24px] flex-1">
            <div className="flex items-center gap-2">
              <TelegramIcon className="w-[24px] h-[24px]" />
              <a
                href="https://t.me/"
                className="font-instrument text-[16px] leading-[24px] not-italic"
                style={{ color: COLOR_SOCIAL, textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </div>
            <div className="flex items-center gap-2">
              <TwitterIcon className="w-[24px] h-[24px]" />
              <a
                href="https://twitter.com/"
                className="font-instrument text-[16px] leading-[24px] not-italic"
                style={{ color: COLOR_SOCIAL, textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-[24px] flex-1 ml-[24px]">
            <div className="flex items-center gap-2">
              <FacebookIcon className="w-[24px] h-[24px]" />
              <a
                href="https://facebook.com/"
                className="font-instrument text-[16px] leading-[24px] not-italic"
                style={{ color: COLOR_SOCIAL, textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LinkedinIcon className="w-[24px] h-[24px]" />
              <a
                href="https://linkedin.com/"
                className="font-instrument text-[16px] leading-[24px] not-italic"
                style={{ color: COLOR_SOCIAL, textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        {/* Policy and copyright */}
        <div className="ml-[24px] mt-[64px] font-instrument text-[14px] leading-[24px] not-italic" style={{ color: COLOR_GRAY }}>
          Read our{" "}
          <a
            href="/privacy-policy"
            className="hover:underline"
            style={{
              color: COLOR_LINK,
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border 0.2s",
            }}
            onMouseOver={e =>
              ((e.target as HTMLElement).style.borderBottom = `1px solid ${COLOR_LINK}`)
            }
            onMouseOut={e =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid transparent")
            }
          >
            privacy policy
          </a>{" "}
          and{" "}
          <a
            href="/terms-of-service"
            className="hover:underline"
            style={{
              color: COLOR_LINK,
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border 0.2s",
            }}
            onMouseOver={e =>
              ((e.target as HTMLElement).style.borderBottom = `1px solid ${COLOR_LINK}`)
            }
            onMouseOut={e =>
              ((e.target as HTMLElement).style.borderBottom = "1px solid transparent")
            }
          >
            terms of service.
          </a>
        </div>
        <div className="ml-[24px] mt-[24px] font-instrument text-[14px] leading-[24px] not-italic" style={{ color: COLOR_GRAY }}>
          © 2025 Mood AI. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;