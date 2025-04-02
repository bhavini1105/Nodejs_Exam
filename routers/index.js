const { Router } = require("express");
const blogRouter = require("./bogRouter");

const indexRouter = Router();

indexRouter.use('/',blogRouter);

module.exports = indexRouter;