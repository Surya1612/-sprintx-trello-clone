import AddIcon from "@mui/icons-material/Add";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useBoardStore } from "../../store/boardStore";
import { Task } from "../../types/boardTypes";
import { v4 as uuidv4 } from "uuid";

export const AddTask = ({
  columnId,
  activeTasks,
}: {
  columnId: string;
  activeTasks: Task[];
}) => {
  const addNewTask = useBoardStore((state) => state.addTask);

  const [isAddTask, setIsAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

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

  return (
    <div>
      <div className="flex flex-col gap-2 px-3 overflow-y-auto flex-grow">
        {activeTasks.length > 0 ? (
          activeTasks.map((task: Task, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-md shadow">
              {task.title}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No tasks available</p>
        )}
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
