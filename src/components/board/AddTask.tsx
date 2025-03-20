import AddIcon from "@mui/icons-material/Add";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useBoardStore } from "../../store/boardStore";
import { Task } from "../../types/boardTypes";
import { v4 as uuidv4 } from "uuid";
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

export const AddTask = ({
  columnId,
  activeTasks,
}: {
  columnId: string;
  activeTasks: Task[];
}) => {
  const addNewTask = useBoardStore((state) => state.addTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [isAddTask, setIsAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleNewTask = () => {
    const newTaskData: Task = {
      id: uuidv4(),
      title: taskTitle,
    };
    addNewTask(newTaskData, columnId);
    setTaskTitle("");
    setIsAddTask(false);
  };

  const handleClose = () => {
    setIsAddTask(false);
    setTaskTitle("");
  };

  const handleClick = (event: React.MouseEvent<SVGElement>, taskId: string) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
    setCurrentTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentTaskId(null);
  };

  const handleDeleteTask = () => {
    deleteTask(columnId, currentTaskId as string);
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 px-3 overflow-y-auto flex-grow">
        {activeTasks.length > 0 ? (
          activeTasks.map((task: Task, index) => (
            <div
              key={index}
              className="bg-gray-100 p-2 rounded-md shadow flex items-center"
            >
              <p className="text-sm">{task.title}</p>
              <MoreHorizOutlinedIcon
                onClick={(e) => handleClick(e, task.id)}
                className="ml-auto cursor-pointer"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No tasks available</p>
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
                item.id === "edit" ? handleMenuClose() : handleDeleteTask()
              }
            >
              <img src={item.icon} alt={item.title} />
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </div>

      {isAddTask ? (
        <div className="p-3">
          <TextField
            fullWidth
            required
            id="outlined-required"
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
            placeholder="Enter card title..."
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
              disabled={!taskTitle}
              onClick={() => handleNewTask()}
            >
              Add card
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
          className="p-3 flex items-center rounded-xl gap-2 cursor-pointer"
          onClick={() => setIsAddTask(true)}
        >
          <AddIcon fontSize="small" sx={{ color: "#172b4d" }} />
          <p className="text-sm font-semibold text-[#172b4d]">Add a card</p>
        </div>
      )}
    </div>
  );
};
