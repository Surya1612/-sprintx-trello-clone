import AddIcon from "@mui/icons-material/Add";
import { useBoardStore } from "../../store/boardStore";
import { v4 as uuidv4 } from "uuid";
import { Column } from "../../types/boardTypes";
import { useState } from "react";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddTask } from "./AddTask";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/trash.svg";

const taskOptions = [
  {
    id: "edit",
    title: "Edit",
    icon: editIcon,
  },
  {
    id: "delete",
    title: "Delete",
    icon: deleteIcon,
  },
];

export const AddColumn = () => {
  const addNewColoumn = useBoardStore((state) => state.addColumn);
  const deleteColumn = useBoardStore((state) => state.deleteColumn);

  const activeColumns = useBoardStore((state) => state.activeBoard).columns;
  const [isAddList, setIsAddList] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleNewColumn = () => {
    const newColData: Column = {
      id: uuidv4(),
      title: columnTitle,
      color: "",
      tasks: [],
    };
    addNewColoumn(newColData);
    setColumnTitle("");
    setIsAddList(false);
  };

  const handleClose = () => {
    setIsAddList(false);
    setColumnTitle("");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentColumnId(null);
  };

  const handleDeleteColumn = () => {
    deleteColumn(currentColumnId as string);
    setAnchorEl(null);
    setCurrentColumnId(null);
  };

  const handleClick = (
    event: React.MouseEvent<SVGElement>,
    columnId: string
  ) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
    setCurrentColumnId(columnId);
  };

  return (
    <div className="px-6 pb-6 flex gap-5 overflow-x-auto items-start">
      {activeColumns?.map((column) => (
        <div
          key={column.id}
          className="bg-white self-start min-w-[290px] rounded-xl flex flex-col"
        >
          <div className="flex items-center px-4 py-3">
            <div className="flex items-center gap-2 ">
              <h3 className="text-lg font-semibold text-gray-800">
                {column.title}
              </h3>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-xl text-xs font-semibold">
                {column.tasks.length}
              </span>
            </div>
            <MoreHorizOutlinedIcon
              onClick={(e) => handleClick(e, column.id)}
              className="ml-auto cursor-pointer"
            />
          </div>
          <AddTask columnId={column.id} activeTasks={column.tasks} />
        </div>
      ))}
      {isAddList ? (
        <div className="bg-white w-[290px] p-3 rounded-xl h-[100px] ">
          <TextField
            fullWidth
            required
            id="outlined-required"
            onChange={(e) => setColumnTitle(e.target.value)}
            value={columnTitle}
            size="small"
            placeholder="Enter list name..."
            sx={{
              background: "#fff",
              borderRadius: "4px",
              ".MuiOutlinedInput-root	": {
                height: "35px",
                fontSize: "12px",
              },
            }}
          />
          <div className="flex gap-2 items-center mt-2">
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "capitalize" }}
              disabled={!columnTitle}
              onClick={() => handleNewColumn()}
            >
              Add list
            </Button>
            <CloseIcon
              fontSize="medium"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F4F4F5",
                  borderRadius: "8px",
                },
              }}
              onClick={handleClose}
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsAddList(true)}
          className="min-w-[300px] h-[120px] bg-white/10 border-2 border-dashed border-white/30  rounded-2xl flex flex-col items-center justify-center gap-2 text-white  cursor-pointer transition-all duration-300 ease-in-out"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ">
            <AddIcon />
          </div>
          <div>Add another list</div>
        </div>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          borderRadius: 6,
          boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          "& .MuiMenu-list": {
            padding: "4px 0",
          },
          "& .MuiMenuItem-root": {
            width: "120px",
          },
        }}
      >
        {taskOptions.map((item) => (
          <MenuItem
            key={item.id}
            disableRipple
            sx={{ gap: "8px" }}
            onClick={() =>
              item.id === "edit" ? handleMenuClose() : handleDeleteColumn()
            }
          >
            <img src={item.icon} alt={item.title} />
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
