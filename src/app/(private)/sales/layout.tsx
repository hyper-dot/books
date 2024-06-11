"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const tabs = [
  { title: "Sales", to: "/sales" },
  { title: "Customers", to: "/sales/customers" },
  { title: "Product", to: "/sales/products" },
];

const layout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  return (
    <div>
      <ul className="flex gap-5 px-2 border-b">
        {tabs.map((t, idx) => (
          <li
            key={idx}
            className={cn(
              "pt-2 border-b-2 font-medium px-2 border-transparent",
              pathName === t.to
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "",
            )}
          >
            <Link className="outline-none" href={t.to}>
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default layout;
