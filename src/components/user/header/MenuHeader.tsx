import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Searchbar from "./Searchbar";
import { Button } from "@/components/ui/button";
import StartTeaching from "../StartTeaching";

const MenuHeader = () => {
  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger>
          <Menu size={40} className="lg:hidden" />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-200">
          <div className="w-[250px] mt-10">
            <Searchbar />
          </div>
          <div className="flex flex-col gap-2 mt-6 items-center">
            <Button variant={"secondary"} className="w-full">
              All courses
            </Button>
            <Button variant={"secondary"} className="w-full">
              Learn
            </Button>
            <Button variant={"secondary"} className="w-full">
              About
            </Button>
            <div className="w-full">
              <StartTeaching />
            </div>
            <div className="absolute bottom-10 w-full px-6">
                <Button className="w-full">
                    Signin
                </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuHeader;
