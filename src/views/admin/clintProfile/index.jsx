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
import React, { useState } from "react";
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
import { doc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/database";

const Profile = () => {
  const { displayName } = useUserDisplayName(db, auth);
  const profilePicInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(Image);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserProfile();
  }, []);

  // if (isLoading) return <div>Loading...</div>;

  const handleSelectFile = async (event) => {
    setIsLoading(true);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileName = file.name;
      const storageRef = ref(storage, `profilePicture/${fileName}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        const profileRef = doc(db, "users", userId);
        await updateDoc(profileRef, { profile: downloadUrl });
        setProfilePicture(downloadUrl);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getUserProfile = async () => {
    try {
      const userUid = sessionStorage.getItem("uid");
      const queryForGetUser = query(
        collection(db, "users"),
        where("uid", "==", userUid)
      );
      const querySnapshot = await getDocs(queryForGetUser);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0]?.data();
        const userId = querySnapshot.docs[0]?.id;
        setUserData(userData);
        setUserId(userId);
        setProfilePicture(userData?.profile);
      }
    } catch (error) {
      console.error("Error getting partner profile:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-row mb-3">
      <Flex>
        <Flex flexDirection="column">
          <Avatar size="2xl" name={displayName} />
          <input type="file" id="actual-btn" hidden />
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
