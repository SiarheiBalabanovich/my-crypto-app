type CryptoCardProps = {
  image: string;
  name: string;
  changePercent: number;
  changeColor?: string;
  showName?: boolean;
  showChange?: boolean;
};

const POSITIVE_CHANGE_COLOR = "text-green-500";
const NEGATIVE_CHANGE_COLOR = "text-red-500";

const formatChangePercent = (value: number): string => {
  const formattedValue = Math.abs(value).toFixed(2);

  return value >= 0
    ? `↑${formattedValue}%`
    : `↓${formattedValue}%`;
};

export default function CryptoCard({
  image,
  name,
  changePercent,
  changeColor = POSITIVE_CHANGE_COLOR,
  showName = true,
  showChange = true,
}: CryptoCardProps) {
  // TODO: Replace static props with backend data once API integration is ready.

  const changeTextColor =
    changePercent >= 0
      ? changeColor
      : NEGATIVE_CHANGE_COLOR;

  return (
    <div
      className="
        relative flex flex-col justify-between rounded-xl
        bg-cover bg-center
        w-[260px] h-[230px]
        p-4
        lg:w-[437px] lg:h-[300px]
        lg:p-6
      "
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mb-4 flex items-center justify-between">
        {showName && (
          <span className="font-semibold text-white">
            {name}
          </span>
        )}

        {showChange && (
          <span className={`font-medium ${changeTextColor}`}>
            {formatChangePercent(changePercent)}
          </span>
        )}
      </div>
    </div>
  );
}