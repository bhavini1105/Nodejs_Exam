const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    thumbnail : String,
    description : String
},{timestamps : true});

const blogModel = mongoose.model("blogModel",blogSchema);

module.exports = blogModel;