import SideNav from "@/components/private/sidenav";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex">
      <SideNav />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default layout;
