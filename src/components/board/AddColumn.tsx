import AddIcon from "@mui/icons-material/Add";
import { useBoardStore } from "../../store/boardStore";
import { v4 as uuidv4 } from "uuid";
import { Column } from "../../types/boardTypes";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddTask } from "./AddTask";

export const AddColumn = () => {
  const addNewColoumn = useBoardStore((state) => state.addColumn);
  const activeColumns = useBoardStore((state) => state.activeBoard).columns;
  const [isAddList, setIsAddList] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

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

  console.log(activeColumns, "acc");

  return (
    <div className="p-4 flex w-max gap-4 ">
      {activeColumns?.map((column) => (
        <div
          key={column.id}
          className="bg-white self-start w-[290px] rounded-xl min-h-[120px] max-h-[100vh] flex flex-col"
        >
          <p className="p-3 font-semibold">{column.title}</p>
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
    </div>
  );
};
