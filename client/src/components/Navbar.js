import React from 'react'
import {
    Box,
    Flex,  
    Button,
    Stack,
    useColorModeValue,
  } from "@chakra-ui/react"


  


  
  function Navbar() {
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4, md: 20, lg: 32 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
          placeContent={"flex-end"}
        >
          

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={8}
          >

            <Button
            as={"a"}
            fontSize={"m"}
            fontWeight={400}
            marginLeft={3}
            fontFamily={'monospace'}
            variant={"link"}
            href="/home"
            >
              Home
            </Button>
            
            <Button
            as={"a"}
            fontSize={"m"}
            fontWeight={400}
            fontFamily={'monospace'}
            marginLeft={3}
            variant={"link"}
            href="/profile"
            >
              Profile
            </Button>
            

            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              marginLeft={3}
              color={"white"}
              href="/signup"
              fontFamily={'monospace'}
              bg={"orange"}
              _hover={{
                bg: "red",
              }}
            >
              SignIn/SignUp
            </Button>

          </Stack>
        </Flex>
  
      </Box>
    )
  }


  export default Navbar

  
  