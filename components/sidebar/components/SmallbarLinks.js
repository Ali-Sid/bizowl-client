/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, HStack, color, useColorModeValue } from "@chakra-ui/react";

export function SidebarSmallLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeBackgroundColor =
  "white";
  let activeLinkStyles = {
    background: activeBackgroundColor,
    width: "50px",
    height: "48px",
    borderTopLeftRadius: "999px",
    borderBottomLeftRadius: "999px"
  //   borderTopRightRadius: "-30px",
  // MozBorderRadiusTopright: "-30px", 
  // WebkitBorderTopRightRadius: "-30px", 
  // WebkitBoxShadow: "0 -20px 0 0 #fff",
  // MozBoxShadow: "0 -20px 0 0 #fff",
  // boxShadow: "0 -20px 0 0 #fff",

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
        
          </>
        );
      } else if (
        route.layout === "/client" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        const isActive = activeRoute(route.path.toLowerCase());
        return (
          <NavLink key={index} to={route.layout + route.path}
          style={{
            ...(activeRoute(route.path.toLowerCase()) ? activeLinkStyles : {}),
            display: "block",
            textDecoration: "none",
          }} >
            {route.icon && (
              <Box>
                <HStack
                  spacing={isActive ? "2px" : "2px"}
                  color={isActive ? "#6E9BFE" : "#fff"} 
                  py='10px'
                  ps='5px'
                >
                  <Box
                  // color="blue"
                    color={isActive ? "#6E9BFE" : "#fff"}
                  >
                    {route.icon}
                  </Box>
                </HStack>
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

export default SidebarSmallLinks;
