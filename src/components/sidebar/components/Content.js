// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components

import React, { useState } from "react";
import SmallBarLinks from "components/sidebar/components/SmallbarLinks";
import { FiMenu } from "react-icons/fi";
import Brand from "./Brand";
import Links from "./Links";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  // const [isCollapse, setIsCollapse] = useState(false)
  // SIDEBAR
  return (
    <>
      {
        !props.isCollapse && (
          <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
            <Brand setIsCollapse={props.setIsCollapse} />
            <Stack direction='column' mb='auto' mt='8px'>
              <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
                <Links routes={routes} />
              </Box>
            </Stack>
          </Flex>

        )
      }

      {
        props.isCollapse && (
          <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
            <div
              className="icon"
              style={{
                background: "none",
                color: "white",
                left: "90px",
                fontSize: "1.5rem",
                display: "flex",
                placeContent: "stretch",
                flexFlow: "row-reverse",
                cursor: "pointer",
                transition: "all 0.2s ease-out"
              }}
            >
              <FiMenu onClick={()=>props.setIsCollapse(false)}/>
            </div>
            <Box pe={{ md: "16px", "2xl": "1px" }} style={{ marginTop: "4rem" }}>
              <SmallBarLinks routes={routes} />
            </Box>
          </Flex>

        )
      }
    </>
  );
}

export default SidebarContent;
