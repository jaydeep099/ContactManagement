const mongoose = require('mongoose');

const connectDB = async () => {
    return mongoose
        .connect("mongodb://localhost:27017/contact_managemet")
        .then(() => console.log("Connection to Database is established"))
        .catch((err) => console.log(err));
}

module.exports = connectDB;