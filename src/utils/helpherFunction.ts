import { Column, Priority } from "../types/boardTypes";

export const getHeaderColor = (gradient: string): string => {
  const colors = gradient
    .split(" to-")
    .map((c) => c.replace("from-", "").trim());

  if (colors.length === 2) {
    return `${colors[1]}`;
  }
  return "gray-500";
};

export const getDarkerShade = (color: string) => {
  const tailwindColorMap: Record<string, string> = {
    "blue-600": "#2563eb",
    "purple-600": "#9333ea",
    "orange-600": "#ea580c",
    "fuchsia-600": "#c026d3",
    "amber-600": "#d97706",
    "gray-900": "#111827",
    "indigo-700": "#4338ca",
    "blue-700": "#1d4ed8",
  };

  return tailwindColorMap[color] || "gray-700";
};

export const getPriorityBorder = (priority: Priority): string => {
  const borders = {
    high: "border-l-4 border-red-500",
    medium: "border-l-4 border-orange-500",
    low: "border-l-4 border-green-500",
  };
  return borders[priority] || "border-l-4 border-green-500";
};

export const getLabelClass = (label: string) => {
  const classes: Record<string, string> = {
    high: "bg-red-100 text-red-600",
    medium: "bg-orange-100 text-orange-600",
    low: "bg-green-100 text-green-600",
    feature: "bg-blue-100 text-blue-600",
    bug: "bg-red-100 text-red-600",
  };

  return `px-2 py-1 rounded text-xs font-semibold uppercase ${
    classes[label] || "bg-gray-100 text-gray-600"
  }`;
};

export const findTaskById = (columns: Column[], taskId: string) => {
  for (const column of columns) {
    const task = column.tasks.find((t) => t.id === taskId);
    if (task) {
      return { task, columnId: column.id };
    }
  }
  return null;
};
