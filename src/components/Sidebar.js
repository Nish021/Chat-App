import React from "react";
import DashBoardToggle from "./dashboard/DashBoardToggle";

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashBoardToggle />
        top
      </div>
      bottom
    </div>
  );
};

export default Sidebar;
