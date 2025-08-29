import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";
import { useBoardStore } from "../../store/boardStore";
import { Task } from "../../types/boardTypes";
import { v4 as uuidv4 } from "uuid";

import deleteIcon from "../../assets/trash.svg";
import { getLabelClass, getPriorityBorder } from "../../utils/helpherFunction";
import { UpdateTaskModal } from "./UpdateTaskModal";

import { Draggable } from "@hello-pangea/dnd";

export const AddTask = ({
  columnId,
  activeTasks,
}: {
  columnId: string;
  activeTasks: Task[];
}) => {
  const addNewTask = useBoardStore((state) => state.addTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [editTaskId, setEditTaskId] = useState("");

  const handleNewTask = () => {
    const newTaskData: Task = {
      id: uuidv4(),
      title: "New Task",
      description: "Add Description here..",
      priority: "low",
    };
    addNewTask(newTaskData, columnId);
  };

  const handleClose = () => {
    setEditTaskId("");
  };

  const handleDeleteTask = (event: React.MouseEvent, taskId: string) => {
    event.stopPropagation();
    deleteTask(columnId, taskId);
  };

  return (
    <div className="">
      <div className="space-y-4 mb-4 mt-1 px-4 ">
        {activeTasks.length > 0 ? (
          activeTasks.map((task: Task, index: number) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-200 ${getPriorityBorder(
                    task.priority
                  )}`}
                  onClick={() => setEditTaskId(task.id)}
                >
                  <div className="flex items-center gap-1 mb-2">
                    <h4 className="font-semibold text-gray-800 leading-tight truncate max-w-[170px]">
                      {task.title}
                    </h4>
                    <img
                      src={deleteIcon}
                      onClick={(e) => handleDeleteTask(e, task.id)}
                      className="ml-auto"
                      alt="delete"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-[170px] truncate">
                    {task.description?.trim()
                      ? task.description
                      : "No description"}
                  </p>
                  <div className="flex justify-between items-center">
                    {task.labels && task.labels.length > 0 && (
                      <div className="flex gap-1.5 items-center">
                        {task.labels.slice(0, 2).map((label, index) => (
                          <span
                            key={index}
                            className={getLabelClass(label.toLowerCase())}
                          >
                            {label}
                          </span>
                        ))}

                        {task.labels.length > 2 && (
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-700">
                            +{task.labels.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      S
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No tasks available</p>
        )}
      </div>

      {editTaskId && (
        <UpdateTaskModal onClose={handleClose} currentTaskId={editTaskId} />
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
