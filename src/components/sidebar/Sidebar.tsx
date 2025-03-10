import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

import { AddBoardPopover } from "../board/AddBoardPopover";

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

  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    name: string
  ) => {
    const value = typeof e === "string" ? e : e.target.value;
    setNewBoard((prev: TNewBoard) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setShowBoard(false);
  };

  return (
    <div className="w-[260px] bg-[#7d2650]  h-[calc(100vh-48px)]">
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
            onClick={() => setShowBoard(true)}
            sx={{ marginLeft: "auto", cursor: "pointer" }}
          >
            <AddIcon fontSize="small" sx={{ color: "#FFF" }} />
          </IconButton>
        </div>
        <div className="flex items-center gap-2 py-2">
          <div className="bg-gradient-to-r border from-cyan-500 to-blue-500 px-4 py-2 rounded-md font-semibold text-white h-6 w-6" />
          <p className="text-sm text-white">Sample Board</p>
        </div>
      </div>
      {showBoard && (
        <AddBoardPopover
          handleClose={handleClose}
          handleFormData={handleFormData}
          newBoard={newBoard}
        />
      )}
    </div>
  );
};
