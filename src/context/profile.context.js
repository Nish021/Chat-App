import React, { useState, createContext, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";
//Just a Wrapper
const ProfileContext = createContext();

//Provider
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    //allow to subscribe to currently signed in user inside the fairebase
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      // console.log('authObj',authObj) //user object will be here if signed in
      if (authObj) {
        //if authObj existd
        // get data from the database and put real time subscription on this data
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt } = snap.val();

          const data = {
            //  we need get data from the real time database
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
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
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
