const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", function (req, res) {
    res.json({
        message: "Successfully signed up"
    })
});

userRouter.post("/signin", function (req, res) {
    res.json({
        message: "Successfully signed in"
    })
});

userRouter.get("/purchased", function (req, res) {
    res.json({
        message: "Get your purchased courses"
    })
});

module.exports = {
    userRouter: userRouter
}
