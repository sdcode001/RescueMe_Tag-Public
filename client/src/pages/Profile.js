import { useState } from 'react'
import {uploadBytes, getDownloadURL ,ref} from 'firebase/storage'
import storage from "../util/firebase";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import currencies from '../assets/currencies.json'
import { PhoneInput } from 'react-international-phone';
import { Select, MenuItem } from '@material-ui/core';
import { Button } from "@chakra-ui/button";
import axios from 'axios'
import { SERVER_BASE_URL, CLIENT_BASE_URL } from '../Env_Variables'
import { QRCode } from 'react-qrcode-logo'
import Shield from '../assets/shield.png'
import { 
    Container, 
    Box, 
    Text, 
    Divider,
    HStack,
    VStack,
    TabPanel, 
    TabPanels, 
    Tabs,
    Avatar,
    Card,
    CardBody,
    useToast 
} from '@chakra-ui/react'




function Profile(){  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("rescueme_tag_user")))
    const _id = user._id
    const [fname, setFname] = useState(user.fname);
    const [lname, setLname] = useState(user.lname);
    const [phone_no1, setPhone1] = useState(user.phone_no1);
    var [phone_no2, setPhone2] = useState(user.phone_no2);
    const [gmap_location_url, setGmapurl] = useState(user.gmap_location_url);
    const [address, setAddress] = useState(user.address);
    const [pincode, setPincode] = useState(user.pincode);
    const [rewardAmount, setReward] = useState(user.reward.split(": ")[1]);
    const [currency, setCurrency] = useState(user.reward.split(": ")[0]);
    const [facebook, setFacebook] = useState(user.facebook);
    const [instagram, setInstagram] = useState(user.instagram);
    const [pic, setPic] = useState(user.pic);
    const [picLoading, setPicLoading] = useState(false);
    const [qrDownloading, setQRDownloading] = useState(false);
    const toast = useToast()



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
    
        if (!lname || !fname || !phone_no1 || phone_no1.length<9 || !gmap_location_url || !address || !pincode) {
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
    
        const inputs={_id,fname,lname,phone_no1,phone_no2,gmap_location_url,address,pincode,reward,facebook,instagram,pic}
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
    
        axios.put(SERVER_BASE_URL+'/user', inputs, config)
              .then((response) => {
                localStorage.setItem("rescueme_tag_user", JSON.stringify(response.data));
                setUser(response.data)
                toast({
                  title: "Update Successful",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                })
                setPicLoading(false);
                //refreshing the page to reinitialized all the state variables.
                window.location.reload()
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



      const downloadQRCode = () => {
        setQRDownloading(true)
        const canvas = document.getElementById("RescueMeQR");
        if(canvas) {
          const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          let downloadLink = document.createElement("a");
          downloadLink.href = pngUrl
          downloadLink.download = `rescuemetag-${_id}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
        setQRDownloading(false)
      }
      


    
    return (
        <Container 
        style={{
            display: "flex"
        }}
        maxW={'xl'} 
        centerContent
        >

        <Card 
          marginTop={5}
          align={"center"}
         
        >
            <CardBody>
                <QRCode
                    value={`${CLIENT_BASE_URL}/user/${_id}`} 
                    size={200} 
                    quietZone={20}
                    logoImage={Shield}
                    logoHeight={50}
                    fgColor='#0407E8'
                    bgColor='yellow'
                    removeQrCodeBehindLogo={true}
                    logoWidth={50}
                    logoOpacity={1}
                    logoPadding={2}
                    enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
                    qrStyle="dots" // type of qr code, wether you want dotted ones or the square ones
                    eyeRadius={10} // radius of the promocode eye
                    eyeColor={[
                        'blue',// top/left eye
                        '#10CD07', // top/right eye
                        '#F00758',  // bottom/left eye
                    ]}
                    id={"RescueMeQR"}
                />   
            </CardBody>    
        </Card> 

        <Button
            as={"a"}
            colorScheme="yellow"
            width="50%"
            style={{ marginTop: 10 }}
            onClick={downloadQRCode}
            isLoading={qrDownloading}
            fontFamily={'monospace'}
        >
            Download Tag
        </Button>

        <Divider variant={'dashed'} colorScheme='linkedin'/>  
        
        <Text fontSize="4xl" fontFamily={'monospace'} marginTop={1}>Edit Profile</Text>
       
        <Box  bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" marginTop={1}>
        <Tabs isFitted variant="soft-rounded" colorScheme='yellow'>
            <TabPanels>
            <TabPanel>
                <VStack>
                

                <FormControl id="first-name">
                    <FormLabel fontFamily={'monospace'}>First Name</FormLabel>
                    <Input
                    type='text'
                    value={fname}
                    placeholder="Enter First Name"
                    onChange={(e) => setFname(e.target.value)}
                    />
                </FormControl>

                <FormControl id="last-name">
                    <FormLabel fontFamily={'monospace'}>Last Name</FormLabel>
                    <Input
                    type="text"
                    value={lname}
                    placeholder="Enter Last Name"
                    onChange={(e) => setLname(e.target.value)}
                    />
                </FormControl>

                <FormControl id="email">
                    <FormLabel fontFamily={'monospace'}>Email</FormLabel>
                    <Input
                    type="text"
                    value={user.email}
                    placeholder={user.email}
                    />
                </FormControl>
                    
                <FormControl id="phone-no1">
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

                <FormControl id="gmap-url">
                    <FormLabel fontFamily={'monospace'}>Google Map URL</FormLabel>
                    <InputGroup size='sm'>
                    <InputLeftAddon children='https://'/>
                    <Input
                    value={gmap_location_url}
                    placeholder="Enter Google Map URL"
                    onChange={(e) => setGmapurl(e.target.value)}
                    />
                    </InputGroup>
                </FormControl>

                <FormControl id="address">
                    <FormLabel fontFamily={'monospace'}>Address</FormLabel>
                    <Input
                    type="text"
                    value={address}
                    placeholder="Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </FormControl>

                <FormControl id="pincode">
                    <FormLabel fontFamily={'monospace'}>Pincode</FormLabel>
                    <Input
                    type="number"
                    value={pincode}
                    placeholder="Enter Pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    />
                </FormControl>

                <FormControl id="facebook-url" >
                    <FormLabel fontFamily={'monospace'}>Facebook URL</FormLabel>
                    <InputGroup size='sm'>
                    <InputLeftAddon children='https://'/>
                    <Input
                    value={facebook}
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
                    value={instagram}
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
                        value={rewardAmount}
                        placeholder="Enter Reward Amount"
                        onChange={(e) => setReward(e.target.value)}
                    />
                    </HStack>
                </FormControl>

                

                <FormControl id="pic" marginTop={3}>
                    <HStack>
                        <Avatar 
                            name={`${fname} ${lname}`} 
                            src={pic}
                            size='xl' 
                            boxSize='3.3em'
                        />
                       
                        <Input
                        marginLeft={1}
                        type="file"
                        p={1.5}
                        accept="image/*"
                        placeholder='Upload your Photo'
                        onChange={(e) => postDetails(e.target.files[0])}
                        />

                    </HStack>
                    
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
                    Update
                </Button>

                </VStack> 
            </TabPanel>
           </TabPanels>
        </Tabs>
        </Box> 
       </Container>
    )
 }
 
 
 export default Profile