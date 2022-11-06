const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConnect = require('./config/db')
const PORT = process.env.PORT || 5001
const app = express()
app.use(express.json())
app.use(cors({origin:["https://fileshareonline.netlify.app","http://localhost:3000"]}))
dbConnect()
// Routes
app.use('/api',require('./router/files'))
app.use('/api/file/download',require('./router/downloadFile'))
app.get('/',(req,res)=>{
    res.send("Welcome to FileShare")
})
app.listen(process.env.PORT||5001,()=>{
    console.log(`server running http://localhost:${PORT}`);
})