import { useState, type ChangeEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TODO: Replace static navigation/search flow with backend-driven token search if needed.

const SEARCH_PLACEHOLDER = "Search any token (e.g. $MOOD...)";

const buildDashboardPath = (token: string): string =>
  `/dashboard/${encodeURIComponent(token.trim())}`;

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (): void => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      return;
    }

    navigate(buildDashboardPath(trimmedValue));
  };

  return (
    <form
      className="
        mx-auto mb-[123px]
        flex h-[72px] w-[712px]
        items-center gap-4
        rounded-[64px]
        bg-gradient-to-r
        from-[#0a2235]
        via-[#11263a]
        to-[#0a2235]
        px-6
        shadow-lg
      "
      action="javascript:void(0)"
      autoComplete="off"
    >
      <input
        type="text"
        value={searchValue}
        placeholder={SEARCH_PLACEHOLDER}
        onChange={handleInputChange}
        className="
          input-no-bg
          flex-1
          border-none
          text-[16px]
          font-normal
          font-instrument
          text-white
          outline-none
          placeholder:text-[#C9E2FF]
        "
        style={{
          background: "rgba(0,0,0,0.4)",
          backgroundColor: "rgba(0,0,0,0.4) !important",
          boxShadow: "none !important",
          paddingLeft: "26px",
        }}
      />

      <button
        type="button"
        onClick={handleSearch}
        className="
          mr-[8px] mb-[8px] mt-[8px]
          flex items-center gap-[10px]
          rounded-full border
          border-[#1097dc]/70
          bg-gradient-to-r
          from-[#1197db]
          to-[#186dc8]
          p-[16px] px-[24px]
          shadow-lg
          transition
          hover:from-[#186dc8]
          hover:to-[#1197db]
        "
      >
        <Search size={32} color="#FFFFFF" />

        <span
          className="
            font-instrument
            text-[14px]
            font-medium
            leading-[24px]
            tracking-[0.1em]
            text-[#C9E2FF]
          "
        >
          SEARCH
        </span>
      </button>
    </form>
  );
}