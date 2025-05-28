const express = require("express");
const User = require("../db/userModel");
const authRouter = express.Router();

authRouter.post("/admin/login", (req, res) => {

})

authRouter.post("/admin/logout", (req, res) => {

})


module.exports = authRouter