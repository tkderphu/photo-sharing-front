const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

//???????
router.post("/", async (request, response) => {
  
});

router.get("/list", async (request, response) => {
    const users = await User.find().select("_id first_name last_name")
    response.status(200).send(users)
})

router.get("/:id", async (request, response) => {
    const {id} = request.params
   const user = await  User.findById(id).select("_id first_name last_name location description occupation")
    if(user) {
        response.status(200).send(user)
    } else {
        response.status(400).send(`User with id: ${id} not found`)
    }
});

module.exports = router;