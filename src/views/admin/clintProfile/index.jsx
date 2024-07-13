import {
  Avatar,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "views/admin/clintProfile/assets/avatar1.png";
import Personal from "./components/personal";
import BusinessInfo from "./components/businessInfo";
import Verification from "./components/verification";
import Services from "./components/services";
import Goals from "./components/goal";
import useUserDisplayName from "components/hooks/useUserDisplayName";
import { db } from "config/firebase";
import { auth } from "config/firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/database";
import { storage } from "config/firebase";

const Profile = () => {
  const { displayName, uid } = useUserDisplayName(db, auth);
  const [profilePicture, setProfilePicture] = useState("");
  const [userId, setUserId] = useState(uid);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setProfilePicture(userDoc.data().profilePicture || "");
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `profilePictures/${file.name}`);
    await uploadBytes(storageRef, file);

    // Get the download URL for the uploaded file
    const downloadUrl = await getDownloadURL(storageRef);
    setProfilePicture(downloadUrl);

    // Update the user's profile picture in Firestore
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { profilePicture: downloadUrl });

    // Optionally, clear the input field after successful upload
    event.target.value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, userData);
  };

  return (
    <div className="d-flex flex-row mb-3">
      <Flex>
        <Flex flexDirection="column">
          <Avatar size="2xl" name={displayName} src={profilePicture} />
          <input
            type="file"
            id="actual-btn"
            hidden
            onChange={handleFileChange}
          />
          <label
            for="actual-btn"
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#407BFF",
              color: "white",
              padding: "0.5rem",
              borderRadius: "1rem",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Choose File
          </label>
        </Flex>

        <div style={{ marginLeft: "1rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {displayName}
          </h1>
          <p>Profile Completion : 100%</p>
        </div>
      </Flex>
      <div style={{ marginTop: "2rem" }}>
        <Tabs variant="soft-rectangle" colorScheme="#FFFFFF">
          <TabList ml="4" mr="3">
            <Tab
              backgroundColor="#FFFFFF"
              mr="6"
              borderRadius="8px"
              paddingInline={"5"}
            >
              Personal
            </Tab>
            <Tab
              backgroundColor="#FFFFFF"
              mr="6"
              borderRadius="8px"
              paddingInline={"5"}
            >
              Business Info
            </Tab>
            <Tab
              backgroundColor="#FFFFFF"
              mr="6"
              borderRadius="8px"
              paddingInline={"5"}
            >
              Goals
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Personal />
            </TabPanel>
            <TabPanel>
              <BusinessInfo />
            </TabPanel>
            <TabPanel>
              <Goals />
            </TabPanel>
            <TabPanel>
              <Verification />
            </TabPanel>
            <TabPanel>
              <Services />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
