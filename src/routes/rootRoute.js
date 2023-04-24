const express = require("express");
const capstoneRouter = require("./capstoneRoute");

const rootRouter = express.Router();

rootRouter.use("/capstone", capstoneRouter);

module.exports = rootRouter;
