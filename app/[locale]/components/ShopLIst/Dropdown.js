import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dropdown = ({ name }) => {
  return (
    <DropdownMenu className="bg-[#D3D3CB] focus:outline-none">
      <DropdownMenuTrigger className="focus:outline-none focus:border-red-500 px-2">
        <span>
          <svg
            fill="white"
            className="w-10 h-10 inline-block "
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" fill="none" width="24" height="24" />

            <g>
              <path d="M7 10l5 5 5-5" />
            </g>
          </svg>
          {name}{" "}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#D3D3CB] min-w-52 px-9 mt-1 border-[#1E293B]  text-[#1E293B] font-light">
        <DropdownMenuLabel className="text-xl">
          Fashion and Apparel
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xl">Men's Clothing</DropdownMenuItem>
        <DropdownMenuItem className="text-xl">
          Shoes and Footwear
        </DropdownMenuItem>
        <DropdownMenuLabel className="text-xl">Electronics</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xl">
          Computers and Laptops
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xl">
          Cameras and Photography Equipment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
