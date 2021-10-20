import React, { useState, createContext, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

//Just a Wrapper
const ProfileContext = createContext();

//Provider
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    //allow to subscribe to currently signed in user inside the firebase
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      // console.log('authObj',authObj) //user object will be here if signed in
      if (authObj) {
        //if authObj existd
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        // get data from the database and put real time subscription on this data
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            //  we need get data from the real time database
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });

        database.ref(".info/connected").on("value", (snapshot) => {
          if (!!snapshot.val() === false) {
            return;
          }

          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }

        if (userStatusRef) {
          userStatusRef.off();
        }
        database.ref(".info/connected").off();
        //if null , then the user is not signed in
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsub();
      if (userRef) {
        userRef.off();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }

      database.ref(".info/connected").off();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
