const http=require('http')
const app=require('./app')
require('dotenv').config({path:'./.env'})


const server=http.createServer(app)

const PORT=process.env.SERVER_PORT

server.listen(PORT,()=>{
    console.log(`Server listening to PORT:${PORT}`)
})


