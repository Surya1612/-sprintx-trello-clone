import { useBoardStore } from "../../store/boardStore";
import { AddColumn } from "./AddColumn";

export const BoardView = () => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const { title, color } = activeBoard;

  return (
    <div
      className={`flex-1 h-[calc(100vh-48px)] bg-gradient-to-r ${color} overflow-x-auto `}
    >
      <div className="p-4">
        <p className="font-semibold text-xl text-white">{title}</p>
      </div>
      <AddColumn />
    </div>
  );
};
