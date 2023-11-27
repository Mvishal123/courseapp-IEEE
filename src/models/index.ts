import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  profileImage: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  mycourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  isVerified: { type: Boolean, default: false },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotpasswordToken: String,
  forgotpasswordTokenExpiry: Date,
});

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  price: String,
  image: String,

  teacher: String,
  stars: [{ user: mongoose.Schema.Types.ObjectId, star: Number }],
  level: String,
  reviews: [{ user: String, review: String }],

  attachments: [String],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchases" }],

  isPublished: { type: Boolean, default: false },

  userId: String,
});

const courseCategorySchema = new mongoose.Schema({
  category: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const chapterSchema = new mongoose.Schema(
  {
    courseId: String,
    title: String,
    description: String,
    videoUrl: String,
    position: Number,
    isPublished: { type: Boolean, default: false },
    isFree: { type: Boolean, default: false },

    muxData: [{ type: mongoose.Schema.ObjectId, ref: "MuxData" }],
  },
  { timestamps: true }
);

const muxDataSchema = new mongoose.Schema({
  chapterId: String,
  assetId: String,
  playbackId: String,
});

const userProgressSchema = new mongoose.Schema(
  {
    userId: String,
    chapterId: String,

    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const purchasesSchema = new mongoose.Schema(
  {
    userId: String,
    courseId: String,
  },
  { timestamps: true }
);

const stripeCustomerSchema = new mongoose.Schema(
  {
    userId: String,
    stripeCustomerId: String,
  },
  { timestamps: true }
);

// Models
export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export const CourseCategory =
  mongoose.models.CourseCategory ||
  mongoose.model("CourseCategory", courseCategorySchema);

export const Chapter =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export const MuxData =
  mongoose.models.MuxData || mongoose.model("MuxData", muxDataSchema);

export const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model("UserProgress", userProgressSchema);

export const Purchases =
  mongoose.models.Purchases || mongoose.model("Purchases", purchasesSchema);

export const StripeCustomer =
  mongoose.models.StripeCustomer ||
  mongoose.model("StripeCustomer", stripeCustomerSchema);
