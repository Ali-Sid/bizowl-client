import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Img,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import CardTimeline from "../assets/img/system-uicons_card-timeline.png";
import { ChevronDownIcon } from "@chakra-ui/icons";

const PaymentHistoryTable = ({ columnData, rowData }) => {
    const itemsPerPage =6;
    const [currentPage,setCurrentPage] = useState(1);
    const totalPages = Math.ceil(rowData.length/itemsPerPage);
    const handleNext=()=>{
        setCurrentPage((prevPage)=>Math.min(prevPage+1,totalPages))
    }
    const handlePrev=()=>{
        setCurrentPage((prevPage)=>Math.max(prevPage-1,1))
    }
    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = (startIndex+itemsPerPage);
    const displayData = rowData.slice(startIndex,endIndex);
  return (
    <>
      <Flex m="1rem 2rem" justifyContent="space-between">
        <Flex alignItems="center" fontWeight="bold" fontSize="1.1rem">
          <Text>Order History</Text>
        </Flex>
        <Flex
          p="0.5rem"
          borderRadius="3rem"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="#AACAEC80"
        >
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

      <TableContainer
        border="3px solid"
        borderRadius="0.5rem"
        borderColor="#D3D3D3"
      >
        <Table variant="simple" overflowX="scroll">
          <Thead>
            <Tr backgroundColor="#D0E3F3">
              {columnData?.map((item, index) => (
                <Th key={index}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody overflowX="auto" style={{ height: "200px" }}>
            {/* {displayData.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src={item?.image}
                      alt="CardTimeline"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "0.6rem",
                        borderRadius: "50%"
                      }}
                    />
                    <Flex flexDirection="column">
                      <Text fontWeight="bold">{item?.projectName}</Text>
                      <Text fontSize="sm">{item?.client}</Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="column">
                    <Text fontWeight="bold">{item?.date}</Text>
                    <Text fontSize="sm">{item?.time}</Text>
                  </Flex>
                </Td>
                <Td>{item?.invoice}</Td>
                <Td fontWeight="bold">{item?.amount}</Td>
                <Td fontWeight="bold">{item?.gst}</Td>
                <Td fontWeight="bold">{item?.final}</Td>
                <Td
                  style={{
                    color: item?.payment === "Pending" ? "red" : "green"
                  }}
                >
                  {item?.payment}
                </Td>
              </Tr>
            ))} */}
          </Tbody>
          <Tfoot>
            {/* <Tr backgroundColor="#D0E3F3">
              <Th fontSize="1rem">Total</Th>
              <Th></Th>
              <Th></Th>
              <Th fontSize="1rem">
                ₹
                {rowData.reduce(
                  (total, item) =>
                    total + parseFloat(item?.amount.replace("₹", "")) || 0,
                  0
                )}
              </Th>
              <Th fontSize="1rem">
                ₹
                {rowData.reduce(
                  (total, item) =>
                    total + parseFloat(item?.gst.replace("₹", " ")) || 0,
                  0
                )}
              </Th>
              <Th fontSize="1rem">
                ₹
                {rowData.reduce(
                  (total, item) =>
                    total + parseFloat(item?.final.replace("₹", " ")) || 0,
                  0
                )}
              </Th>
              <Th></Th>
            </Tr> */}
          </Tfoot>
        </Table>
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
      </TableContainer>
      <Box></Box>
    </>
  );
};

export default PaymentHistoryTable;
