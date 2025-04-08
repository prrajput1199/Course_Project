const { Router } = require("express");
require('dotenv').config();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT = require("jsonwebtoken");
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const { userModel, purchasedModel, courseModel } = require("../db");
const userRouter = Router();
const { userMiddleware } = require("../middlewares/user")

userRouter.post("/signup", async function (req, res) {
    const { firstname, lastname, email, password } = req.body;

    let userSchema = z.object({
        email: z.string().min(3).email(),
        password: z.string().min(3),
        firstname: z.string().min(3).max(100),
        lastname: z.string().min(3).max(100),
    })

    const Inputvalidation = userSchema.safeParse(req.body);

    if (!Inputvalidation.success) {
        res.status(300).json({
            message: " Something went wrong"
        });
        return;
    }

    let hashedpassword = await bcrypt.hash(password, 10);
    let error = false;

    try {
        await userModel.create({
            email: email,
            password: hashedpassword,
            FirstName: firstname,
            LastName: lastname
        })
    } catch (error) {
        res.status(300).json({
            message: error
        })
        error = true;
    }

    if (!error) {
        res.json({
            message: "Successfully signed up"
        })
    }
});

userRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const myPlainPassWord = req.body.password;

    // userModel.find will return empty array even if user is not present , so use findone(Go to definition)
    let userFound = await userModel.findOne({
        email: email
    })

    const { password } = userFound;
    const HashedPasswordCheck = await bcrypt.compare(myPlainPassWord, password);

    if (HashedPasswordCheck) {

        let token = JWT.sign(
            {
                userId: userFound._id.toString(),
            },
            JWT_USER_SECRET)

        // if you want to do cookie based authentication then you can do here (Learn about it)

        res.json({
            token: token,
            message: "Successfully signed in"
        })
    }
    else {
        res.status(300).json({
            message: "Incorrect credientials"
        })
    }
});

userRouter.get("/purchased", userMiddleware, async function (req, res) {
    const userId = req.userId;

    const courses = await purchasedModel.find({
        userId: userId
    })

    // let allpurchaseids = [];

    // for (let index = 0; index < courses.length; index++) {
    //     allpurchaseids.push(courses[index].courseId);
    // }

    // const purchasedCourses = await courseModel.find({
    //     _id: { $in: allpurchaseids }
    // })

    const purchasedCourses = await courseModel.find({
        _id: { $in: courses.map(el => el.courseId) }
    })

    console.log(" purchasedCourses => ", purchasedCourses);

    res.json({
        message: "Get your purchased courses",
        Courses: purchasedCourses
    })
});

module.exports = {
    userRouter: userRouter
}
