"use client";
import Link from "next/link";
import {
  Gauge,
  Library,
  NotebookPen,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePathname } from "next/navigation";

const menus = [
  { title: "Dashboard", to: "/dashboard", icon: <Gauge size={20} /> },
  { title: "Parties", to: "/parties", icon: <Users size={20} /> },
  { title: "Records", to: "/records", icon: <NotebookPen size={20} /> },
  { title: "Inventory", to: "/inventory", icon: <Package size={20} /> },
  { title: "Accounts", to: "/accounts", icon: <Library size={20} /> },
  { title: "Settings", to: "/settings", icon: <Settings size={20} /> },
];

const SideNavContent = ({
  setState,
}: {
  setState?: (state: boolean) => void;
}) => {
  const pathName = usePathname();

  return (
    <>
      <div className="flex justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="" height={25} width={25} />
          <span className="text-2xl font-bold">LedgerLite</span>
        </Link>
      </div>

      <ul className="space-y-3 pt-10">
        {menus.map((m, idx) => (
          <li key={idx}>
            <Link
              onClick={() => {
                if (setState) {
                  setState(false);
                }
              }}
              href={m.to}
              className={cn(
                "flex items-center gap-2 rounded-md px-1 py-2 transition-all duration-200 hover:bg-accent-foreground/5",
                pathName.startsWith(m.to)
                  ? "bg-primary font-semibold text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "",
              )}
            >
              {m.icon}
              {m.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideNavContent;
