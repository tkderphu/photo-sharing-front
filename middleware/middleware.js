const multer = require("multer");
const { getPayload } = require("../utils/jwt");

const parseFileMiddleWare = multer({
    storage: multer.memoryStorage()
});

const authMiddleWare = async (req, res, next) => {
    const accessToken = req.headers['authorization']?.substring(7) || ""
    try {
        const payload = getPayload(accessToken)
        req.userId = payload._id
        next()
    } catch (err) {
        res.status(400).send({ msg: "You haven't loggined yet" })
    }
}

module.exports = {
    parseFileMiddleWare,
    authMiddleWare
}