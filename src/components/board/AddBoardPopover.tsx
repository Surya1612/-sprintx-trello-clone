import { Button, Popover, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import skeletonIcon from "../../assets/skeleton.svg";

const gradients = [
  "from-cyan-600 to-blue-600",
  "from-pink-600 to-purple-600",
  "from-red-600 to-orange-600",
  "from-indigo-600 to-fuchsia-600",
  "from-rose-600 to-amber-600",
  "from-gray-600 to-gray-900",
  "from-sky-600 to-indigo-700",
  "from-violet-600 to-blue-700",
];

interface TAddBoardProps {
  handleClose: () => void;
  handleFormData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    name: string
  ) => void;
  newBoard: { title: string; background: string };
  onSubmit: () => void;
  anchorEl: HTMLElement | null;
}

export const AddBoardPopover = ({
  handleClose,
  handleFormData,
  newBoard,
  onSubmit,
  anchorEl,
}: TAddBoardProps) => {
  return (
    <Popover
      sx={{ left: "22px" }}
      open={true}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        style: { width: "300px" },
        className: "p-4 h-[80vh] ",
      }}
    >
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold mx-auto text-sm">Create Board</p>
        <CloseIcon
          fontSize="small"
          sx={{
            color: "#626f86",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#F4F4F5",
              borderRadius: "8px",
            },
          }}
          onClick={handleClose}
        />
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div
          className={`bg-gradient-to-r ${newBoard.background} px-3.5 py-1.5 rounded-md font-semibold text-white w-[200px] h-[120px] flex items-center justify-center`}
        >
          <div className="flex gap-2  p-2 justify-center items-center">
            <img src={skeletonIcon} />
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold">Background</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {gradients.map((gradient, index) => (
          <div
            onClick={() => handleFormData(gradient, "background")}
            key={index}
            className={`bg-gradient-to-r cursor-pointer ${gradient} px-3.5 py-1.5 rounded-md font-semibold text-white w-[50px] h-[40px]`}
          >
            {gradient === newBoard.background && <DoneIcon fontSize="small" />}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold">
          Board title <span className="text-[#ff0000]">*</span>
        </p>
        <TextField
          fullWidth
          sx={{ marginTop: "8px" }}
          required
          id="outlined-required"
          onChange={(e) => handleFormData(e, "title")}
          value={newBoard.title}
          size="small"
        />
        <p className="text-xs opacity-75 mt-1">Board title is required</p>
      </div>
      <Button
        fullWidth
        variant="contained"
        sx={{ marginTop: "16px", textTransform: "capitalize" }}
        disabled={!newBoard.title}
        onClick={() => onSubmit()}
      >
        Create
      </Button>
    </Popover>
  );
};
