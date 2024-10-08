import TopBar from "@/components/common/TopBar";
import SideNav from "@/components/private/sidenav";
import RefreshToken from "@/components/RefreshToken";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <RefreshToken />
      <div className="relative flex">
        <SideNav />
        <div className="flex-1">
          <TopBar />
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
