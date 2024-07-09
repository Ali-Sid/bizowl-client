// assets
import CardTimeline from "./assets/img/system-uicons_card-timeline.png";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Link,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { columnsDataComplex } from "../dataTables/variables/columnsData";
import ComplexTable from "./components/ComplexTable";
import tableDataComplex from "../../admin/default/variables/tableDataComplex.json";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Cards } from "./data/ProjectData";
import CustomCard from "./components/CustomCard";
import { HSeparator } from "components/separator/Separator";
import AvatarImg from "views/admin/project/assets/img/avatar1.png";
import ProjectCard from "./components/ProjectCard";
import { OngoingProjects } from "./data/ProjectData";
import {
  ColumnData,
  RowData,
  EnquiryColumn,
  EnquiryRow,
  PaymentHistoryRow,
  PaymentHistoryColumn
} from "./data/ProjectData";
import EnquiryTable from "./components/EnquiryTable";
import PaymentHistoryTable from "./components/OrderHistoryTable";

const Project = () => {
  const [cards, setCards] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [enquiryColumnData, setEnquiryColumnData] = useState([]);
  const [enquiryRowData, setEnquiryRowData] = useState([]);
  const [paymentHistoryColumnData, setPaymentHistoryColumnData] = useState([]);
  const [paymentHistoryRowData, setPaymentHistoryRowData] = useState([]);
  const itemsPerPage=6;
  const [currentPage,setCurrentPage] = useState(1);

  useEffect(() => {
    setCards(Cards);
    setOngoingProjects(OngoingProjects);
    setColumnData(ColumnData);
    setRowData(RowData);
    setEnquiryColumnData(EnquiryColumn);
    setEnquiryRowData(EnquiryRow);
    setPaymentHistoryColumnData(PaymentHistoryColumn);
    setPaymentHistoryRowData(PaymentHistoryRow);
  });
  const totalPages = Math.ceil(ongoingProjects.length/itemsPerPage);
  const handleNext =()=>{
    setCurrentPage((prevPage)=>Math.min(prevPage+1,totalPages))
  }
  const handlePrev =()=>{
    setCurrentPage((prevPage)=>Math.max(prevPage-1,1))
  }
 const startIndex = (currentPage-1)*itemsPerPage;
 const endIndex = startIndex+itemsPerPage;
 const displayedProjects  = ongoingProjects.slice(startIndex,endIndex)
  return (
    <>
      <Flex maxW="100%" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="25px">
          Overview
        </Text>
        {/* <Flex
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
        </Flex> */}
      </Flex>
      <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
        {cards.map((item, index) => (
          <CustomCard key={index} card={item} />
        ))}
      </Flex>
      <Flex position="relative">
        <Tabs>
          <TabList>
            <Tab>Ongoing Projects</Tab>
            <Tab>Completed Projects</Tab>
          </TabList>
          <TabPanels>
            {/* <TabPanel>
              <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
                {displayedProjects.map((item, index) => (
                  <ProjectCard key={index} props={item} />
                ))}
              </Flex>
            </TabPanel> */}
            <TabPanel>
              {/* <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
                {displayedProjects.map((item, index) => (
                  <ProjectCard key={index} props={item} />
                ))}
              </Flex> */}
            </TabPanel>
          </TabPanels>
          {/* <Flex
            justifyContent="space-around"
            alignItems="center"
            marginBottom="2rem"
          >
            <Button
            onClick={handlePrev}
              backgroundColor="#9BC5EF"
              border="1px solid #000000"
              borderRadius="5px"
            >
              Back
            </Button>
            <Text>Page {currentPage} of {totalPages}</Text>
            <Button
            onClick={handleNext}
              backgroundColor="#9BC5EF"
              border="1px solid #000000"
              borderRadius="5px"
            >
              Next
            </Button>
          </Flex> */}
        </Tabs>

        <Flex
          position="absolute"
          transform="translate(0%, 10px)"
          right="0"
          justifyContent="space-between"
          alignItems="center"
        >
          <Img
            src={CardTimeline}
            alt="CardTimeline"
            style={{ width: "30px", height: "30px", marginRight: "0.6rem" }}
          />
          <Text mr="0.6rem">Past 15 days</Text>
          <ChevronDownIcon mr="0.6rem" />
          <Text mr="0.6rem">17 Jul 2024</Text>
          <Text>
            <span style={{ marginRight: "0.6rem" }}>to</span> 08 Aug 2024
          </Text>
        </Flex>
      </Flex>
      {/* <EnquiryTable columnData={enquiryColumnData} rowData={enquiryRowData} /> */}
      
      {/* <Box mt="3rem">
        <PaymentHistoryTable
          columnData={paymentHistoryColumnData}
          rowData={paymentHistoryRowData}
        />
      </Box> */}
    </>
  );
};
export default Project;
