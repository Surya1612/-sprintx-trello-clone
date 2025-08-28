import { useBoardStore } from "../../store/boardStore";
import { AddColumn } from "./AddColumn";

export const BoardView = () => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const { title, color } = activeBoard;

  return (
    <div
      className={`w-[80%] h-[calc(100vh-83px)] overflow-y-hidden overflow-x-auto  bg-gradient-to-r ${color} `}
    >
      <div className="px-8 py-4 text-white">
        <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
          {title}
        </h2>
        <p className="text-lg opacity-80 mb-5">
          Sprint 24 - Q3 Product Roadmap
        </p>
      </div>
      <AddColumn />
    </div>
  );
};
