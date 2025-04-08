const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const Users = new Schema({
    email: { type: String, unique: true },
    password: String,
    FirstName: String,
    LastName: String
})

const Creator = new Schema({
    email: { type: String, unique: true },
    password: String,
    FirstName: String,
    LastName: String
})

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: ObjectId
})

const purchased = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("Users", Users);
const creatorModel = mongoose.model("Creator", Creator);
const courseModel = mongoose.model("Course", Course);
const purchasedModel = mongoose.model("purchase", purchased);

module.exports = {
    userModel: userModel,
    creatorModel: creatorModel,
    courseModel: courseModel,
    purchasedModel: purchasedModel
}

