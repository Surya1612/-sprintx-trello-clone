import { AddColumn } from "./AddColumn";

export const BoardView = () => {
  return (
    <div className="flex-1">
      <div className="bg-blue-900 p-4">
        <p className="font-semibold text-xl text-white">Sample</p>
      </div>
      <div>
        <AddColumn />
      </div>
    </div>
  );
};
