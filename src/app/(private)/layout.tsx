import TopBar from "@/components/common/TopBar";
import SideNav from "@/components/private/sidenav";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="relative flex">
        <SideNav />
        <div className="flex-1">
          <TopBar />
          <main className="px-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default layout;
