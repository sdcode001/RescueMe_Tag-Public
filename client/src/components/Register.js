import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React ,{ useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Select, MenuItem } from '@material-ui/core';
import { useToast, HStack } from "@chakra-ui/react";
import storage from "../util/firebase";
import {uploadBytes, getDownloadURL ,ref} from 'firebase/storage'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { SERVER_BASE_URL } from '../Env_Variables'
import axios from 'axios'
import currencies from '../assets/currencies.json'



const Register=()=>{
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [phone_no1, setPhone1] = useState();
  var [phone_no2, setPhone2] = useState();
  const [gmap_location_url, setGmapurl] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [rewardAmount, setReward] = useState("00.00");
  const [currency, setCurrency] = useState("Rs");
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()


  async function postDetails(pics){
    setPicLoading(true)
    if(pics===undefined){
      toast({
        title: 'Please select an Image',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      })
      setPicLoading(false)
      return
    }

    if(pics.type==='image/jpeg'||pics.type==='image/jpg'||pics.type==='image/png'){
      const imageRef=ref(storage, `profile_pictures/${pics.name}`)
      uploadBytes(imageRef, pics)
      .then(async(data)=>{
          const pic_url = await getDownloadURL(data.ref)
          setPic(pic_url.toString())
          setPicLoading(false)
      })
      .catch((err)=>{
          console.log(err)
          setPicLoading(false)
      })
      return 
    }

    toast({
      title: 'Please select an Image file',
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'bottom'
    })
    setPicLoading(false)
    return
  }


  const submitHandler = async()=>{
    setPicLoading(true);

    function validateEmail(email) {
      var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email);
    }

    if (!lname || !fname || !validateEmail(email) || !password || !phone_no1 || phone_no1.length<9 || !gmap_location_url || !address || !pincode) {
      toast({
        title: "Please fill all the required feilds correctly",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if(phone_no2.length<9){phone_no2=phone_no1;}

    const reward = (rewardAmount!=="")? currency+": "+rewardAmount : currency+": 00.00"

    const inputs={fname,lname,email,password,phone_no1,phone_no2,gmap_location_url,address,pincode,reward,facebook,instagram,pic}
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    axios.post(SERVER_BASE_URL+'/auth/register', inputs, config)
          .then((response) => {
            localStorage.setItem("rescueme_tag_user", JSON.stringify(response.data));
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            })
            setPicLoading(false);
            //redirect home page
            navigate('/home') 
          })
          .catch((reason) => {
              setPicLoading(false);
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
                  title: reason.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                });
              }
          })
  }
  

return (
   <VStack spacing="5px">
      <FormControl id="first-name" isRequired >
        <FormLabel fontFamily={'monospace'}>First Name</FormLabel>
        <Input
          type='text'
          placeholder="Enter First Name"
          onChange={(e) => setFname(e.target.value)}
        />
      </FormControl>

      <FormControl id="last-name" isRequired>
        <FormLabel fontFamily={'monospace'}>Last Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter Last Name"
          onChange={(e) => setLname(e.target.value)}
        />
      </FormControl>

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

      <FormControl id="phone-no1" isRequired>
        <FormLabel fontFamily={'monospace'}>Phone Number</FormLabel>
        <PhoneInput
            defaultCountry="in"
            value={phone_no1}
            onChange={(phone_no1) => setPhone1(phone_no1)}
          />
      </FormControl>

      <FormControl id="phone-no2">
        <FormLabel fontFamily={'monospace'}>Alternative Phone Number</FormLabel>
        <PhoneInput
            defaultCountry="in"
            value={phone_no2}
            onChange={(phone_no2) => setPhone2(phone_no2)}
          />
      </FormControl>

      <FormControl id="gmap-url" isRequired>
        <FormLabel fontFamily={'monospace'}>Google Map URL</FormLabel>
        <InputGroup size='sm'>
          <InputLeftAddon children='https://'/>
          <Input
          placeholder="Enter Google Map URL"
          onChange={(e) => setGmapurl(e.target.value)}
        />
        </InputGroup>
      </FormControl>

      <FormControl id="address" isRequired>
        <FormLabel fontFamily={'monospace'}>Address</FormLabel>
        <Input
          type="text"
          placeholder="Enter Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>

      <FormControl id="pincode" isRequired>
        <FormLabel fontFamily={'monospace'}>Pincode</FormLabel>
        <Input
          type="number"
          placeholder="Enter Pincode"
          onChange={(e) => setPincode(e.target.value)}
        />
      </FormControl>

      <FormControl id="facebook-url" >
        <FormLabel fontFamily={'monospace'}>Facebook URL</FormLabel>
        <InputGroup size='sm'>
          <InputLeftAddon children='https://'/>
          <Input
          placeholder="Enter Facebook URL"
          onChange={(e) => setFacebook(e.target.value)}
        />
        </InputGroup>
      </FormControl>

      <FormControl id="instagram-url">
        <FormLabel fontFamily={'monospace'}>Instagram URL</FormLabel>
        <InputGroup size='sm'>
          <InputLeftAddon children='https://'/>
          <Input
          placeholder="Enter Instagram URL"
          onChange={(e) => setInstagram(e.target.value)}
        />
        </InputGroup>
      </FormControl>

      <FormControl id="reward" >
        <FormLabel fontFamily={'monospace'}>Reward Amount</FormLabel>
        <HStack>
          <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                color="primary"
                variant="outlined"
            >
              {Object.keys(currencies).map(item => {
                  return(
                      <MenuItem value={currencies[item].symbol}>{`${currencies[item].symbol} - ${currencies[item].name}`}</MenuItem>
                  )
              })}
          </Select>

          <Input
            marginLeft={1}
            type="number"
            placeholder="Enter Reward Amount"
            onChange={(e) => setReward(e.target.value)}
          />
        </HStack>
      </FormControl>

      <FormControl id="pic">
        <FormLabel fontFamily={'monospace'}>Upload your Photo</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        as={"a"}
        colorScheme="yellow"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
        fontFamily={'monospace'}
      >
        Submit
      </Button>
    
 </VStack>
)

}

export default Register