import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { MenuOpen } from "@mui/icons-material";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CiMenuKebab } from "react-icons/ci";

export function PopoverDemo() {
  const onButtonClick = (e, row) => {
    e.stopPropagation(); // Prevents the click event from propagating up to parent elements
    // Implement your logic for handling the click event on a specific row
    console.log("Clicked row:", row);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CiMenuKebab />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => onButtonClick(e, row)} // Ensure 'row' is defined and passed correctly
            sx={{ color: "black" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "black" }}
            onClick={(e) => onButtonClick(e, row)} // Ensure 'row' is defined and passed correctly
          >
            Delete
          </Button>
        </Box>
      </PopoverContent>
    </Popover>
  );
}
