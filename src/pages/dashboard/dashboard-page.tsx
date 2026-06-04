import { useMemo, type ReactNode } from "react";
import { useParams } from "react-router-dom";

import { DashboardSection } from "../../widgets/dashboard/dashboard-section";
import { ConnectWalletScreen } from "../../features/connect-wallet";
import { SubscribeNowScreen } from "../../features/subscribe-now";
import { TokenUnderReviewScreen } from "../../features/token-under-review";

// TODO: Replace mock helpers with real API / Redux / React Query state.

type TokenStatus = "found" | "underReview" | "notFound";

const TARGET_TOKEN = "MOOD";
const REVIEW_TOKEN = "REVIEW";

const STORAGE_KEYS = {
  walletConnected: "walletConnected",
  premiumUser: "premiumUser",
} as const;

const normalizeToken = (token?: string): string => token?.trim().toUpperCase() ?? "";

const getTokenStatus = (token?: string): TokenStatus => {
  const normalizedToken = normalizeToken(token);

  if (!normalizedToken) {
    return "notFound";
  }

  if (normalizedToken === TARGET_TOKEN) {
    return "found";
  }

  if (normalizedToken === REVIEW_TOKEN) {
    return "underReview";
  }

  return "notFound";
};

const getBooleanStorageValue = (key: string): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(key) === "1";
};

const getWalletConnected = (): boolean =>
  getBooleanStorageValue(STORAGE_KEYS.walletConnected);

const getPremiumUser = (): boolean =>
  getBooleanStorageValue(STORAGE_KEYS.premiumUser);

const TokenNotFoundOverlay = () => (
  <div className="flex h-[900px] w-full flex-col items-center justify-center rounded-[24px] bg-[#23282e]">
    <span className="mb-4 text-[32px] font-bold tracking-[0.2em] text-white">
      TOKEN NOT FOUND
    </span>

    <span className="text-[18px] text-[#C9E2FF]">
      This token does not exist in our database.
    </span>
  </div>
);

const getDashboardOverlay = ({
  walletConnected,
  premiumUser,
  tokenStatus,
}: {
  walletConnected: boolean;
  premiumUser: boolean;
  tokenStatus: TokenStatus;
}): ReactNode => {
  if (!walletConnected) {
    return <ConnectWalletScreen />;
  }

  if (tokenStatus === "underReview") {
    return <TokenUnderReviewScreen />;
  }

  if (tokenStatus === "notFound" && premiumUser) {
    return <SubscribeNowScreen />;
  }

  if (tokenStatus === "notFound") {
    return <TokenNotFoundOverlay />;
  }

  return null;
};

export default function DashboardPage() {
  const { token } = useParams<{ token?: string }>();

  const tokenStatus = useMemo(() => getTokenStatus(token), [token]);

  const walletConnected = useMemo(() => getWalletConnected(), []);
  const premiumUser = useMemo(() => getPremiumUser(), []);

  const overlay = getDashboardOverlay({
    walletConnected,
    premiumUser,
    tokenStatus,
  });

  return <DashboardSection locked={Boolean(overlay)} overlay={overlay} />;
}