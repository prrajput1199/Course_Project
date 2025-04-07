require('dotenv').config();
const { Router } = require("express");
const { creatorModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const { adminMiddleware } = require("../middlewares/admin")

const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
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
        await creatorModel.create({
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
})

adminRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const myPlainPassWord = req.body.password;


    // userModel.find will return empty array even if user is not present so use findone
    let adminFound = await creatorModel.findOne({
        email: email
    })

    const { password } = adminFound;
    const HashedPasswordCheck = await bcrypt.compare(myPlainPassWord, password);

    if (HashedPasswordCheck) {

        let token = JWT.sign(
            {
                adminId: adminFound._id.toString(),
            },
            JWT_ADMIN_SECRET)

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
})

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const { title, description, price, imageURL } = req.body;

    try {
        let course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageURL: imageURL,
            creatorId: adminId
        })

        res.json({
            message: "Course Created",
            courseId: course._id
        })

    } catch (error) {
        res.status(300).json({
            message: error
        })
    }

})


adminRouter.put("/course", adminMiddleware, async function (req, res) {

    const adminId = req.adminId;
    const { title, description, price, imageURL, courseId } = req.body;

    let course = await courseModel.findOne({
        _id: courseId,
        creatorId: adminId
    })

    if (!course) {
        res.status(300).json({
            message: " You are not allowed to update this course"
        });
        return;
    }

    await courseModel.updateOne(({
        _id: courseId,
    }), {
        title: title,
        description: description,
        price: price,
        imageURL: imageURL,
    })

    res.json({
        message: "Successfully updated",
        courseId: courseId
    })
})

adminRouter.get("/course/preview", adminMiddleware, async function (req, res) {

    let adminId = req.adminId;

    const Courses = await courseModel.find({
        creatorId : adminId
    })

    res.json({
        message: " successfully fetched",
        Courses: Courses,
    })
})

module.exports = {
    adminRouter: adminRouter
}