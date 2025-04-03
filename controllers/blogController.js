const blogModel = require('../models/blogModel');
const userModel = require("../models/userModel");
const fs = require('fs');

module.exports.loginPage = (req, res) => {
    return res.render('pages/login');
}

module.exports.login = async (req, res) => {
    try {
        let user = await userModel.findOne({ username: req.body.username });

        if (user && user.password === req.body.password) {
            return res.redirect('/');
        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: error.message });
    }
}


module.exports.signupPage = (req, res) => {
    return res.render('pages/signup');
}

module.exports.homePage = async (req, res) => {
    try {
        let blogs = await blogModel.find({});
        return res.render('index', { blogs });
    } catch (error) {
        console.log(error.message);
        return res.render('index', { blogs: [] });
    }
}

module.exports.deletePage = async (req, res) => {
    try {
        let { id } = req.params;

        let blog = await blogModel.findByIdAndDelete(req.params.id);
        fs.unlinkSync(blog.thumbnail);
        console.log("Deleted Suceesfully....")
        return res.redirect('/');

    } catch (error) {
        console.log(error.message);
        return res.redirect('/');
    }
}

module.exports.viewPage = async (req, res) => {
    try {
        let blogs = await blogModel.findById(req.params.id);
        return res.render('pages/viewblog', { blogs });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.addblog = (req, res) => {
    return res.render('pages/addblog');
}

module.exports.addblogPage = async (req, res) => {
    try {
        console.log(req.file);
        let update = { ...req.body, thumbnail: req.file.path };
        let blogs = await blogModel.create(update);
        console.log("created..");
        return res.render('pages/addblog');

    } catch (error) {
        console.log(error.message);
        return res.render('pages/addblog');
    }
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, password, email, confirm_password } = req.body;

        if (password !== confirm_password) {
            return res.render('pages/signup', { message: "Passwords do not match" });
        }

        let user = await userModel.create({ username, password, email });

        console.log('User created successfully');

        return res.redirect('/login');

    } catch (error) {
        console.log(error.message);
        return res.render('pages/signup', { message: "Error creating user" });
    }
};


module.exports.editPage = async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id);
        return res.render("pages/editblog", { blog });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.editblog = async (req, res) => {
    try {
        let { id } = req.params;
        let update = { ...req.body };
        if (req.file) {
            update.thumbnail = req.file.path;
        }
        if (req.file) {
            let blog = await blogModel.findById(id);
            if (blog.thumbnail) {
                fs.unlinkSync(blog.thumbnail);
            }
            updateData.thumbnail = req.file.path;
        }
        else {
            updateData.thumbnail = req.body.thumbnail;
        }

        await blogModel.findByIdAndUpdate(id, updateData);
        return res.redirect('/');


    } catch (error) {
        return res.redirect('/');
    }
}