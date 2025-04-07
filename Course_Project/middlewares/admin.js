require('dotenv').config();
const jwt = require("jsonwebtoken");


function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    console.log(decodedToken);

    if (decodedToken) {
        req.adminId = decodedToken.adminId;
        next();
    }
    else {
        res.status(300).json({
            message: "Invalid credientials"
        })
    }
}

module.exports = {
    adminMiddleware
}