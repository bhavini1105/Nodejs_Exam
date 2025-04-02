const { default: mongoose } = require("mongoose");

require('dotenv').config();
const url = process.env.DB_URL;

const db=()=>{
    try {
        mongoose.connect(url);
        console.log("Database connected...");
    } catch (error) {
        console.log(error.message);        
    }
}

module.exports = db;
