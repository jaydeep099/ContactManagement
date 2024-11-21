const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
require("dotenv").config({path : "./config/config.env"})
const auth = require("./middleware/auth");

const app = express();

//middlewares
app.use(express.json()); // response gets in json format
app.use(morgan("tiny")); // logs which api is called or hit

//routes
app.get("/protected",auth,(req,res) =>{
    return res.status(200).json({ ...req.user._doc})
})
app.use("/api", require("./routes/auth"))

//server configuration
const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`server listening on port: ${PORT}`);
    }catch(err){
        console.log(err);
    }
})