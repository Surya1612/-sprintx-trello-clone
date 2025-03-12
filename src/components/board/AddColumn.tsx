import AddIcon from "@mui/icons-material/Add";

export const AddColumn = () => {
  const tasks = [
    { id: 1, name: "Design Homepage UI", status: "To Do" },
    { id: 2, name: "Fix Login Bug", status: "In Progress" },
  ];

  return (
    <div className="p-4 flex gap-4">
      <div className="bg-white w-[290px] rounded-xl min-h-[120px] max-h-[100vh] flex flex-col">
        <p className="p-3 font-semibold">TO DO</p>
        <div className="flex flex-col gap-2 px-3 overflow-y-auto flex-grow">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-md shadow">
                {task.name}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No tasks available</p>
          )}
        </div>

        <div className="p-3 flex items-center rounded-xl gap-2 cursor-pointer">
          <AddIcon fontSize="small" sx={{ color: "#172b4d" }} />
          <p className="text-sm font-semibold text-[#172b4d]">Add a card</p>
        </div>
      </div>

      <div className="p-3 bg-[#ffffff33] h-[40px] flex items-center rounded-xl gap-2 w-[250px] cursor-pointer">
        <AddIcon fontSize="small" sx={{ color: "#FFF" }} />
        <p className="text-sm font-semibold text-white">Add a list</p>
      </div>
    </div>
  );
};
