const { Router } = require("express");
const { creatorModel } = require("../db")

const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {
    res.json({
        message: "Successfully signed up"
    })
})

adminRouter.post("/signin", function (req, res) {
    res.json({
        message: "Successfully signed in"
    })
})

adminRouter.post("/createcourse", function (req, res) {
    res.json({
        message: "Successfully signed in"
    })
})


module.exports = {
    adminRouter: adminRouter
}