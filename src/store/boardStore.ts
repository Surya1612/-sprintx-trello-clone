import { create } from "zustand";

import { Boards, Board } from "../types/boardTypes";
import { v4 as uuidv4 } from "uuid";

type TBoardStore = {
  boards: Boards;
  setBoard: (payload: Boards) => void;
  addBoard: (payload: Board) => void;
};

export const useBoardStore = create<TBoardStore>((set) => ({
  boards: [],
  setBoard: (payload: Boards) => set({ boards: payload }),
  addBoard: (payload: Board) =>
    set((state: TBoardStore) => ({
      boards: [
        ...state.boards,
        {
          id: uuidv4(),
          title: payload.title,
          color: payload.color,
          columns: [],
        },
      ],
    })),
}));
