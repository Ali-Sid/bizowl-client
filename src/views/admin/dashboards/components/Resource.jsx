import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import image from "../assets/65ba30d1d05c102577d13d0dd4fcbc2e.png";
import image2 from "../assets/93c3cb5621a0ba3251cd3673e94d00df.jpg";
import image3 from "../assets/9454f0b2bb52619faf3324509e8e660d.jpg";
import image4 from "../assets/424e5b58613715c4771c2c8e70dd8116.png";
import image5 from "../assets/c472f8c544dc4313a0aa5d5a7ed354c1.jpg";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
const Resource = () => {
  return (
    <div style={{position:"relative"}}>
      <Text textAlign="center" color="#37474F" fontSize="20px" fontWeight="700">
        Resources
      </Text>
      <SimpleGrid columns={3} spacing={5} mt={5}>
        <Box
          bg="#fff"
          height="fit-content"
          boxShadow="0px 0px 0px 0px #fff"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image style={{ height: "180px", width: "100%" }} src={image} />
          <Flex flexDirection="column" p={2}>
            <Text p={2} fontSize="10px">
              Digital Marketing
            </Text>
            <Text p={1} fontSize="15px" fontWeight="600">
              Top 5 benefits of using digital marketing as a tool in your
              business
            </Text>
            <Text p={1} fontSize="12px">
              Digital marketing is a key factor when it comes to rank your
              business online. This is very import
            </Text>
            <Flex justifyContent="center" margin="1rem">
              <Button
                style={{
                  height: "2rem",
                  width: "12rem",
                  backgroundColor: "#F7FCFB",
                  border: "1px solid #407BFF",
                  alignItems: "center"
                }}
              >
                {" "}
                <Text fontSize="14px" color="#407BFF">
                  Read More
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Box
          bg="#fff"
          height="fit-content"
          boxShadow="0px 0px 0px 0px #fff"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
        >
          <img style={{ opacity: "30%" }} src={image2} />
          <Flex flexDirection="column" p={2} position="absolute" bottom="5px">
            <Text p={2} fontSize="10px" top="20px" color="#263238">
              Digital Marketing
            </Text>
            <Text p={1} fontSize="15px" fontWeight="600">
              Top 5 benefits of using digital marketing as a tool in your
              business
            </Text>
          </Flex>
        </Box>
        <Box
          bg="#9CC3F0"
          height="fit-content"
          boxShadow="0px 0px 0px 0px #fff"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
        >
          <Button
            style={{
              height: "2rem",
              width: "8rem",
              backgroundColor: "#407BFF",
              border: "1px solid #407BFF",
              alignItems: "center",
              margin: "0.5rem",
              float: "inline-end"
            }}
          >
            {" "}
            <Text fontSize="10px" color="#fff">
              Youtube Channel
            </Text>
          </Button>
          <Image
            borderRadius="5px"
            position="relative"
            style={{ height: "180px", width: "100%", padding: "1rem" }}
            src={image3}
          />

          <Button
            colorScheme="teal"
            size="xs"
            height="2rem"
            width="2rem"
            borderRadius="50%"
            backgroundColor="#FAFAFA"
            position="absolute"
            bottom="160px"
            left="112px"
            alignItems="center"
          >
            <Text color="#407BFF">
              <FaPlay />
            </Text>
          </Button>
          <Flex flexDirection="column" p={2}>
            <Text p={1} fontSize="15px" fontWeight="600">
              Top 5 benefits of using digital marketing as a tool in your
              business
            </Text>
          </Flex>
        </Box>
        <Box
          bg="linear-gradient(90deg, #F2CBE0 0%, #F3ADD3 52.06%, #FFBFE2 100%)"
          height="fit-content"
          boxShadow="0px 0px 0px 0px #fff"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
        >
          <Button
            style={{
              height: "2rem",
              width: "8rem",
              backgroundColor: "#CF9DBB",
              alignItems: "center",
              margin: "0.5rem",
              float: "inline-end"
            }}
          >
            {" "}
            <Text fontSize="10px" color="#fff">
              Youtube Channel
            </Text>
          </Button>
          <Image
            borderRadius="5px"
            position="relative"
            style={{ height: "180px", width: "100%", padding: "1rem" }}
            src={image3}
          />

          <Button
            colorScheme="teal"
            size="xs"
            height="2rem"
            width="2rem"
            borderRadius="50%"
            backgroundColor="#FAFAFA"
            position="absolute"
            bottom="160px"
            left="112px"
            alignItems="center"
          >
            <Text color="#407BFF">
              <FaPlay />
            </Text>
          </Button>
          <Flex flexDirection="column" p={1}>
            <Text p={1} fontSize="15px" fontWeight="600">
              Top 5 benefits of using digital marketing as a tool in your
              business
            </Text>
          </Flex>
        </Box>
        <Box
          bg="#407BFF"
          height="fit-content"
          boxShadow="0px 0px 0px 0px #fff"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          w="18rem"
          overflow="hidden"
          position="absolute"
          transform= "translate(108%, 56%)"
        >
          <Flex flexDirection="column" p={2}>
            <Text p={2} fontSize="10px" color="#fff">
              Digital Marketing
            </Text>
            <Text p={1} fontSize="20px" fontWeight="600" color="#fff">
              How to win your customers, best tips
            </Text>
            <Text p={1} fontSize="12px" color="#fff">
              Digital marketing is a key factor when it comes to rank your
              business online. This is very import , Digital marketing is a key
              factor when it comes to rank your business online. This is very
              import
            </Text>
            <Flex  margin="1rem">
              <Button
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                  backgroundColor: "#407BFF",
                  border: "1px solid #fff",
                  alignItems: "center",
                  borderRadius:"50%",
                  float:"left"
                }}
              >
                {" "}
                <Text fontSize="14px" color="#fff">
                <FaArrowRight />
                </Text>
              </Button>
            </Flex>
          </Flex>
          <Image style={{ height: "180px", width: "100%" }} src={image4} />
        </Box>
        <Box
          bg="#407BFF"
          height="fit-content"
          boxShadow="0px 0px 0px 0px #fff"
          maxW="sm"
          w="18rem"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          transform= "translate(212%, 74%)"
          position="absolute"
          margin="0.5rem"
        >
             <Image style={{ height: "180px", width: "100%" }} src={image5} />
          <Flex flexDirection="column" p={2}>
         
            <Text p={1} fontSize="10px" color="#fff">
              Digital Marketing
            </Text>
            <Text p={1} fontSize="20px" fontWeight="600" color="#fff">
              How to win your customers, best tips
            </Text>
            <Text p={1} fontSize="12px" color="#fff">
              Digital marketing is a key factor when it comes to rank your
              business online. This is very import , Digital marketing is a key
              factor when it comes to rank your business online. This is very
              import
            </Text>
            <Flex justifyContent="center" >
              <Button
                style={{
                  height: "2rem",
                  width: "12rem",
                  backgroundColor: "#407BFF",
                  border: "1px solid #fff",
                  alignItems: "center"
                }}
              >
                {" "}
                <Text fontSize="14px" color="#fff">
                  Read More
                </Text>
              </Button>
            </Flex>
          </Flex>
         
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default Resource;
