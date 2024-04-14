import React, { useState } from "react";
import logo from "assets/img/layout/logo-of-BIZOWL--Business-Services-Logo.png";
import profile from "assets/img/layout/clint-profile.jpg";

// Chakra imports
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorModeValue
} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import { FaAngleRight } from "react-icons/fa6";

export function Brand({ setIsCollapse }) {
  //   Chakra color mode

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
            transition: "all 0.2s ease-out"
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
            gap: "15px"
          }}
        >
          <div className="image">
            <img
              src={profile}
              alt="Bizowl-logo"
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
          </div>

          <p style={{ fontSize: "15px", color: "white" }}>Clint Name</p>
        </div>
      </Flex>
    </>
  );
}

export default Brand;
