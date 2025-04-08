require('dotenv').config();
const jwt = require("jsonwebtoken");


function userMiddleware(req, res, next) {
    const token = req.headers.token;

    const decodedToken = jwt.verify(token, process.env.JWT_USER_SECRET);

    console.log(decodedToken);

    if (decodedToken) {
        req.userId = decodedToken.userId;
        next();
    }
    else {
        res.status(300).json({
            message: "Invalid credientials"
        })
    }
}

module.exports = {
    userMiddleware
}