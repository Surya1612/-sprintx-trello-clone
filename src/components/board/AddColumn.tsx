import AddIcon from "@mui/icons-material/Add";

export const AddColumn = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 h-[calc(100vh-108px)] p-4">
      <div className="p-3 bg-[#ffffff33] flex items-center rounded-xl gap-2 w-[250px] cursor-pointer">
        <AddIcon fontSize="small" sx={{ color: "#FFF" }} />
        <p className="text-sm font-semibold text-white">Add another list</p>
      </div>
    </div>
  );
};
