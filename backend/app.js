const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

//middlewares
app.use(express.json()); // response gets in json format
app.use(morgan("tiny")); // logs which api is called or hit

//routes
app.get("/", (req, res) => {
    res.send("Hello World");
})

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