import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Service from './components/Service'
import Brand from './components/Brand'

const Recommendation = () => {
  return (
    <div>
      <Flex maxW="100%" justifyContent="space-between" flexDirection="column">
        <Text fontWeight="bold" fontSize="25px">
        <span style={{ color: "#407BFF",fontWeight:"600", fontSize:"20px" }} >Recommendations</span> 
        <span style={{ color: "#263238",fontWeight:"600", fontSize:"20px" }}> For You !</span>
        </Text>
        <Flex marginTop={5}>
        <Service/>
        </Flex>
       
       
        </Flex>
    </div>
  )
}

export default Recommendation
