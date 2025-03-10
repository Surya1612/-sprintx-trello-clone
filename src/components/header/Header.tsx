import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import SearchIcon from "@mui/icons-material/Search";

export const Header = () => {
  return (
    <div className="bg-[#7d2650] h-[48px] flex items-center gap-1 px-4 border-b border-[#ffffff29]">
      <AnalyticsOutlinedIcon sx={{ color: "#fff" }} />
      <p className="text-xl font-semibold text-white">SprintX</p>

      <div className="flex items-center ml-auto gap-3">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            background: "#fff",
            borderRadius: "4px",
            ".MuiOutlinedInput-root	": {
              height: "30px",
              fontSize: "12px",
            },
          }}
        />
        <NotificationsIcon fontSize="small" sx={{ color: "#FFF" }} />
        <HelpIcon fontSize="small" sx={{ color: "#FFF" }} />
        <Avatar sx={{ width: 30, height: 30, bgcolor: "orange" }}>S</Avatar>
      </div>
    </div>
  );
};
