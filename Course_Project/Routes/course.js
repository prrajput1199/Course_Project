const { Router } = require("express");

const courseRouter = Router();

courseRouter.get("/preview", function (req, res) {
    res.json({
        message: "Get all courses"
    })
});

courseRouter.post("/purchase", function (req, res) {
    // pay money 
    res.json({
        message: "purchased"
    })
});


module.exports = {
    courseRouter: courseRouter
}