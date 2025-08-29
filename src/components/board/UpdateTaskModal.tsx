import {
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Box,
  Typography,
  Divider,
  Paper,
  Avatar,
  Fade,
  Zoom,
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

const labelColors: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  Bug: {
    bg: "#fee2e2",
    color: "#dc2626",
    border: "#fecaca",
  },
  Feature: {
    bg: "#dbeafe",
    color: "#2563eb",
    border: "#bfdbfe",
  },
  Enhancement: {
    bg: "#dcfce7",
    color: "#16a34a",
    border: "#bbf7d0",
  },
  Research: {
    bg: "#ede9fe",
    color: "#7c3aed",
    border: "#ddd6fe",
  },
  "UI/UX": {
    bg: "#fce7f3",
    color: "#db2777",
    border: "#fbcfe8",
  },
  Backend: {
    bg: "#fef9c3",
    color: "#ca8a04",
    border: "#fef08a",
  },
  Frontend: {
    bg: "#e0e7ff",
    color: "#4f46e5",
    border: "#c7d2fe",
  },
  Blocked: {
    bg: "#f3f4f6",
    color: "#374151",
    border: "#d1d5db",
  },
  "In Progress": {
    bg: "#ffedd5",
    color: "#ea580c",
    border: "#fed7aa",
  },
  "Review Needed": {
    bg: "#ccfbf1",
    color: "#0d9488",
    border: "#99f6e4",
  },
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

  const availableLabels = [
    "Bug",
    "Feature",
    "Enhancement",
    "Research",
    "UI/UX",
    "Backend",
    "Frontend",
    "Blocked",
    "In Progress",
    "Review Needed",
  ];

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
      borderRadius: "12px",
      padding: "12px 24px",
      fontWeight: 600,
      boxShadow: `0 8px 25px -5px ${darkShadeBg}40`,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: `0 12px 35px -5px ${darkShadeBg}60`,
      },
    },
    secondary: {
      border: "2px solid #e5e7eb",
      color: "#6b7280",
      background: "transparent",
      borderRadius: "12px",
      padding: "12px 24px",
      fontWeight: 500,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        borderColor: "#d1d5db",
        background: "#f9fafb",
      },
    },
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#22c55e";
      default:
        return "#6b7280";
    }
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
      handleClose={onClose}
      submitProps={{
        text: "Save Changes",
        disableAction: !title.trim(),
        handleSubmit: handleUpdateTask,
      }}
      dialogStyles={{
        width: 560,
        maxWidth: 560,
        borderRadius: "20px",
        overflow: "hidden",
      }}
      actionStyles={actionStyles}
    >
      <Fade in timeout={300}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                background: `linear-gradient(135deg, ${headerBgColor}15 0%, ${headerBgColor}08 100%)`,
                borderRadius: "16px",
                border: `1px solid ${headerBgColor}20`,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: headerBgColor,
                  width: 48,
                  height: 48,
                  boxShadow: `0 8px 25px -8px ${headerBgColor}60`,
                }}
              >
                📝
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#1f2937",
                    fontSize: "1.25rem",
                  }}
                >
                  Edit Task Details
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                >
                  Update your task information and settings
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Task Title *
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter a clear, descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                error={!title.trim()}
                helperText={!title.trim() ? "Task title is required" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fafbfc",
                    border: "2px solid #e5e7eb",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                      borderColor: headerBgColor + "30",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#ffffff",
                      borderColor: headerBgColor,
                      boxShadow: `0 0 0 4px ${headerBgColor}15`,
                    },
                    "& fieldset": {
                      border: "none",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "16px 18px",
                    fontSize: "1rem",
                    fontWeight: 500,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                placeholder="Describe the task details, requirements, or notes..."
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fafbfc",
                    border: "2px solid #e5e7eb",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                      borderColor: headerBgColor + "30",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#ffffff",
                      borderColor: headerBgColor,
                      boxShadow: `0 0 0 4px ${headerBgColor}15`,
                    },
                    "& fieldset": {
                      border: "none",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 1, opacity: 0.6 }} />

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Priority Level
              </Typography>

              <FormControl fullWidth>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  variant="outlined"
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: `2px solid ${getPriorityColor(priority)}20`,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: getPriorityColor(priority) + "40",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: getPriorityColor(priority),
                      boxShadow: `0 0 0 4px ${getPriorityColor(priority)}15`,
                    },
                    "& .MuiSelect-select": {
                      padding: "16px 18px",
                      fontWeight: 600,
                    },
                  }}
                >
                  <MenuItem
                    value="high"
                    sx={{
                      borderRadius: "8px",
                      mx: 1,
                      my: 0.5,
                      "&:hover": {
                        backgroundColor: "#fef2f2",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      🔥 <span style={{ fontWeight: 600 }}>High</span>
                    </Box>
                  </MenuItem>
                  <MenuItem
                    value="medium"
                    sx={{
                      borderRadius: "8px",
                      mx: 1,
                      my: 0.5,
                      "&:hover": {
                        backgroundColor: "#fffbeb",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      ⚡ <span style={{ fontWeight: 600 }}>Medium</span>
                    </Box>
                  </MenuItem>
                  <MenuItem
                    value="low"
                    sx={{
                      borderRadius: "8px",
                      mx: 1,
                      my: 0.5,
                      "&:hover": {
                        backgroundColor: "#f0fdf4",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      🌱 <span style={{ fontWeight: 600 }}>Low</span>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                🏷️ Labels
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9ca3af",
                    fontWeight: 400,
                    ml: "auto",
                  }}
                >
                  {labels.length} selected
                </Typography>
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  border: "2px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                    justifyContent: "center",
                  }}
                >
                  {availableLabels.map((label, index) => {
                    const isSelected = labels.includes(label);
                    const colors = labelColors[label] || {
                      bg: "#f3f4f6",
                      color: "#374151",
                      border: "#d1d5db",
                    };

                    return (
                      <Zoom in timeout={200 + index * 100} key={label}>
                        <Chip
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: isSelected ? 700 : 500,
                                fontSize: "0.875rem",
                              }}
                            >
                              {capitalize(label)}
                            </Typography>
                          }
                          clickable
                          onClick={() => toggleLabel(label)}
                          sx={{
                            height: 48,
                            borderRadius: "12px",
                            backgroundColor: isSelected ? colors.bg : "#ffffff",
                            color: isSelected ? colors.color : "#6b7280",
                            border: `2px solid ${
                              isSelected ? colors.border : "#e5e7eb"
                            }`,
                            fontWeight: isSelected ? 700 : 500,
                            minWidth: "100px",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: isSelected ? "scale(1.05)" : "scale(1)",
                            boxShadow: isSelected
                              ? `0 8px 25px -8px ${colors.color}40`
                              : "0 2px 8px -2px #00000010",
                            "&:hover": {
                              transform: "scale(1.08) translateY(-2px)",
                              boxShadow: isSelected
                                ? `0 12px 35px -8px ${colors.color}50`
                                : `0 8px 25px -8px ${colors.color}30`,
                              borderColor: colors.border,
                              backgroundColor: colors.bg,
                            },
                            "&:active": {
                              transform: "scale(1.02)",
                            },
                          }}
                        />
                      </Zoom>
                    );
                  })}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Fade>
    </DefaultModal>
  );
};
