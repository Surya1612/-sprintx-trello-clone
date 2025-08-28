import { useState } from "react";
import { useBoardStore } from "../../store/boardStore";
import { getDarkerShade, getHeaderColor } from "../../utils/helpherFunction";

export const Header = () => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const { color } = activeBoard;

  const headerBgColor = getHeaderColor(color);
  const darkShadeBg = getDarkerShade(headerBgColor);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header
      style={{ background: darkShadeBg }}
      className="bg-white bg-opacity-10 backdrop-blur-lg border-b  px-6 py-4 flex justify-between items-center sticky top-0 z-50"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg flex items-center justify-center text-lg">
          📋
        </div>
        <p className="text-white text-2xl font-bold">SprintX</p>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search cards, boards, members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white bg-opacity-15 border border-white border-opacity-20 rounded-xl px-4 py-3 w-80 focus:outline-none focus:scale-105 transition-all duration-300"
        />
        <div className="w-10 h-10 bg-white/30  rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-110 transition-transform duration-200">
          JD
        </div>
      </div>
    </header>
  );
};
