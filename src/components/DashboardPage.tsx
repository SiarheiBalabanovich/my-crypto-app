import { useParams } from "react-router-dom";
import { useMemo } from "react";
import DashboardSection from "./DashboardSection";
import TokenUnderReviewScreen from "./TokenUnderReviewScreen";
import SubscribeNowScreen from "./SubscribeNowScreen";
import ConnectWalletScreen from "./ConnectWalletScreen";

// TODO: Replace these helper functions with real API/Redux hooks once backend is connected.

function getTokenStatus(token: string): "found" | "underReview" | "notFound" {
  if (!token) return "notFound";
  if (token.toUpperCase() === "MOOD") return "found";
  if (token.toUpperCase() === "REVIEW") return "underReview";
  return "notFound";
}

function isWalletConnected(): boolean {
  return localStorage.getItem("walletConnected") === "1";
}

function isPremiumUser(): boolean {
  return localStorage.getItem("premiumUser") === "1";
}

export default function DashboardPage() {
  // TypeScript-aware useParams
  const { token } = useParams<{ token?: string }>();

  // TODO: Replace these with proper useQuery or state from Redux/Context, etc.
  const tokenStatus = useMemo(() => getTokenStatus(token || ""), [token]);
  const walletConnected = useMemo(() => isWalletConnected(), []);
  const premiumUser = useMemo(() => isPremiumUser(), []);

  // OverlayComponent logic
  let OverlayComponent: React.ReactNode = null;

  if (!walletConnected) {
    OverlayComponent = <ConnectWalletScreen />;
  } else if (tokenStatus === "underReview") {
    OverlayComponent = <TokenUnderReviewScreen />;
  } else if (tokenStatus === "notFound" && premiumUser) {
    OverlayComponent = <SubscribeNowScreen />;
  } else if (tokenStatus === "notFound") {
    OverlayComponent = (
      <div className="flex flex-col items-center justify-center h-[900px] w-full bg-[#23282e] rounded-[24px]">
        <span className="text-white text-[32px] font-bold tracking-[0.2em] mb-4">TOKEN NOT FOUND</span>
        <span className="text-[#C9E2FF] text-[18px]">This token does not exist in our database.</span>
      </div>
    );
  }

  return (
    <DashboardSection locked={!!OverlayComponent} overlay={OverlayComponent} />
  );
}