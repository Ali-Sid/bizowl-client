import React, { useEffect, useState } from "react";
import CustomCard from "../dashboards/components/CustomCard";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Cards,
  ChatData,
  DashboardData,
  EventData,
} from "./data/DashboardData";
import { HSeparator } from "components/separator/Separator";
import MiniCalendar from "components/calendar/MiniCalendar";
import { MdCheckCircleOutline } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ProfilePic from "./assets/Ellipse 658.png";
import ServiceCard from "./components/ServiceCard";
import Resource from "./components/Resource";
import useUserDisplayName from "components/hooks/useUserDisplayName";
import { db } from "config/firebase";
import { auth } from "config/firebase";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const { displayName, isLoading } = useUserDisplayName(db, auth);

  useEffect(() => {
    setCards(Cards);
    setChatData(ChatData);
    setDashboardData(DashboardData);
    setEventData(EventData);
  }, []);
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <Flex maxW="100%" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="25px">
          Welcome back, {displayName}
        </Text>
        <Flex
          w="15%"
          borderRadius="2rem"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#1C6ED059"
        >
          <Text>Last 7 Days</Text>
          <ChevronDownIcon
            marginLeft="0.2rem"
            fontSize="1rem"
            borderRadius="1rem"
            backgroundColor="#D9D9D9"
            boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
          />
        </Flex>
      </Flex>
      <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
        {cards.map((item, index) => (
          <CustomCard key={index} card={item} />
        ))}
      </Flex>
      {/* <Flex mt="3rem" justifyContent="space-between">
        <Box
          backgroundColor="#FFFFFF"
          width="55%"
          height="100%"
          borderRadius="0.6rem"
        >
          <Tabs height="100%">
            <TabList
              pl="1rem"
              pr="1rem"
              fontWeight="bold"
              justifyContent="space-between"
              alignItems="center"
              height="4rem"
              backgroundColor="#E1F2EF"
              borderRadius="0.9rem"
            >
              <Tab fontWeight="bold">Inbox</Tab>
              <Tab fontWeight="bold">Queries</Tab>
              <Tab fontWeight="bold">View All</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {chatData.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Flex p="1.5rem">
                        <Avatar src={ProfilePic} alt="Profile Pic" />
                        <Flex ml="1rem" flexDirection="column">
                          <Text fontWeight="bold">{item?.clientName}</Text>
                          <Text fontSize="sm">{item?.message}</Text>
                        </Flex>
                      </Flex>
                      <HSeparator />
                    </Box>
                  );
                })}
              </TabPanel>
              <TabPanel>
                {DashboardData.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Flex p="1.5rem">
                        <Avatar src={ProfilePic} alt="Profile Pic" />
                        <Flex ml="1rem" flexDirection="column">
                          <Text fontWeight="bold">{item?.clientName}</Text>
                          <Text fontSize="sm">{item?.message}</Text>
                        </Flex>
                      </Flex>
                      <HSeparator />
                    </Box>
                  );
                })}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          backgroundColor="#FFFFFF"
          //backgroundColor="#F0F0F0"
          width="40%"
          height="max-content"
          borderRadius="0.6rem"
          position="relative"
        >
          
          <Flex
            alignItems="center"
            justifyContent="center"
            position="aboslute"
            backgroundColor="#E1F2EF"
            w="100%"
            h="4rem"
            borderRadius="1rem"
            fontSize="1.5rem"
            fontWeight="500"
          >
            Upcoming Events
          </Flex>

          <Flex alignItems="center" justifyContent="center" w="100%">
            <MiniCalendar />

          
          
          
          </Flex>
          <Tabs height="100%" w="100%">
              <TabList
                pl="1rem"
                pr="1rem"
                fontWeight="bold"
                justifyContent="space-between"
                alignItems="center"
                height="4rem"
                border="none"
              >
                <Tab fontWeight="bold" fontSize="12px">Todays Event (2)</Tab>
                <Tab fontWeight="bold" fontSize="12px">Upcoming Event (0)</Tab>
              </TabList>
              <TabPanels>
              <TabPanel>
                {eventData.map((item,index)=>{
                  return(

                    <Box key={index}  backgroundColor="#F7FCFB"borderRadius="20px"  marginBottom="10px" border="none" >
                      <Flex p="1rem" boxShadow="-3px 0px 1px 0px #407BFF" borderRadius="20px" >
                        <Avatar src={ProfilePic} alt="Profile Pic" />
                        <Flex ml="1rem" flexDirection="column">
                          <Text fontWeight="bold">{item?.clientName}</Text>
                          <Text fontSize="sm">{item?.message}</Text>
                         
                        </Flex>
                        <Flex alignItems="center">
                        <Text fontSize="sm">{item?.time}</Text>
                        </Flex>
                      </Flex>
                    
                    </Box>
                  )
                }

                )}     
              </TabPanel>
              <TabPanel>
              {eventData.map((item,index)=>{
                  return(

                    <Box key={index}  backgroundColor="#F7FCFB"borderRadius="20px"  marginBottom="10px" border="none" >
                      <Flex p="1rem" boxShadow="-3px 0px 1px 0px #407BFF" borderRadius="20px" >
                        <Avatar src={ProfilePic} alt="Profile Pic" />
                        <Flex ml="1rem" flexDirection="column">
                          <Text fontWeight="bold">{item?.clientName}</Text>
                          <Text fontSize="sm">{item?.message}</Text>
                         
                        </Flex>
                        <Flex alignItems="center">
                        <Text fontSize="sm">{item?.time}</Text>
                        </Flex>
                      </Flex>
                    
                    </Box>
                  )
                }

                )}
              </TabPanel>
            </TabPanels>
            </Tabs>
         
        </Flex>
       
       
    
      </Flex> */}
      <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
        <ServiceCard />
      </Flex>
      <Box mt="2rem" flexWrap="wrap" justifyContent="space-between">
        <Resource />
      </Box>
    </div>
  );
};

export default Dashboard;
