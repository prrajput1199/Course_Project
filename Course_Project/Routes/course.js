const { Router } = require("express");
const { userMiddleware } = require("../middlewares/user");
const { courseModel, purchasedModel } = require("../db");

const courseRouter = Router();

courseRouter.get("/preview", async function (req, res) {

    const courses = await courseModel.find({
    })
    res.json({
        message: "Get all courses",
        courses: courses
    })
});

courseRouter.post("/purchase", userMiddleware, async function (req, res) {

    const userId = req.userId;
    const courseId = req.body.courseId;

    const courses = await purchasedModel.create({
        userId: userId,
        courseId: courseId
    })
    // pay money 
    res.json({
        message: "purchased the course"
    })
});


module.exports = {
    courseRouter: courseRouter
}