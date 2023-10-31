export interface CourseData {
    _id?: string,
    title?: String,
    description?: String,
    price?: String,
    image?: String,
    teacher?: String,
    stars?: Number,
    level?: String,
    reviews?: [String],
    published?: Boolean,
    adminId?: mongoose.Schema.Types.ObjectId
}