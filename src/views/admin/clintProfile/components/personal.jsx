import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { db } from "config/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { States } from "views/admin/clintProfile/data/ServiceData";
import * as yup from "yup";
import { Fit } from "../data/ServiceData";

const personalDetailsSchema = yup.object({
  fullName: yup.string().required("Full Name Required."),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email Required."),
  city: yup.string().required("City Required."),
  state: yup.string().required("State Required."),
  phone: yup.number().required("Phone is Required"),
  whatsappNo: yup.number().required("Whatsapp Number is Required"),
});

const Personal = () => {
  const [states, setStates] = useState([]);
  const [fit, setFit] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const toast = useToast();

  useEffect(() => {
    getCurrentUser();
    setStates(States);
    setFit(Fit);
  }, []);

  const editPortfolio = async (values) => {
    try {
      const portfolioDocRef = doc(db, "users", values?.id);
      await updateDoc(portfolioDocRef, values);
      toast({
        description: "Personal Information updated",
        status: "success",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      fullName: "",
      contactNumber: "",
      email: "",
      city: "",
      state: "",
      whatsappNo: "",
      phone: "",
    },
    validationSchema: personalDetailsSchema,
    onSubmit: (values) => {
      editPortfolio(values); },
  });

  const getCurrentUser = async () => {
    try {
      const userUid = sessionStorage.getItem("uid");
      const queryForGetUser = query(
        collection(db, "users"),
        where("uid", "==", userUid)
      );
      const querySnapshot = await getDocs(queryForGetUser);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0]?.data();
        const documentId = querySnapshot.docs[0]?.id;
        setUserDetails(userData);
        formik.setValues({ id: documentId, ...userData });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="2rem"
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex mb="5" justifyContent="space-between">
          <FormControl
            w="45%"
            isInvalid={formik?.errors?.fullName && formik?.touched?.fullName}
          >
            <FormLabel htmlFor="fullName">Full Name</FormLabel>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik?.handleChange}
              value={formik?.values?.fullName}
              onBlur={formik?.handleBlur}
              style={{ backgroundColor: "white" }}
            />
            <FormErrorMessage>{formik?.errors?.fullName}</FormErrorMessage>
          </FormControl>
          <FormControl
            w="45%"
            isInvalid={
              formik?.errors?.contactNumber && formik?.touched?.contactNumber
            }
          >
            <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="text"
              onChange={formik?.handleChange}
              value={formik?.values?.contactNumber}
              onBlur={formik?.handleBlur}
              style={{ backgroundColor: "white" }}
            />
            <FormErrorMessage>{formik?.errors?.contactNumber}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex mb="5" justifyContent="space-between">
          <FormControl
            w="45%"
            isInvalid={formik?.errors?.phone && formik?.touched?.phone}
          >
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <Input
              id="phone"
              name="phone"
              type="text"
              onChange={formik?.handleChange}
              value={formik?.values?.phone}
              onBlur={formik?.handleBlur}
              style={{ backgroundColor: "white" }}
            />
            <FormErrorMessage>{formik?.errors?.phone}</FormErrorMessage>
          </FormControl>
          <FormControl
            w="45%"
            isInvalid={
              formik?.errors?.whatsappNo && formik?.touched?.whatsappNo
            }
          >
            <FormLabel htmlFor="whatsappNo">Whatsapp Number</FormLabel>
            <Input
              id="whatsappNo"
              name="whatsappNo"
              type="number"
              onChange={formik?.handleChange}
              value={formik?.values?.whatsappNo}
              onBlur={formik?.handleBlur}
              style={{ backgroundColor: "white" }}
            />
            <FormErrorMessage>{formik?.errors?.whatsappNo}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex mb="5" justifyContent="space-between">
          <FormControl
            w="45%"
            isInvalid={formik?.errors?.city && formik?.touched?.city}
          >
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              name="city"
              type="text"
              onChange={formik?.handleChange}
              value={formik?.values?.city}
              onBlur={formik?.handleBlur}
              style={{ backgroundColor: "white" }}
            />
            <FormErrorMessage>{formik?.errors?.city}</FormErrorMessage>
          </FormControl>
          <FormControl
            w="45%"
            isInvalid={formik?.errors?.state && formik?.touched?.state}
          >
            <FormLabel htmlFor="state">State</FormLabel>
            <Select
              mb="4"
              id="state"
              name="state"
              placeholder="Select option"
              onChange={formik?.handleChange}
              value={formik?.values?.state}
              onBlur={formik?.handleBlur}
              backgroundColor="white"
            >
              {states?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{formik?.errors?.state}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex mb="5" justifyContent="space-between">
          <FormControl
            w="45%"
            isInvalid={formik?.errors?.fitOption && formik?.touched?.fitOption}
          >
            <FormLabel htmlFor="fitOption">What fits you?</FormLabel>
            <Select
              mb="4"
              id="fitOption"
              name="fitOption"
              placeholder="Select option"
              onChange={formik?.handleChange}
              value={formik?.values?.fitOption}
              onBlur={formik?.handleBlur}
              backgroundColor="white"
            >
              {fit?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{formik?.errors?.fitOption}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Button colorScheme="blue" type="submit">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default Personal;
