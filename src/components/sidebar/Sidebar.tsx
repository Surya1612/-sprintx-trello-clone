import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

import { AddBoardPopover } from "../board/AddBoardPopover";
import { useBoardStore } from "../../store/boardStore";
import { Board } from "../../types/boardTypes";
import { v4 as uuidv4 } from "uuid";

interface TNewBoard {
  title: string;
  background: string;
}

export const Sidebar = () => {
  const [newBoard, setNewBoard] = useState<TNewBoard>({
    title: "",
    background: "from-cyan-600 to-blue-600",
  });
  const [showBoard, setShowBoard] = useState(false);
  const boards = useBoardStore((state) => state.boards);
  const addBoard = useBoardStore((state) => state.addBoard);
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const setActiveBoard = useBoardStore((state) => state.setActiveBoard);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    name: string
  ) => {
    const value = typeof e === "string" ? e : e.target.value;
    setNewBoard((prev: TNewBoard) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setShowBoard(false);
    setAnchorEl(null);
    setNewBoard({ title: "", background: "from-cyan-600 to-blue-600" });
  };

  const onSubmit = () => {
    addBoard({
      title: newBoard.title,
      color: newBoard.background,
      id: uuidv4(),
    });
    handleClose();
  };

  const handleActiveBoard = (boardId: string) => {
    setActiveBoard(boardId);
  };

  const handleOpenBoard = (e: React.MouseEvent<HTMLElement>) => {
    setShowBoard(true);
    setAnchorEl(e.currentTarget as HTMLElement);
  };

  return (
    <div className={`w-[260px] bg-gray-900 h-[calc(100vh-48px)]`}>
      <div className="flex p-4 border-b border-[#ffffff29] gap-2 items-center">
        <div className="bg-linear-to-r border from-cyan-500 to-blue-500 px-3.5 py-1.5 rounded-md font-semibold text-[#fff]">
          S
        </div>
        <div>
          <p className="text-sm font-semibold text-[#fff]">SprintX Workspace</p>
          <p className="text-xs text-[#fff]">Premium</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center">
          <p className="text-sm font-semibold text-white">Your boards</p>
          <IconButton
            disableFocusRipple
            aria-label="Add"
            onClick={(e) => handleOpenBoard(e)}
            sx={{ marginLeft: "auto", cursor: "pointer" }}
          >
            <AddIcon fontSize="small" sx={{ color: "#FFF" }} />
          </IconButton>
        </div>
        {boards.length > 0 ? (
          boards.map((board: Board) => (
            <div
              onClick={() => handleActiveBoard(board.id)}
              key={board.id}
              className={`flex items-center gap-2 px-2 rounded-md py-2 mt-2 cursor-pointer hover:bg-[#ffffff33] ${
                board.id === activeBoard.id && "bg-[#ffffff33]"
              }`}
            >
              <div
                className={`bg-gradient-to-r border ${board.color} px-4 py-2 rounded-md font-semibold text-white h-6 w-6`}
              />
              <p className="text-sm text-white">{board.title}</p>
            </div>
          ))
        ) : (
          <p className="font-semibold text-sm text-white">
            No Boards Available
          </p>
        )}
      </div>

      {showBoard && (
        <AddBoardPopover
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleFormData={handleFormData}
          newBoard={newBoard}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};
