import { model, Model, Schema } from "mongoose";

export interface IFaq {
  question: String;
  answer: String;
}

const faqSchema = new Schema<IFaq>({
  question: { type: String },
  answer: { type: String },
});

export interface ICategory {
  title: { type: String };
}

const categorySchema = new Schema<ICategory>({
  title: { type: String },
});

interface IBannerImage {
  _id:string;
  public_id:String;
  url: String;
}

const bannerImageSchema = new Schema<IBannerImage>({
  _id: { type: String, required: true },
  public_id: { type: String },
  url: { type: String },
});

export interface ILayout {
  _id: string;
  type?: string;
  faq: IFaq[];
  categories: ICategory[];
  banner?: {
    image: IBannerImage;
    title?: string;
    subTitle?: string;
  };
}

const layoutSchema = new Schema<ILayout>({
  _id: { type: String, required: true },
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

export const LayoutModel: Model<ILayout> = model("layouts", layoutSchema);
