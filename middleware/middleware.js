const multer = require("multer")

export const parseFileMiddleWare = multer({
    storage: multer.memoryStorage()
});

module.exports = {
    parseFileMiddleWare
}