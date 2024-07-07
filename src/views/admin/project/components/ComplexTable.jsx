import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdViewModule } from "react-icons/md";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {

    const [moreDetails, setMoreDetails] = useState(false);
    const { columnsData, tableData } = props;
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const [ isOpen, setIsOpen ] = useState(false);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 5;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Your Projects
                </Text>
                <Menu />
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "NAME") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "STATUS") {
                                        data = (
                                            <Flex align='center'>
                                                <Icon
                                                    w='24px'
                                                    h='24px'
                                                    me='5px'
                                                    color={
                                                        cell.value === "Approved"
                                                            ? "green.500"
                                                            : cell.value === "Disable"
                                                                ? "red.500"
                                                                : cell.value === "Error"
                                                                    ? "orange.500"
                                                                    : null
                                                    }
                                                    as={
                                                        cell.value === "Approved"
                                                            ? MdCheckCircle
                                                            : cell.value === "Disable"
                                                                ? MdCancel
                                                                : cell.value === "Error"
                                                                    ? MdOutlineError
                                                                    : null
                                                    }
                                                />
                                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "DATE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "PROGRESS") {
                                        data = (
                                            <Flex align='center'>
                                                <Progress
                                                    variant='table'
                                                    colorScheme='brandScheme'
                                                    h='8px'
                                                    w='108px'
                                                    value={cell.value}
                                                />
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "ACTION") {
                                        data = (
                                            <Flex align='center'>
                                                <Icon
                                                    as={MdViewModule}
                                                    width='20px'
                                                    height='20px'
                                                    color='inherit'
                                                    onClick={() => {setIsOpen(true)}}
                                                />
                                            </Flex>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            maxH='30px !important'
                                            py='8px'
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <Modal
                isOpen={isOpen}
                //onClose={() => {setIsOpen(false)}}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Product Details</ModalHeader>
                    <ModalBody>
                        <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
                            <div><span style={{fontWeight:"bold"}}>Start Date:</span> 01/01/2024</div>
                            <div><span style={{fontWeight:"bold"}}>Expected End Date:</span> 30/01/2024</div>
                        </div>
                        <div>Loream.......veniam amet deserunt anim ex consequat laboris incididunt eu tempor esse 
                        aliquip irure aute eiusmod culpa officia enim amet aliqua enim veniam ex cillum commodo qui 
                        officia esse minim cillum elit dolor elit deserunt fugiat exercitation eiusmod eiusmod deserunt est
                         eiusmod et</div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {setIsOpen(false)}}>
                            Close
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card>
    );
}