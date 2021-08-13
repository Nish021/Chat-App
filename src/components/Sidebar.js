import React, { useEffect, useRef, useState } from "react";
import { Divider } from "rsuite";
import CreateRoomBtnModal from "./dashboard/CreateRoomBtnModal";
import DashBoardToggle from "./dashboard/DashBoardToggle";
import ChatRoomList from "./rooms/ChatRoomList";

const Sidebar = () => {
  //to calculate the height of the room list
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  //inside useEffect , get the actual heoght of the div and set it to height state
  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashBoardToggle />
        <CreateRoomBtnModal />
        <Divider>Join the Conversation</Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
