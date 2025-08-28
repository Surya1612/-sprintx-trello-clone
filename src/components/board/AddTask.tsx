import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useBoardStore } from "../../store/boardStore";
import { Task } from "../../types/boardTypes";
import { v4 as uuidv4 } from "uuid";

import deleteIcon from "../../assets/trash.svg";
import { DefaultModal } from "../common-components/modal/DefaultModal";
import { getLabelClass, getPriorityBorder } from "../../utils/helpherFunction";

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

  const handleNewTask = () => {
    const newTaskData: Task = {
      id: uuidv4(),
      title: "New Task",
      description: "click to edit this card",
      priority: "low",
    };
    addNewTask(newTaskData, columnId);
    setTaskTitle("");
    setIsAddTask(false);
  };

  const handleClose = () => {
    setIsAddTask(false);
    setTaskTitle("");
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(columnId, taskId as string);
  };

  return (
    <div className="">
      <div className="space-y-4 mb-4 mt-1 px-4 ">
        {activeTasks.length > 0 ? (
          activeTasks.map((task: Task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-md  transition-all duration-200 ${getPriorityBorder(
                task.priority
              )}`}
            >
              <div className="flex">
                <h4 className="font-semibold text-gray-800 mb-2 leading-tight">
                  {task.title}
                </h4>
                <img
                  src={deleteIcon}
                  onClick={() => handleDeleteTask(task.id)}
                  className="ml-auto"
                  alt="delete"
                />
              </div>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {task.description ?? "No description"}
              </p>
              <div className="flex justify-between items-center">
                {task.labels && (
                  <div className="flex gap-1.5">
                    {task.labels.map((label, index) => (
                      <span
                        key={index}
                        className={getLabelClass(label.toLowerCase())}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
                <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  S
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No tasks available</p>
        )}
      </div>

      {isAddTask && (
        <DefaultModal
          title={"ADD TASK"}
          handleClose={() => handleClose()}
          submitProps={{
            text: "ADD",
            disableAction: !taskTitle,
            handleSubmit: handleNewTask,
          }}
          dialogStyles={{ width: "500px", maxWidth: "500px" }}
        >
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
        </DefaultModal>
      )}

      <div className="px-4 mb-4">
        <div
          onClick={() => handleNewTask()}
          className="flex items-center p-3 bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-xl text-blue-500 cursor-pointer transition-all duration-200 ease-in font-medium "
        >
          <AddIcon />
          <p>Add a card</p>
        </div>
      </div>
    </div>
  );
};
