import MembersCard from "./MembersCard";
import MessagesCard from "./MessagesCard";
import MessageStatisticCard from "./MessageStatisticCard";

// TODO: When backend API is ready, pass actual group info data as props to MembersCard, MessagesCard, and MessageStatisticCard.
// For now, these components are rendered with layout only.

const GroupInfoRow: React.FC = () => {
  return (
    <>
      {/* Desktop/Tablet */}
      <div className="hidden xlm:flex w-full flex-col">
        {/* Title */}
        <h2
          className="font-instrument font-medium"
          style={{
            fontSize: 20,
            lineHeight: "24px",
            color: "#C9E2FF",
            margin: 0,
            marginBottom: 24,
          }}
        >
          Group Info
        </h2>
        <div className="flex w-full gap-[16px] mt-0">
          <div className="flex flex-col gap-[16px]">
            {/* TODO:  Replace className-only props with actual data props when backend is available*/}
            <MembersCard className="w-[876px] h-[154px]" />
            <MessagesCard className="w-[876px] h-[114px]" />
          </div>
          <MessageStatisticCard className="flex-1 w-full" />
        </div>
      </div>

      {/* Mobile + Tablet */}
      <div className="block xlm:hidden w-full">
        {/* Title */}
        <h2
          className="font-instrument font-medium"
          style={{
            fontSize: 18,
            lineHeight: "24px",
            color: "#C9E2FF",
            margin: 0,
            marginBottom: 35,
          }}
        >
          Group Info
        </h2>
        <div className="flex flex-col w-full gap-0">
          <MembersCard
            className="w-full min-h-[135px] px-[10px] py-[18px]"
          />
          <MessagesCard
            className="w-full min-h-[99px] px-[10px] py-[18px]"
          />
          <MessageStatisticCard
            className="w-full min-h-[240px] px-[10px] py-[18px]"
          />
        </div>
      </div>
    </>
  );
};

export default GroupInfoRow;