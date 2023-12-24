import React from "react"
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input} from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useToast } from "@chakra-ui/react";
import { SERVER_BASE_URL } from '../Env_Variables'
import axios from 'axios'



const Login=()=>{
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()

  
   const submitHandler=async ()=>{
    setLoading(true)
    if(!email){
      toast({
        title: 'Please enter Email',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false)
      return 
    }
    if(!password){
      toast({
        title: 'Please enter Password',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false)
      return 
    }

    const inputs={email,password}
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
   
    axios.post(SERVER_BASE_URL+'/auth/login', inputs, config)
          .then((response) => {
            localStorage.setItem("rescueme_tag_user", JSON.stringify(response.data));
            toast({
              title: "Login Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            })
            setLoading(false);
            //redirect home page
            navigate('/home')
          })
          .catch((reason) => {
              setLoading(false)
              if (reason.response.status === 400 || reason.response.status === 404) {
                toast({
                  title: "Error Occurred!",
                  description: reason.response.data.error,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "bottom",
                }); 
              } else {
                toast({
                  title: reason.message ,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                });
              }
          }) 
                     
    return
  }




return (
    <VStack spacing="5px">

      <FormControl id="email" isRequired>
        <FormLabel fontFamily={'monospace'}>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel fontFamily={'monospace'}>Password</FormLabel>
        <Input
            type={"password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
      </FormControl>

      <Button
        as={"a"}
        colorScheme="yellow"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        fontFamily={'monospace'}
      >
        Log In
      </Button>
    
 </VStack>
)
 

}

export default Login