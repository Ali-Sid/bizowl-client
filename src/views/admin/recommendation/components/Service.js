import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import ProfilePic from "../assets/62b32a768fc657321f1193070e9c28b5.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ServiceCards } from "../data/RecommendData";
import Brand from "./Brand";
const Service = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    setCardData(ServiceCards);
  });
  return (
    <div>
      <Box backgroundColor="#FFFFFF" w="100%" h="100%" borderRadius="10px">
        <Flex justifyContent="center" gap={5} alignItems="center">
          <Flex
            flexDirection="column"
            p="1rem"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" fontSize="25px" color="#6E9BFE">
            Branding
            </Text>
            <Text fontWeight="bold" fontSize="25px">
              Service
            </Text>
          </Flex>
          <Flex
            flexDirection="row"
            p="1rem"
            width="100%"
            height="100%"
            gap="15px"
            justifyContent="center"
            marginTop={1}
            
          >
            {cardData.map((item, index) => (
              <Card
                key={index}
                style={{
                  boxShadow: "#E5A8CC",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                  boxShadow: "2px 4px 14px 0px #6E9BFE"
                }}
              >
                <div>
                  <Flex
                    backgroundColor={item?.backgroundColor}
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="-30px"
                    right="40px"
                    margin="0 auto"
                    height="50px"
                    width="50px"
                    borderRadius="50%"
                  >
                    <img
                      style={{ height: "20px", width: "20px" }}
                      src={item?.img}
                      alt="Profile Pic"
                    ></img>
                  </Flex>
                </div>

                <Text
                  color={item?.color}
                  fontWeight="bold"
                  fontSize="0.9rem"
                  textAlign="center"
                >
                  {item?.name}
                </Text>
                <Text
                  color="#1B2559"
                  fontWeight="500"
                  fontSize="10px"
                  textAlign="center"
                >
                  {item?.message}
                </Text>
              </Card>
            ))}
           
          </Flex>
          <Card
            width="16%"
            >
             <Flex justifyContent="center" alignItems="center">
              <Button
                style={{
                  padding:"0",
                  backgroundColor: "#fff",
                  height: "25px",
                  width: "25px",
                  borderRadius: "80%",
                  justifyContent:"flex-start"
                }}
              > <Text fontSize="30px" color="#407BFF" justifyContent="center"><MdKeyboardArrowRight /></Text></Button>

             </Flex>
            </Card>
        </Flex>
        <Flex padding={10}>
            <Brand/>
        </Flex>
      </Box>
    </div>
  );
};

export default Service;
