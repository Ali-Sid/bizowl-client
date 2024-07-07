import React, { useEffect, useState } from "react";
import image2 from "../assets/5e442f61e3089761605fe7b2d602997e.jpg";
import { Box, Button, Flex, SimpleGrid, Text, color } from "@chakra-ui/react";
import { GoClock } from "react-icons/go";
import Card from "components/card/Card";
import { RecommendedCards } from "../data/RecommendData";
const Brand = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    setCardData(RecommendedCards);
  });
  return (
    <div>
         <Flex  justifyContent="center" alignItems="center">
        <Text fontWeight="bold" fontSize="25px" marginBottom={4}>
        <span style={{ color: "#263238",fontWeight:"600", fontSize:"20px" }} >Tips & Best Practices </span> 
        <span style={{ color: "#407BFF",fontWeight:"600", fontSize:"20px" }}> For Branding</span>
        </Text>
        </Flex>
      <SimpleGrid columns={2} spacing={10}>
        <Flex justifyContent="space-between">
          <Box
            bg="#fff"
            // height="fit-content"
            boxShadow="0px 0px 0px 0px #fff"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            height="325px"
          >
            <img className="image" style={{ opacity: "80%",height:"346px" }} src={image2} />
            <Flex flexDirection="column" p={2} position="absolute" bottom="0px">
              <Button
                height="2rem"
                width="4rem"
                backgroundColor="#407BFF"
                borderRadius="10px"
                color="#fff"
                fontSize="12px"
              >
                Brand
              </Button>
              <Text p={1} fontSize="15px" fontWeight="600" color="#fff">
                Top 5 benefits of using digital marketing as a tool in your
                business
              </Text>

              <Flex alignItems="center" p={1} fontSize="15px" fontWeight="600" color="#fff" gap={5}>
                <span>
                <GoClock />
                  </span> 
                  <span>
                  20-12-2023
                    </span>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Box >
          {cardData.map((item, index) => (
            <Card
              key={index}
              style={{
                boxShadow: "#E5A8CC",
                marginBottom: "1rem",
                boxShadow: "2px 4px 14px 0px #6E9BFE",
                padding:"0px",
                borderRadius:"10px"
              }}
            >
              <Flex  padding={2} flexDirection="row" justifyContent="space-between" gap={2}>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  height="80px"
                  width="80px"
                  borderRadius="50%"
                >
                  <Box
            bg="#fff"
            // height="fit-content"
            boxShadow="0px 0px 0px 0px #fff"
            maxW="sm"
            // borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            height="auto"
          > <img
          style={{ height: "80px", width: "80px" }}
          src={item?.img}
          alt="Profile Pic"
        /></Box>
                 
               
                </Flex>
                <Flex flexDirection="column" gap={2}>
                  <Button
                    height="1.5rem"
                    width="4rem"
                    backgroundColor={item?.bgColor}
                    borderRadius="12px"
                    color="#fff"
                    fontSize="10px"
                  >
                    Brand
                  </Button>

                  <span
                  style={{
                    color:"#263238",
                    fontWeight:"700",
                    fontSize:"15px",
                    textAlign:"center",
                    padding:"0px"
                  }}
                    color=""
                    
                  >
                    {item?.message}
                  </span>
                  <Flex gap={2} alignItems="center">

                    <span style={{fontSize:"10px"}}><GoClock /> </span>
                    <span style={{fontSize:"10px"}}>20-12-2023</span>
                  </Flex>
                 
                </Flex>
               
              </Flex>
            </Card>
          ))}
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default Brand;
