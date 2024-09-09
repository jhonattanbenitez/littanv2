import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";

import React from "react";

const MenuListMobile = () => {
  return (
    <Popover>
      <PopoverTrigger><Menu /></PopoverTrigger>
      <PopoverContent>
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <a href="/categoria/camisetas">Camisetas</a>
          </li>
          <li>
            <a href="/categoria/oversize">Oversize</a>
          </li>
          <li>
            <a href="/categoria/accesorios">Accesorios</a>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MenuListMobile;
