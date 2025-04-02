const { Router } = require("express");
const blogController = require('../controllers/blogController');
const upload = require("../middlewares/uploadimg");

const blogRouter = Router();

blogRouter.get('/login',blogController.loginPage);
blogRouter.post('/login',blogController.login);


blogRouter.get('/signup',blogController.signupPage);
blogRouter.post('/signup',blogController.signUp);

blogRouter.get("/",blogController.homePage);
blogRouter.get("/addblog",blogController.addblog);
blogRouter.post("/addblog",upload,blogController.addblogPage);
blogRouter.get("/viewblog/:id",blogController.viewPage);
blogRouter.get("/deleteblog/:id",blogController.deletePage);
blogRouter.get("/editblog/:id",blogController.editPage);
blogRouter.post("/upadate/:id",blogController.editblog);

module.exports=blogRouter;