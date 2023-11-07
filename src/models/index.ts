import mongoose from "mongoose";
import Email from "next-auth/providers/email";

// Schema
const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
    mycourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    profileImage: String,
    cart: [{type: mongoose.Schema.Types.ObjectId, ref:"Course"}],
    mycourses:  [{type: mongoose.Schema.Types.ObjectId, ref:"Course"}],
    isVerified: Boolean,
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotpasswordToken: String,
    forgotpasswordTokenExpiry: Date,
})

const courseSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    price: String,
    image: String,
    teacher: String,
    stars: Number,
    level: String,
    reviews: [String],
    published: Boolean,
    userId: String
})

// Models
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)
