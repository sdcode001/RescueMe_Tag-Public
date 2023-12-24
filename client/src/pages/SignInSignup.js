import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Login from '../components/Login'
import Register from '../components/Register'



function LogIn() {

  return (
    <Container 
     style={{
      display: "flex"
     }}
     maxW={'xl'} 
     centerContent
     >
      <Box d="flex"
        p={4}
        marginTop={5}
        bg="white"
        w='-webkit-max-content'
        borderRadius='full'
        borderWidth="2px"
        centerContent
        >
       <Text fontSize="4xl" fontFamily={'monospace'}>RescueMe Tag</Text>
      </Box>
       
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" marginTop={5}>
      <Tabs isFitted variant="soft-rounded" colorScheme='yellow'>
          <TabList mb="1em">
            <Tab fontFamily={'monospace'}>Login</Tab>
            <Tab fontFamily={'monospace'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {<Login/>}
            </TabPanel>
            <TabPanel>
              {<Register/>}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}


export default LogIn