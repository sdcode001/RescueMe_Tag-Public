import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { useToast } from "@chakra-ui/react";
import { SERVER_BASE_URL } from '../Env_Variables'
import { VStack } from "@chakra-ui/layout";
import LoadingSpinner from '../components/LoadingSpinner';
import Scratchcard from '../components/ScratchCard';
import { 
    Container, 
    Box, 
    Text,  
    TabPanel, 
    TabPanels, 
    Avatar,
    Button,
    Divider,
    HStack,
    Tabs
    } from '@chakra-ui/react'

import {
    EmailIcon,
    ChatIcon,
    } from '@chakra-ui/icons'
import {
    MdCall,
    MdLocationPin
    } from 'react-icons/md'
import {
    FaFacebook,
    FaInstagram,
    } from 'react-icons/fa'



function User(){
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const toast = useToast()



    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            axios.get(SERVER_BASE_URL+`/user?id=${id}`)
            .then((response) => {
                setUser(response.data)
                setLoading(false)
            })
            .catch((reason) => {
                setLoading(false)
                if (reason.response.status === 400 || reason.response.status === 404) {
                    toast({
                        title: reason.response.data.error,
                        description: "",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "bottom",
                        });
                } else {
                    toast({
                        title: reason.message,
                        description: "",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "bottom",
                        });
                }
            })            
        }

        fetchData() 

    }, [id, toast])


    
    return (
        <>
          {!loading?
             <Container 
            style={{
                display: "flex"
            }}
            maxW={'xl'} 
            centerContent
            >
            
            
            <Text fontSize="4xl" fontFamily={'monospace'} marginTop={4}>Owner Details</Text>
           
            
            <Box  bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" marginTop={2}>
            <Tabs isFitted variant="soft-rounded" colorScheme='yellow'>
                <TabPanels>
                <TabPanel>
                <VStack>

                    <Avatar 
                        name={`${user.fname} ${user.lname}`} 
                        src={user.pic}
                        size='2xl' 
                        boxSize='3.3em'
                    />


                    <HStack spacing='1px' marginTop={5}>
                      <Text fontSize='xl' as='b'>{`Name: `}</Text>
                      <Text fontSize='xl' as='animate' marginLeft={3}>{`${user.fname} ${user.lname}`}</Text>
                    </HStack>
                    

                    <Divider variant={'dashed'} colorScheme='linkedin'/>

                    
                    <HStack spacing='1px' marginTop={1}>
                      <Text fontSize='xl' as='b'>{`Email:`}</Text>
                      <Text fontSize='xl' as='animate' marginLeft={2}>{`${user.email}`}</Text>
                      <a href={`mailto:${user.email}?subject=Found Your Lost Item - Let's Reunite You with It!`}>
                        <Button 
                            as={"a"}
                            leftIcon={<EmailIcon />} 
                            colorScheme='facebook'
                            variant='solid'
                            marginLeft={1}
                            paddingRight={2} 
                            > 
                        </Button>
                      </a>
                      
                    </HStack>

                    <Divider variant={'dashed'} colorScheme='linkedin'/>
                    
                    <HStack spacing='1px' marginTop={2}>
                      <Text fontSize='xl' as='b'>{`Phone1:`}</Text>
                      <Text fontSize='xl' as='animate' marginLeft={2}>{`${user.phone_no1}`}</Text>
                      <a href={`tel:${user.phone_no1}`}>
                        <Button 
                            as={"a"}
                            leftIcon={<MdCall />} 
                            colorScheme='facebook' 
                            paddingRight={2}
                            variant='solid'
                            marginLeft={1} 
                            >
                        </Button>
                      </a>
                      <a href={`sms:${user.phone_no1}`}>
                        <Button 
                            as={"a"}
                            leftIcon={<ChatIcon/>} 
                            colorScheme='facebook' 
                            variant='solid'
                            paddingRight={2}
                            marginLeft={1} 
                            >
                        </Button>
                      </a>
                      
                    </HStack>


                    <Divider variant={'dashed'} colorScheme='linkedin'/>
                    
                    <HStack spacing='1px' marginTop={2}>
                      <Text fontSize='xl' as='b'>{`Phone2:`}</Text>
                      <Text fontSize='xl' as='animate' marginLeft={2}>{`${user.phone_no2}`}</Text>
                      <a href={`tel:${user.phone_no2}`}>
                        <Button 
                            as={"a"}
                            leftIcon={<MdCall />} 
                            colorScheme='facebook'
                            variant="solid"
                            paddingRight={2}
                            marginLeft={1}
                            >
                        </Button>
                      </a>
                      <a href={`sms:${user.phone_no2}`}>
                        <Button 
                            as={"a"}
                            leftIcon={<ChatIcon/>} 
                            colorScheme='facebook' 
                            variant='solid'
                            paddingRight={2}
                            marginLeft={1} 
                            >
                        </Button>
                      </a>
                      
                    </HStack>
                       
                    <Divider variant={'dashed'} colorScheme='linkedin'/>   
                    
                    <HStack spacing='1px' marginTop={2}>
                        <a href={user.facebook}>
                            <Button as={"a"} colorScheme='messenger' leftIcon={<FaFacebook />}>
                                Facebook
                            </Button>
                        </a>
                        <a href={user.instagram}>
                            <Button as={"a"} colorScheme='pink' leftIcon={<FaInstagram />} marginLeft={1}>
                                Instagram
                            </Button>
                        </a>
                    </HStack>

                    <Divider variant={'dashed'} colorScheme='linkedin'/>  

                    <HStack spacing='1px' marginTop={1}>
                      <Text fontSize='xl' as='b'>{`Address:`}</Text>
                      <Text fontSize='lg' as='animate' marginLeft={3}>{`${user.address}`}</Text> 
                    </HStack>

                    <Divider variant={'dashed'} colorScheme='linkedin'/>  

                    <HStack spacing='1px' marginTop={1}>
                      <Text fontSize='xl' as='b'>{`Pin/Zip code:`}</Text>
                      <Text fontSize='xl' as='animate' marginLeft={3}>{`${user.pincode}`}</Text> 
                    </HStack>

                    <Divider variant={'dashed'} colorScheme='linkedin'/> 
                    
                    <a href={user.gmap_location_url}>
                        <Button as={"a"} colorScheme='facebook' leftIcon={<MdLocationPin />}>
                            Google Map Location
                        </Button>
                    </a>

                    <Divider variant={'dashed'} colorScheme='linkedin'/> 

                    <Divider variant={'dashed'} colorScheme='linkedin'/> 
                    
                    <Scratchcard>
                       <div style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                            }}
                            >
                            <VStack>
                            <Text fontSize='xl' color={"hotpink"} as='b'>-:Reward Amount:-</Text>
                            <Text fontSize='2xl' color={"green"} as='b'>{user.reward}</Text>
                            </VStack>        
                        </div>
                    </Scratchcard>


                </VStack> 
                </TabPanel>
               </TabPanels>
            </Tabs>
            </Box> 
           </Container>
          :
           <LoadingSpinner/>
          }
        </>

    )
 }


 
 
 export default User
