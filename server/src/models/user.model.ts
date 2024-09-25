import { Model, model, Schema } from "mongoose";

export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    avatar: {
      public_id: string;
      url: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
}

const IUserSchema = new Schema<IUser>(
    {
      _id: { type: String, required: true },
      email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true,
      },
      name: { type: String, required: true },
      password: { type: String, required: true },
      avatar: {
        public_id: String,
        url: String,
      },
      role: {
        type: String,
        default: "user",
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      courses: [
        {
          courseId: String,
        },
      ],
    },
    { collection: 'user', timestamps: true }
  );
  
  export const UserModel: Model<IUser> = model('user', IUserSchema);