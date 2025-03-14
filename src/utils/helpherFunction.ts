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
