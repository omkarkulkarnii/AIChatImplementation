import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import MessageUser from "./MessageUser";
import MessageAi from "./MessageAi";
import axios from "axios";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOnline, setOnline] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    // Save messages to local storage on change
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Set initial online status
    setOnline(navigator.onLine);

    // Add event listeners for online and offline status
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle sending message on button click or pressing Enter
  const handleClick = async () => {
    if (inputValue.trim() !== "") {
      const newMessages = [...messages, { type: "user", text: inputValue }];
      setMessages(newMessages);

      try {
        const response = await axios.post(
          "https://ai-chat.azurewebsites.net/api/messages",
          {
            message: inputValue,
          }
        );
        setMessages([...newMessages, { type: "ai", text: response.data }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInputValue("");
    } else {
      alert("Please enter a prompt");
    }
  };

  // Handle keypress for Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  if (!isOnline) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Your browser is offline!</AlertTitle>
        <AlertDescription>
          Please check your internet connection and we will be ready for your
          help whenever your network improves
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Box
      bg="gray"
      h="85vh"
      w="100%"
      p={2}
      m="1vh"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        flex="1"
        overflowY="auto"
        display="flex"
        flexDirection="column"
        gap="2px"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            maxWidth="60%"
            minWidth="30%"
            alignSelf={message.type === "user" ? "flex-start" : "flex-end"}
          >
            {message.type === "user" ? (
              <MessageUser text={message.text} />
            ) : (
              <MessageAi text={message.text} />
            )}
          </Box>
        ))}
      </Box>
      <Box display="flex" height="5vh" alignItems="center">
        <Input
          ref={inputRef}
          color="black"
          backgroundColor="whitesmoke"
          placeholder="Type your message..."
          flex="1"
          borderColor="blue"
          value={inputValue}
          onKeyDown={handleKeyDown} // Correctly handle Enter key here
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          color="blue"
          borderColor="blue"
          marginLeft="2px"
          onClick={handleClick}
          tabIndex="0"
          onKeyDown={handleKeyDown}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
