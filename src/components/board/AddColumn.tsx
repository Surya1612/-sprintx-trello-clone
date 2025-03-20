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
    <div className="p-4 flex w-max gap-4 ">
      {activeColumns?.map((column) => (
        <div
          key={column.id}
          className="bg-white self-start w-[290px] rounded-xl min-h-[120px] max-h-[100vh] flex flex-col"
        >
          <div className="flex items-center ">
            <p className="p-3 font-semibold text-base">{column.title}</p>

            <MoreHorizOutlinedIcon
              onClick={(e) => handleClick(e, column.id)}
              className="ml-auto cursor-pointer mr-4"
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
          className="p-3 bg-[#ffffff33] h-[40px] flex items-center rounded-xl gap-2 w-[250px] cursor-pointer"
          onClick={() => setIsAddList(true)}
        >
          <AddIcon fontSize="small" sx={{ color: "#FFF" }} />
          <p className="text-sm font-semibold text-white">Add a list</p>
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
