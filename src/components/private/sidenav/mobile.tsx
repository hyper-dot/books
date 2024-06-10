import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import SideNavContent from "./content";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const MobileSideNav = () => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname().split("/").splice(1);
  console.log(pathName);
  return (
    <>
      <ul className="capitalize hidden md:flex gap-1 font-semibold text-sm cursor-default">
        {pathName.map((k, idx) => (
          <li className="after:contents">
            {k} {idx !== pathName.length - 1 ? "/" : ""}
          </li>
        ))}
      </ul>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div>
            <button className="inline px-2 md:hidden">
              <MenuIcon size={30} strokeWidth={2} />
            </button>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="flex h-full w-[300px] flex-col">
          <SideNavContent setState={setOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
};
