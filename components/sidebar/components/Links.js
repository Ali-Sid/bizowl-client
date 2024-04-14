/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");
  let activeBackgroundColor =
  "linear-gradient(90deg, rgba(58,113,235,1) 0%, rgba(70,117,217,1) 48%, rgba(96,147,251,1) 100%)";
  let activeLinkStyles = {
    background: activeBackgroundColor,
    width: "200px",
    height: "48px",
    borderRadius: "10px",
  };
  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight='bold'
              mx='auto'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt='18px'
              pb='12px'
              key={index}>
              {route.name}
            </Text>
            {createLinks(route.items)}
          </>
        );
      } else if (
        route.layout === "/client" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <NavLink key={index} to={route.layout + route.path}
          style={{
            ...(activeRoute(route.path.toLowerCase()) ? activeLinkStyles : {}),
            display: "block",
            textDecoration: "none",
          }} >
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py='10px'
                  ps='10px'>
                  <Flex w='100%' alignItems='center' justifyContent='center'>
                    <Box
                    color="#fff"
                      // color={
                      //   activeRoute(route.path.toLowerCase())
                      //     ? activeIcon
                      //     : textColor
                      // }
                      me='18px'>
                      {route.icon}
                    </Box>
                    <Text
                      me='auto'
                      // color={
                      //   activeRoute(route.path.toLowerCase())
                      //     ? activeColor
                      //     : textColor
                      // }
                      color="#fff"
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }>
                      {route.name}
                    </Text>
                  </Flex>
                </HStack>
              </Box>
            ) : (
              <Box>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
