const express = require('express')
const cors = require('cors');
require('dotenv').config()
const routing = require('./routers/userRouter')
const PORT = process.env.PORT
const {connectDb} = require('./database/mongoDB')


//* Importing express
const app = express();

app.use(cors())
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({extended:true}))
connectDb()


app.use('/UserDB',routing)

app.get('/',(req,res)=>{
    res.send('Hello World...!')
})

app.listen(PORT,err=>{
    if(err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`)
})
