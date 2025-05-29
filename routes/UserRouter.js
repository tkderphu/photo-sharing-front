const express = require("express");
const User = require("../db/userModel");
const router = express.Router();


router.post("/user", async (request, response) => {
    const {login_name, password, first_name, last_name, location, description, occupation} = request.body
    const user = await User.findOne({
        login_name: login_name
    })

    
    if(user) {
        response.status(400).send("User exists in db")
    } else {
        if(0 == 0) {

        }
        const newUser = new User({
            login_name, password, first_name, last_name, location, description, occupation
        })

        const savedUser = await newUser.save();
        res.status(200).send({
            login_name: login_name
        })
    }

});

router.get("/user/list", async (request, response) => {
    const users = await User.find().select("_id first_name last_name")
    response.status(200).send(users)
})

router.get("/user/:id", async (request, response) => {
    const {id} = request.params
   const user = await  User.findById(id).select("_id first_name last_name location description occupation")
    if(user) {
        response.status(200).send(user)
    } else {
        response.status(400).send(`User with id: ${id} not found`)
    }
});

module.exports = router;