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

export interface chapterModelType {
    _id: string;
    title: string;
    description?: string;
    videoUrl?: string;
    isPublished: boolean;
    isFree: boolean;
  
    muxData?: { _id: String }[];
  
    createdAt: Date;
    updatedAt: Date;
  }
  