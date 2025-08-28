import { create } from "zustand";

import { Boards, Board, Column, Task } from "../types/boardTypes";

type TBoardStore = {
  boards: Boards;
  activeBoard: Board;
  setBoard: (payload: Boards) => void;
  addBoard: (payload: Board) => void;
  setActiveBoard: (payload: string) => void;
  addColumn: (payload: Column) => void;
  addTask: (payload: Task, columnId: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  deleteColumn: (columnId: string) => void;
  editTask: (columnId: string, taskId: string) => void;
};

export const useBoardStore = create<TBoardStore>((set) => ({
  activeBoard: {
    id: "36542010-0a05-4a98-bf6a-dd97d1ab0191",
    title: "Sample",
    color: "from-cyan-600 to-blue-600",
    columns: [
      {
        id: "36542010-surya16-4a98-bf6a-dd97d1ab0191",
        title: "TODO",
        color: "",
        tasks: [
          {
            id: "36542010-sri5-4a98-bf6a-dd97d1ab0191",
            title: "UI Changes",
            priority: "high",
            labels: ["high"],
          },
        ],
      },
    ],
  },
  boards: [
    {
      id: "36542010-0a05-4a98-bf6a-dd97d1ab0191",
      title: "Sample",
      color: "from-cyan-600 to-blue-600",
      columns: [
        {
          id: "36542010-surya16-4a98-bf6a-dd97d1ab0191",
          title: "TODO",
          color: "",
          tasks: [
            {
              id: "36542010-sri5-4a98-bf6a-dd97d1ab0191",
              title: "UI Changes",
              priority: "low",
              labels: ["medium"],
            },
          ],
        },
      ],
    },
    {
      id: "36542010-990-4a98-bf6a-dd97d1ab0191",
      title: "Test",
      color: "from-gray-600 to-gray-900",
      columns: [],
    },
  ],
  setActiveBoard: (boardId) =>
    set((state) => {
      const foundBoard = state.boards.find((b) => b.id === boardId);
      return { activeBoard: foundBoard };
    }),

  setBoard: (payload: Boards) => set({ boards: payload }),

  addBoard: (payload: Board) =>
    set((state: TBoardStore) => ({
      boards: [
        ...state.boards,
        {
          id: payload.id,
          title: payload.title,
          color: payload.color,
          columns: payload.columns,
        },
      ],
      activeBoard: payload,
    })),

  addColumn: (payload: Column) =>
    set((state: TBoardStore) => {
      const updateBoards = state.boards.map((board: Board) =>
        board.id === state.activeBoard.id
          ? {
              ...board,
              columns: [...board.columns, payload],
            }
          : board
      );

      const updatedActiveBoard = updateBoards.find(
        (board: Board) => board.id === state.activeBoard.id
      );

      return {
        boards: updateBoards,
        activeBoard: updatedActiveBoard,
      };
    }),

  addTask: (payload: Task, columnId: string) =>
    set((state: TBoardStore) => {
      const updatedColumns = state.activeBoard.columns?.map((c: Column) =>
        c.id === columnId ? { ...c, tasks: [...(c.tasks || []), payload] } : c
      );

      const updatedActiveBoard = {
        ...state.activeBoard,
        columns: updatedColumns,
      };

      const updatedBoards = state.boards.map((board: Board) =>
        board.id === state.activeBoard.id ? updatedActiveBoard : board
      );

      return {
        activeBoard: updatedActiveBoard,
        boards: updatedBoards,
      };
    }),

  deleteTask: (columnId: string, taskId: string) =>
    set((state: TBoardStore) => {
      const updatedColumns = state.activeBoard.columns.map((c: Column) =>
        c.id === columnId
          ? { ...c, tasks: c.tasks.filter((t: Task) => t.id !== taskId) }
          : c
      );

      const updatedActiveBoard = {
        ...state.activeBoard,
        columns: updatedColumns,
      };

      const updatedBoards = state.boards.map((board: Board) =>
        board.id === state.activeBoard.id ? updatedActiveBoard : board
      );

      return {
        activeBoard: updatedActiveBoard,
        boards: updatedBoards,
      };
    }),

  deleteColumn: (columnId: string) =>
    set((state: TBoardStore) => {
      const updatedActiveColumn = state.activeBoard.columns.filter(
        (column: Column) => column.id !== columnId
      );

      const updatedActiveState = {
        ...state.activeBoard,
        columns: updatedActiveColumn,
      };

      const updatedBoards = state.boards.map((b: Board) =>
        b.id === state.activeBoard.id ? updatedActiveState : b
      );

      return {
        activeBoard: updatedActiveState,
        boards: updatedBoards,
      };
    }),

  editColumn: () => set({}),
  editTask: () => set({}),
}));
