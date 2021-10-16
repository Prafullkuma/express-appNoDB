const express =require('express')
const logger=require('./middleWare/logger')

const app=express()

const PORT = process.env.PORT  || 5000
//Body parser middleware

app.use(express.json())

// form data and handle urlecoded data
app.use(express.urlencoded({extended:false}))

app.use(logger)

//set a static folder
app.use(express.static('public'))

//Members API routes 
app.use('/api/member',require('./Router/api/member'))


app.listen(PORT,()=>{
    console.log("Server is running on ",PORT)
})