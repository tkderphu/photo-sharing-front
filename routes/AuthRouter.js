const express = require("express");
const User = require("../db/userModel");
const { generateToken } = require("../utils/jwt");
const authRouter = express.Router();

authRouter.post("/admin/login", async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({
        login_name: username,
        password: password
    })
  
    if(user) {
        const userId = user._id
        const token = generateToken({userId})
        res.status(200).send({token: token})
    } else {
        res.status(400).send({msg: "Your login name or password incorrect, please try again"})
    }
})

authRouter.post("/admin/logout", (req, res) => {
     const userId = req.userId
     if(!userId) {
        res.status(400).send({ msg: "You haven't loggined yet" })
     }
})


module.exports = authRouter