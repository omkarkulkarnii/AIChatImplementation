import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const MessageAi = ({text}) => {
  return (
    <Box display="flex"flexDirection="column"  padding="2px" fontSize="1em" minWidth="40%" width="inherit" borderRadius="5px" backgroundColor="cyan" color="black" fontWeight="bolder">
         <div style={{display:'flex', minHeight:'15px'}}>
        <Text height={"8px"} >Ai: </Text>
        <Text height={'inherit'} >{text}</Text>
    </div>
    </Box>
    
    // <div style={{display:'flex', minHeight:'20px'}}>
    //     <Text height={"0.3rem"} >Ai: </Text>
    //     <Text height={'inherit'} >Lorem ipsum dolor sit amet.</Text>
    // </div>
  )
}

export default MessageAi