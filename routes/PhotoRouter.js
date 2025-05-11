const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {

});

router.get("/photosOfUser/:id", async (request, response) => {
    const { id } = request.params
    const photos = await Photo.find({
        user_id: id
    }).select("_id user_id comments file_name date_time")

    const comments = []
    const photosA = []
    for (const photo of photos) {
        for (let comment of photo.comments) {
            const user = await User.findById(comment.user_id).select("_id first_name last_name")
            comments.push({
                user: user,
                comment: comment.comment,
                _id: comment._id,
                date_time: comment.date_time
            })
        }
 
        photosA.push({
            _id: photo._id,
            user_id: photo.user_id,
            file_name: photo.file_name,
            date_time: photo.date_time,
            comments: comments
        })
    }
    response.status(200).send(photosA)

});

module.exports = router;
