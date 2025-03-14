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
};

export const useBoardStore = create<TBoardStore>((set) => ({
  activeBoard: {
    id: "36542010-990-4a98-bf6a-dd97d1ab0191",
    title: "Test",
    color: "from-gray-600 to-gray-900",
    columns: [],
  },
  boards: [
    {
      id: "36542010-0a05-4a98-bf6a-dd97d1ab0191",
      title: "Sample",
      color: "from-cyan-600 to-blue-600",
      columns: [],
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
          columns: [],
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
}));
