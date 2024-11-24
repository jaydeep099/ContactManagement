const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
require("dotenv").config({path : "./config/config.env"})

const app = express();

//middlewares
app.use(express.json()); // response gets in json format
app.use(morgan("tiny")); // logs which api is called or hit
app.use(require("cors")())

//routes
app.use("/api", require("./routes/auth"))
app.use("/api", require("./routes/contact"))

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