import { Text,Box } from "@chakra-ui/react";
import React from "react";

const MessageUser = (props) => {
  return (
    <Box display="flex"flexDirection="column" 
    minHeight={"40px"}
    maxWidth={"60%"} minWidth={"30%"} padding="2px" fontSize="1em"  width="inherit" borderRadius="5px" backgroundColor="lightcyan" color="black" fontWeight="bolder">
    <div style={{display:'flex', minHeight:'15px'}}>
   <Text height={"8px"} >You: </Text>
   <Text height={'inherit'} >{props.text || ""}</Text>
</div>
</Box>
  );
};

export default MessageUser;
