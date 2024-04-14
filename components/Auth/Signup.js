// src/components/Auth/Register.js
import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useHistory, NavLink } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
//   import { HSeparator } from "components/separator/Separator";
// import DefaultAuth from "layouts/auth/Default";
// Assets
// import illustration from "assets/img/auth/auth.png";
// import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

// export const UserContext = createContext();

const Register = () => {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  //   const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  //   const googleText = useColorModeValue("navy.700", "white");
  //   const googleHover = useColorModeValue(
  //     { bg: "gray.200" },
  //     { bg: "whiteAlpha.300" }
  //   );
  //   const googleActive = useColorModeValue(
  //     { bg: "secondaryGray.300" },
  //     { bg: "whiteAlpha.200" }
  //   );
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => setShow(!show);
  const handleConfirm = () => setShowConfirm(!showConfirm);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });

  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirm) {
      alert("passwords do not match!");
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential)
      const user = userCredential.user;
      // console.log("User registered:", user);
      // console.log(userCredential)
      // Now you can safely access user.uid
      // console.log("User UID:", user.uid);

      // Store additional user data in Firestore
      const userDocRef = collection(db, "users");
      await addDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        firstName: first,
        lastName: last,
        phone: phone,
        company: company,
        role:"customer"
        // Add other fields as needed
      });

      if (!user) {
        // User is not authenticated yet
        return <div>Loading...</div>;
      }
      
      // Now it's safe to access user.uid
      // console.log("User UID:", user.uid);

      // If login is successful, navigate to the home page
      history.push("/admin/home");
      console.log("Value of first in parent:", first);
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
              Create a new account
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Enter your email and password to register!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            {/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button> */}
            {/* <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex> */}
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                First Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                onChange={(e) => setFirst(e.target.value)}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={first}
                placeholder="John"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Last Name
              </FormLabel>
              <Input
                isRequired={true}
                onChange={(e) => setLast(e.target.value)}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={last}
                placeholder="Doe"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Company Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                onChange={(e) => setCompany(e.target.value)}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={company}
                placeholder="Bizowl"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Phone Number<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                onChange={(e) => setPhone(e.target.value)}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="tel"
                value={phone}
                placeholder="+91 9100 1234 00"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                onChange={(e) => setEmail(e.target.value)}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                value={email}
                placeholder="hello@email.com"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  onChange={(e) => setPassword(e.target.value)}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  value={password}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Confirm Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  onChange={(e) => setConfirm(e.target.value)}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={showConfirm ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleConfirm}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    id="remember-login"
                    colorScheme="brandScheme"
                    me="10px"
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    fontWeight="normal"
                    color={textColor}
                    fontSize="sm"
                  >
                    Keep me logged in
                  </FormLabel>
                </FormControl>
              </Flex>
              <Button
                onClick={handleRegister}
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Register
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Already Registered?
                <NavLink to="/login">
                  <Text
                    color={textColorBrand}
                    as="span"
                    ms="5px"
                    fontWeight="500"
                  >
                    Login
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
    </div>
  );
};

export default Register;
