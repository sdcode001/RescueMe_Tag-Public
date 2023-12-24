const express=require('express')
const {LoginUserHandler, RegisterUserHandler}=require('./auth.controller')
const {GetUser, UpdateUser}=require('./user.controller') 

const router=express.Router()

router.post('/auth/register', RegisterUserHandler)
router.post('/auth/login', LoginUserHandler)
router.get('/user', GetUser)
router.put('/user', UpdateUser)


module.exports={
    router
}