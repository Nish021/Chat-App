import React, { createContext, useState, useEffect, useContext } from "react";
import { database } from "../misc/firebase";
import { transformToArrWithId } from "../misc/helper";

const RoomsContext = createContext();

//provider
export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref("rooms");

    //real time listener
    roomListRef.on("value", (snap) => {
      // console.log("snap.val()", snap.val());
      const data = transformToArrWithId(snap.val());
      // console.log("data", data);

      setRooms(data);
    });

    return () => {
      //detach all real time listener from this reference inside database
      roomListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
