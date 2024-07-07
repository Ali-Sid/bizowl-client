import React, { useEffect, useState } from "react";
import logo from "assets/img/layout/logo-of-BIZOWL--Business-Services-Logo.png";
import profile from "assets/img/layout/clint-profile.jpg";

// Chakra imports
import {
  Avatar,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import { FaAngleRight } from "react-icons/fa6";
import { auth } from "config/firebase";
import { db } from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection } from "firebase/firestore";
import useUserDisplayName from "components/hooks/useUserDisplayName";

function extractEmailUsername(username) {
  // Check if the username contains '@'
  if (username.includes("@")) {
    // Split the string at '@' and take the first part
    return username.split("@")[0];
  }
  // Return the original username if it doesn't contain '@'
  return username;
}

function capitalizeFirstLetter(string) {
  if (typeof string === "string") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string; // Return original string if not a string type
}

export function Brand({ setIsCollapse }) {
  // const [userName, setUserName] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;

  //       // Attempt to fetch user details from Firestore
  //       const userRef = doc(db, 'users', uid);
  //       const userSnap = await getDoc(userRef);

  //       let displayName;
  //       if (userSnap.exists()) {
  //         console.log('Firestore Name:', userSnap.data().firstName || userSnap.data().email); // Debugging log
  //         displayName = extractEmailUsername(userSnap.data().firstName || userSnap.data().email);
  //       } else {
  //         console.log('Firebase Auth Email:', user.email); // Debugging log
  //         displayName = extractEmailUsername(user.email);
  //       }

  //       displayName = capitalizeFirstLetter(displayName);
  //       console.log('Final Display Name:', displayName); // Debugging log

  //       setUserName(displayName);

  //       setIsLoading(false);
  //     } else {
  //       // No user is signed in
  //       setUserName("Guest");
  //       setIsLoading(false);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);
  const { displayName, isLoading } = useUserDisplayName(db, auth);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Flex align="center" direction="column">
        <a href="https://www.bizzowl.com">
          <img src={logo} alt="Bizowl-logo" height="26px" width="175px" />
        </a>
      </Flex>

      <button
        style={{
          height: "20px",
          width: "20px",
          backgroundColor: "#fff",
          color: "black",
          fontSize: "20px",
          borderRadius: "5px",
          position: "absolute",
          top: "54px",
          right: "3px",
          transition: "all 0.2s ease-out",
        }}
      >
        <FaAngleRight onClick={() => setIsCollapse(true)} />
      </button>

      <Flex align="center" direction="column" padding="15px" mt="8">
        <div
          className="profile-pic"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div className="image">
            {/* <img
              src={profile}
              alt="Bizowl-logo"
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            /> */}
            <Avatar name={displayName}/>
          </div>
          <p style={{ fontSize: "15px", color: "white" }}>{displayName}</p>
        </div>
      </Flex>
    </>
  );
}

export default Brand;
