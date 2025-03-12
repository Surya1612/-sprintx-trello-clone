import { create } from "zustand";

import { Boards, Board } from "../types/boardTypes";

type TBoardStore = {
  boards: Boards;
  activeBoard: Board;
  setBoard: (payload: Boards) => void;
  addBoard: (payload: Board) => void;
  setActiveBoard: (payload: string) => void;
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
}));
