import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Img,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardTimeline from "../assets/img/system-uicons_card-timeline.png";
import {
  Avatar,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { GoBell } from "react-icons/go";
import { TbTag } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { VscBellSlash } from "react-icons/vsc";
import { FaSackDollar } from "react-icons/fa6";
import { HSeparator } from "components/separator/Separator";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { PaymentHistoryRow, RowData } from "../data/ProjectData";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "config/firebase";

const EnquiryTable = ({ columnData, rowData }) => {
  const [unSubscribe, setUnSubscribe] = useState(null);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [enquiryData, setEnquiryData] = useState([]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getServiceRequests();
    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, []);

  const getServiceRequests = async () => {
    try {
      const clientUid = sessionStorage.getItem("uid");
      // const userQuery = query(
      //   collection(db, "quotations")
      // );
      const subScribe = onSnapshot(collection(db, "quotations"), (snapshot) => {
        const serviceRequests = snapshot.docs.map((doc, index) => {
          // if (doc.data().userDetails.uid === clientUid) {
          return {
            ...doc.data(),
            srNo: index + 1,
            id: doc.id,
          };
          // }
        });
        setEnquiryData(serviceRequests);
      });
      setUnSubscribe(() => subScribe);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(enquiryData.length / itemsPerPage);
  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayData = enquiryData.slice(startIndex, endIndex);

  const getColorStatus = (status) => {
    switch (status) {
      case "Open":
        return "#263238";
      case "In Progress":
        return "#54D242";
      case "Pending":
        return "#E2A30E";
      case "Completed":
        return "#407BFF";
      case "Rejected":
        return "#F90D0D";
      default:
        return "black";
    }
  };

  return (
    <>
      <div
        style={{
          border: "3px solid",
          borderRadius: "0.5rem",
          borderColor: "#D3D3D3",
        }}
      >
        <Flex m="1rem 2rem" justifyContent="space-between">
          <Flex alignItems="center" fontWeight="bold" fontSize="1.1rem">
            <Text>Your Enquiries</Text>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Img
              src={CardTimeline}
              alt="CardTimeline"
              style={{ width: "30px", height: "30px", marginRight: "0.6rem" }}
            />
            <Text mr="0.6rem">Past 15 days</Text>
            <ChevronDownIcon mr="0.6rem" />
            <Text mr="0.6rem">17 Jan 2024</Text>
            <Text>
              <span style={{ marginRight: "0.6rem" }}>to</span> 08 Feb 2024
            </Text>
          </Flex>
        </Flex>
        <TableContainer>
          <Table
            variant="simple"
            overflowX="hidden"
            style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
          >
            <Thead height="4rem" mb="1rem">
              <Tr backgroundColor="#D0E3F3">
                {columnData?.map((item, index) => (
                  <Th key={index} fontWeight="bold">
                    {item}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {/* {displayData.map((item, index) => (
                <Tr
                  key={index}
                  backgroundColor="#EBF2FA"
                  boxShadow="0rem 0.25rem 0.25rem 0rem #00000040"
                >
                  <Td>
                    <Flex direction="column">
                      <Text fontWeight="bold">{item?.services}</Text>
                      <Text fontSize="sm">{item?.subCategoryServices}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex direction="column">
                      <Text fontWeight="bold">{item?.startDate}</Text>
                      <Text fontSize="sm">{item?.time}</Text>
                    </Flex>
                  </Td>
                  <Td fontWeight="bold">₹{item?.budget}</Td>
                  <Td fontWeight="bold">{item?.projectType}</Td>
                  <Td fontWeight="bold">{item?.timeLine}</Td>
                  <Td color={getColorStatus(item?.status)}>{item?.status}</Td>
                </Tr>
              ))} */}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="space-between" alignItems="center" m="1rem 2rem">
          <Button
            onClick={handlePrev}
            backgroundColor="#9BC5EF"
            border="1px solid #000000"
            borderRadius="5px"
          >
            Back
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={handleNext}
            backgroundColor="#9BC5EF"
            border="1px solid #000000"
            borderRadius="5px"
          >
            Next
          </Button>
        </Flex>
      </div>

      <Modal
        size="xl"
        isOpen={openActionModal}
        onClose={() => {
          setOpenActionModal(!openActionModal);
        }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#EBF2FA">
          <ModalHeader>Digitial Marketing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Details</Text>
            <Flex pt="1rem" pb="1rem">
              <Flex w="50%">
                <Avatar size="sm" />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="CustomerName"
                />
              </Flex>
              <Flex w="50%">
                <Input ml="0.5rem" variant="flushed" placeholder="SEO" />
              </Flex>
            </Flex>
            <Flex pt="1rem" pb="1rem">
              <Flex w="50%" alignItems="center">
                <Icon as={SlGraph} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="Banking & Finance"
                />
              </Flex>
              <Flex w="50%" alignItems="center">
                <Icon as={FaRegCalendarAlt} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="24 Jan 2024 to 24 Feb 2024"
                />
              </Flex>
            </Flex>
            <Text>Pricings</Text>
            <Flex pt="1rem" pb="1rem">
              <Flex w="50%" alignItems="center">
                <Icon as={BsClock} />
                <Input ml="0.5rem" variant="flushed" placeholder="2 Weeks" />
              </Flex>
              <Flex w="50%" alignItems="center">
                <Icon as={GoBell} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="Immediately"
                />
              </Flex>
            </Flex>
            <Flex pt="1rem" pb="1rem" w="50%" alignItems="center">
              <Icon as={TbTag} />
              <Input variant="flushed" placeholder="Banking & Finance" />
            </Flex>
            <Text pt="0.8rem" pb="0.8rem">
              Project Requirement
            </Text>
            <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
            <Text mt="0.8rem" mb="0.8rem" fontSize="sm">
              We are facing a lot of problem in our organic growth and we want
              somenone to improve it. This is our requirement.
            </Text>
            <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
            <Text mt="1rem" mb="1rem">
              Status
            </Text>
            <Flex justifyContent="space-between">
              <Box
                w="25%"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#D8F9E6"
                color="#5DEF92"
              >
                New
              </Box>
              <Box
                w="25%"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#5DEF9233"
                color="#5DEF92"
              >
                Open
              </Box>
              <Box
                w="25%"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#65C756"
                color="#FFFFFF"
              >
                In Progress
              </Box>
              <Box
                w="25%"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#E0E0E0"
                color="#455A64BF"
              >
                Closed
              </Box>
            </Flex>
          </ModalBody>
          <Text ml="1.5rem">Take Action</Text>
          <Flex
            ml="1.5rem"
            mt="1rem"
            mb="1rem"
            justifyContent="flex-start"
            color="#FFFFFF"
          >
            <Button backgroundColor="#407BFF">Quote Price</Button>
            <Button ml="1rem" backgroundColor="#F28F8F">
              Not Interested
            </Button>
          </Flex>
          <FormControl mt="1rem" mb="1rem" w="90%" ml="1.5rem">
            <FormLabel htmlFor="question">
              Have more Questions to ask before you bid?
            </FormLabel>
            <Input
              id="question"
              type="text"
              placeholder="Type your Question"
              minHeight="6rem"
              backgroundColor="#FFFFFF"
            />
          </FormControl>
          <ModalFooter>
            <Button backgroundColor="#407BFF" color="#F5F5F5">
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnquiryTable;
