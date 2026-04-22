import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSearchClick() {
    if (!value.trim()) return;

    // TODO: If you need backend search, send request to backend API here before navigating.

    navigate(`/dashboard/${encodeURIComponent(value.trim())}`);
  }

  return (
    <form
      className="
        w-[712px]
        h-[72px]
        mx-auto
        flex items-center
        bg-gradient-to-r from-[#0a2235] via-[#11263a] to-[#0a2235]
        rounded-[64px]
        shadow-lg
        px-6
        gap-4
        mb-[123px]
      "
      action="javascript:void(0)"
      autoComplete="off"
    >
      <input
        className="
          flex-1
          outline-none
          border-none
          text-white
          text-[16px]
          placeholder:text-[#C9E2FF]
          font-normal
          font-instrument
          input-no-bg
        "
        style={{
          background: "rgba(0,0,0,0.4)",
          backgroundColor: "rgba(0,0,0,0.4) !important",
          boxShadow: "none !important",
          paddingLeft: "26px",
        }}
        type="text"
        placeholder="Search any token (e.g. $MOOD...)"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        type="button"
        className="
          flex items-center gap-[10px]
          bg-gradient-to-r from-[#1197db] to-[#186dc8]
          rounded-full
          border border-[#1097dc]/70
          hover:from-[#186dc8] hover:to-[#1197db]
          transition
          shadow-lg
          p-[16px] px-[24px]
          mr-[8px]
          mt-[8px]
          mb-[8px]
        "
        onClick={handleSearchClick}
      >
        <Search size={32} color="#FFFFFF" />
        <span className="font-instrument font-medium text-[14px] leading-[24px] tracking-[0.1em] text-[#C9E2FF]">
          SEARCH
        </span>
      </button>
    </form>
  );
}