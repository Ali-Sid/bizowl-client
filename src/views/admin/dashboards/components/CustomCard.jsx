import Card from 'components/card/Card';
import { HSeparator } from 'components/separator/Separator';
import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';


const CustomCard = ({card}) => {
    return (
        <Card width="30%" bgColor={card?.bgColor} style={{boxShadow:"#E5A8CC", marginBottom:"2rem",boxShadow:"2px 4px 14px 0px #E5A8CC"}}>
            <Text color="#1B2559" fontWeight="bold" fontSize="1.25rem">{card?.project}</Text>
            <Text color="#1B2559" fontWeight="bold">{card?.number}</Text>
            <HSeparator/>
        </Card>
    )
}
export default CustomCard;