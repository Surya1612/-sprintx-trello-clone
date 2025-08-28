export type Priority = "low" | "medium" | "high";

export type Label = "high" | "medium" | "low" | "feature" | "bug";

export type Task = {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
  priority: Priority;
};

export type Column = {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
};

export type Board = {
  id: string;
  title: string;
  color: string;
  columns: Column[];
};

export type Boards = Board[];
