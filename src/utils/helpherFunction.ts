export const getHeaderColor = (gradient: string): string => {
  const colors = gradient
    .split(" to-")
    .map((c) => c.replace("from-", "").trim());

  if (colors.length === 2) {
    return `${colors[1]}`;
  }
  return "gray-500";
};
