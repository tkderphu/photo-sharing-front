const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const { parseFileMiddleWare } = require("../middleware/middleware");
const router = express.Router();
import path from 'path';
import fs from 'fs';



router.post("/posts/new", parseFileMiddleWare, async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).send({ msg: "you must send file" })
        } else {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = path.extname(req.file.originalname); // e.g., ".jpg"
            const fileName = `${uniqueSuffix}${ext}`;
            const outputPath = path.join(__dirname, '..', 'images', fileName);

            const imagesDir = path.join(__dirname, '..', 'images');
            if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir);
            }

            fs.writeFileSync(outputPath, req.file.buffer);
            
            const photo = new Photo({
                user_id: "",
                file_name: fileName
            })

            await photo.save()

            res.status(200).json({
                message: 'Uploaded successfully',
            });
        }
    } catch (e) {
        res.status(400).send({ msg: "occur error" })
    }
})

router.post("/commentsOfPhoto/:photo_id", async (req, res) => {
    const { photo_id } = req.params
    const { comment } = req.body
    const photo = await Photo.findById(photo_id)
    if (comment.trim().length == 0) {
        res.status(400).send({ msg: "Comment can't empty" })
    } else {
        photo.comments.push({
            comment: comment,
            user_id: new mongoose.Types.ObjectId('userId')
        })
        await photo.save()
        console.log("added new comment")
    }
})

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
