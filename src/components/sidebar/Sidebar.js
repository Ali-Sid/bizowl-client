import React, { useState } from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  color,
  IconButton
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { FaArrowCircleRight } from "react-icons/fa";
import Content from "components/sidebar/components/Content";
import {
  renderThumb,
  renderTrack,
  renderView
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
// Assets
import { IoMenuOutline } from "react-icons/io5";
import logo from "assets/img/layout/clint-profile.jpg";
function Sidebar(props) {
  const { routes } = props;
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("#6e9bfe", "75%");
  let sidebarMargins = "0px";
 
  // SIDEBAR
  return (
    <>
      {
        !props.isCollapse && (
          <Collapse in={!props.isCollapse} animateOpacity>
          <Box
            display={{ sm: "none", xl: "block" }}
            w="100%"
            position="fixed"
            minH="100%"
            
          >
            <Box
              bg={sidebarBg}
              w={props.isCollapse ? "60px" : "260px"}
              h="100vh"
              m={sidebarMargins}
              minH="100%"
              transition="all 2s ease-in-out" 
              // overflowX="hidden"
              
            >

              <Scrollbars
                autoHide
                renderTrackVertical={renderTrack}
                renderThumbVertical={renderThumb}
                renderView={renderView}
              >
                <Content routes={routes} isCollapse={props.isCollapse} setIsCollapse={props.setIsCollapse} />
              </Scrollbars>
            </Box>
          </Box>
          </Collapse>
        )

      }
      {
        props.isCollapse && (
          <Collapse in={props.isCollapse} animateOpacity>
          <Box
          display={{ sm: "none", xl: "block" }}
          w="100%"
          position="fixed"

        >
          <Box
            bg={sidebarBg}
            transition="width 2s ease-in-out, margin 2s ease-in-out, opacity 2s ease-in-out"
            w={props.isCollapse ? "60px" : "260px"}
            h="100vh"
            m={sidebarMargins}
            top="21px"
            left="51px"
            minH="100%"
            // overflowX="hidden"
            marginLeft="15px"
            marginTop="15px"
            marginBottom="15px"
            borderRadius="25px"
          >

            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content routes={routes} isCollapse={props.isCollapse} setIsCollapse={props.setIsCollapse} />
            </Scrollbars>
          </Box>
        </Box>
        </Collapse>
        )
  

      }
    </>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center" >
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>


      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="157px" maxW="157px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="157px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content 
              routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string
};

export default Sidebar;
