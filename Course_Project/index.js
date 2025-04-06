const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const { userRouter } = require("./Routes/user");
const { courseRouter } = require("./Routes/course");
const { adminRouter } = require("./Routes/admin")
const app = express();


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


async function Main() {
    const uri = process.env.DB_CONNECTION_STRING;
    console.log("DB STRING:", uri); 

    if (!uri) {
        console.error("❌ No DB connection string found in .env!");
        return;
    }

     await mongoose.connect(uri);
    app.listen(3000);
}

Main();
