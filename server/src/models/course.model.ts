import { model, Model, Schema } from "mongoose";

export interface ICourse extends Document {
    name: string;
    description: string;
    categories: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: object;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    // reviews: IReview[];
    // courseData: ICourseData[];
    ratings?: number;
    purchased: number;
  }

  const courseSchema = new Schema<ICourse>({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories:{
      type:String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags:{
      type: String,
      required: true,
    },
    level:{
      type: String,
      required: true,
    },
    demoUrl:{
      type: String,
      required: true,
    },
    benefits: [{title: String}],
    prerequisites: [{title: String}],
    // reviews: [reviewSchema],
    //  courseData: [courseDataSchema],
     ratings:{
       type: Number,
       default: 0,
     },
     purchased:{
      type: Number,
      default: 0,
     },
  },{timestamps: true});


  export const CourseModel: Model<ICourse> = model("course", courseSchema);