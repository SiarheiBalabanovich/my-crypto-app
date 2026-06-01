import MembersCard from "../../landing/members-card/members-card";
import MessageStatisticCard from "../../landing/message-statistic-card/message-statistic-card";
import MessagesCard from "../../landing/messages-card/messages-card";

// TODO: Pass real group info data as props when backend API is ready.

const GROUP_INFO_TITLE = "Group Info";

const titleStyles = {
  desktop: {
    fontSize: 20,
    lineHeight: "24px",
    color: "#C9E2FF",
    margin: 0,
    marginBottom: 24,
  },
  mobile: {
    fontSize: 18,
    lineHeight: "24px",
    color: "#C9E2FF",
    margin: 0,
    marginBottom: 35,
  },
} as const;

const cardClassNames = {
  desktop: {
    members: "w-[876px] h-[154px]",
    messages: "w-[876px] h-[114px]",
    statistic: "flex-1 w-full",
  },
  mobile: {
    members: "w-full min-h-[135px] px-[10px] py-[18px]",
    messages: "w-full min-h-[99px] px-[10px] py-[18px]",
    statistic: "w-full min-h-[240px] px-[10px] py-[18px]",
  },
} as const;

function GroupInfoTitle({
  variant,
}: {
  variant: keyof typeof titleStyles;
}) {
  return (
    <h2 className="font-instrument font-medium" style={titleStyles[variant]}>
      {GROUP_INFO_TITLE}
    </h2>
  );
}

function DesktopGroupInfoLayout() {
  return (
    <div className="hidden w-full flex-col xlm:flex">
      <GroupInfoTitle variant="desktop" />

      <div className="mt-0 flex w-full gap-[16px]">
        <div className="flex flex-col gap-[16px]">
          <MembersCard className={cardClassNames.desktop.members} />
          <MessagesCard className={cardClassNames.desktop.messages} />
        </div>

        <MessageStatisticCard className={cardClassNames.desktop.statistic} />
      </div>
    </div>
  );
}

function MobileGroupInfoLayout() {
  return (
    <div className="block w-full xlm:hidden">
      <GroupInfoTitle variant="mobile" />

      <div className="flex w-full flex-col gap-0">
        <MembersCard className={cardClassNames.mobile.members} />
        <MessagesCard className={cardClassNames.mobile.messages} />
        <MessageStatisticCard className={cardClassNames.mobile.statistic} />
      </div>
    </div>
  );
}

export default function GroupInfoRow() {
  return (
    <>
      <DesktopGroupInfoLayout />
      <MobileGroupInfoLayout />
    </>
  );
}