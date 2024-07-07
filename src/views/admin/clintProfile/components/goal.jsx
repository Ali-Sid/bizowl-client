import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "config/firebase";
import { Business, Goal, Platform } from "../data/ServiceData";
import { IoIosArrowUp } from "react-icons/io";
const Goals = () => {
  const [partnerId, setPartnerId] = useState("");
  const toast = useToast();
  const [business, setBusiness] = useState([]);
  const [goals, setGoals] = useState([]);
  const [platForm, setPlatForm] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    getCurrentPartner();
    setBusiness(Business);
    setGoals(Goal);
    setPlatForm(Platform);
    // setCheck(true);
  }, []);

  const editPortfolio = async (values) => {
    try {
      const portfolioDocRef = doc(db, "partners", partnerId);
      await updateDoc(portfolioDocRef, { bankDetails: values });
      toast({
        description: "Bank updated Successfully",
        status: "success",
        position: "top",
        duration: 1500,
        isClosable: true
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      branch: "",
      bank: "",
      ifscNumber: "",
      bankingName: ""
    },
    // validationSchema: BusinessInfoSchema,
    onSubmit: editPortfolio
  });

  const getCurrentPartner = async () => {
    try {
      const partnerUid = sessionStorage.getItem("uid");
      const queryForGetPartner = query(
        collection(db, "partners"),
        where("uid", "==", partnerUid)
      );
      const querySnapshot = await getDocs(queryForGetPartner);
      if (!querySnapshot.empty) {
        const partnerData = querySnapshot.docs[0]?.data();
        const documentId = querySnapshot.docs[0]?.id;
        setPartnerId(documentId);
        if (partnerData && partnerData.bankDetails) {
          formik.setValues(partnerData.bankDetails);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckBusiness = (value, rowIndex) => {
    setBusiness((prev) => {
      const updatedBusiness = [...prev];
      updatedBusiness[rowIndex] = {
        ...updatedBusiness[rowIndex],
        isChecked: value,
      };
      return updatedBusiness;
    });
  };
  const handleCheckGoals = (value,rowIndex) =>{
    setGoals((prev)=>{
      const updateGoals = [...prev];
      updateGoals[rowIndex] = {
        ...updateGoals[rowIndex],
        isChecked: value,
      };
      return updateGoals;
    })
  };
  const handleCheckPlatform = (value,rowIndex)=>{
    setPlatForm((prev)=>{
      const updatePlatform = [...prev];
      updatePlatform[rowIndex]={
        ...updatePlatform[rowIndex],
        isChecked:value,
      }
      return updatePlatform;
    })
  }

  return (
    <Box
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="2rem"
    >
      <Text fontSize="25px" fontWeight="bold" marginBottom="1rem">
        <span style={{ color: "#407BFF" }}>Get Personalized</span>{" "}
        <span style={{ color: "#455A64" }}>Business Assessment</span>
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <SimpleGrid columns={2} spacing={10}>
          <Flex flexDirection="column">
            <Text
              fontSize="15px"
              fontWeight={600}
              color="#455A64"
              marginBottom={1}
            >
              Current Challenges in Your Business
            </Text>
            <Box
              w="100%"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="1rem"
              backgroundColor="#fff"
            >
              <Text float="inline-end" color="#1C6ED0"><IoIosArrowUp /></Text>
              {business.map((item, index) => {
                return (
                  <Stack spacing={10} direction="row" key={index}>
                    <Checkbox size='lg' colorScheme='blue' onChange={(e) => handleCheckBusiness(e.target.checked, index)}
                      isChecked={item?.isChecked??false}>
                      <Text color="#455A64">{item?.label}</Text>
                    </Checkbox>
                  </Stack>
                );
              })}
            </Box>
          </Flex>
          <Flex flexDirection="column">
            <Text
              fontSize="15px"
              fontWeight={600}
              color="#455A64"
              marginBottom={1}
            >
              Your Goal
            </Text>
            <Box
              w="100%"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="2rem"
              backgroundColor="#fff"
            >
              <Text float="inline-end" color="#1C6ED0"><IoIosArrowUp /></Text>
              {goals.map((item, index) => {
                return (
                  <Stack spacing={10} direction="row" key={index}>
                    <Checkbox size="lg" colorScheme="blue" onChange={(e) => handleCheckGoals(e.target.checked, index)} isChecked={item?.isChecked??false}>
                      <Text color="#455A64">{item?.label}</Text>
                    </Checkbox>
                  </Stack>
                );
              })}
            </Box>
          </Flex>
          <Flex flexDirection="column">
            <Text
              fontSize="15px"
              fontWeight={600}
              color="#455A64"
              marginBottom={1}
            >

              We are not just a service provider so
              how would you like to use our platform?
            </Text>
            <Box
              w="100%"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="1rem"
              backgroundColor="#fff"
            >
              <Text float="inline-end" color="#1C6ED0"><IoIosArrowUp /></Text>
              {platForm.map((item, index) => {
                return (
                  <Stack spacing={10} direction="row" key={index}>
                    <Checkbox size="lg" colorScheme="blue" onChange={(e) => handleCheckPlatform(e.target.checked, index)} isChecked={item?.isChecked??false}>
                      <Text color="#455A64">{item?.label}</Text>
                    </Checkbox>
                  </Stack>
                );
              })}
            </Box>
          </Flex>
        </SimpleGrid>
        <Button mt="3" colorScheme="blue" type="submit">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default Goals;
