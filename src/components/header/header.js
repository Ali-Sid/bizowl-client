import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import useUserDisplayName from "components/hooks/useUserDisplayName";
import { ThemeEditor } from "components/navbar/ThemeEditor";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import Sidebar from "components/sidebar/Sidebar";
import { auth } from "config/firebase";
import { db } from "config/firebase";
import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { displayName, isLoading } = useUserDisplayName(db, auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (isLoading) return <div>Loading...</div>;

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function ThemeToggleButton() {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";
    return (
      <Button onClick={toggleColorMode} variant="ghost" size="sm">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    );
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {/* <HamburgerIcon fontSize="xl" onClick={handleToggleSidebar} /> */}
      <Text fontWeight="bold" color="#1b2559">
        {props.brandText}
      </Text>
      <SearchBar />
      <Flex alignItems="center">
        <Icon mr="1rem" as={MdOutlineEmail} />
        <Icon mr="1.5rem" as={FaRegBell} />
        {/* <ThemeEditor onOpen={onOpen} /> */}

        {/* <ThemeToggleButton /> */}
        <Avatar mr="1rem" name={displayName} />
        <Flex flexDirection="column">
          <Text mr="1rem" fontWeight="bold">
            {displayName}
          </Text>
          <Text fontSize="sm">CRB</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
