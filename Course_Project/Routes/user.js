const { Router } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT = require("jsonwebtoken")
const JWT_SECRET = "bsjkvbkbsjkdvjkbsjdvjsjkdvjksdkv";
const { userModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
    const fistName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    let userSchema = z.object({
        email: z.string().min(3).email(),
        password: z.string().min(3),
        FirstName: z.string().min(3).max(100),
        LastName: z.string().min(3).max(100),
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
            FirstName: fistName,
            LastName: lastName
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
