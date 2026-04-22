type CardProps = {
  image: string;
  name: string;
  changePercent: number;
  changeColor?: string;
  showName?: boolean;
  showChange?: boolean;
};

export default function CryptoCard({
  image,
  name,
  changePercent,
  changeColor,
  showName = true,
  showChange = true,
}: CardProps) {
  // TODO: Replace these props with API data as soon as backend is connected.
  const color = changeColor ?? 'text-green-500';

  return (
    <div
      className="
        rounded-xl flex flex-col justify-between bg-center bg-cover relative
        w-[260px] h-[230px] 
        lg:w-[437px] lg:h-[300px] 
        p-4 lg:p-6
      "
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-between items-center mb-4 relative z-10">
        {showName && <span className="text-white font-semibold">{name}</span>}
        {showChange && (
          <span className={`${changePercent >= 0 ? color : 'text-red-500'} font-medium`}>
            {changePercent >= 0
              ? `↑${changePercent.toFixed(2)}%`
              : `↓${Math.abs(changePercent).toFixed(2)}%`}
          </span>
        )}
      </div>
    </div>
  );
}