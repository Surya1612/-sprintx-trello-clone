import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { DefaultModal } from "../common-components/modal/DefaultModal";
import { useBoardStore } from "../../store/boardStore";
import {
  findTaskById,
  getDarkerShade,
  getHeaderColor,
} from "../../utils/helpherFunction";
import { Priority } from "../../types/boardTypes";

type UpdateTaskProps = {
  onClose: () => void;
  currentTaskId: string;
};

export const UpdateTaskModal = ({
  onClose,
  currentTaskId,
}: UpdateTaskProps) => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const activeTask = findTaskById(activeBoard.columns, currentTaskId);
  const updateTask = useBoardStore((state) => state.updateTask);

  const [title, setTitle] = useState(activeTask?.task?.title ?? "");
  const [description, setDescription] = useState(
    activeTask?.task?.description ?? ""
  );
  const [priority, setPriority] = useState<Priority>(
    activeTask?.task?.priority ?? "low"
  );
  const [labels, setLabels] = useState<string[]>(
    activeTask?.task?.labels ?? []
  );

  const availableLabels = ["high", "medium", "low"];
  const toggleLabel = (label: string) =>
    setLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const headerBgColor = getHeaderColor(activeBoard.color);
  const darkShadeBg = getDarkerShade(headerBgColor);

  const actionStyles = {
    primary: {
      whiteSpace: "nowrap",
      background: darkShadeBg,
      color: "#FFF",
    },
    secondary: {
      border: 0,
      color: "inherit",
      background: "#e5e5e5",
    },
  };

  const handleUpdateTask = () => {
    if (!activeTask) return;

    updateTask(activeTask?.columnId, activeTask?.task.id, {
      title,
      description,
      labels,
      priority,
    });
    onClose();
  };

  return (
    <DefaultModal
      title="Update Task"
      handleClose={onClose}
      submitProps={{
        text: "Save",
        disableAction: !title.trim(),
        handleSubmit: handleUpdateTask,
      }}
      dialogStyles={{ width: 500, maxWidth: 500 }}
      actionStyles={actionStyles}
    >
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        placeholder="Add description..."
        multiline
        minRows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          label="Priority"
        >
          <MenuItem value="high">🔥 High</MenuItem>
          <MenuItem value="medium">⚡ Medium</MenuItem>
          <MenuItem value="low">🌱 Low</MenuItem>
        </Select>
      </FormControl>

      <div className="mt-2">
        <InputLabel sx={{ mb: 1 }}>Labels</InputLabel>
        <div className="flex flex-wrap gap-1">
          {availableLabels.map((label) => {
            const isSelected = labels.includes(label);
            return (
              <Chip
                key={label}
                label={capitalize(label)}
                clickable
                onClick={() => toggleLabel(label)}
                color={isSelected ? "primary" : "default"}
                variant={isSelected ? "filled" : "outlined"}
              />
            );
          })}
        </div>
      </div>
    </DefaultModal>
  );
};
